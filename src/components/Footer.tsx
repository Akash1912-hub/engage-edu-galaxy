import { BookOpen, Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold">EduHub</h3>
                <p className="text-xs text-background/70">Learn. Grow. Excel.</p>
              </div>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Empowering learners worldwide with cutting-edge education technology. 
              Join our community of over 50,000 students and transform your career.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Browse Courses', 'Become Instructor', 'Student Success', 'Help Center', 'About Us', 'Careers'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-background/80 hover:text-background transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {['Programming', 'AI & Machine Learning', 'Design', 'Marketing', 'Data Science', 'Business'].map((category) => (
                <li key={category}>
                  <a href="#" className="text-background/80 hover:text-background transition-colors text-sm">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-background/80">123 Learning Street</p>
                  <p className="text-sm text-background/80">Education City, EC 12345</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <p className="text-sm text-background/80">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <p className="text-sm text-background/80">hello@eduhub.com</p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="font-medium mb-2">Stay Updated</h5>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-3 py-2 bg-background/10 border border-background/20 rounded text-sm placeholder:text-background/60 focus:outline-none focus:border-primary"
                />
                <Button variant="default" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-background/70">
              © 2024 EduHub. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-background/70 hover:text-background transition-colors">Privacy Policy</a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">Terms of Service</a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;