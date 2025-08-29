# 📱 Guía Mobile-First - Küchen-Inventar

## 🎯 Introducción

Esta guía proporciona pasos prácticos para transformar Küchen-Inventar en una aplicación mobile-first, optimizada para dispositivos móviles y tablets.

## 🚀 Implementación Inmediata (Semana 1-2)

### **1. Configuración de Breakpoints**

```css
/* src/index.css - Breakpoints mobile-first */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Variables CSS para breakpoints */
:root {
  --mobile: 640px;
  --tablet: 768px;
  --desktop: 1024px;
  --large: 1280px;
}

/* Estilos base para móvil */
.container {
  @apply px-4 py-2;
  max-width: 100%;
}

/* Tablet y superior */
@media (min-width: 768px) {
  .container {
    @apply px-6 py-4;
    max-width: 90%;
  }
}

/* Desktop y superior */
@media (min-width: 1024px) {
  .container {
    @apply px-8 py-6;
    max-width: 80%;
  }
}
```

### **2. Hook para Detección de Dispositivo**

```typescript
// src/hooks/useDeviceType.ts
import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>('mobile');
  const [isMobile, setIsMobile] = useState(true);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        setDeviceType('mobile');
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      } else if (width < 1024) {
        setDeviceType('tablet');
        setIsMobile(false);
        setIsTablet(true);
        setIsDesktop(false);
      } else {
        setDeviceType('desktop');
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return {
    deviceType,
    isMobile,
    isTablet,
    isDesktop
  };
};
```

### **3. Refactorización del Navigation**

```typescript
// src/components/MobileNavigation.tsx
import { useState } from 'react';
import { useDeviceType } from '../hooks/useDeviceType';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, X } from 'lucide-react';

interface MobileNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  criticalItems: number;
  shoppingItems: number;
}

export const MobileNavigation = ({
  activeTab,
  setActiveTab,
  criticalItems,
  shoppingItems
}: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useDeviceType();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'inventory', label: 'Inventario', icon: '📦' },
    { id: 'shopping', label: 'Compras', icon: '🛒', badge: shoppingItems },
    { id: 'chefs', label: 'Chefs', icon: '👨‍🍳' }
  ];

  if (!isMobile) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-80">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menú</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="flex-1 p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </div>
                {tab.badge && (
                  <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};
```

## 🎨 Componentes Responsivos

### **1. Dashboard Mobile-Optimized**

```typescript
// src/components/MobileDashboard.tsx
import { useDeviceType } from '../hooks/useDeviceType';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface MobileDashboardProps {
  stats: KitchenStats;
  chefs: Chef[];
}

export const MobileDashboard = ({ stats, chefs }: MobileDashboardProps) => {
  const { isMobile } = useDeviceType();

  if (!isMobile) return null;

  return (
    <div className="space-y-4 p-4">
      {/* Métricas en cards apiladas */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Items Críticos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {stats.criticalItems}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Lista Compras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {stats.shoppingItems}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chefs en scroll horizontal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Chefs Activos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {chefs.map((chef) => (
              <div
                key={chef.id}
                className="flex-shrink-0 text-center"
                style={{ minWidth: '80px' }}
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: chef.color }}
                >
                  {chef.avatar}
                </div>
                <p className="text-sm font-medium">{chef.name}</p>
                <p className="text-xs text-muted-foreground">{chef.specialty}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
```

### **2. Inventario Mobile-First**

