import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, AlertTriangle, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { supabase } from "@/lib/supabase";

type DashboardStats = {
  total_products: number;
  total_stock_value: number;
  low_stock_count: number;
  products_per_category: { name: string; value: number }[];
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AdminDashboard = () => {
  const { data: stats, isLoading, error } = useQuery<DashboardStats>({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const { data: products, error } = await supabase
        .from('products')
        .select('price, stock, category');

      if (error) throw error;
      if (!products) return {
        total_products: 0,
        total_stock_value: 0,
        low_stock_count: 0,
        products_per_category: []
      };

      const total_products = products.length;
      
      const total_stock_value = products.reduce((sum, p) => {
        return sum + (p.price * p.stock);
      }, 0);

      const low_stock_count = products.filter(p => p.stock < 5).length;

      const categoryMap = products.reduce((acc, p) => {
        const cat = p.category || 'Sin categoría';
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const products_per_category = Object.entries(categoryMap).map(([name, value]) => ({
        name,
        value
      }));

      return {
        total_products,
        total_stock_value,
        low_stock_count,
        products_per_category
      };
    }
  });

  if (isLoading) return <div className="p-8 text-center">Cargando estadísticas...</div>;
  if (error) return (
    <div className="p-8 text-center text-red-500 flex flex-col items-center gap-4">
      <p>Error al cargar el dashboard: {(error as Error).message}</p>
    </div>
  );
  if (!stats) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_products}</div>
            <p className="text-xs text-muted-foreground">En el catálogo</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Inventario</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_stock_value.toFixed(2)} €</div>
            <p className="text-xs text-muted-foreground">Precio venta * Stock</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.low_stock_count}</div>
            <p className="text-xs text-muted-foreground">Productos con &lt; 5 uds</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Productos por Categoría</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.products_per_category}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                  <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
                    {stats.products_per_category.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Utiliza las pestañas superiores para gestionar el inventario.
                    </p>
                    <div className="rounded-md bg-muted p-4">
                        <h4 className="mb-2 text-sm font-medium">Resumen del sistema</h4>
                        <ul className="text-sm space-y-2">
                            <li className="flex justify-between">
                                <span>Base de datos:</span>
                                <span className="font-mono">Supabase (PostgreSQL)</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Auth:</span>
                                <span className="font-mono">Supabase Auth</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Estado:</span>
                                <span className="text-green-600 font-medium">Conectado</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
