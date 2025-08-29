import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ChefHat, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string, role: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // 🆕 USUARIOS PREDEFINIDOS (en producción esto debería estar en variables de entorno)
  const validUsers = [
    { username: 'admin', password: 'kuechen2024', role: 'admin' },
    { username: 'chef', password: 'chef123', role: 'chef' },
    { username: 'manager', password: 'manager456', role: 'manager' },
    { username: 'demo', password: 'demo789', role: 'demo' }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Bitte Benutzername und Passwort eingeben');
      return;
    }

    const user = validUsers.find(u => 
      u.username.toLowerCase() === username.toLowerCase() && 
      u.password === password
    );

    if (user) {
      // 🆕 GUARDAR EN SESSIONSTORAGE (se borra al cerrar el navegador)
      sessionStorage.setItem('kuechen-auth', JSON.stringify({
        username: user.username,
        role: user.role,
        timestamp: Date.now()
      }));
      
      onLogin(user.username, user.role);
    } else {
      setError('Ungültige Anmeldedaten');
      setPassword('');
    }
  };

  const handleDemoLogin = () => {
    const demoUser = validUsers.find(u => u.username === 'demo');
    if (demoUser) {
      sessionStorage.setItem('kuechen-auth', JSON.stringify({
        username: demoUser.username,
        role: demoUser.role,
        timestamp: Date.now()
      }));
      onLogin(demoUser.username, demoUser.role);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 🆕 HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-professional mb-4">
            {/* 🆕 TU LOGO EN EL LOGIN */}
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center p-2">
              <img 
                src="/logo-horizontal.svg" 
                alt="Nico3D Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Küchen-Meister
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Sichere Anmeldung erforderlich
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Powered by <span className="font-semibold text-primary">Nico3D</span>
          </p>
        </div>

        {/* 🆕 FORMULARIO DE LOGIN */}
        <Card className="card-elevation-3 border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-white rounded-t-xl border-b text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl text-foreground">
              Anmeldung
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Melden Sie sich an, um auf das System zuzugreifen
            </p>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* 🆕 CAMPO DE USUARIO */}
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-foreground">
                  Benutzername
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Ihr Benutzername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-professional"
                  autoComplete="username"
                  required
                />
              </div>

              {/* 🆕 CAMPO DE CONTRASEÑA */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Passwort
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Ihr Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-professional pr-10"
                    autoComplete="current-password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* 🆕 MENSAJE DE ERROR */}
              {error && (
                <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg">
                  <p className="text-sm text-danger text-center">{error}</p>
                </div>
              )}

              {/* 🆕 BOTÓN DE LOGIN */}
              <Button 
                type="submit" 
                className="btn-primary w-full"
                disabled={!username || !password}
              >
                <Lock className="h-4 w-4 mr-2" />
                Anmelden
              </Button>
            </form>

            {/* 🆕 SEPARADOR */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Oder
                </span>
              </div>
            </div>

            {/* 🆕 BOTÓN DEMO */}
            <Button 
              onClick={handleDemoLogin}
              variant="outline" 
              className="btn-neutral w-full border-primary/30 text-primary hover:bg-primary/5"
            >
              <ChefHat className="h-4 w-4 mr-2" />
              Demo-Modus (ohne Anmeldung)
            </Button>

            {/* 🆕 INFORMACIÓN DE USUARIOS */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="text-sm font-medium text-foreground mb-2">
                🧪 Test-Benutzer:
              </h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div><strong>Admin:</strong> admin / kuechen2024</div>
                <div><strong>Chef:</strong> chef / chef123</div>
                <div><strong>Manager:</strong> manager / manager456</div>
                <div><strong>Demo:</strong> demo / demo789</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 🆕 FOOTER */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            Küchen-Meister Plan v1.0 • Sichere Bestandsverwaltung
          </p>
          
          {/* 🆕 TU STICKER EN EL FOOTER */}
          <div className="mt-4 flex justify-center">
            <div className="w-16 h-16 bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-primary/20">
              <img 
                src="/nico3d.png" 
                alt="Nico3D Security" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <p className="text-xs text-primary font-medium mt-2">
            Nico3D Protected MVP
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
