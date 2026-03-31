import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import logo from "../assets/Rotulo-3-03-junto-azul-1.png";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import SearchModal from "./SearchModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { state } = useCart();

  const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Catálogo", path: "/catalog" },
    { name: "Reparación", path: "/repairs" },
    { name: "Financiación", path: "/financing" },
    { name: "Contacto", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 border-b border-border shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={() => window.scrollTo(0, 0)}>
            <img src={logo} alt="Evolution Mobility" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors relative group"
                onClick={() => window.scrollTo(0, 0)}
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-none border-border bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
            <Link to="/cart" onClick={() => window.scrollTo(0, 0)}>
              <Button
                variant="outline"
                size="icon"
                className="rounded-none border-border bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors relative"
              >
                <ShoppingCart className="h-4 w-4" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-black w-5 h-5 flex items-center justify-center">
                    {state.itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              className="rounded-none bg-primary text-primary-foreground font-black uppercase tracking-wider px-6 hover:bg-primary-glow ml-2 h-10 transition-colors"
              onClick={() => window.open('https://wa.me/34621143327', '_blank')}
            >
              Contacto
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            <Link to="/cart" className="relative" onClick={() => window.scrollTo(0, 0)}>
              <Button variant="outline" size="icon" className="rounded-none border-border">
                <ShoppingCart className="h-4 w-4" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-black w-5 h-5 flex items-center justify-center">
                    {state.itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-none border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-card border-x border-b border-border mt-1">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted border-b border-border/50 transition-colors"
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <div className="p-4 flex gap-2">
                <Button
                  className="rounded-none bg-primary text-primary-foreground font-black uppercase tracking-wider flex-1 h-12"
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <Search className="mr-2 h-4 w-4" /> Buscar
                </Button>
                <Button
                  variant="outline"
                  className="rounded-none border-primary text-primary font-black uppercase tracking-wider flex-1 h-12"
                  onClick={() => window.open('https://wa.me/34621143327', '_blank')}
                >
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
};

export default Header;
