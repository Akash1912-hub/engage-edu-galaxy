import { Button } from "@/components/ui/button";
import { PlayCircle, Star, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-elearning.jpg";

const Hero = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Award className="h-4 w-4 mr-2" />
                #1 Online Learning Platform
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Master New Skills
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Online</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Join millions of learners worldwide. Access expert-led courses, interactive assignments, 
                and AI-powered personalized learning paths.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">1,200+</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 flex-wrap">
              <Button variant="hero" size="xl" className="group">
                Start Learning Today
                <PlayCircle className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform" />
              </Button>
              <Button variant="learning" size="xl">
                <PlayCircle className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-full border-2 border-background"></div>
                <div className="w-8 h-8 bg-gradient-success rounded-full border-2 border-background"></div>
                <div className="w-8 h-8 bg-accent rounded-full border-2 border-background"></div>
                <div className="w-8 h-8 bg-secondary rounded-full border-2 border-background"></div>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">
                  4.9/5 from 12,000+ reviews
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-glow">
              <img 
                src={heroImage} 
                alt="Students learning online" 
                className="w-full h-[500px] object-cover"
              />
              {/* Floating Cards */}
              <div className="absolute top-6 right-6 bg-background/95 backdrop-blur-md p-4 rounded-xl shadow-card animate-float">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm font-medium">Live Classes</div>
                    <div className="text-xs text-muted-foreground">245 active now</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 bg-background/95 backdrop-blur-md p-4 rounded-xl shadow-card animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-sm font-medium">AI-Powered Learning</div>
                    <div className="text-xs text-muted-foreground">Personalized for you</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;