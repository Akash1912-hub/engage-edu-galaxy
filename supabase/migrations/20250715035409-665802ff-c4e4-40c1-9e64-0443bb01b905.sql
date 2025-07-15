-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
  skills TEXT[],
  learning_goals TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  instructor_id UUID NOT NULL,
  thumbnail_url TEXT,
  category TEXT,
  level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  price DECIMAL(10,2),
  duration_hours INTEGER,
  rating DECIMAL(3,2) DEFAULT 0,
  total_students INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create course_enrollments table
CREATE TABLE public.course_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_id UUID NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  progress DECIMAL(5,2) DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, course_id)
);

-- Create course_lessons table
CREATE TABLE public.course_lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  content TEXT,
  order_index INTEGER NOT NULL,
  duration_minutes INTEGER,
  is_preview BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lesson_progress table
CREATE TABLE public.lesson_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  lesson_id UUID NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  watch_time_seconds INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Create course_reviews table
CREATE TABLE public.course_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  course_id UUID NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for courses
CREATE POLICY "Published courses are viewable by everyone" 
ON public.courses FOR SELECT 
USING (is_published = true OR auth.uid() = instructor_id);

CREATE POLICY "Instructors can create courses" 
ON public.courses FOR INSERT 
WITH CHECK (auth.uid() = instructor_id);

CREATE POLICY "Instructors can update their own courses" 
ON public.courses FOR UPDATE 
USING (auth.uid() = instructor_id);

-- Create RLS policies for enrollments
CREATE POLICY "Users can view their own enrollments" 
ON public.course_enrollments FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll in courses" 
ON public.course_enrollments FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enrollments" 
ON public.course_enrollments FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for lessons
CREATE POLICY "Lessons are viewable by enrolled users" 
ON public.course_lessons FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.course_enrollments 
    WHERE course_id = course_lessons.course_id 
    AND user_id = auth.uid()
  ) OR 
  EXISTS (
    SELECT 1 FROM public.courses 
    WHERE id = course_lessons.course_id 
    AND instructor_id = auth.uid()
  ) OR
  is_preview = true
);

-- Create RLS policies for lesson progress
CREATE POLICY "Users can view their own progress" 
ON public.lesson_progress FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" 
ON public.lesson_progress FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
ON public.lesson_progress FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for reviews
CREATE POLICY "Reviews are viewable by everyone" 
ON public.course_reviews FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for enrolled courses" 
ON public.course_reviews FOR INSERT 
WITH CHECK (
  auth.uid() = user_id AND 
  EXISTS (
    SELECT 1 FROM public.course_enrollments 
    WHERE course_id = course_reviews.course_id 
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own reviews" 
ON public.course_reviews FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON public.course_lessons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lesson_progress_updated_at
  BEFORE UPDATE ON public.lesson_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.course_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add foreign key constraints
ALTER TABLE public.courses 
ADD CONSTRAINT courses_instructor_id_fkey 
FOREIGN KEY (instructor_id) REFERENCES public.profiles(user_id);

ALTER TABLE public.course_enrollments 
ADD CONSTRAINT enrollments_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id);

ALTER TABLE public.course_enrollments 
ADD CONSTRAINT enrollments_course_id_fkey 
FOREIGN KEY (course_id) REFERENCES public.courses(id);

ALTER TABLE public.course_lessons 
ADD CONSTRAINT lessons_course_id_fkey 
FOREIGN KEY (course_id) REFERENCES public.courses(id);

ALTER TABLE public.lesson_progress 
ADD CONSTRAINT lesson_progress_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id);

ALTER TABLE public.lesson_progress 
ADD CONSTRAINT lesson_progress_lesson_id_fkey 
FOREIGN KEY (lesson_id) REFERENCES public.course_lessons(id);

ALTER TABLE public.course_reviews 
ADD CONSTRAINT reviews_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id);

ALTER TABLE public.course_reviews 
ADD CONSTRAINT reviews_course_id_fkey 
FOREIGN KEY (course_id) REFERENCES public.courses(id);

-- Insert sample courses data
INSERT INTO public.profiles (user_id, email, full_name, role, bio) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'sarah.chen@example.com', 'Sarah Chen', 'instructor', 'Senior React Developer with 8+ years experience'),
('550e8400-e29b-41d4-a716-446655440002', 'james.wilson@example.com', 'Dr. James Wilson', 'instructor', 'AI/ML researcher and educator'),
('550e8400-e29b-41d4-a716-446655440003', 'maria.rodriguez@example.com', 'Maria Rodriguez', 'instructor', 'Digital marketing strategist'),
('550e8400-e29b-41d4-a716-446655440004', 'alex.thompson@example.com', 'Alex Thompson', 'instructor', 'UI/UX designer and consultant'),
('550e8400-e29b-41d4-a716-446655440005', 'emma.davis@example.com', 'Dr. Emma Davis', 'instructor', 'Data scientist and Python expert'),
('550e8400-e29b-41d4-a716-446655440006', 'michael.chang@example.com', 'Michael Chang', 'instructor', 'Blockchain developer and crypto expert');

INSERT INTO public.courses (id, title, description, instructor_id, thumbnail_url, category, level, price, duration_hours, rating, total_students, is_published) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'Complete React Development Bootcamp', 'Master React from basics to advanced concepts with hands-on projects', '550e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'Programming', 'beginner', 89.00, 40, 4.9, 12450, true),
('650e8400-e29b-41d4-a716-446655440002', 'AI & Machine Learning Masterclass', 'Comprehensive AI and ML course with practical implementations', '550e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'AI/ML', 'advanced', 129.00, 55, 4.8, 8920, true),
('650e8400-e29b-41d4-a716-446655440003', 'Digital Marketing Strategy 2024', 'Modern digital marketing strategies and tactics', '550e8400-e29b-41d4-a716-446655440003', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'Marketing', 'intermediate', 69.00, 30, 4.7, 15680, true),
('650e8400-e29b-41d4-a716-446655440004', 'UI/UX Design Fundamentals', 'Learn design principles and user experience best practices', '550e8400-e29b-41d4-a716-446655440004', 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'Design', 'beginner', 79.00, 35, 4.9, 9840, true),
('650e8400-e29b-41d4-a716-446655440005', 'Python for Data Science', 'Complete Python programming for data analysis and visualization', '550e8400-e29b-41d4-a716-446655440005', 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'Data Science', 'intermediate', 99.00, 45, 4.8, 11200, true),
('650e8400-e29b-41d4-a716-446655440006', 'Blockchain Development Course', 'Smart contracts, DApps, and cryptocurrency development', '550e8400-e29b-41d4-a716-446655440006', 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 'Blockchain', 'advanced', 149.00, 50, 4.6, 6750, true);