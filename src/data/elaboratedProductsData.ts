import { ElaboratedProduct, ElaboratedProductIngredient } from '../types/kitchen';

export const initialElaboratedProducts: ElaboratedProduct[] = [
  {
    id: '1',
    name: 'Salsa de Tomate Casera',
    description: 'Salsa de tomate tradicional elaborada con ingredientes frescos',
    category: 'Saucen',
    price: 8.50,
    costPrice: 3.20,
    margin: 62.4,
    
    // Ingredientes y receta
    ingredients: [
      {
        ingredientId: 'tomato-1',
        quantity: 2,
        unit: 'kg',
        costPerUnit: 1.20,
        totalCost: 2.40,
        wasteFactor: 0.1
      },
      {
        ingredientId: 'onion-1',
        quantity: 0.5,
        unit: 'kg',
        costPerUnit: 0.80,
        totalCost: 0.40,
        wasteFactor: 0.05
      },
      {
        ingredientId: 'garlic-1',
        quantity: 0.1,
        unit: 'kg',
        costPerUnit: 4.00,
        totalCost: 0.40,
        wasteFactor: 0.02
      }
    ],
    preparationTime: 30,
    cookingTime: 45,
    yield: 2,
    yieldUnit: 'litros',
    
    // Vida útil
    shelfLife: 7,
    storageConditions: {
      temperature: 4,
      humidity: 60,
      lightSensitive: true,
      airtight: true
    },
    
    // Gestión de stock
    currentStock: 5,
    minStock: 3,
    maxStock: 10,
    autoProduction: true,
    productionBatchSize: 5,
    
    // Métricas de calidad
    qualityScore: 9.2,
    customerRating: 4.8,
    wastePercentage: 8.5,
    
    // Metadata
    responsibleChefId: '1',
    storageLocationId: '1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    isActive: true
  },
  
  {
    id: '2',
    name: 'Pan de Centeno Artesanal',
    description: 'Pan de centeno tradicional con corteza crujiente',
    category: 'Hauptgerichte',
    price: 4.50,
    costPrice: 1.80,
    margin: 60.0,
    
    ingredients: [
      {
        ingredientId: 'rye-flour-1',
        quantity: 1.5,
        unit: 'kg',
        costPerUnit: 1.20,
        totalCost: 1.80,
        wasteFactor: 0.05
      },
      {
        ingredientId: 'yeast-1',
        quantity: 0.05,
        unit: 'kg',
        costPerUnit: 8.00,
        totalCost: 0.40,
        wasteFactor: 0.01
      }
    ],
    preparationTime: 60,
    cookingTime: 45,
    yield: 8,
    yieldUnit: 'piezas',
    
    shelfLife: 3,
    storageConditions: {
      temperature: 20,
      humidity: 50,
      lightSensitive: false,
      airtight: false
    },
    
    currentStock: 12,
    minStock: 5,
    maxStock: 20,
    autoProduction: true,
    productionBatchSize: 8,
    
    qualityScore: 8.8,
    customerRating: 4.6,
    wastePercentage: 12.0,
    
    responsibleChefId: '2',
    storageLocationId: '2',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    isActive: true
  },
  
  {
    id: '3',
    name: 'Mermelada de Fresa',
    description: 'Mermelada casera de fresa con azúcar natural',
    category: 'Nachspeisen',
    price: 6.80,
    costPrice: 2.50,
    margin: 63.2,
    
    ingredients: [
      {
        ingredientId: 'strawberry-1',
        quantity: 1.0,
        unit: 'kg',
        costPerUnit: 2.00,
        totalCost: 2.00,
        wasteFactor: 0.15
      },
      {
        ingredientId: 'sugar-1',
        quantity: 0.8,
        unit: 'kg',
        costPerUnit: 0.60,
        totalCost: 0.48,
        wasteFactor: 0.02
      }
    ],
    preparationTime: 45,
    cookingTime: 30,
    yield: 1.5,
    yieldUnit: 'kg',
    
    shelfLife: 30,
    storageConditions: {
      temperature: 4,
      humidity: 40,
      lightSensitive: true,
      airtight: true
    },
    
    currentStock: 8,
    minStock: 4,
    maxStock: 15,
    autoProduction: false,
    productionBatchSize: 3,
    
    qualityScore: 9.5,
    customerRating: 4.9,
    wastePercentage: 5.0,
    
    responsibleChefId: '3',
    storageLocationId: '1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    isActive: true
  },
  
  {
    id: '4',
    name: 'Vinagreta de Hierbas',
    description: 'Vinagreta casera con hierbas frescas y aceite de oliva',
    category: 'Saucen',
    price: 5.20,
    costPrice: 2.10,
    margin: 59.6,
    
    ingredients: [
      {
        ingredientId: 'olive-oil-1',
        quantity: 0.5,
        unit: 'litros',
        costPerUnit: 3.00,
        totalCost: 1.50,
        wasteFactor: 0.02
      },
      {
        ingredientId: 'vinegar-1',
        quantity: 0.2,
        unit: 'litros',
        costPerUnit: 2.50,
        totalCost: 0.50,
        wasteFactor: 0.01
      },
      {
        ingredientId: 'herbs-1',
        quantity: 0.1,
        unit: 'kg',
        costPerUnit: 1.00,
        totalCost: 0.10,
        wasteFactor: 0.05
      }
    ],
    preparationTime: 15,
    cookingTime: 0,
    yield: 0.8,
    yieldUnit: 'litros',
    
    shelfLife: 14,
    storageConditions: {
      temperature: 4,
      humidity: 30,
      lightSensitive: true,
      airtight: true
    },
    
    currentStock: 6,
    minStock: 2,
    maxStock: 8,
    autoProduction: true,
    productionBatchSize: 4,
    
    qualityScore: 8.9,
    customerRating: 4.7,
    wastePercentage: 15.0,
    
    responsibleChefId: '1',
    storageLocationId: '1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    isActive: true
  },
  
  {
    id: '5',
    name: 'Mezcla de Especias BBQ',
    description: 'Mezcla personalizada de especias para barbacoa',
    category: 'Gewürzmischungen',
    price: 12.00,
    costPrice: 4.80,
    margin: 60.0,
    
    ingredients: [
      {
        ingredientId: 'paprika-1',
        quantity: 0.3,
        unit: 'kg',
        costPerUnit: 8.00,
        totalCost: 2.40,
        wasteFactor: 0.01
      },
      {
        ingredientId: 'garlic-powder-1',
        quantity: 0.2,
        unit: 'kg',
        costPerUnit: 6.00,
        totalCost: 1.20,
        wasteFactor: 0.01
      },
      {
        ingredientId: 'onion-powder-1',
        quantity: 0.2,
        unit: 'kg',
        costPerUnit: 4.00,
        totalCost: 0.80,
        wasteFactor: 0.01
      },
      {
        ingredientId: 'black-pepper-1',
        quantity: 0.1,
        unit: 'kg',
        costPerUnit: 4.00,
        totalCost: 0.40,
        wasteFactor: 0.01
      }
    ],
    preparationTime: 20,
    cookingTime: 0,
    yield: 0.8,
    yieldUnit: 'kg',
    
    shelfLife: 180,
    storageConditions: {
      temperature: 20,
      humidity: 30,
      lightSensitive: true,
      airtight: true
    },
    
    currentStock: 15,
    minStock: 8,
    maxStock: 25,
    autoProduction: true,
    productionBatchSize: 10,
    
    qualityScore: 9.1,
    customerRating: 4.8,
    wastePercentage: 3.0,
    
    responsibleChefId: '2',
    storageLocationId: '2',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    isActive: true
  }
];

