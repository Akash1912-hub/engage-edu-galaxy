import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CourseCard from "./CourseCard";
import { ArrowRight, Filter, Search } from "lucide-react";
import { useCourses } from "@/hooks/useCourses";
import { useNavigate } from "react-router-dom";

const FeaturedCourses = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { courses, loading } = useCourses(selectedCategory, searchTerm);

  const handleViewCourse = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

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
                variant={category === selectedCategory ? "default" : "outline"}
                size="sm"
                className="hover:scale-105 transition-transform"
                onClick={() => setSelectedCategory(category)}
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-muted rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div 
                key={course.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CourseCard 
                  course={{
                    id: course.id,
                    title: course.title,
                    instructor: course.instructor.full_name,
                    image: course.thumbnail_url,
                    duration: `${course.duration_hours} hours`,
                    students: course.total_students,
                    rating: course.rating,
                    price: course.price,
                    level: course.level,
                    category: course.category
                  }} 
                  onViewCourse={handleViewCourse}
                />
              </div>
            ))}
          </div>
        )}

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