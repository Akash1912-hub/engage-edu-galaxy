import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  CheckCircle, 
  Lock,
  Share2,
  Heart,
  Award,
  User
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  category: string;
  level: string;
  price: number;
  duration_hours: number;
  rating: number;
  total_students: number;
  instructor: {
    full_name: string;
    bio: string;
    avatar_url?: string;
  };
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  order_index: number;
  is_preview: boolean;
}

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentProgress, setEnrollmentProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchCourse();
    fetchLessons();
    if (user) {
      checkEnrollment();
    }
  }, [id, user]);

  const fetchCourse = async () => {
    if (!id) return;
    
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        instructor:profiles!courses_instructor_id_fkey(full_name, bio, avatar_url)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching course:', error);
      return;
    }

    setCourse(data);
    setLoading(false);
  };

  const fetchLessons = async () => {
    if (!id) return;
    
    const { data, error } = await supabase
      .from('course_lessons')
      .select('*')
      .eq('course_id', id)
      .order('order_index');

    if (error) {
      console.error('Error fetching lessons:', error);
      return;
    }

    setLessons(data || []);
  };

  const checkEnrollment = async () => {
    if (!user || !id) return;

    const { data, error } = await supabase
      .from('course_enrollments')
      .select('progress')
      .eq('user_id', user.id)
      .eq('course_id', id)
      .single();

    if (!error && data) {
      setIsEnrolled(true);
      setEnrollmentProgress(data.progress || 0);
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to enroll in courses.",
        variant: "destructive",
      });
      return;
    }

    if (!id) return;

    setEnrolling(true);

    const { error } = await supabase
      .from('course_enrollments')
      .insert({
        user_id: user.id,
        course_id: id,
      });

    if (error) {
      toast({
        title: "Enrollment failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setIsEnrolled(true);
      toast({
        title: "Successfully enrolled!",
        description: "You can now access all course content.",
      });
    }

    setEnrolling(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Hero */}
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src={course.thumbnail_url} 
                alt={course.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{course.category}</Badge>
                  <Badge variant={course.level === 'beginner' ? 'default' : 'outline'}>
                    {course.level}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{course.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    {course.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.total_students.toLocaleString()} students
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration_hours}h total
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {course.description}
                    </p>
                  </CardContent>
                </Card>

                {isEnrolled && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Course Progress</span>
                          <span>{enrollmentProgress}%</span>
                        </div>
                        <Progress value={enrollmentProgress} className="w-full" />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="curriculum" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Content</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {lessons.length} lessons • {course.duration_hours} hours total
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {lessons.map((lesson, index) => (
                        <div 
                          key={lesson.id}
                          className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium">{lesson.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {lesson.duration_minutes} minutes
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {lesson.is_preview && (
                              <Badge variant="outline" className="text-xs">Preview</Badge>
                            )}
                            {isEnrolled || lesson.is_preview ? (
                              <Play className="h-4 w-4 text-primary" />
                            ) : (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="instructor" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>About the Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{course.instructor.full_name}</h3>
                        <p className="text-muted-foreground mt-2">{course.instructor.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="text-3xl font-bold text-primary">
                    ${course.price}
                  </div>
                  
                  {isEnrolled ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-2 text-secondary">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Enrolled</span>
                      </div>
                      <Button className="w-full" variant="learning">
                        <Play className="h-4 w-4 mr-2" />
                        Continue Learning
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={handleEnroll}
                      disabled={enrolling}
                    >
                      {enrolling ? 'Enrolling...' : 'Enroll Now'}
                    </Button>
                  )}
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Heart className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Features */}
            <Card>
              <CardHeader>
                <CardTitle>This course includes:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Play className="h-4 w-4 text-primary" />
                  <span className="text-sm">{course.duration_hours} hours of video content</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="text-sm">Downloadable resources</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm">Certificate of completion</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm">Access to student community</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;