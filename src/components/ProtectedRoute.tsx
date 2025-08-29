import React from 'react';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [], 
  fallback 
}) => {
  const { user, isAuthenticated } = useAuth();

  // 🆕 SI NO ESTÁ AUTENTICADO, NO MOSTRAR NADA
  if (!isAuthenticated || !user) {
    return null;
  }

  // 🆕 SI NO HAY RESTRICCIONES DE ROL, MOSTRAR CONTENIDO
  if (allowedRoles.length === 0) {
    return <>{children}</>;
  }

  // 🆕 VERIFICAR SI EL USUARIO TIENE EL ROL PERMITIDO
  const hasAccess = allowedRoles.includes(user.role);

  if (!hasAccess) {
    return fallback || (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚫</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Zugriff verweigert
          </h3>
          <p className="text-muted-foreground">
            Sie haben keine Berechtigung, auf diesen Bereich zuzugreifen.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Ihr aktueller Rang: <span className="font-medium capitalize">{user.role}</span>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