```typescript
// src/components/MobileInventory.tsx
import { useState } from 'react';
import { useDeviceType } from '../hooks/useDeviceType';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Filter, Plus } from 'lucide-react';

interface MobileInventoryProps {
  ingredients: Ingredient[];
  onAddIngredient: (ingredient: Omit<Ingredient, 'id'>) => void;
}

export const MobileInventory = ({ ingredients, onAddIngredient }: MobileInventoryProps) => {
  const { isMobile } = useDeviceType();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  if (!isMobile) return null;

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 p-4">
      {/* Header con búsqueda y filtros */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar ingredientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
        </Button>
        <Button size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Filtros expandibles */}
      {showFilters && (
        <div className="bg-muted p-3 rounded-lg space-y-2">
          <div className="flex gap-2 overflow-x-auto">
            {['Todos', 'Carne', 'Pescado', 'Verduras', 'Lácteos'].map((category) => (
              <Button key={category} variant="secondary" size="sm">
                {category}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Lista de ingredientes en cards */}
      <div className="space-y-3">
        {filteredIngredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="bg-card border rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold">{ingredient.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {ingredient.currentStock} {ingredient.unit} en stock
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">
                  €{ingredient.estimatedPrice}
                </div>
                <div className="text-xs text-muted-foreground">
                  por {ingredient.unit}
                </div>
              </div>
            </div>
            
            {/* Barra de progreso de stock */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Stock mínimo: {ingredient.minStock}</span>
                <span>Stock máximo: {ingredient.maxStock}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min(
                      (ingredient.currentStock / ingredient.maxStock) * 100,
                      100
                    )}%`
                  }}
                />
              </div>
            </div>

            {/* Acciones rápidas */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Editar
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Mover
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## 🎯 Gestos Touch y Interacciones

### **1. Hook para Gestos**

```typescript
// src/hooks/useTouchGestures.ts
import { useCallback, useRef } from 'react';

interface TouchGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onLongPress?: () => void;
  threshold?: number;
  longPressDelay?: number;
}

export const useTouchGestures = (options: TouchGestureOptions) => {
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onLongPress,
    threshold = 50,
    longPressDelay = 500
  } = options;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    // Iniciar timer para long press
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        onLongPress();
      }, longPressDelay);
    }
  }, [onLongPress, longPressDelay]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) return;

    // Limpiar timer de long press
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    const deltaTime = Date.now() - touchStart.current.time;

    // Solo procesar si el gesto fue rápido (< 300ms)
    if (deltaTime < 300) {
      if (Math.abs(deltaX) > threshold && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      } else if (Math.abs(deltaY) > threshold && Math.abs(deltaY) > Math.abs(deltaX)) {
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    }

    touchStart.current = null;
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold]);

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd
  };
};
```

### **2. Componente con Swipe Actions**

```typescript
// src/components/SwipeableIngredientCard.tsx
import { useState } from 'react';
import { useTouchGestures } from '../hooks/useTouchGestures';
import { Button } from './ui/button';
import { Edit, Trash2, Move } from 'lucide-react';

interface SwipeableIngredientCardProps {
  ingredient: Ingredient;
  onEdit: () => void;
  onDelete: () => void;
  onMove: () => void;
}

export const SwipeableIngredientCard = ({
  ingredient,
  onEdit,
  onDelete,
  onMove
}: SwipeableIngredientCardProps) => {
  const [showActions, setShowActions] = useState(false);

  const { onTouchStart, onTouchEnd } = useTouchGestures({
    onSwipeLeft: () => setShowActions(true),
    onSwipeRight: () => setShowActions(false),
    threshold: 80
  });

  return (
    <div
      className="relative overflow-hidden bg-card border rounded-lg"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Contenido principal */}
      <div className={`p-4 transition-transform ${showActions ? '-translate-x-20' : ''}`}>
        <h3 className="font-semibold">{ingredient.name}</h3>
        <p className="text-sm text-muted-foreground">
          {ingredient.currentStock} {ingredient.unit} en stock
        </p>
      </div>

      {/* Acciones de swipe */}
      <div className={`absolute right-0 top-0 h-full flex transition-transform ${
        showActions ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <Button
          variant="secondary"
          size="sm"
          onClick={onEdit}
          className="rounded-none h-full px-3"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onMove}
          className="rounded-none h-full px-3"
        >
          <Move className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          className="rounded-none h-full px-3"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
```

## 📱 PWA y Offline

### **1. Configuración PWA**

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Küchen-Inventar',
        short_name: 'Küchen',
        description: 'Sistema de gestión de inventario para cocinas profesionales',
        theme_color: '#1e293b',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24 horas
              }
            }
          }
        ]
      }
    })
  ]
});
```

### **2. Hook para Estado Offline**

```typescript
// src/hooks/useOfflineState.ts
import { useState, useEffect } from 'react';

export const useOfflineState = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineQueue, setOfflineQueue] = useState<Array<() => void>>([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Procesar cola offline
      offlineQueue.forEach(action => action());
      setOfflineQueue([]);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [offlineQueue]);

  const addToOfflineQueue = (action: () => void) => {
    setOfflineQueue(prev => [...prev, action]);
  };

  return {
    isOnline,
    offlineQueue,
    addToOfflineQueue
  };
};
```

## 🎨 Optimizaciones de Performance

### **1. Lazy Loading de Componentes**

```typescript
// src/App.tsx
import { lazy, Suspense } from 'react';
import { useDeviceType } from './hooks/useDeviceType';

// Lazy load components
const DesktopDashboard = lazy(() => import('./components/DesktopDashboard'));
const MobileDashboard = lazy(() => import('./components/MobileDashboard'));

const App = () => {
  const { isMobile } = useDeviceType();

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      {isMobile ? <MobileDashboard /> : <DesktopDashboard />}
    </Suspense>
  );
};
```

### **2. Virtual Scrolling para Listas Largas**

```typescript
// src/components/VirtualIngredientList.tsx
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

interface VirtualIngredientListProps {
  ingredients: Ingredient[];
  itemHeight?: number;
}

export const VirtualIngredientList = ({ 
  ingredients, 
  itemHeight = 80 
}: VirtualIngredientListProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: ingredients.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
  });

  return (
    <div
      ref={parentRef}
      className="h-96 overflow-auto"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const ingredient = ingredients[virtualItem.index];
          return (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${itemHeight}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
              className="p-4 border-b"
            >
              <h3 className="font-semibold">{ingredient.name}</h3>
              <p className="text-sm text-muted-foreground">
                {ingredient.currentStock} {ingredient.unit}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
```

## 🧪 Testing Mobile

### **1. Configuración de Tests**

```typescript
// src/tests/setup.ts
import '@testing-library/jest-dom';

// Mock de matchMedia para tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock de touch events
Object.defineProperty(window, 'ontouchstart', {
  writable: true,
  value: null,
});
```

### **2. Test de Componente Mobile**

```typescript
// src/components/__tests__/MobileNavigation.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileNavigation } from '../MobileNavigation';

// Mock del hook
jest.mock('../../hooks/useDeviceType', () => ({
  useDeviceType: () => ({ isMobile: true })
}));

describe('MobileNavigation', () => {
  it('should render mobile navigation when on mobile device', () => {
    render(
      <MobileNavigation
        activeTab="dashboard"
        setActiveTab={jest.fn()}
        criticalItems={0}
        shoppingItems={5}
      />
    );

    expect(screen.getByRole('button', { name: /menú/i })).toBeInTheDocument();
  });

  it('should open drawer when menu button is clicked', () => {
    render(
      <MobileNavigation
        activeTab="dashboard"
        setActiveTab={jest.fn()}
        criticalItems={0}
        shoppingItems={5}
      />
    );

    const menuButton = screen.getByRole('button', { name: /menú/i });
    fireEvent.click(menuButton);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Inventario')).toBeInTheDocument();
  });
});
```

## 📊 Métricas de Performance

### **1. Core Web Vitals**

```typescript
// src/utils/performance.ts
export const measurePerformance = () => {
  // LCP (Largest Contentful Paint)
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      console.log('LCP:', entry.startTime);
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // FID (First Input Delay)
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      console.log('FID:', entry.processingStart - entry.startTime);
    }
  }).observe({ entryTypes: ['first-input'] });

  // CLS (Cumulative Layout Shift)
  new PerformanceObserver((entryList) => {
    let cls = 0;
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        cls += (entry as any).value;
      }
    }
    console.log('CLS:', cls);
  }).observe({ entryTypes: ['layout-shift'] });
};
```

## 🎯 Próximos Pasos

### **Semana 1**
1. Implementar `useDeviceType` hook
2. Refactorizar Navigation component
3. Crear MobileDashboard

### **Semana 2**
1. Implementar MobileInventory
2. Añadir gestos touch básicos
3. Configurar PWA básico

### **Semana 3**
1. Optimizar performance
2. Implementar virtual scrolling
3. Testing en dispositivos reales

### **Semana 4**
1. Refinamiento de UX móvil
2. Documentación de componentes
3. Plan de testing automatizado

---

*Esta guía se actualizará continuamente según el progreso y feedback de los usuarios.*
