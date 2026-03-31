import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/Rotulo-3-03-junto-azul-1.png";

interface AdminHeaderProps {
  onLogout?: () => void;
}

const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Web pública", path: "/" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 cursor-default select-none">
            <img src={logo} alt="Evolution Mobility" className="h-10 w-auto" />
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Admin</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            {onLogout && (
              <Button 
                variant="destructive" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </Button>
            )}
          </div>

          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:bg-primary/10"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 glass-card mt-2 rounded-lg">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {onLogout && (
                <Button
                  variant="destructive"
                  className="w-full justify-start mt-2"
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
