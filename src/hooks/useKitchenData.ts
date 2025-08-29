import { useState, useEffect, useMemo } from 'react';
import { Chef, Ingredient, Dish, ShoppingItem, KitchenStats, StorageLocation } from '../types/kitchen';
import { initialChefs, initialIngredients, initialDishes, initialStorageLocations } from '../data/initialData';

export const useKitchenData = () => {
  const [chefs, setChefs] = useState<Chef[]>(() => {
    const saved = localStorage.getItem('kitchen-chefs');
    return saved ? JSON.parse(saved) : initialChefs;
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>(() => {
    const saved = localStorage.getItem('kitchen-ingredients');
    return saved ? JSON.parse(saved) : initialIngredients;
  });

  const [dishes, setDishes] = useState<Dish[]>(() => {
    const saved = localStorage.getItem('kitchen-dishes');
    return saved ? JSON.parse(saved) : initialDishes;
  });

  const [storageLocations, setStorageLocations] = useState<StorageLocation[]>(() => {
    const saved = localStorage.getItem('kitchen-storage-locations');
    return saved ? JSON.parse(saved) : initialStorageLocations;
  });

  const [weeklyBudget, setWeeklyBudget] = useState(() => {
    const saved = localStorage.getItem('kitchen-budget');
    return saved ? parseFloat(saved) : 2500;
  });

  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem('kitchen-shopping');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('kitchen-chefs', JSON.stringify(chefs));
  }, [chefs]);

  useEffect(() => {
    localStorage.setItem('kitchen-ingredients', JSON.stringify(ingredients));
  }, [ingredients]);

  useEffect(() => {
    localStorage.setItem('kitchen-dishes', JSON.stringify(dishes));
  }, [dishes]);

  useEffect(() => {
    localStorage.setItem('kitchen-storage-locations', JSON.stringify(storageLocations));
  }, [storageLocations]);

  useEffect(() => {
    localStorage.setItem('kitchen-budget', weeklyBudget.toString());
  }, [weeklyBudget]);

  useEffect(() => {
    localStorage.setItem('kitchen-shopping', JSON.stringify(shoppingList));
  }, [shoppingList]);

  // Auto-generate shopping list when ingredients change
  useEffect(() => {
    const newShoppingList: ShoppingItem[] = [];
    
    ingredients.forEach(ingredient => {
      if (ingredient.currentStock < ingredient.minStock) {
        const quantity = ingredient.maxStock - ingredient.currentStock;
        const estimatedCost = quantity * ingredient.estimatedPrice;
        const priority = ingredient.currentStock === 0 ? 'DRINGEND' : 'NORMAL';
        
        const existingItem = shoppingList.find(item => item.ingredientId === ingredient.id);
        
        newShoppingList.push({
          ingredientId: ingredient.id,
          name: ingredient.name,
          unit: ingredient.unit,
          quantity,
          estimatedCost,
          priority: priority as 'DRINGEND' | 'NORMAL',
          responsibleChefId: ingredient.responsibleChefId,
          completed: existingItem?.completed || false,
          storageLocationId: ingredient.storageLocationId,
          category: ingredient.category,
          supplier: ingredient.supplier,
          notes: ingredient.notes
        });
      }
    });

    setShoppingList(newShoppingList);
  }, [ingredients]);

  // Calculate stats
  const stats: KitchenStats = useMemo(() => {
    const criticalItems = ingredients.filter(i => i.currentStock === 0).length;
    const shoppingItems = shoppingList.filter(item => !item.completed).length;
    const weeklySpent = shoppingList.reduce((sum, item) => 
      item.completed ? sum + item.estimatedCost : sum, 0
    );
    
    // 🆕 NUEVAS ESTADÍSTICAS AVANZADAS
    const totalInventoryValue = ingredients.reduce((sum, i) => sum + (i.currentStock * i.estimatedPrice), 0);
    const lowStockItems = ingredients.filter(i => i.currentStock < i.minStock && i.currentStock > 0).length;
    const expiringItems = ingredients.filter(i => i.expiryDate && new Date(i.expiryDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length;
    
    // Calcular utilización del almacén
    const totalCapacity = storageLocations.reduce((sum, loc) => sum + loc.capacity, 0);
    const totalUsage = storageLocations.reduce((sum, loc) => sum + loc.currentUsage, 0);
    const storageUtilization = totalCapacity > 0 ? (totalUsage / totalCapacity) * 100 : 0;

    // 🆕 NUEVAS ESTADÍSTICAS DE PRODUCTOS ELABORADOS (placeholder)
    const totalElaboratedProducts = 0;
    const activeElaboratedProducts = 0;
    const totalProductionValue = 0;
    const averageQualityScore = 0;
    const totalWastePercentage = 0;
    const averageEfficiency = 0;

    // 🆕 NUEVAS ESTADÍSTICAS DE CHEFS (placeholder)
    const chefPerformance = chefs.map(chef => ({
      chefId: chef.id,
      chefName: chef.name,
      totalProducts: 0,
      averageQuality: 0,
      totalRevenue: 0,
      wastePercentage: 0,
      efficiency: 0,
      lastUpdate: new Date()
    }));

    // 🆕 NUEVAS ESTADÍSTICAS DE ALMACENAMIENTO (placeholder)
    const storageEfficiency = storageLocations.map(location => ({
      locationId: location.id,
      locationName: location.name,
      utilization: (location.currentUsage / location.capacity) * 100,
      costPerUnit: 0,
      turnoverRate: 0
    }));

    return {
      criticalItems,
      shoppingItems,
      weeklyBudget,
      weeklySpent,
      activeChefs: chefs.length,
      // 🆕 NUEVAS ESTADÍSTICAS
      totalInventoryValue,
      lowStockItems,
      expiringItems,
      storageUtilization,
      // 🆕 NUEVAS ESTADÍSTICAS DE PRODUCTOS ELABORADOS
      totalElaboratedProducts,
      activeElaboratedProducts,
      totalProductionValue,
      averageQualityScore,
      totalWastePercentage,
      averageEfficiency,
      // 🆕 NUEVAS ESTADÍSTICAS DE CHEFS
      chefPerformance,
      // 🆕 NUEVAS ESTADÍSTICAS DE ALMACENAMIENTO
      storageEfficiency
    };
  }, [ingredients, shoppingList, weeklyBudget, chefs.length, storageLocations]);

  const updateIngredientStock = (ingredientId: string, newStock: number) => {
    setIngredients(prev => prev.map(ingredient => 
      ingredient.id === ingredientId 
        ? { ...ingredient, currentStock: Math.max(0, newStock) }
        : ingredient
    ));
  };

  const toggleShoppingItem = (ingredientId: string) => {
    setShoppingList(prev => prev.map(item => 
      item.ingredientId === ingredientId 
        ? { ...item, completed: !item.completed }
        : item
    ));
  };

  const markAllChefItemsCompleted = (chefId: string) => {
    setShoppingList(prev => prev.map(item => 
      item.responsibleChefId === chefId 
        ? { ...item, completed: true }
        : item
    ));
  };

  const addChef = (chef: Omit<Chef, 'id'>) => {
    const newChef = { ...chef, id: Date.now().toString() };
    setChefs(prev => [...prev, newChef]);
  };

  const updateChef = (chefId: string, updates: Partial<Chef>) => {
    setChefs(prev => prev.map(chef => 
      chef.id === chefId ? { ...chef, ...updates } : chef
    ));
  };

  const addDish = (dish: Omit<Dish, 'id'>) => {
    const newDish = { ...dish, id: Date.now().toString() };
    setDishes(prev => [...prev, newDish]);
  };

  const updateDish = (dishId: string, updates: Partial<Dish>) => {
    setDishes(prev => prev.map(dish => 
      dish.id === dishId ? { ...dish, ...updates } : dish
    ));
  };

  // 🆕 NUEVAS FUNCIONES DE GESTIÓN AVANZADA
  const addIngredient = (ingredient: Omit<Ingredient, 'id'>) => {
    const newIngredient = { ...ingredient, id: Date.now().toString() };
    setIngredients(prev => [...prev, newIngredient]);
  };

  const updateIngredient = (ingredientId: string, updates: Partial<Ingredient>) => {
    setIngredients(prev => prev.map(ingredient => 
      ingredient.id === ingredientId ? { ...ingredient, ...updates } : ingredient
    ));
  };

  const deleteIngredient = (ingredientId: string) => {
    setIngredients(prev => prev.filter(ingredient => ingredient.id !== ingredientId));
  };

  const moveIngredient = (ingredientId: string, newLocationId: string) => {
    setIngredients(prev => prev.map(ingredient => 
      ingredient.id === ingredientId 
        ? { ...ingredient, storageLocationId: newLocationId }
        : ingredient
    ));
  };

  const addStorageLocation = (location: Omit<StorageLocation, 'id'>) => {
    const newLocation = { ...location, id: Date.now().toString() };
    setStorageLocations(prev => [...prev, newLocation]);
  };

  const updateStorageLocation = (locationId: string, updates: Partial<StorageLocation>) => {
    setStorageLocations(prev => prev.map(location => 
      location.id === locationId ? { ...location, ...updates } : location
    ));
  };

  const deleteStorageLocation = (locationId: string) => {
    setStorageLocations(prev => prev.filter(location => location.id !== locationId));
  };

  return {
    chefs,
    ingredients,
    dishes,
    shoppingList,
    storageLocations,
    stats,
    weeklyBudget,
    setWeeklyBudget,
    updateIngredientStock,
    toggleShoppingItem,
    markAllChefItemsCompleted,
    addChef,
    updateChef,
    addDish,
    updateDish,
    // 🆕 NUEVAS FUNCIONES
    addIngredient,
    updateIngredient,
    deleteIngredient,
    moveIngredient,
    addStorageLocation,
    updateStorageLocation,
    deleteStorageLocation,
  };
};