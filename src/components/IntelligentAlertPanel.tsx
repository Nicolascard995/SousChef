import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Package, 
  Clock, 
  Users, 
  Warehouse, 
  TrendingUp,
  X,
  CheckCircle,
  Info,
  AlertCircle,
  Filter,
  Search
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAdvancedAlerts, Alert } from '@/hooks/useAdvancedAlerts';
import { useElaboratedProducts } from '@/hooks/useElaboratedProducts';

interface AlertCardProps {
  alert: Alert;
  onDismiss: (alertId: string) => void;
  onAction: (alert: Alert) => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert, onDismiss, onAction }) => {
  const getSeverityIcon = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  const getTypeIcon = (type: Alert['type']) => {
    switch (type) {
      case 'stock':
        return <Package className="h-4 w-4" />;
      case 'expiry':
        return <Clock className="h-4 w-4" />;
      case 'no_update':
        return <Users className="h-4 w-4" />;
      case 'storage':
        return <Warehouse className="h-4 w-4" />;
      case 'mermas':
        return <TrendingUp className="h-4 w-4" />;
      case 'lifecycle':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getActionButton = (action: string) => {
    switch (action) {
      case 'reorder_immediate':
        return <Button size="sm" variant="destructive">Reordenar Ahora</Button>;
      case 'reorder_soon':
        return <Button size="sm" variant="outline">Reordenar Pronto</Button>;
      case 'verify_stock':
        return <Button size="sm" variant="outline">Verificar Stock</Button>;
      case 'check_stock':
        return <Button size="sm" variant="outline">Revisar Stock</Button>;
      case 'discard_immediate':
        return <Button size="sm" variant="destructive">Descartar Ahora</Button>;
      case 'use_immediately':
        return <Button size="sm" variant="destructive">Usar Inmediatamente</Button>;
      case 'plan_usage':
        return <Button size="sm" variant="outline">Planificar Uso</Button>;
      case 'reorganize_immediate':
        return <Button size="sm" variant="destructive">Reorganizar Ahora</Button>;
      case 'plan_reorganization':
        return <Button size="sm" variant="outline">Planificar Reorganización</Button>;
      default:
        return <Button size="sm" variant="outline">Ver Detalles</Button>;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className={`hover:shadow-md transition-all duration-300 ${getSeverityColor(alert.severity)}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getSeverityIcon(alert.severity)}
            <div>
              <CardTitle className="text-base font-semibold">{alert.message}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                {getTypeIcon(alert.type)}
                <span className="capitalize">{alert.type.replace('_', ' ')}</span>
                <span>•</span>
                <span>{formatDate(alert.createdAt)}</span>
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}
              className="text-xs"
            >
              {alert.priority}
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDismiss(alert.id)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {alert.metadata && Object.keys(alert.metadata).length > 0 && (
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(alert.metadata).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </span>
                <span className="font-medium">
                  {typeof value === 'number' ? value.toFixed(2) : String(value)}
                </span>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            {getActionButton(alert.action)}
          </div>
          <div className="text-xs text-muted-foreground">
            ID: {alert.id.slice(-8)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const IntelligentAlertPanel: React.FC = () => {
  const { 
    alerts, 
    criticalAlerts, 
    warningAlerts, 
    infoAlerts, 
    dismissAlert,
    getAlertStats 
  } = useAdvancedAlerts();
  
  const { 
    getExpiringProducts, 
    getLowEfficiencyProducts, 
    getHighWasteProducts 
  } = useElaboratedProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'stock' | 'expiry' | 'no_update' | 'storage' | 'mermas' | 'lifecycle'>('all');

  const alertStats = getAlertStats();
  const expiringProducts = getExpiringProducts();
  const lowEfficiencyProducts = getLowEfficiencyProducts();
  const highWasteProducts = getHighWasteProducts();

  // 🆕 ALERTAS ESPECÍFICAS DE PRODUCTOS ELABORADOS
  const elaboratedProductAlerts: Alert[] = [
    ...expiringProducts.map(product => ({
      id: `elaborated-expiry-${product.id}`,
      type: 'expiry' as const,
      severity: 'critical' as const,
      message: `${product.name} caduca pronto`,
      resourceId: product.id,
      resourceType: 'elaborated_product',
      action: 'use_immediately',
      priority: 'high' as const,
      createdAt: new Date(),
      dismissed: false,
      metadata: {
        productName: product.name,
        shelfLife: product.shelfLife,
        currentStock: product.currentStock
      }
    })),
    ...lowEfficiencyProducts.map(product => ({
      id: `elaborated-efficiency-${product.id}`,
      type: 'lifecycle' as const,
      severity: 'warning' as const,
      message: `${product.name} tiene baja eficiencia`,
      resourceId: product.id,
      resourceType: 'elaborated_product',
      action: 'check_stock',
      priority: 'medium' as const,
      createdAt: new Date(),
      dismissed: false,
      metadata: {
        productName: product.name,
        efficiency: 'Baja'
      }
    })),
    ...highWasteProducts.map(product => ({
      id: `elaborated-waste-${product.id}`,
      type: 'mermas' as const,
      severity: 'warning' as const,
      message: `${product.name} tiene alto desperdicio`,
      resourceId: product.id,
      resourceType: 'elaborated_product',
      action: 'plan_usage',
      priority: 'medium' as const,
      createdAt: new Date(),
      dismissed: false,
      metadata: {
        productName: product.name,
        wastePercentage: 'Alto'
      }
    }))
  ];

  // Combinar todas las alertas
  const allAlerts = [...alerts, ...elaboratedProductAlerts];

  // Filtrar alertas
  const filteredAlerts = allAlerts.filter(alert => {
    const matchesSearch = alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    
    return matchesSearch && matchesSeverity && matchesType;
  });

  const handleDismiss = (alertId: string) => {
    dismissAlert(alertId);
  };

  const handleAction = (alert: Alert) => {
    console.log('Action taken on alert:', alert);
    // Implementar lógica específica para cada acción
  };

  const getTotalAlerts = () => {
    return {
      total: allAlerts.length,
      critical: allAlerts.filter(a => a.severity === 'critical').length,
      warning: allAlerts.filter(a => a.severity === 'warning').length,
      info: allAlerts.filter(a => a.severity === 'info').length
    };
  };

  const totalAlerts = getTotalAlerts();

  return (
    <div className="space-y-6 p-6">
      {/* 🎯 HEADER DEL PANEL */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">
          🚨 Panel de Alertas Inteligentes
        </h1>
        <p className="text-slate-600 text-lg">
          Sistema centralizado de alertas para gestión proactiva de la cocina
        </p>
      </div>

      {/* 📊 RESUMEN DE ALERTAS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <CardTitle className="text-red-800">Críticas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-800">{totalAlerts.critical}</div>
            <p className="text-sm text-red-600">Requieren atención inmediata</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <CardTitle className="text-yellow-800">Advertencias</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-800">{totalAlerts.warning}</div>
            <p className="text-sm text-yellow-600">Requieren atención pronto</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-blue-800">Informativas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">{totalAlerts.info}</div>
            <p className="text-sm text-blue-600">Para información</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <CardTitle className="text-green-800">Total</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{totalAlerts.total}</div>
            <p className="text-sm text-green-600">Alertas activas</p>
          </CardContent>
        </Card>
      </div>

      {/* 🔍 FILTROS Y BÚSQUEDA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros y Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar en alertas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Severidad</label>
              <Select value={severityFilter} onValueChange={(value: any) => setSeverityFilter(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las severidades</SelectItem>
                  <SelectItem value="critical">Críticas</SelectItem>
                  <SelectItem value="warning">Advertencias</SelectItem>
                  <SelectItem value="info">Informativas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo</label>
              <Select value={typeFilter} onValueChange={(value: any) => setTypeFilter(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="stock">Stock</SelectItem>
                  <SelectItem value="expiry">Caducidad</SelectItem>
                  <SelectItem value="no_update">Sin Actualización</SelectItem>
                  <SelectItem value="storage">Almacenamiento</SelectItem>
                  <SelectItem value="mermas">Mermas</SelectItem>
                  <SelectItem value="lifecycle">Ciclo de Vida</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 🚨 LISTA DE ALERTAS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">
            Alertas Filtradas ({filteredAlerts.length})
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSeverityFilter('all');
                setTypeFilter('all');
              }}
            >
              Limpiar Filtros
            </Button>
          </div>
        </div>

        {filteredAlerts.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                ¡Excelente! No hay alertas activas
              </h3>
              <p className="text-slate-600">
                Tu cocina está funcionando perfectamente. Mantén este nivel de excelencia.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onDismiss={handleDismiss}
                onAction={handleAction}
              />
            ))}
          </div>
        )}
      </div>

      {/* 📋 ACCIONES MASIVAS */}
      {filteredAlerts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              Acciones Masivas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                Marcar todas como leídas
              </Button>
              <Button variant="outline" size="sm">
                Exportar alertas críticas
              </Button>
              <Button variant="outline" size="sm">
                Generar reporte de alertas
              </Button>
              <Button variant="outline" size="sm">
                Configurar notificaciones
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
