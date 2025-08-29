import { useState, useEffect, useMemo } from 'react';
import { 
  ElaboratedProduct, 
  ElaboratedProductIngredient, 
  ProductionBatch, 
  ConsumptionRecord,
  Ingredient,
  Chef 
} from '../types/kitchen';
import { 
  initialElaboratedProducts, 
  initialProductionBatches, 
  initialConsumptionRecords 
} from '../data/elaboratedProductsData';

export const useElaboratedProducts = () => {
  const [elaboratedProducts, setElaboratedProducts] = useState<ElaboratedProduct[]>(() => {
    const saved = localStorage.getItem('kitchen-elaborated-products');
    return saved ? JSON.parse(saved) : initialElaboratedProducts;
  });

  const [productionBatches, setProductionBatches] = useState<ProductionBatch[]>(() => {
    const saved = localStorage.getItem('kitchen-production-batches');
    return saved ? JSON.parse(saved) : initialProductionBatches;
  });

  const [consumptionRecords, setConsumptionRecords] = useState<ConsumptionRecord[]>(() => {
    const saved = localStorage.getItem('kitchen-consumption-records');
    return saved ? JSON.parse(saved) : initialConsumptionRecords;
  });

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('kitchen-elaborated-products', JSON.stringify(elaboratedProducts));
  }, [elaboratedProducts]);

  useEffect(() => {
    localStorage.setItem('kitchen-production-batches', JSON.stringify(productionBatches));
  }, [productionBatches]);

  useEffect(() => {
    localStorage.setItem('kitchen-consumption-records', JSON.stringify(consumptionRecords));
  }, [consumptionRecords]);

  // 🆕 FUNCIONES DE GESTIÓN DE PRODUCTOS ELABORADOS

  const addElaboratedProduct = (product: Omit<ElaboratedProduct, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: ElaboratedProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    };
    setElaboratedProducts(prev => [...prev, newProduct]);
  };

  const updateElaboratedProduct = (productId: string, updates: Partial<ElaboratedProduct>) => {
    setElaboratedProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, ...updates, updatedAt: new Date() }
        : product
    ));
  };

  const deleteElaboratedProduct = (productId: string) => {
    setElaboratedProducts(prev => prev.filter(product => product.id !== productId));
  };

  // 🆕 FUNCIONES DE PRODUCCIÓN

  const createProductionBatch = (
    productId: string, 
    quantity: number, 
    responsibleChefId: string,
    ingredientsUsed: ProductionBatch['ingredientsUsed'],
    notes: string = ''
  ) => {
    const product = elaboratedProducts.find(p => p.id === productId);
    if (!product) return null;

    const batch: ProductionBatch = {
      id: Date.now().toString(),
      productId,
      batchNumber: `B${Date.now()}`,
      quantity,
      unit: product.yieldUnit,
      ingredientsUsed,
      productionDate: new Date(),
      expiryDate: new Date(Date.now() + product.shelfLife * 24 * 60 * 60 * 1000),
      responsibleChefId,
      qualityCheck: true,
      notes,
      totalCost: ingredientsUsed.reduce((sum, ing) => sum + ing.cost, 0),
      wastePercentage: 0,
      efficiency: 100
    };

    setProductionBatches(prev => [...prev, batch]);

    // Actualizar stock del producto elaborado
    updateElaboratedProduct(productId, {
      currentStock: product.currentStock + quantity
    });

    return batch;
  };

  // 🆕 FUNCIONES DE CONSUMO

  const recordConsumption = (
    productId: string,
    batchId: string,
    quantity: number,
    customerType: ConsumptionRecord['customerType'],
    customerId?: string,
    notes: string = ''
  ) => {
    const product = elaboratedProducts.find(p => p.id === productId);
    const batch = productionBatches.find(b => b.id === batchId);
    
    if (!product || !batch) return null;

    const revenue = quantity * product.price;
    const cost = (quantity / batch.quantity) * batch.totalCost;
    const profit = revenue - cost;

    const consumption: ConsumptionRecord = {
      id: Date.now().toString(),
      productId,
      batchId,
      quantity,
      unit: product.yieldUnit,
      consumptionDate: new Date(),
      customerType,
      customerId,
      notes,
      revenue,
      profit,
      wasteReason: customerType === 'waste' ? notes : undefined
    };

    setConsumptionRecords(prev => [...prev, consumption]);

    // Actualizar stock del producto elaborado
    updateElaboratedProduct(productId, {
      currentStock: Math.max(0, product.currentStock - quantity)
    });

    return consumption;
  };

  // 🆕 FUNCIONES DE ANÁLISIS Y MÉTRICAS

  const getProductAnalytics = (productId: string) => {
    const product = elaboratedProducts.find(p => p.id === productId);
    if (!product) return null;

    const batches = productionBatches.filter(b => b.productId === productId);
    const consumptions = consumptionRecords.filter(c => c.productId === productId);

    const totalProduced = batches.reduce((sum, b) => sum + b.quantity, 0);
    const totalConsumed = consumptions.reduce((sum, c) => sum + c.quantity, 0);
    const totalWasted = consumptions
      .filter(c => c.customerType === 'waste')
      .reduce((sum, c) => sum + c.quantity, 0);

    const wastePercentage = totalProduced > 0 ? (totalWasted / totalProduced) * 100 : 0;
    const efficiency = totalProduced > 0 ? ((totalProduced - totalWasted) / totalProduced) * 100 : 100;

    const totalRevenue = consumptions
      .filter(c => c.customerType === 'external')
      .reduce((sum, c) => sum + c.revenue, 0);

    const totalProfit = consumptions
      .filter(c => c.customerType === 'external')
      .reduce((sum, c) => sum + c.profit, 0);

    return {
      totalProduced,
      totalConsumed,
      totalWasted,
      wastePercentage,
      efficiency,
      totalRevenue,
      totalProfit,
      averageQuality: product.qualityScore,
      customerRating: product.customerRating
    };
  };

  const getChefPerformance = (chefId: string) => {
    const chefProducts = elaboratedProducts.filter(p => p.responsibleChefId === chefId);
    const chefBatches = productionBatches.filter(b => b.responsibleChefId === chefId);
    const chefConsumptions = consumptionRecords.filter(c => {
      const batch = productionBatches.find(b => b.id === c.batchId);
      return batch?.responsibleChefId === chefId;
    });

    const totalProducts = chefProducts.length;
    const averageQuality = chefProducts.length > 0 
      ? chefProducts.reduce((sum, p) => sum + p.qualityScore, 0) / chefProducts.length 
      : 0;

    const totalRevenue = chefConsumptions
      .filter(c => c.customerType === 'external')
      .reduce((sum, c) => sum + c.revenue, 0);

    const totalProduced = chefBatches.reduce((sum, b) => sum + b.quantity, 0);
    const totalWasted = chefConsumptions
      .filter(c => c.customerType === 'waste')
      .reduce((sum, c) => sum + c.quantity, 0);

    const wastePercentage = totalProduced > 0 ? (totalWasted / totalProduced) * 100 : 0;
    const efficiency = totalProduced > 0 ? ((totalProduced - totalWasted) / totalProduced) * 100 : 100;

    return {
      chefId,
      totalProducts,
      averageQuality,
      totalRevenue,
      wastePercentage,
      efficiency,
      lastUpdate: new Date()
    };
  };

  const getStorageEfficiency = () => {
    // Agrupar productos por ubicación de almacenamiento
    const locationGroups = elaboratedProducts.reduce((groups, product) => {
      const locationId = product.storageLocationId;
      if (!groups[locationId]) {
        groups[locationId] = [];
      }
      groups[locationId].push(product);
      return groups;
    }, {} as Record<string, ElaboratedProduct[]>);

    return Object.entries(locationGroups).map(([locationId, products]) => {
      const totalValue = products.reduce((sum, p) => sum + (p.currentStock * p.costPrice), 0);
      const totalStock = products.reduce((sum, p) => sum + p.currentStock, 0);
      const averageCostPerUnit = totalStock > 0 ? totalValue / totalStock : 0;

      // Calcular tasa de rotación (consumo / stock promedio)
      const locationConsumptions = consumptionRecords.filter(c => {
        const batch = productionBatches.find(b => b.id === c.batchId);
        const product = products.find(p => p.id === c.productId);
        return batch && product;
      });

      const totalConsumed = locationConsumptions.reduce((sum, c) => sum + c.quantity, 0);
      const turnoverRate = totalStock > 0 ? totalConsumed / totalStock : 0;

      return {
        locationId,
        locationName: products[0]?.storageLocationId || 'Unknown',
        utilization: (totalStock / 100) * 100, // Asumiendo capacidad de 100 como base
        costPerUnit: averageCostPerUnit,
        turnoverRate
      };
    });
  };

  // 🆕 FUNCIONES DE ALERTAS ESPECÍFICAS

  const getExpiringProducts = () => {
    const now = new Date();
    const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    return elaboratedProducts.filter(product => {
      if (product.currentStock === 0) return false;
      
      // Buscar el lote más antiguo no consumido
      const activeBatches = productionBatches
        .filter(b => b.productId === product.id)
        .filter(b => {
          const consumed = consumptionRecords
            .filter(c => c.batchId === b.id)
            .reduce((sum, c) => sum + c.quantity, 0);
          return consumed < b.quantity;
        })
        .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());

      if (activeBatches.length === 0) return false;

      const oldestBatch = activeBatches[0];
      return new Date(oldestBatch.expiryDate) <= oneWeekFromNow;
    });
  };

  const getLowEfficiencyProducts = () => {
    return elaboratedProducts.filter(product => {
      const analytics = getProductAnalytics(product.id);
      if (!analytics) return false;
      
      return analytics.efficiency < 70; // Productos con eficiencia menor al 70%
    });
  };

  const getHighWasteProducts = () => {
    return elaboratedProducts.filter(product => {
      const analytics = getProductAnalytics(product.id);
      if (!analytics) return false;
      
      return analytics.wastePercentage > 25; // Productos con desperdicio mayor al 25%
    });
  };

  return {
    // Estado
    elaboratedProducts,
    productionBatches,
    consumptionRecords,

    // Funciones de gestión
    addElaboratedProduct,
    updateElaboratedProduct,
    deleteElaboratedProduct,

    // Funciones de producción
    createProductionBatch,

    // Funciones de consumo
    recordConsumption,

    // Funciones de análisis
    getProductAnalytics,
    getChefPerformance,
    getStorageEfficiency,

    // Funciones de alertas
    getExpiringProducts,
    getLowEfficiencyProducts,
    getHighWasteProducts
  };
};
