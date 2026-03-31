import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Zap, Check, ChevronRight, Info } from "lucide-react";
import { useState } from "react";

const Financing = () => {
  const [amount, setAmount] = useState(1200);
  const [months, setMonths] = useState(12);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(1);

  const calculatePayment = () => {
    let monthlyPayment = 0;
    let totalAmount = 0;
    let interest = 0;

    if (months === 3) {
      const commission = amount * 0.015;
      monthlyPayment = amount / 3;
      totalAmount = amount + commission;
      interest = commission;
    } else {
      const rate = months > 12 ? 0.1495 / 12 : 0.0995 / 12;
      monthlyPayment = amount * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      totalAmount = monthlyPayment * months;
      interest = totalAmount - amount;
    }

    return { monthlyPayment, totalAmount, interest };
  };

  const result = calculatePayment();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const plans = [
    {
      id: 0,
      name: "Fast 3",
      months: "3 meses",
      rate: "0% TIN",
      fee: "1.5% Apertura",
      limits: "50€ - 2.500€",
      features: ["Aprobación en 1 min", "Sin intereses", "Tarjeta de crédito/débito"],
      popular: false
    },
    {
      id: 1,
      name: "Flex Standard",
      months: "6-12 meses",
      rate: "9,95% TIN",
      fee: "Sin comisión",
      limits: "200€ - 2.500€",
      features: ["Cuotas más bajas", "100% Digital", "Amortización gratuita"],
      popular: true
    },
    {
      id: 2,
      name: "Long Term",
      months: "18-24 meses",
      rate: "14,95% TIN",
      fee: "Sin comisión",
      limits: "400€ - 3.000€",
      features: ["Mínima cuota mensual", "Plazo extendido", "Estudio personalizado"],
      popular: false
    }
  ];

  return (
    <div className="bg-background text-foreground min-h-screen font-sans selection:bg-primary/20 flex flex-col pt-20">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-4 border-b border-border bg-white overflow-hidden">
          {/* Clean Fintech Wash Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
          
          <div className="container relative z-10 mx-auto max-w-6xl flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-6 px-4 py-2 border border-primary/20 bg-background/50 backdrop-blur-sm rounded-none">
              <Zap className="w-5 h-5" />
              Financiación Inteligente
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 uppercase text-foreground">
              Tu movilidad, <br />
              <span className="text-primary">A tu ritmo.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed font-medium">
              Condiciones transparentes, proceso 100% digital y sin letra pequeña. 
              Simula tu cuota y obtén respuesta en segundos.
            </p>
          </div>
        </section>

        {/* Calculator Widget & Requirements */}
        <section className="py-24 px-4 bg-background border-b border-border">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-12 gap-12">
              
              {/* Widget Left */}
              <div className="lg:col-span-7">
                <Card className="p-8 md:p-12 shadow-2xl bg-card border-border">
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-8">
                    Simulador de Cuotas
                  </h3>
                  
                  <div className="space-y-10">
                    {/* Amount Slider */}
                    <div>
                      <div className="flex justify-between items-end mb-4">
                        <label className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                          Importe a financiar
                        </label>
                        <div className="text-3xl font-black text-primary">{formatCurrency(amount)}</div>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="3000"
                        step="50"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-none appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-3 font-semibold tracking-wider">
                        <span>100 €</span>
                        <span>3.000 €</span>
                      </div>
                    </div>

                    {/* Months Selector */}
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4 block">
                        Plazo de devolución
                      </label>
                      <div className="grid grid-cols-4 gap-4">
                        {[3, 6, 12, 24].map((m) => (
                          <button
                            key={m}
                            onClick={() => setMonths(m)}
                            className={`py-3 rounded-none text-sm font-bold transition-all border-2 ${
                              months === m 
                                ? "bg-primary text-primary-foreground border-primary" 
                                : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-foreground"
                            }`}
                          >
                            {m} mes.
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Results */}
                    <div className="mt-8 bg-muted/30 rounded-none p-8 border border-border">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-lg font-bold text-muted-foreground uppercase">Cuota Mensual</span>
                        <span className="text-5xl font-black text-primary">{formatCurrency(result.monthlyPayment)}</span>
                      </div>
                      
                      <div className="space-y-4 pt-6 text-sm font-medium">
                        <div className="flex justify-between border-b border-border pb-4">
                          <span className="text-muted-foreground">Importe solicitado</span>
                          <span>{formatCurrency(amount)}</span>
                        </div>
                        <div className="flex justify-between border-b border-border pb-4">
                          <span className="text-muted-foreground">Coste total (Intereses/Comisión)</span>
                          <span>{formatCurrency(result.interest)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total a devolver</span>
                          <span className="text-primary">{formatCurrency(result.totalAmount)}</span>
                        </div>
                      </div>
                    </div>

                    <Button size="lg" className="w-full h-16 font-black uppercase tracking-widest text-lg bg-primary hover:bg-primary/90 text-primary-foreground">
                      Solicitar Financiación <ChevronRight className="w-6 h-6 ml-2" />
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Requirements Right */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <h3 className="text-3xl font-bold uppercase tracking-tight mb-6">Requisitos de acceso</h3>
                <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                  El proceso es instantáneo y 100% digital. Asegúrate de tener a mano la siguiente 
                  documentación para agilizar la firma electrónica.
                </p>

                <div className="space-y-6">
                  {[
                    { title: "DNI o NIE en vigor", desc: "Fotografía por ambas caras en buen estado y legible." },
                    { title: "Tarjeta Bancaria", desc: "Tarjeta de crédito o débito a nombre del titular del contrato." },
                    { title: "Banca Online (Opcional)", desc: "Para validación instantánea de ingresos sin nómina manual." }
                  ].map((req, i) => (
                    <div key={i} className="flex gap-6 p-6 rounded-none bg-muted/30 hover:bg-muted/50 transition-colors border border-border">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold uppercase mb-2">{req.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{req.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Pricing Tables */}
        <section className="py-24 bg-muted/10 border-b border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold uppercase tracking-tight mb-4">Planes Disponibles</h2>
              <p className="text-lg text-muted-foreground">Selecciona la estructura de pagos que mejor se adapte a ti.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <Card 
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative p-8 cursor-pointer transition-all duration-300 border-2 flex flex-col ${
                    selectedPlan === plan.id 
                      ? "border-primary bg-card shadow-2xl scale-105" 
                      : "border-border bg-card/50 hover:border-primary/50"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest py-1.5 px-4 rounded-full">
                      Recomendado
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold uppercase mb-4">{plan.name}</h3>
                  <div className="mb-8 pb-8 border-b border-border">
                    <span className="text-4xl font-black text-primary block mb-2">{plan.rate}</span>
                  </div>

                  <div className="space-y-4 mb-8 flex-grow font-medium">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Plazo</span>
                      <span>{plan.months}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Límites</span>
                      <span>{plan.limits}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Comisión</span>
                      <span>{plan.fee}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 border-t border-border pt-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                        <Check className="w-5 h-5 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-2 text-muted-foreground mb-4 justify-center">
              <Info className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-bold">Aviso Legal y Transparencia</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed text-center">
              Financiación sujeta a criterios de concesión y riesgo de la entidad financiera colaboradora. 
              Evolution Mobility actúa en calidad de intermediario de crédito. 
              El ejemplo representativo mostrado en el simulador está calculado para el TIN indicado según 
              el plazo seleccionado. El TAE variará en función del importe y plazo solicitados.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Financing;
