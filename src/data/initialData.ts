import { Chef, Ingredient, Dish, StorageLocation } from '../types/kitchen';

export const initialStorageLocations: StorageLocation[] = [
  {
    id: '1',
    name: 'Kühlschrank Hauptküche',
    type: 'refrigerator',
    description: 'Refrigerador principal de la cocina',
    capacity: 100,
    currentUsage: 75,
    temperature: 4,
    icon: '❄️',
    color: 'hsl(var(--chef-1))'
  },
  {
    id: '2',
    name: 'Gefrierschrank Tiefkühl',
    type: 'freezer',
    description: 'Congelador para productos congelados',
    capacity: 80,
    currentUsage: 60,
    temperature: -18,
    icon: '🧊',
    color: 'hsl(var(--chef-2))'
  },
  {
    id: '3',
    name: 'Vorratskammer Trocken',
    type: 'dry-storage',
    description: 'Almacén seco para granos y conservas',
    capacity: 200,
    currentUsage: 120,
    humidity: 45,
    icon: '📦',
    color: 'hsl(var(--chef-3))'
  },
  {
    id: '4',
    name: 'Gewürzregal',
    type: 'spice-rack',
    description: 'Estante de especias y condimentos',
    capacity: 50,
    currentUsage: 35,
    icon: '🌶️',
    color: 'hsl(var(--chef-4))'
  },
  {
    id: '5',
    name: 'Weinkeller',
    type: 'wine-cellar',
    description: 'Bodega de vinos y bebidas',
    capacity: 150,
    currentUsage: 90,
    temperature: 12,
    humidity: 70,
    icon: '🍷',
    color: 'hsl(var(--chef-5))'
  },
  {
    id: '6',
    name: 'Kühlschrank Bar',
    type: 'refrigerator',
    description: 'Refrigerador de la barra',
    capacity: 60,
    currentUsage: 40,
    temperature: 4,
    icon: '🍸',
    color: 'hsl(var(--chef-6))'
  }
];

export const initialChefs: Chef[] = [
  { id: '1', name: 'Nico', specialty: 'Fleisch & Hauptgerichte', color: 'hsl(var(--chef-1))', avatar: 'N' },
  { id: '2', name: 'Marco', specialty: 'Meeresfrüchte', color: 'hsl(var(--chef-2))', avatar: 'M' },
  { id: '3', name: 'Sofia', specialty: 'Konditorei & Nachspeisen', color: 'hsl(var(--chef-3))', avatar: 'S' },
  { id: '4', name: 'David', specialty: 'Gemüse & Salate', color: 'hsl(var(--chef-4))', avatar: 'D' },
  { id: '5', name: 'Emma', specialty: 'Vorspeisen', color: 'hsl(var(--chef-5))', avatar: 'E' },
  { id: '6', name: 'Lucas', specialty: 'Saucen & Extras', color: 'hsl(var(--chef-6))', avatar: 'L' },
  { id: '7', name: 'Anna', specialty: 'Getränke', color: 'hsl(var(--chef-7))', avatar: 'A' },
];

