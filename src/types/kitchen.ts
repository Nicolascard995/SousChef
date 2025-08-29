export interface Chef {
  id: string;
  name: string;
  specialty: string;
  color: string;
  avatar: string;
}

export interface StorageLocation {
  id: string;
  name: string;
  type: 'refrigerator' | 'freezer' | 'pantry' | 'dry-storage' | 'wine-cellar' | 'spice-rack';
  description: string;
  capacity: number;
  currentUsage: number;
  temperature?: number; // Para refrigeradores y congeladores
  humidity?: number;   // Para almacenamiento seco
  icon: string;        // Icono representativo
  color: string;       // Color distintivo
}

export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  estimatedPrice: number; // Price per unit
  responsibleChefId: string;
  
  // 🆕 NUEVAS PROPIEDADES PARA GESTIÓN AVANZADA
  storageLocationId: string;     // Ubicación de almacenamiento
  category: 'meat' | 'fish' | 'vegetables' | 'dairy' | 'grains' | 'spices' | 'beverages' | 'frozen' | 'canned' | 'fresh';
  priority: 'low' | 'medium' | 'high' | 'critical';
  supplier: string;              // Proveedor principal
  barcode?: string;              // Código de barras para escaneo
  expiryDate?: Date;            // Fecha de caducidad
  lastRestocked: Date;          // Última vez que se reabasteció
  notes: string;                // Notas adicionales
  
  // 🆕 PROPIEDADES DE ALMACENAMIENTO
  storageConditions: {
    temperature?: number;        // Temperatura ideal
    humidity?: number;          // Humedad ideal
    lightSensitive: boolean;    // Sensible a la luz
    airtight: boolean;          // Requiere envase hermético
  };
  
  // 🆕 PROPIEDADES DE GESTIÓN
  autoReorder: boolean;         // Reordenar automáticamente
  reorderPoint: number;         // Punto de reorden
  leadTime: number;             // Tiempo de entrega en días
  batchSize: number;            // Tamaño de lote recomendado
}

// 🆕 NUEVO: Productos Elaborados
export interface ElaboratedProduct {
  id: string;
  name: string;
  description: string;
  category: 'Hauptgerichte' | 'Vorspeisen' | 'Nachspeisen' | 'Getränke' | 'Saucen' | 'Gewürzmischungen';
  price: number;                // Precio de venta
  costPrice: number;            // Costo de producción
  margin: number;               // Margen de ganancia (%)
  
  // 🆕 INGREDIENTES Y RECETA
  ingredients: ElaboratedProductIngredient[];
  preparationTime: number;      // Tiempo de preparación en minutos
  cookingTime: number;          // Tiempo de cocción en minutos
  yield: number;                // Cantidad que produce (porciones)
  yieldUnit: string;            // Unidad de medida (porciones, kg, litros)
  
  // 🆕 TRACKING DE VIDA ÚTIL
  shelfLife: number;            // Vida útil en días
  storageConditions: {
    temperature: number;         // Temperatura de almacenamiento
    humidity?: number;          // Humedad requerida
    lightSensitive: boolean;    // Sensible a la luz
    airtight: boolean;          // Requiere envase hermético
  };
  
  // 🆕 GESTIÓN DE STOCK
  currentStock: number;         // Stock actual
  minStock: number;             // Stock mínimo
  maxStock: number;             // Stock máximo
  autoProduction: boolean;      // Producir automáticamente
  productionBatchSize: number;  // Tamaño del lote de producción
  
  // 🆕 MÉTRICAS DE CALIDAD
  qualityScore: number;         // Puntuación de calidad (1-10)
  customerRating: number;       // Calificación del cliente (1-5)
  wastePercentage: number;      // Porcentaje de desperdicio
  
  // 🆕 METADATA
  responsibleChefId: string;    // Chef responsable
  storageLocationId: string;    // Ubicación de almacenamiento
  createdAt: Date;              // Fecha de creación
  updatedAt: Date;              // Última actualización
  isActive: boolean;            // Producto activo
}

export interface ElaboratedProductIngredient {
  ingredientId: string;
  quantity: number;
  unit: string;
  costPerUnit: number;          // Costo por unidad del ingrediente
  totalCost: number;            // Costo total para esta cantidad
  wasteFactor: number;          // Factor de desperdicio (0-1)
}

