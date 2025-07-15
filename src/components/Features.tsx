import { 
  Brain, 
  Users, 
  VideoIcon, 
  Award, 
  MessageSquare, 
  Clock, 
  Smartphone, 
  BarChart3,
  Target,
  Zap,
  Shield,
  Lightbulb
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Get personalized course recommendations and adaptive learning paths tailored to your goals and learning style.",
      color: "text-primary"
    },
    {
      icon: VideoIcon,
      title: "Interactive Video Lessons",
      description: "High-quality video content with progress tracking, note-taking, and the ability to resume where you left off.",
      color: "text-secondary"
    },
    {
      icon: Users,
      title: "Live Classes & Webinars",
      description: "Join real-time classes with expert instructors, interactive Q&A sessions, and collaborative learning.",
      color: "text-accent"
    },
    {
      icon: Award,
      title: "Certificates & Badges",
      description: "Earn industry-recognized certificates and achievement badges to showcase your skills to employers.",
      color: "text-primary"
    },
    {
      icon: MessageSquare,
      title: "Discussion Forums",
      description: "Connect with fellow learners, ask questions, share insights, and build a learning community.",
      color: "text-secondary"
    },
    {
      icon: Target,
      title: "Skill Assessments",
      description: "Regular quizzes and assignments with instant feedback to track your progress and identify areas for improvement.",
      color: "text-accent"
    },
    {
      icon: Smartphone,
      title: "Mobile Learning",
      description: "Learn on-the-go with our mobile-responsive platform. Download content for offline access anywhere.",
      color: "text-primary"
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "Detailed insights into your learning journey with progress reports, time tracking, and performance metrics.",
      color: "text-secondary"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security to protect your data and learning progress with 99.9% uptime guarantee.",
      color: "text-accent"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="h-4 w-4 mr-2" />
            Platform Features
          </div>
          <h2 className="text-4xl font-bold text-foreground">Everything You Need to Excel</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive e-learning platform combines cutting-edge technology with proven educational methods 
            to deliver an exceptional learning experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group bg-gradient-card p-8 rounded-xl shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-2 animate-fade-in border border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-7 w-7 text-primary-foreground" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center text-primary text-sm font-medium">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Learn More
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-primary rounded-2xl p-8 text-center max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Learning Experience?
            </h3>
            <p className="text-primary-foreground/90 text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of learners who have already accelerated their careers with our platform.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="bg-background text-primary px-8 py-3 rounded-lg font-medium hover:bg-background/90 transition-colors hover:scale-105 transform duration-200">
                Start Free Trial
              </button>
              <button className="border border-primary-foreground/30 text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary-foreground/10 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;