export const initialIngredients: Ingredient[] = [
  // Fleisch & Hauptgerichte (Nico) - Refrigerador
  { 
    id: '1', 
    name: 'Weiderind 150g Patties', 
    unit: 'kg', 
    currentStock: 2, 
    minStock: 5, 
    maxStock: 15, 
    estimatedPrice: 25, 
    responsibleChefId: '1',
    storageLocationId: '1',
    category: 'meat',
    priority: 'high',
    supplier: 'Metro AG',
    lastRestocked: new Date('2024-01-15'),
    notes: 'Patties de ternera de pasto, preferir orgánico',
    storageConditions: {
      temperature: 2,
      lightSensitive: false,
      airtight: true
    },
    autoReorder: true,
    reorderPoint: 6,
    leadTime: 2,
    batchSize: 10
  },
  { 
    id: '2', 
    name: 'Rohfleisch vom Rind', 
    unit: 'kg', 
    currentStock: 0, 
    minStock: 2, 
    maxStock: 5, 
    estimatedPrice: 30, 
    responsibleChefId: '1',
    storageLocationId: '1',
    category: 'meat',
    priority: 'critical',
    supplier: 'Metro AG',
    lastRestocked: new Date('2024-01-10'),
    notes: 'Carne cruda para tartar, solo de proveedores certificados',
    storageConditions: {
      temperature: 1,
      lightSensitive: false,
      airtight: true
    },
    autoReorder: true,
    reorderPoint: 3,
    leadTime: 1,
    batchSize: 5
  },
  
  // Meeresfrüchte (Marco) - Refrigerador
  { 
    id: '3', 
    name: 'Wachteleier', 
    unit: 'Stück', 
    currentStock: 8, 
    minStock: 20, 
    maxStock: 40, 
    estimatedPrice: 0.8, 
    responsibleChefId: '2',
    storageLocationId: '1',
    category: 'dairy',
    priority: 'medium',
    supplier: 'Frischemarkt',
    lastRestocked: new Date('2024-01-18'),
    notes: 'Huevos de codorniz frescos, verificar fecha de puesta',
    storageConditions: {
      temperature: 4,
      lightSensitive: true,
      airtight: false
    },
    autoReorder: true,
    reorderPoint: 25,
    leadTime: 1,
    batchSize: 30
  },
  
  // Konditorei & Nachspeisen (Sofia) - Almacén seco + Refrigerador
  { 
    id: '4', 
    name: 'Kartoffel-Brötchen', 
    unit: 'Stück', 
    currentStock: 25, 
    minStock: 50, 
    maxStock: 100, 
    estimatedPrice: 0.5, 
    responsibleChefId: '3',
    storageLocationId: '3',
    category: 'grains',
    priority: 'medium',
    supplier: 'Bäckerei Schmidt',
    lastRestocked: new Date('2024-01-19'),
    notes: 'Panecillos de patata, mejor frescos del día',
    storageConditions: {
      temperature: 18,
      humidity: 50,
      lightSensitive: true,
      airtight: true
    },
    autoReorder: true,
    reorderPoint: 60,
    leadTime: 1,
    batchSize: 50
  },
  { 
    id: '5', 
    name: 'Sahne', 
    unit: 'L', 
    currentStock: 1, 
    minStock: 3, 
    maxStock: 8, 
    estimatedPrice: 2.5, 
    responsibleChefId: '3',
    storageLocationId: '1',
    category: 'dairy',
    priority: 'high',
    supplier: 'Milchhof Müller',
    lastRestocked: new Date('2024-01-18'),
    notes: 'Nata fresca 35% grasa, verificar caducidad',
    storageConditions: {
      temperature: 4,
      lightSensitive: false,
      airtight: true
    },
    autoReorder: true,
    reorderPoint: 4,
    leadTime: 1,
    batchSize: 5
  },
  { 
    id: '6', 
    name: 'Eier', 
    unit: 'Stück', 
    currentStock: 15, 
    minStock: 30, 
    maxStock: 60, 
    estimatedPrice: 0.3, 
    responsibleChefId: '3',
    storageLocationId: '1',
    category: 'dairy',
    priority: 'medium',
    supplier: 'Bauernhof Bauer',
    lastRestocked: new Date('2024-01-19'),
    notes: 'Huevos orgánicos de gallinas camperas',
    storageConditions: {
      temperature: 4,
      lightSensitive: true,
      airtight: false
    },
    autoReorder: true,
    reorderPoint: 35,
    leadTime: 1,
    batchSize: 30
  },
  { 
    id: '7', 
    name: 'Dunkle Schokolade', 
    unit: 'kg', 
    currentStock: 0, 
    minStock: 1, 
    maxStock: 3, 
    estimatedPrice: 12, 
    responsibleChefId: '3',
    storageLocationId: '3',
    category: 'spices',
    priority: 'critical',
    supplier: 'Schokoladenhaus',
    lastRestocked: new Date('2024-01-12'),
    notes: 'Chocolate negro 70% cacao, sin azúcares añadidos',
    storageConditions: {
      temperature: 18,
      humidity: 45,
      lightSensitive: true,
      airtight: true
    },
    autoReorder: true,
    reorderPoint: 1.5,
    leadTime: 3,
    batchSize: 2
  },
  
  // Gemüse & Salate (David) - Refrigerador + Almacén seco
  { 
    id: '8', 
    name: 'Babyleaf-Salat', 
    unit: 'kg', 
    currentStock: 0.5, 
    minStock: 2, 
    maxStock: 5, 
    estimatedPrice: 8, 
    responsibleChefId: '4',
    storageLocationId: '1',
    category: 'vegetables',
    priority: 'high',
    supplier: 'Gemüsebau Hofmann',
    lastRestocked: new Date('2024-01-20'),
    notes: 'Lechuga baby orgánica, lavar antes de usar',
    storageConditions: {
      temperature: 4,
      humidity: 85,
      lightSensitive: true,
      airtight: true
    },
    autoReorder: true,
    reorderPoint: 2.5,
    leadTime: 1,
    batchSize: 3
  },
  { 
    id: '9', 
    name: 'Zwiebeln', 
    unit: 'kg', 
    currentStock: 1, 
    minStock: 3, 
    maxStock: 8, 
    estimatedPrice: 2, 
    responsibleChefId: '4',
    storageLocationId: '3',
    category: 'vegetables',
    priority: 'low',
    supplier: 'Gemüsebau Hofmann',
    lastRestocked: new Date('2024-01-15'),
    notes: 'Cebollas amarillas, almacenar en lugar fresco y seco',
    storageConditions: {
      temperature: 15,
      humidity: 60,
      lightSensitive: false,
      airtight: false
    },
    autoReorder: true,
    reorderPoint: 4,
    leadTime: 2,
    batchSize: 5
  },
  
  // Vorspeisen (Emma) - Refrigerador + Almacén seco
  { 
    id: '10', 
    name: 'Trüffel', 
    unit: 'g', 
    currentStock: 20, 
    minStock: 50, 
    maxStock: 150, 
    estimatedPrice: 8, 
    responsibleChefId: '5',
    storageLocationId: '3',
    category: 'spices',
    priority: 'high',
    supplier: 'Delikatessen Weber',
    lastRestocked: new Date('2024-01-10'),
    notes: 'Trufas negras de temporada, almacenar en arroz',
    storageConditions: {
      temperature: 15,
      humidity: 50,
      lightSensitive: true,
      airtight: true
    },
    autoReorder: false,
    reorderPoint: 60,
    leadTime: 7,
    batchSize: 100
  },
  { 
    id: '11', 
    name: 'Kaviar', 
    unit: 'g', 
    currentStock: 15, 
    minStock: 30, 
    maxStock: 100, 
    estimatedPrice: 15, 
    responsibleChefId: '5',
    storageLocationId: '1',
    category: 'fish',
    priority: 'high',
    supplier: 'Delikatessen Weber',
    lastRestocked: new Date('2024-01-18'),
    notes: 'Caviar de esturión, mantener refrigerado',
    storageConditions: {
      temperature: 2,
      lightSensitive: true,
      airtight: true
    },
    autoReorder: true,
    reorderPoint: 35,
    leadTime: 3,
    batchSize: 50
  },
  { 
    id: '12', 
    name: 'Crème Fraîche', 
    unit: 'Becher', 
    currentStock: 3, 
    minStock: 5, 
    maxStock: 10, 
    estimatedPrice: 3, 
    responsibleChefId: '5',
    storageLocationId: '1',
    category: 'dairy',
    priority: 'medium',
    supplier: 'Milchhof Müller',
    lastRestocked: new Date('2024-01-19'),
    notes: 'Crema agria fresca, verificar caducidad',
    storageConditions: {
      temperature: 4,
      lightSensitive: false,
      airtight: true
    },
    autoReorder: true,
    reorderPoint: 6,
    leadTime: 1,
    batchSize: 5
  },
  
  // Saucen & Extras (Lucas) - Almacén seco
  { 
    id: '13', 
    name: 'Kapern', 
    unit: 'Gläser', 
    currentStock: 1, 
    minStock: 2, 
    maxStock: 4, 
    estimatedPrice: 4, 
    responsibleChefId: '6',
    storageLocationId: '3',
    category: 'spices',
    priority: 'low',
    supplier: 'Gewürzhaus',
    lastRestocked: new Date('2024-01-12'),
    notes: 'Alcaparras en salmuera, preferir tamaño pequeño',
    storageConditions: {
      temperature: 18,
      humidity: 50,
      lightSensitive: false,
      airtight: true
    },
    autoReorder: true,
    reorderPoint: 2.5,
    leadTime: 2,
    batchSize: 3
  }
];

