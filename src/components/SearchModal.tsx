import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string;
  category: string | null;
  active: boolean;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: dbProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ['publicProducts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true);
        
      if (error) throw error;
      return data || [];
    }
  });

  const filteredProducts = dbProducts.filter(product => {
    if (searchTerm.trim() === '') return false;
    const term = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      (product.description || '').toLowerCase().includes(term) ||
      (product.category || '').toLowerCase().includes(term)
    );
  });

  const handleClose = () => {
    setSearchTerm('');
    onClose();
  };

  const quickLinks = [
    { name: "Catálogo", path: "/catalog" },
    { name: "Reparaciones", path: "/repairs" },
    { name: "Contacto", path: "/contact" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Buscar productos
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 flex-1 flex flex-col min-h-0">
          {/* Campo de búsqueda */}
          <div className="relative shrink-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar productos, categorías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {/* Resultados de búsqueda */}
          <div className="overflow-y-auto flex-1 pr-2">
            {searchTerm.trim() !== '' && filteredProducts.length > 0 ? (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground mb-2 sticky top-0 bg-background py-1 z-10">
                  Resultados ({filteredProducts.length})
                </h3>
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={handleClose}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
                  >
                    <div className="h-12 w-12 shrink-0 bg-white rounded-md border flex items-center justify-center p-1">
                      <img
                        src={product.image_url || '/placeholder.svg'}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{product.name}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground capitalize bg-secondary/50 px-1.5 py-0.5 rounded">
                          {product.category || "Sin categoría"}
                        </span>
                        <span className="text-sm font-bold text-primary">
                          {product.price.toFixed(2)} €
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : searchTerm.trim() !== '' && !isLoading ? (
              <div className="text-center py-12 text-muted-foreground">
                <div className="bg-muted/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 opacity-50" />
                </div>
                <p className="font-medium">No se encontraron productos</p>
                <p className="text-sm mt-1">Prueba con términos diferentes</p>
              </div>
            ) : null}

            {/* Enlaces rápidos - Solo visible cuando no hay búsqueda o resultados */}
            {(searchTerm.trim() === '' || (filteredProducts.length === 0 && searchTerm.trim() !== '')) && (
              <div className="pt-4 mt-2 border-t">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Accesos rápidos
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={handleClose}
                      className="flex items-center justify-center p-3 rounded-lg bg-muted/30 hover:bg-muted text-sm font-medium transition-colors border border-transparent hover:border-border"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
