import React from "react";

interface WorkshopBackgroundProps {
  image: string;
  title?: string;
  subtitle?: string;
}

const WorkshopBackground: React.FC<WorkshopBackgroundProps> = ({ image, title, subtitle }) => {
  return (
    <div 
      className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] bg-cover bg-center bg-fixed flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url('${image}')` }}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div>
      
      {/* Perfect smooth gradients for blending top and bottom edges without cuts */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-0"></div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-0"></div>
      
      <div className="relative z-10 text-center px-4 animate-fade-in">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          {title && (
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-widest uppercase mb-4 drop-shadow-md">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkshopBackground;