// 🆕 NUEVO: Tracking de Producción y Consumo
export interface ProductionBatch {
  id: string;
  productId: string;
  batchNumber: string;          // Número de lote
  quantity: number;             // Cantidad producida
  unit: string;                 // Unidad de medida
  
  // 🆕 INGREDIENTES UTILIZADOS
  ingredientsUsed: {
    ingredientId: string;
    quantityUsed: number;
    quantityWasted: number;     // Cantidad desperdiciada
    cost: number;               // Costo del ingrediente usado
  }[];
  
  // 🆕 METADATA DE PRODUCCIÓN
  productionDate: Date;         // Fecha de producción
  expiryDate: Date;             // Fecha de caducidad
  responsibleChefId: string;    // Chef que produjo
  qualityCheck: boolean;        // Verificación de calidad
  notes: string;                // Notas de producción
  
  // 🆕 MÉTRICAS
  totalCost: number;            // Costo total de producción
  wastePercentage: number;      // Porcentaje de desperdicio
  efficiency: number;           // Eficiencia de producción (%)
}

export interface ConsumptionRecord {
  id: string;
  productId: string;
  batchId: string;              // Lote consumido
  quantity: number;             // Cantidad consumida
  unit: string;                 // Unidad de medida
  
  // 🆕 METADATA DE CONSUMO
  consumptionDate: Date;        // Fecha de consumo
  customerType: 'internal' | 'external' | 'waste'; // Tipo de consumo
  customerId?: string;          // ID del cliente (si aplica)
  notes: string;                // Notas del consumo
  
  // 🆕 MÉTRICAS
  revenue: number;              // Ingresos generados
  profit: number;               // Ganancia generada
  wasteReason?: string;         // Razón del desperdicio (si aplica)
}

export interface Dish {
  id: string;
  name: string;
  price: number;
  category: 'Hauptgerichte' | 'Vorspeisen' | 'Nachspeisen' | 'Getränke';
  ingredients: DishIngredient[];
}

export interface DishIngredient {
  ingredientId: string;
  quantity: number;
}

export interface ShoppingItem {
  ingredientId: string;
  name: string;
  unit: string;
  quantity: number;
  estimatedCost: number;
  priority: 'DRINGEND' | 'NORMAL';
  responsibleChefId: string;
  completed: boolean;
  
  // 🆕 NUEVAS PROPIEDADES
  storageLocationId: string;
  category: string;
  supplier: string;
  notes: string;
}

export interface KitchenStats {
  criticalItems: number;
  shoppingItems: number;
  weeklyBudget: number;
  weeklySpent: number;
  activeChefs: number;
  
  // 🆕 NUEVAS ESTADÍSTICAS
  storageUtilization: number;   // Porcentaje de uso del almacén
  expiringItems: number;        // Artículos próximos a caducar
  lowStockItems: number;        // Artículos con stock bajo
  totalInventoryValue: number;  // Valor total del inventario
  
  // 🆕 NUEVAS ESTADÍSTICAS DE PRODUCTOS ELABORADOS
  totalElaboratedProducts: number;
  activeElaboratedProducts: number;
  totalProductionValue: number;
  averageQualityScore: number;
  totalWastePercentage: number;
  averageEfficiency: number;
  
  // 🆕 NUEVAS ESTADÍSTICAS DE CHEFS
  chefPerformance: {
    chefId: string;
    chefName: string;
    totalProducts: number;
    averageQuality: number;
    totalRevenue: number;
    wastePercentage: number;
    efficiency: number;
    lastUpdate: Date;
  }[];
  
  // 🆕 NUEVAS ESTADÍSTICAS DE ALMACENAMIENTO
  storageEfficiency: {
    locationId: string;
    locationName: string;
    utilization: number;
    costPerUnit: number;
    turnoverRate: number;
  }[];
}

// 🆕 NUEVA INTERFAZ PARA GESTIÓN MASIVA
export interface BulkIngredientOperation {
  type: 'add' | 'update' | 'delete' | 'move' | 'restock';
  ingredients: Partial<Ingredient>[];
  targetLocation?: string;
  notes?: string;
  timestamp: Date;
  performedBy: string;
}

// 🆕 NUEVA INTERFAZ PARA IMPORTACIÓN/EXPORTACIÓN
export interface IngredientTemplate {
  name: string;
  unit: string;
  category: string;
  minStock: number;
  maxStock: number;
  estimatedPrice: number;
  storageLocation: string;
  supplier: string;
  notes: string;
}