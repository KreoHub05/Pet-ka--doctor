import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, Instagram, Youtube, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/experience", label: "Experience" },
    { href: "/expertise", label: "Expertise" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/pet_ka_doctor", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com/@pet_ka_doctor", label: "YouTube" },
    { icon: Facebook, href: "https://www.facebook.com/share/16sP6UDm8p/", label: "Facebook" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-card"
          : "bg-transparent"
      }`}
    >
      {/* Top bar */}
      <div className="hidden md:block bg-primary text-primary-foreground py-2">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+918004944424" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="w-4 h-4" />
              <span>+91 80049 44424</span>
            </a>
            <a href="mailto:drharshalmaheshgoel@gmail.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="w-4 h-4" />
              <span>drharshalmaheshgoel@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="container py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex flex-col">
            <span className="font-display text-xl md:text-2xl font-bold text-foreground">
              Dr. Harshal Goel
            </span>
            <span className="text-xs text-muted-foreground font-medium tracking-wide">
              GASTROENTEROLOGIST
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-medium transition-colors relative group ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            ))}
            <ThemeToggle />
            <Link to="/book-consultation">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">
                Book Consultation
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-card shadow-card-hover animate-fade-up">
            <div className="container py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-medium py-2 transition-colors ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/book-consultation" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                  Book Consultation
                </Button>
              </Link>
              
              {/* Mobile social links and theme toggle */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
