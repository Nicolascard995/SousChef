import { useMemo } from 'react';
import { useKitchenData } from './useKitchenData';

export interface Alert {
  id: string;
  type: 'stock' | 'expiry' | 'budget' | 'storage' | 'no_update' | 'mermas' | 'lifecycle';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  resourceId: string;
  resourceType: string;
  action: string;
  priority: 'low' | 'medium' | 'high' | 'immediate';
  createdAt: Date;
  dismissed: boolean;
  metadata?: Record<string, any>;
}

export interface AlertConfig {
  stock: {
    criticalThreshold: number;
    lowStockThreshold: number;
    warningThreshold: number;
    autoReorder: boolean;
    reorderPoint: number;
    batchSize: number;
  };
  expiry: {
    warningDays: number;
    criticalDays: number;
    action: 'discard' | 'move' | 'notify';
  };
  noUpdate: {
    weeklyThreshold: number; // días sin actualización
    criticalThreshold: number; // días críticos sin actualización
  };
  mermas: {
    warningThreshold: number; // % de mermas
    criticalThreshold: number; // % crítico de mermas
  };
  lifecycle: {
    minEfficiency: number; // % mínimo de eficiencia de vida útil
    warningEfficiency: number; // % de advertencia
  };
}

export const useAdvancedAlerts = () => {
  const { ingredients, dishes, chefs, storageLocations, stats } = useKitchenData();
  
  // Configuración por defecto de alertas
  const defaultConfig: AlertConfig = {
    stock: {
      criticalThreshold: 0,
      lowStockThreshold: 2,
      warningThreshold: 5,
      autoReorder: true,
      reorderPoint: 3,
      batchSize: 10
    },
    expiry: {
      warningDays: 7,
      criticalDays: 3,
      action: 'notify'
    },
    noUpdate: {
      weeklyThreshold: 7, // 1 semana
      criticalThreshold: 14 // 2 semanas
    },
    mermas: {
      warningThreshold: 15, // 15% de mermas
      criticalThreshold: 25 // 25% de mermas
    },
    lifecycle: {
      minEfficiency: 70, // 70% de eficiencia mínima
      warningEfficiency: 85 // 85% para advertencia
    }
  };

  const alerts = useMemo(() => {
    const allAlerts: Alert[] = [];
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    // 1. ALERTAS DE STOCK
    ingredients.forEach(ingredient => {
      if (ingredient.currentStock <= defaultConfig.stock.criticalThreshold) {
        allAlerts.push({
          id: `stock-${ingredient.id}`,
          type: 'stock',
          severity: 'critical',
          message: `${ingredient.name} está completamente agotado`,
          resourceId: ingredient.id,
          resourceType: 'ingredient',
          action: 'reorder_immediate',
          priority: 'immediate',
          createdAt: now,
          dismissed: false,
          metadata: {
            currentStock: ingredient.currentStock,
            minStock: ingredient.minStock,
            estimatedPrice: ingredient.estimatedPrice,
            responsibleChef: chefs.find(c => c.id === ingredient.responsibleChefId)?.name
          }
        });
      } else if (ingredient.currentStock <= defaultConfig.stock.lowStockThreshold) {
        allAlerts.push({
          id: `stock-${ingredient.id}`,
          type: 'stock',
          severity: 'warning',
          message: `${ingredient.name} stock críticamente bajo (${ingredient.currentStock} ${ingredient.unit})`,
          resourceId: ingredient.id,
          resourceType: 'ingredient',
          action: 'reorder_soon',
          priority: 'high',
          createdAt: now,
          dismissed: false,
          metadata: {
            currentStock: ingredient.currentStock,
            minStock: ingredient.minStock,
            estimatedPrice: ingredient.estimatedPrice
          }
        });
      }
    });

    // 2. ALERTAS DE NO ACTUALIZACIÓN SEMANAL
    ingredients.forEach(ingredient => {
      const lastUpdate = new Date(ingredient.lastRestocked);
      
      if (lastUpdate < twoWeeksAgo) {
        allAlerts.push({
          id: `no-update-${ingredient.id}`,
          type: 'no_update',
          severity: 'critical',
          message: `${ingredient.name} no se ha actualizado en ${Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24))} días`,
          resourceId: ingredient.id,
          resourceType: 'ingredient',
          action: 'verify_stock',
          priority: 'high',
          createdAt: now,
          dismissed: false,
          metadata: {
            daysSinceUpdate: Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24)),
            lastRestocked: ingredient.lastRestocked,
            responsibleChef: chefs.find(c => c.id === ingredient.responsibleChefId)?.name
          }
        });
      } else if (lastUpdate < oneWeekAgo) {
        allAlerts.push({
          id: `no-update-${ingredient.id}`,
          type: 'no_update',
          severity: 'warning',
          message: `${ingredient.name} requiere verificación semanal`,
          resourceId: ingredient.id,
          resourceType: 'ingredient',
          action: 'check_stock',
          priority: 'medium',
          createdAt: now,
          dismissed: false,
          metadata: {
            daysSinceUpdate: Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24)),
            lastRestocked: ingredient.lastRestocked
          }
        });
      }
    });

    // 3. ALERTAS DE CADUCIDAD
    ingredients.forEach(ingredient => {
      if (ingredient.expiryDate) {
        const expiryDate = new Date(ingredient.expiryDate);
        const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysUntilExpiry <= 0) {
          allAlerts.push({
            id: `expiry-${ingredient.id}`,
            type: 'expiry',
            severity: 'critical',
            message: `${ingredient.name} ha caducado`,
            resourceId: ingredient.id,
            resourceType: 'ingredient',
            action: 'discard_immediate',
            priority: 'immediate',
            createdAt: now,
            dismissed: false,
            metadata: {
              expiryDate: ingredient.expiryDate,
              daysOverdue: Math.abs(daysUntilExpiry)
            }
          });
        } else if (daysUntilExpiry <= defaultConfig.expiry.criticalDays) {
          allAlerts.push({
            id: `expiry-${ingredient.id}`,
            type: 'expiry',
            severity: 'critical',
            message: `${ingredient.name} caduca en ${daysUntilExpiry} días`,
            resourceId: ingredient.id,
            resourceType: 'ingredient',
            action: 'use_immediately',
            priority: 'high',
            createdAt: now,
            dismissed: false,
            metadata: {
              expiryDate: ingredient.expiryDate,
              daysUntilExpiry
            }
          });
        } else if (daysUntilExpiry <= defaultConfig.expiry.warningDays) {
          allAlerts.push({
            id: `expiry-${ingredient.id}`,
            type: 'expiry',
            severity: 'warning',
            message: `${ingredient.name} caduca en ${daysUntilExpiry} días`,
            resourceId: ingredient.id,
            resourceType: 'ingredient',
            action: 'plan_usage',
            priority: 'medium',
            createdAt: now,
            dismissed: false,
            metadata: {
              expiryDate: ingredient.expiryDate,
              daysUntilExpiry
            }
          });
        }
      }
    });

    // 4. ALERTAS DE ALMACENAMIENTO
    storageLocations.forEach(location => {
      const utilization = (location.currentUsage / location.capacity) * 100;
      
      if (utilization >= 95) {
        allAlerts.push({
          id: `storage-${location.id}`,
          type: 'storage',
          severity: 'critical',
          message: `${location.name} está al ${utilization.toFixed(1)}% de capacidad`,
          resourceId: location.id,
          resourceType: 'storage',
          action: 'reorganize_immediate',
          priority: 'high',
          createdAt: now,
          dismissed: false,
          metadata: {
            currentUsage: location.currentUsage,
            capacity: location.capacity,
            utilization: utilization
          }
        });
      } else if (utilization >= 85) {
        allAlerts.push({
          id: `storage-${location.id}`,
          type: 'storage',
          severity: 'warning',
          message: `${location.name} está al ${utilization.toFixed(1)}% de capacidad`,
          resourceId: location.id,
          resourceType: 'storage',
          action: 'plan_reorganization',
          priority: 'medium',
          createdAt: now,
          dismissed: false,
          metadata: {
            currentUsage: location.currentUsage,
            capacity: location.capacity,
            utilization: utilization
          }
        });
      }
    });

    return allAlerts;
  }, [ingredients, dishes, chefs, storageLocations, stats]);

  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical' && !alert.dismissed);
  const warningAlerts = alerts.filter(alert => alert.severity === 'warning' && !alert.dismissed);
  const infoAlerts = alerts.filter(alert => alert.severity === 'info' && !alert.dismissed);

  const dismissAlert = (alertId: string) => {
    // Implementar lógica para descartar alertas
    console.log('Dismissing alert:', alertId);
  };

  const getAlertStats = () => ({
    total: alerts.length,
    critical: criticalAlerts.length,
    warning: warningAlerts.length,
    info: infoAlerts.length,
    dismissed: alerts.filter(a => a.dismissed).length
  });

  return {
    alerts,
    criticalAlerts,
    warningAlerts,
    infoAlerts,
    dismissAlert,
    getAlertStats,
    config: defaultConfig
  };
};
