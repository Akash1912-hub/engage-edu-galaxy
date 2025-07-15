import { Button } from "@/components/ui/button";
import { BookOpen, Menu, User, Search, Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">EduHub</h1>
              <p className="text-xs text-muted-foreground">Learn. Grow. Excel.</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#courses" className="text-foreground hover:text-primary transition-colors">Courses</a>
            <a href="#instructors" className="text-foreground hover:text-primary transition-colors">Instructors</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center bg-muted rounded-lg px-4 py-2 w-96">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>

          {/* Auth & User Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="hidden md:flex">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button variant="hero" className="hidden md:flex">
              Get Started
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;