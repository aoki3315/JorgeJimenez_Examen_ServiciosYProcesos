import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Cart = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const uniqueItemCount = state.items.length;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="container mx-auto px-4 py-16 pt-24">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold mb-4">
              Tu carrito está vacío
            </h1>
            <p className="text-muted-foreground mb-8">
              Parece que aún no has añadido ningún producto a tu carrito.
            </p>
            <Link to="/catalog">
              <Button size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continuar comprando
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Carrito</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {uniqueItemCount} {uniqueItemCount === 1 ? 'producto' : 'productos'} · {state.itemCount} {state.itemCount === 1 ? 'ud' : 'uds'}
              </p>
            </div>
            <Link to="/catalog">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Seguir comprando
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Productos</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCart}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Vaciar carrito
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {state.items.map((item) => (
                      <div key={item.id} className="p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-[88px,1fr,auto] gap-4 items-start">
                          <div className="w-22">
                            <div className="w-[88px] h-[88px] rounded-none overflow-hidden bg-muted border border-border">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                                  Sin imagen
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="min-w-0">
                            <Link
                              to={`/product/${item.slug}`}
                              className="font-semibold hover:text-primary transition-colors line-clamp-2"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-muted-foreground mt-1">
                              {formatPrice(item.price)} / ud
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-3">
                              <div className="inline-flex items-center rounded-none border border-border bg-background">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="h-9 w-9 p-0 rounded-none"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <div className="h-9 min-w-10 px-3 flex items-center justify-center text-sm font-medium">
                                  {item.quantity}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-9 w-9 p-0 rounded-none"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Quitar
                              </Button>
                            </div>
                          </div>

                          <div className="sm:text-right">
                            <p className="font-semibold">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.quantity} × {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Resumen del pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Subtotal ({state.itemCount} {state.itemCount === 1 ? 'ud' : 'uds'})
                    </span>
                    <span>{formatPrice(state.total)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(state.total)}</span>
                  </div>
                  <Button className="w-full" size="lg">
                    Proceder al pago
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