export const initialProductionBatches = [
  {
    id: 'batch-1',
    productId: '1',
    batchNumber: 'B001-2024',
    quantity: 5,
    unit: 'litros',
    ingredientsUsed: [
      {
        ingredientId: 'tomato-1',
        quantityUsed: 10,
        quantityWasted: 1,
        cost: 12.00
      },
      {
        ingredientId: 'onion-1',
        quantityUsed: 2.5,
        quantityWasted: 0.1,
        cost: 2.00
      },
      {
        ingredientId: 'garlic-1',
        quantityUsed: 0.5,
        quantityWasted: 0.01,
        cost: 2.00
      }
    ],
    productionDate: new Date('2024-01-15'),
    expiryDate: new Date('2024-01-22'),
    responsibleChefId: '1',
    qualityCheck: true,
    notes: 'Lote de producción exitoso, calidad excelente',
    totalCost: 16.00,
    wastePercentage: 8.5,
    efficiency: 91.5
  }
];

export const initialConsumptionRecords = [
  {
    id: 'consumption-1',
    productId: '1',
    batchId: 'batch-1',
    quantity: 2,
    unit: 'litros',
    consumptionDate: new Date('2024-01-16'),
    customerType: 'external',
    customerId: 'customer-001',
    notes: 'Venta en restaurante',
    revenue: 17.00,
    profit: 10.60
  }
];
