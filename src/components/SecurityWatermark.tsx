import React from 'react';

interface SecurityWatermarkProps {
  className?: string;
}

const SecurityWatermark: React.FC<SecurityWatermarkProps> = ({ className = '' }) => {
  return (
    <div className={`fixed bottom-4 right-4 z-50 pointer-events-none ${className}`}>
      {/* 🆕 TU STICKER COMO MARCA DE AGUA DE SEGURIDAD */}
      <div className="relative group">
        {/* 🆕 STICKER PRINCIPAL */}
        <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-primary/30 p-3 transform rotate-12 hover:rotate-0 transition-all duration-500 hover:scale-110">
          <img 
            src="/nico3d.png" 
            alt="Nico3D Security" 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* 🆕 EFECTO DE BRILLO */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* 🆕 TEXTO DE SEGURIDAD */}
        <div className="absolute -bottom-2 -right-2 bg-danger text-danger-foreground text-xs px-2 py-1 rounded-full font-bold shadow-lg border border-white/50">
          SECURE
        </div>
        
        {/* 🆕 LÍNEA DE CONEXIÓN */}
        <div className="absolute top-1/2 -left-2 w-4 h-0.5 bg-gradient-to-r from-primary to-secondary transform -translate-y-1/2" />
        
        {/* 🆕 PUNTO DE CONEXIÓN */}
        <div className="absolute top-1/2 -left-3 w-2 h-2 bg-primary rounded-full transform -translate-y-1/2 animate-pulse" />
      </div>
      
      {/* 🆕 TEXTO DE PROTECCIÓN */}
      <div className="mt-2 text-center">
        <p className="text-xs text-muted-foreground font-medium">
          Nico3D Protected
        </p>
        <p className="text-xs text-muted-foreground/70">
          MVP v1.0
        </p>
      </div>
    </div>
  );
};

export default SecurityWatermark;
