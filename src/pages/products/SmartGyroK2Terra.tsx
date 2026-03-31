import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Battery, 
  Gauge, 
  Weight, 
  Zap, 
  Shield, 
  Clock,
  ArrowLeft,
  ShoppingCart,
  Star,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SmartGyroK2Terra: React.FC = () => {
  const specifications = [
    { icon: Zap, label: 'Potencia', value: '800W (máxima) / 500W (nominal)' },
    { icon: Battery, label: 'Batería', value: '13.000 mAh / 48V' },
    { icon: Gauge, label: 'Autonomía', value: 'Hasta 45 km' },
    { icon: Weight, label: 'Peso', value: '18.5 kg' },
    { icon: Gauge, label: 'Velocidad máxima', value: '25 km/h' },
    { icon: Shield, label: 'Ruedas', value: '10" neumáticas' }
  ];

  const features = [
    'Motor de 800W de potencia máxima',
    'Batería de larga duración 13.000 mAh',
    'Ruedas neumáticas de 10 pulgadas',
    '4 intermitentes LED para mayor seguridad',
    'Frenos de disco delantero y trasero',
    'Pantalla LCD con información completa',
    'Plegable para fácil transporte',
    'Resistente al agua IPX4'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <section className="pt-20 pb-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Volver al Inicio
            </Link>
            <span>/</span>
            <span>SmartGyro K2 Terra</span>
          </div>
        </div>
      </section>

      {/* Product Hero */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Producto Destacado
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">SmartGyro K2 Terra</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                El patinete eléctrico perfecto para aventureros urbanos. Con 800W de potencia máxima 
                y una batería de 13.000 mAh, el K2 Terra te llevará hasta 45 km con una sola carga. 
                Sus ruedas neumáticas de 10" y 4 intermitentes LED garantizan seguridad y comodidad 
                en cada trayecto.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-gradient-primary hover:scale-105 transition-all">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Ver en Catálogo
                </Button>
                <Button variant="outline" size="lg">
                  Solicitar Información
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-muted-foreground">4.8/5 (124 reseñas)</span>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
                <img 
                  src="/placeholder.svg" 
                  alt="SmartGyro K2 Terra" 
                  className="w-full h-full object-contain p-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">Especificaciones Técnicas</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {specifications.map((spec, index) => (
              <Card key={index} className="p-6 text-center hover:scale-105 transition-all">
                <spec.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{spec.label}</h3>
                <p className="text-muted-foreground">{spec.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="gradient-text">Características Principales</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para la aventura?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Descubre la libertad de moverte por la ciudad con el SmartGyro K2 Terra. 
            Potencia, autonomía y seguridad en un solo patinete.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Ver Precio y Disponibilidad
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Contactar Asesor
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SmartGyroK2Terra;