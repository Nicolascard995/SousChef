import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign, 
  AlertTriangle,
  ChefHat,
  Warehouse,
  Clock,
  Target,
  PieChart,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useKitchenData } from '@/hooks/useKitchenData';
import { useElaboratedProducts } from '@/hooks/useElaboratedProducts';
import { useAdvancedAlerts } from '@/hooks/useAdvancedAlerts';

interface KPICardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  color?: 'green' | 'red' | 'blue' | 'yellow';
  percentage?: number;
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  color = 'blue',
  percentage 
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'green': return 'text-green-600 bg-green-100';
      case 'red': return 'text-red-600 bg-red-100';
      case 'yellow': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default: return null;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-full ${getColorClasses()}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{value}</div>
          {getTrendIcon()}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {percentage !== undefined && (
          <div className="mt-3">
            <Progress value={percentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {percentage.toFixed(1)}% del objetivo
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface ChefPerformanceCardProps {
  chef: {
    chefId: string;
    chefName: string;
    totalProducts: number;
    averageQuality: number;
    totalRevenue: number;
    wastePercentage: number;
    efficiency: number;
    lastUpdate: Date;
  };
}

const ChefPerformanceCard: React.FC<ChefPerformanceCardProps> = ({ chef }) => {
  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 8) return 'text-green-600';
    if (quality >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{chef.chefName}</CardTitle>
          <ChefHat className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Productos</p>
            <p className="text-lg font-semibold">{chef.totalProducts}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Ingresos</p>
            <p className="text-lg font-semibold text-green-600">
              €{chef.totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Calidad</span>
            <span className={`text-sm font-medium ${getQualityColor(chef.averageQuality)}`}>
              {chef.averageQuality.toFixed(1)}/10
            </span>
          </div>
          <Progress value={chef.averageQuality * 10} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Eficiencia</span>
            <span className={`text-sm font-medium ${getEfficiencyColor(chef.efficiency)}`}>
              {chef.efficiency.toFixed(1)}%
            </span>
          </div>
          <Progress value={chef.efficiency} className="h-2" />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Desperdicio</span>
          <Badge variant={chef.wastePercentage > 20 ? 'destructive' : 'secondary'}>
            {chef.wastePercentage.toFixed(1)}%
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

interface StorageEfficiencyCardProps {
  storage: {
    locationId: string;
    locationName: string;
    utilization: number;
    costPerUnit: number;
    turnoverRate: number;
  };
}

const StorageEfficiencyCard: React.FC<StorageEfficiencyCardProps> = ({ storage }) => {
  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-600';
    if (utilization >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{storage.locationName}</CardTitle>
          <Warehouse className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Utilización</span>
            <span className={`text-sm font-medium ${getUtilizationColor(storage.utilization)}`}>
              {storage.utilization.toFixed(1)}%
            </span>
          </div>
          <Progress value={storage.utilization} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Costo/Unidad</p>
            <p className="text-lg font-semibold">€{storage.costPerUnit.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Rotación</p>
            <p className="text-lg font-semibold">{storage.turnoverRate.toFixed(2)}x</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const BusinessIntelligenceDashboard: React.FC = () => {
  const { stats, chefs, ingredients, storageLocations } = useKitchenData();
  const { 
    elaboratedProducts, 
    getChefPerformance, 
    getStorageEfficiency,
    getExpiringProducts,
    getLowEfficiencyProducts,
    getHighWasteProducts
  } = useElaboratedProducts();
  const { getAlertStats } = useAdvancedAlerts();

  // 🆕 CÁLCULO DE KPIs AVANZADOS
  const chefPerformanceData = chefs.map(chef => getChefPerformance(chef.id));
  const storageEfficiencyData = getStorageEfficiency();
  const expiringProducts = getExpiringProducts();
  const lowEfficiencyProducts = getLowEfficiencyProducts();
  const highWasteProducts = getHighWasteProducts();

  // KPIs de Negocio
  const totalRevenue = chefPerformanceData.reduce((sum, chef) => sum + chef.totalRevenue, 0);
  const averageQuality = chefPerformanceData.length > 0 
    ? chefPerformanceData.reduce((sum, chef) => sum + chef.averageQuality, 0) / chefPerformanceData.length 
    : 0;
  const averageEfficiency = chefPerformanceData.length > 0
    ? chefPerformanceData.reduce((sum, chef) => sum + chef.efficiency, 0) / chefPerformanceData.length
    : 0;
  const totalWaste = chefPerformanceData.reduce((sum, chef) => sum + chef.wastePercentage, 0) / chefPerformanceData.length;

  // KPIs de Inventario
  const totalInventoryValue = ingredients.reduce((sum, ing) => sum + (ing.currentStock * ing.estimatedPrice), 0);
  const totalElaboratedValue = elaboratedProducts.reduce((sum, prod) => sum + (prod.currentStock * prod.costPrice), 0);
  const storageUtilization = storageLocations.reduce((sum, loc) => sum + (loc.currentUsage / loc.capacity), 0) / storageLocations.length * 100;

  return (
    <div className="space-y-6 p-6">
      {/* 🎯 HEADER DEL DASHBOARD */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">
          📊 Dashboard de Business Intelligence
        </h1>
        <p className="text-slate-600 text-lg">
          Análisis completo del rendimiento de la cocina y métricas de negocio
        </p>
      </div>

      {/* 🚨 ALERTAS CRÍTICAS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <CardTitle className="text-red-800">Productos por Caducar</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-800">{expiringProducts.length}</div>
            <p className="text-sm text-red-600">Requieren atención inmediata</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-yellow-600" />
              <CardTitle className="text-yellow-800">Baja Eficiencia</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-800">{lowEfficiencyProducts.length}</div>
            <p className="text-sm text-yellow-600">Productos con eficiencia < 70%</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-orange-800">Alto Desperdicio</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{highWasteProducts.length}</div>
            <p className="text-sm text-orange-600">Desperdicio > 25%</p>
          </CardContent>
        </Card>
      </div>

      {/* 📈 KPIs PRINCIPALES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Ingresos Totales"
          value={`€${totalRevenue.toFixed(2)}`}
          description="Ingresos generados por productos elaborados"
          icon={<DollarSign className="h-4 w-4" />}
          trend="up"
          color="green"
        />

        <KPICard
          title="Calidad Promedio"
          value={`${averageQuality.toFixed(1)}/10`}
          description="Calidad promedio de todos los productos"
          icon={<Target className="h-4 w-4" />}
          trend="up"
          color="blue"
          percentage={averageQuality * 10}
        />

        <KPICard
          title="Eficiencia Promedio"
          value={`${averageEfficiency.toFixed(1)}%`}
          description="Eficiencia promedio de producción"
          icon={<TrendingUp className="h-4 w-4" />}
          trend="up"
          color="green"
          percentage={averageEfficiency}
        />

        <KPICard
          title="Desperdicio Promedio"
          value={`${totalWaste.toFixed(1)}%`}
          description="Desperdicio promedio de productos"
          icon={<AlertTriangle className="h-4 w-4" />}
          trend="down"
          color="red"
          percentage={100 - totalWaste}
        />
      </div>

      {/* 🏪 KPIs DE INVENTARIO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Valor Inventario"
          value={`€${totalInventoryValue.toFixed(2)}`}
          description="Valor total del inventario de ingredientes"
          icon={<Package className="h-4 w-4" />}
          color="blue"
        />

        <KPICard
          title="Valor Productos"
          value={`€${totalElaboratedValue.toFixed(2)}`}
          description="Valor total de productos elaborados"
          icon={<ChefHat className="h-4 w-4" />}
          color="green"
        />

        <KPICard
          title="Utilización Almacén"
          value={`${storageUtilization.toFixed(1)}%`}
          description="Utilización promedio del almacén"
          icon={<Warehouse className="h-4 w-4" />}
          color="yellow"
          percentage={storageUtilization}
        />

        <KPICard
          title="Productos Activos"
          value={elaboratedProducts.filter(p => p.isActive).length}
          description="Productos elaborados activos"
          icon={<Activity className="h-4 w-4" />}
          color="blue"
        />
      </div>

      {/* 👨‍🍳 RENDIMIENTO DE CHEFS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-slate-800">Rendimiento de Chefs</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chefPerformanceData.map((chef) => (
            <ChefPerformanceCard key={chef.chefId} chef={chef} />
          ))}
        </div>
      </div>

      {/* 🏪 EFICIENCIA DE ALMACENAMIENTO */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Warehouse className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-slate-800">Eficiencia de Almacenamiento</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {storageEfficiencyData.map((storage) => (
            <StorageEfficiencyCard key={storage.locationId} storage={storage} />
          ))}
        </div>
      </div>

      {/* 📊 GRÁFICOS Y ANÁLISIS AVANZADOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribución de Productos por Categoría */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Distribución por Categoría
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Hauptgerichte', 'Vorspeisen', 'Nachspeisen', 'Getränke', 'Saucen', 'Gewürzmischungen'].map(category => {
                const count = elaboratedProducts.filter(p => p.category === category).length;
                const percentage = elaboratedProducts.length > 0 ? (count / elaboratedProducts.length) * 100 : 0;
                
                return (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{category}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={percentage} className="w-20 h-2" />
                      <span className="text-sm font-medium w-12 text-right">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tendencias de Calidad y Eficiencia */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Tendencias de Calidad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Calidad Promedio</span>
                  <span className="text-lg font-semibold text-green-600">
                    {averageQuality.toFixed(1)}/10
                  </span>
                </div>
                <Progress value={averageQuality * 10} className="h-3" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Eficiencia Promedio</span>
                  <span className="text-lg font-semibold text-blue-600">
                    {averageEfficiency.toFixed(1)}%
                  </span>
                </div>
                <Progress value={averageEfficiency} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Tasa de Desperdicio</span>
                  <span className="text-lg font-semibold text-red-600">
                    {totalWaste.toFixed(1)}%
                  </span>
                </div>
                <Progress value={100 - totalWaste} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 🚨 ALERTAS Y RECOMENDACIONES */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertTriangle className="h-5 w-5" />
            Recomendaciones de Acción
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {expiringProducts.length > 0 && (
            <div className="flex items-center gap-2 text-orange-700">
              <Clock className="h-4 w-4" />
              <span>• {expiringProducts.length} productos caducan pronto - Planificar uso inmediato</span>
            </div>
          )}
          
          {lowEfficiencyProducts.length > 0 && (
            <div className="flex items-center gap-2 text-orange-700">
              <Target className="h-4 w-4" />
              <span>• {lowEfficiencyProducts.length} productos con baja eficiencia - Revisar recetas y procesos</span>
            </div>
          )}
          
          {highWasteProducts.length > 0 && (
            <div className="flex items-center gap-2 text-orange-700">
              <Activity className="h-4 w-4" />
              <span>• {highWasteProducts.length} productos con alto desperdicio - Optimizar porciones y almacenamiento</span>
            </div>
          )}

          {chefPerformanceData.some(chef => chef.efficiency < 70) && (
            <div className="flex items-center gap-2 text-orange-700">
              <Users className="h-4 w-4" />
              <span>• Algunos chefs tienen baja eficiencia - Considerar entrenamiento adicional</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
