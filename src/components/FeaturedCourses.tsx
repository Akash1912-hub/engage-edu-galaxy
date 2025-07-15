import { Button } from "@/components/ui/button";
import CourseCard from "./CourseCard";
import { ArrowRight, Filter, Search } from "lucide-react";

const FeaturedCourses = () => {
  // Mock course data - in real app this would come from Supabase
  const courses = [
    {
      id: "1",
      title: "Complete React Development Bootcamp",
      instructor: "Sarah Chen",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "40 hours",
      students: 12450,
      rating: 4.9,
      price: 89,
      level: "Beginner",
      category: "Programming"
    },
    {
      id: "2",
      title: "AI & Machine Learning Masterclass",
      instructor: "Dr. James Wilson",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "55 hours",
      students: 8920,
      rating: 4.8,
      price: 129,
      level: "Advanced",
      category: "AI/ML"
    },
    {
      id: "3",
      title: "Digital Marketing Strategy 2024",
      instructor: "Maria Rodriguez",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "30 hours",
      students: 15680,
      rating: 4.7,
      price: 69,
      level: "Intermediate",
      category: "Marketing"
    },
    {
      id: "4",
      title: "UI/UX Design Fundamentals",
      instructor: "Alex Thompson",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "35 hours",
      students: 9840,
      rating: 4.9,
      price: 79,
      level: "Beginner",
      category: "Design"
    },
    {
      id: "5",
      title: "Python for Data Science",
      instructor: "Dr. Emma Davis",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "45 hours",
      students: 11200,
      rating: 4.8,
      price: 99,
      level: "Intermediate",
      category: "Data Science"
    },
    {
      id: "6",
      title: "Blockchain Development Course",
      instructor: "Michael Chang",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "50 hours",
      students: 6750,
      rating: 4.6,
      price: 149,
      level: "Advanced",
      category: "Blockchain"
    }
  ];

  const categories = ["All", "Programming", "AI/ML", "Design", "Marketing", "Data Science", "Blockchain"];

  return (
    <section id="courses" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-foreground">Featured Courses</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our most popular courses designed by industry experts. 
            Start your learning journey with hands-on projects and real-world applications.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-8">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button 
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="hover:scale-105 transition-transform"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Search & Filter */}
          <div className="flex gap-3">
            <div className="flex items-center bg-background border border-border rounded-lg px-4 py-2 w-64">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <input 
                type="text" 
                placeholder="Search courses..." 
                className="bg-transparent outline-none flex-1 text-sm"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div 
              key={course.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        {/* View All Courses */}
        <div className="text-center mt-12">
          <Button variant="learning" size="lg" className="group">
            View All Courses
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;