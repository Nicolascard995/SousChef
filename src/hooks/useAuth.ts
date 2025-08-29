import { useState, useEffect } from 'react';

interface AuthUser {
  username: string;
  role: string;
  timestamp: number;
}

interface UseAuthReturn {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, role: string) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🆕 VERIFICAR AUTENTICACIÓN AL INICIAR
  useEffect(() => {
    checkAuth();
    setIsLoading(false);
  }, []);

  // 🆕 VERIFICAR SI HAY UNA SESIÓN VÁLIDA
  const checkAuth = (): boolean => {
    try {
      const authData = sessionStorage.getItem('kuechen-auth');
      if (!authData) {
        setUser(null);
        return false;
      }

      const parsedUser: AuthUser = JSON.parse(authData);
      
      // 🆕 VERIFICAR SI LA SESIÓN NO HA EXPIRADO (24 horas)
      const sessionExpiry = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
      const isExpired = Date.now() - parsedUser.timestamp > sessionExpiry;
      
      if (isExpired) {
        sessionStorage.removeItem('kuechen-auth');
        setUser(null);
        return false;
      }

      setUser(parsedUser);
      return true;
    } catch (error) {
      console.error('Error checking auth:', error);
      sessionStorage.removeItem('kuechen-auth');
      setUser(null);
      return false;
    }
  };

  // 🆕 FUNCIÓN DE LOGIN
  const login = (username: string, role: string) => {
    const authUser: AuthUser = {
      username,
      role,
      timestamp: Date.now()
    };
    
    sessionStorage.setItem('kuechen-auth', JSON.stringify(authUser));
    setUser(authUser);
  };

  // 🆕 FUNCIÓN DE LOGOUT
  const logout = () => {
    sessionStorage.removeItem('kuechen-auth');
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    checkAuth
  };
};
