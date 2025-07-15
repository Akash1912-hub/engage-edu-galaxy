import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, BookOpen, Award } from "lucide-react";

interface Course {
  id: string;
  title: string;
  instructor: string;
  image: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  level: string;
  category: string;
}

interface CourseCardProps {
  course: Course;
  onViewCourse?: (courseId: string) => void;
}

const CourseCard = ({ course, onViewCourse }: CourseCardProps) => {
  const handleViewCourse = () => {
    if (onViewCourse) {
      onViewCourse(course.id);
    } else {
      // Fallback for when navigation is not available
      window.location.href = `/course/${course.id}`;
    }
  };
  return (
    <div className="group bg-card rounded-xl shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden hover:-translate-y-2">
      {/* Course Image */}
      <div className="relative overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
          {course.category}
        </div>
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
          <Award className="h-3 w-3 text-accent" />
          {course.level}
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6 space-y-4">
        {/* Title & Description */}
        <div>
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {course.title}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">By {course.instructor}</p>
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {course.students.toLocaleString()}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            {course.rating}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>75%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-gradient-success h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-2xl font-bold text-primary">${course.price}</span>
            <span className="text-sm text-muted-foreground ml-1">/ course</span>
          </div>
          <Button 
            variant="default" 
            className="group-hover:variant-hero transition-colors"
            onClick={handleViewCourse}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            View Course
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;