export const initialDishes: Dish[] = [
  {
    id: '1',
    name: '100% Beef Burger',
    price: 19.90,
    category: 'Hauptgerichte',
    ingredients: [
      { ingredientId: '1', quantity: 0.15 }, // 150g Patties
      { ingredientId: '4', quantity: 1 }, // 1 Brötchen
      { ingredientId: '8', quantity: 0.02 }, // 20g Salat
      { ingredientId: '9', quantity: 0.03 }, // 30g Zwiebeln
    ]
  },
  {
    id: '2',
    name: 'Smoked Beeftatar',
    price: 26.90,
    category: 'Hauptgerichte',
    ingredients: [
      { ingredientId: '2', quantity: 0.15 }, // 150g Rohfleisch
      { ingredientId: '3', quantity: 1 }, // 1 Wachtelei
      { ingredientId: '13', quantity: 0.1 }, // Kapern
    ]
  },
  {
    id: '3',
    name: 'Trüffelcroquetas & Kaviar',
    price: 13.90,
    category: 'Vorspeisen',
    ingredients: [
      { ingredientId: '10', quantity: 5 }, // 5g Trüffel
      { ingredientId: '11', quantity: 10 }, // 10g Kaviar
      { ingredientId: '12', quantity: 0.5 }, // 0.5 Becher Crème Fraîche
    ]
  },
  {
    id: '4',
    name: 'Crème Brûlée Malheur',
    price: 12.90,
    category: 'Nachspeisen',
    ingredients: [
      { ingredientId: '5', quantity: 0.2 }, // 200ml Sahne
      { ingredientId: '6', quantity: 2 }, // 2 Eier
      { ingredientId: '7', quantity: 0.05 }, // 50g Schokolade
    ]
  },
];