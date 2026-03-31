import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookieConsent", "accepted");
        setIsVisible(false);
    };

    const declineCookies = () => {
        localStorage.setItem("cookieConsent", "declined");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-background/95 backdrop-blur-md border-t border-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground flex-1">
                    <p className="font-semibold text-foreground mb-1">Tu privacidad es importante para nosotros</p>
                    <p>
                        Utilizamos cookies propias y de terceros para analizar nuestros servicios y mostrarle publicidad relacionada con sus preferencias en base a un perfil elaborado a partir de sus hábitos de navegación. Al hacer clic en "Aceptar todas", consiente el uso de TODAS las cookies.
                    </p>
                </div>
                <div className="flex items-center gap-3 shrink-0 w-full md:w-auto mt-2 md:mt-0">
                    <Button variant="outline" size="sm" className="flex-1 md:flex-none" onClick={declineCookies}>
                        Rechazar
                    </Button>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 md:flex-none" onClick={acceptCookies}>
                        Aceptar todas
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
