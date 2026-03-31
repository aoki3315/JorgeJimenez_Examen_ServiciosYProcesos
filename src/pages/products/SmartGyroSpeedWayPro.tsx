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
  ArrowLeft,
  ShoppingCart,
  Star,
  CheckCircle,
  Crown,
  Shield,
  Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SmartGyroSpeedWayPro: React.FC = () => {
  const specifications = [
    { icon: Zap, label: 'Potencia', value: '1200W (máxima) / 800W (nominal)' },
    { icon: Battery, label: 'Batería', value: '18.200 mAh / 52V' },
    { icon: Gauge, label: 'Autonomía', value: 'Hasta 70 km' },
    { icon: Weight, label: 'Peso', value: '24 kg' },
    { icon: Gauge, label: 'Velocidad máxima', value: '40 km/h' },
    { icon: Smartphone, label: 'Conectividad', value: 'App SmartGyro + Bluetooth' }
  ];

  const features = [
    'Motor de alta potencia 1200W',
    'Batería de máxima capacidad 18.200 mAh',
    'Velocidad máxima de 40 km/h',
    'Frenos de disco hidráulicos duales',
    'Suspensión delantera y trasera ajustable',
    'Pantalla LCD táctil multifunción',
    'Luces LED adaptativas',
    'Neumáticos tubeless de 10" reforzados',
    'Estructura de aluminio aeroespacial',
    'Sistema antirrobo integrado',
    'Conectividad Bluetooth y App',
    'Modos de conducción personalizables'
  ];

  const proFeatures = [
    {
      icon: Crown,
      title: 'Versión Pro',
      description: 'La máxima expresión de potencia y tecnología'
    },
    {
      icon: Shield,
      title: 'Sistema Antirrobo',
      description: 'Protección avanzada con alarma y bloqueo remoto'
    },
    {
      icon: Smartphone,
      title: 'App Inteligente',
      description: 'Control total desde tu smartphone'
    }
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
            <span>SmartGyro SpeedWay Pro</span>
          </div>
        </div>
      </section>

      {/* Product Hero */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                <Crown className="w-4 h-4 mr-1" />
                Versión Pro
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">SmartGyro SpeedWay Pro</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                La evolución definitiva del SpeedWay. Con tecnología de vanguardia, conectividad 
                inteligente y el máximo rendimiento. SpeedWay Pro es para aquellos que no se 
                conforman con menos que la excelencia absoluta.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-all">
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
                <span className="text-muted-foreground">5.0/5 (89 reseñas)</span>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl flex items-center justify-center">
                <img 
                  src="/placeholder.svg" 
                  alt="SmartGyro SpeedWay Pro" 
                  className="w-full h-full object-contain p-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Features Highlight */}
      <section className="py-16 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">Características Pro</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tecnología avanzada que marca la diferencia en cada viaje
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {proFeatures.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:scale-105 transition-all">
                <feature.icon className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              <span className="gradient-text">Rendimiento Excepcional</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-500 mb-2">40</div>
                <div className="text-muted-foreground">km/h máxima</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-500 mb-2">70</div>
                <div className="text-muted-foreground">km autonomía</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-500 mb-2">1200</div>
                <div className="text-muted-foreground">W potencia</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">3s</div>
                <div className="text-muted-foreground">0-25 km/h</div>
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
                <spec.icon className="w-8 h-8 text-purple-500 mx-auto mb-4" />
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
              <span className="gradient-text">Características Avanzadas</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            La experiencia Pro te espera
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            SmartGyro SpeedWay Pro representa la cúspide de la tecnología en movilidad eléctrica. 
            Una experiencia que va más allá del transporte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Ver Precio y Disponibilidad
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-500">
              Contactar Asesor
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SmartGyroSpeedWayPro;