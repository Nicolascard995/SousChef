import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Move, 
  Package, 
  Thermometer, 
  Droplets,
  Lightbulb,
  Lock,
  Calendar,
  Truck,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  ChefHat,
  Euro
} from 'lucide-react';
import { Ingredient, StorageLocation, Chef } from '../types/kitchen';
import { cn } from '../lib/utils';

interface AdvancedIngredientManagerProps {
  ingredients: Ingredient[];
  storageLocations: StorageLocation[];
  chefs: Chef[];
  onAddIngredient: (ingredient: Omit<Ingredient, 'id'>) => void;
  onUpdateIngredient: (id: string, updates: Partial<Ingredient>) => void;
  onDeleteIngredient: (id: string) => void;
  onMoveIngredient: (id: string, newLocationId: string) => void;
}

const AdvancedIngredientManager: React.FC<AdvancedIngredientManagerProps> = ({
  ingredients,
  storageLocations,
  chefs,
  onAddIngredient,
  onUpdateIngredient,
  onDeleteIngredient,
  onMoveIngredient
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedChef, setSelectedChef] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'storage'>('grid');

  // 🆕 FORMULARIO DE NUEVO INGREDIENTE
  const [newIngredientForm, setNewIngredientForm] = useState({
    name: '',
    unit: '',
    category: 'meat' as const,
    priority: 'medium' as const,
    supplier: '',
    notes: '',
    storageLocationId: '1',
    responsibleChefId: '1',
    minStock: 0,
    maxStock: 0,
    estimatedPrice: 0,
    autoReorder: true,
    reorderPoint: 0,
    leadTime: 1,
    batchSize: 1
  });

  // 🆕 NORMALIZAR INGREDIENTES PARA COMPATIBILIDAD
  const normalizedIngredients = useMemo(() => {
    return ingredients.map(ingredient => ({
      ...ingredient,
      priority: ingredient.priority || 'medium',
      category: ingredient.category || 'meat',
      supplier: ingredient.supplier || '',
      notes: ingredient.notes || '',
      storageLocationId: ingredient.storageLocationId || '1',
      storageConditions: ingredient.storageConditions || {
        temperature: undefined,
        humidity: undefined,
        lightSensitive: false,
        airtight: false
      },
      autoReorder: ingredient.autoReorder ?? true,
      reorderPoint: ingredient.reorderPoint || 0,
      leadTime: ingredient.leadTime || 1,
      batchSize: ingredient.batchSize || 1
    }));
  }, [ingredients]);

  // 🆕 FILTROS AVANZADOS
  const filteredIngredients = useMemo(() => {
    return normalizedIngredients.filter(ingredient => {
      const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (ingredient.notes || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (ingredient.supplier || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || ingredient.category === selectedCategory;
      const matchesLocation = selectedLocation === 'all' || ingredient.storageLocationId === selectedLocation;
      const matchesChef = selectedChef === 'all' || ingredient.responsibleChefId === selectedChef;
      const matchesPriority = selectedPriority === 'all' || ingredient.priority === selectedPriority;
      
      return matchesSearch && matchesCategory && matchesLocation && matchesChef && matchesPriority;
    });
  }, [normalizedIngredients, searchTerm, selectedCategory, selectedLocation, selectedChef, selectedPriority]);

  // 🆕 ESTADÍSTICAS AVANZADAS
  const stats = useMemo(() => {
    const totalValue = normalizedIngredients.reduce((sum, i) => sum + ((i.currentStock || 0) * (i.estimatedPrice || 0)), 0);
    const criticalItems = normalizedIngredients.filter(i => (i.currentStock || 0) === 0).length;
    const lowStockItems = normalizedIngredients.filter(i => (i.currentStock || 0) < (i.minStock || 0) && (i.currentStock || 0) > 0).length;
    const expiringItems = normalizedIngredients.filter(i => i.expiryDate && new Date(i.expiryDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length;
    
    return { totalValue, criticalItems, lowStockItems, expiringItems };
  }, [normalizedIngredients]);

  // 🆕 FUNCIONES DE GESTIÓN
  const handleAddIngredient = () => {
    if (newIngredientForm.name && newIngredientForm.unit) {
      onAddIngredient({
        ...newIngredientForm,
        currentStock: 0,
        lastRestocked: new Date(),
        storageConditions: {
          temperature: undefined,
          humidity: undefined,
          lightSensitive: false,
          airtight: false
        },
        // 🆕 VALORES POR DEFECTO PARA PROPIEDADES OPCIONALES
        priority: newIngredientForm.priority || 'medium',
        category: newIngredientForm.category || 'meat',
        supplier: newIngredientForm.supplier || '',
        notes: newIngredientForm.notes || '',
        autoReorder: newIngredientForm.autoReorder || true,
        reorderPoint: newIngredientForm.reorderPoint || 0,
        leadTime: newIngredientForm.leadTime || 1,
        batchSize: newIngredientForm.batchSize || 1
      });
      setNewIngredientForm({
        name: '', unit: '', category: 'meat', priority: 'medium', supplier: '', notes: '',
        storageLocationId: '1', responsibleChefId: '1', minStock: 0, maxStock: 0, estimatedPrice: 0,
        autoReorder: true, reorderPoint: 0, leadTime: 1, batchSize: 1
      });
      setShowAddForm(false);
    }
  };

  const handleQuickStockUpdate = (ingredientId: string, newStock: number) => {
    onUpdateIngredient(ingredientId, { 
      currentStock: Math.max(0, newStock), 
      lastRestocked: new Date() 
    });
  };

  const handleBulkMove = (ingredientIds: string[], newLocationId: string) => {
    ingredientIds.forEach(id => onMoveIngredient(id, newLocationId));
  };

  // 🆕 RENDERIZADO DE INGREDIENTE
  const renderIngredientCard = (ingredient: Ingredient) => {
    const location = storageLocations.find(l => l.id === ingredient.storageLocationId);
    const chef = chefs.find(c => c.id === ingredient.responsibleChefId);
    const stockStatus = ingredient.currentStock === 0 ? 'critical' : 
                       ingredient.currentStock < ingredient.minStock ? 'low' : 'ok';

    return (
      <Card key={ingredient.id} className="card-elevation-2 hover:shadow-professional-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-foreground">{ingredient.name}</h3>
                <Badge className={cn(
                  "text-xs",
                  ingredient.priority === 'critical' && "bg-danger text-danger-foreground",
                  ingredient.priority === 'high' && "bg-warning text-warning-foreground",
                  ingredient.priority === 'medium' && "bg-secondary text-secondary-foreground",
                  ingredient.priority === 'low' && "bg-success text-success-foreground"
                )}>
                  {ingredient.priority?.toUpperCase() || 'MEDIUM'}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  {ingredient.unit}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {location?.name}
                </span>
                <span className="flex items-center gap-1">
                  <ChefHat className="h-3 w-3" />
                  {chef?.name}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className={cn(
                "text-2xl font-bold",
                stockStatus === 'critical' && "text-danger",
                stockStatus === 'low' && "text-warning",
                stockStatus === 'ok' && "text-success"
              )}>
                {ingredient.currentStock}
              </div>
              <div className="text-xs text-muted-foreground">
                {ingredient.minStock} / {ingredient.maxStock}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {/* 🆕 INFORMACIÓN DE ALMACENAMIENTO */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {ingredient.storageConditions?.temperature && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Thermometer className="h-3 w-3" />
                {ingredient.storageConditions.temperature}°C
              </div>
            )}
            {ingredient.storageConditions?.humidity && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Droplets className="h-3 w-3" />
                {ingredient.storageConditions.humidity}%
              </div>
            )}
            {ingredient.storageConditions?.lightSensitive && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Lightbulb className="h-3 w-3" />
                Lichtempfindlich
              </div>
            )}
            {ingredient.storageConditions?.airtight && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Lock className="h-3 w-3" />
                Luftdicht
              </div>
            )}
          </div>
          
          {/* 🆕 INFORMACIÓN DE GESTIÓN */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Truck className="h-3 w-3" />
              {ingredient.leadTime || 1} Tage
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Euro className="h-3 w-3" />
              €{((ingredient.currentStock || 0) * (ingredient.estimatedPrice || 0)).toFixed(2)}
            </div>
          </div>
          
          {/* 🆕 ACCIONES RÁPIDAS */}
          <div className="flex items-center gap-2 pt-2 border-t border-border/50">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setEditingIngredient(ingredient.id)}
              className="flex-1"
            >
              Bearbeiten
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => handleQuickStockUpdate(ingredient.id, ingredient.currentStock + 1)}
              className="flex-1"
            >
              +1
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => handleQuickStockUpdate(ingredient.id, Math.max(0, ingredient.currentStock - 1))}
              className="flex-1"
            >
              -1
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-background to-muted/30 min-h-screen">
      {/* 🆕 HEADER CON ESTADÍSTICAS */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-professional">
          {/* 🆕 TU LOGO EN EL HEADER */}
          <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center p-1.5">
            <img 
              src="/logo-horizontal.svg" 
              alt="Nico3D Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Inventar-Verwaltung Pro
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
          Erweiterte Zutatenverwaltung mit mehreren Lagerorten, 
          Temperatur- und Feuchtigkeitskontrolle sowie automatische Bestandsverwaltung
        </p>
        <p className="text-sm text-muted-foreground">
          Powered by <span className="font-semibold text-primary">Nico3D</span> • Secure MVP v1.0
        </p>
      </div>

      {/* 🆕 ESTADÍSTICAS PRINCIPALES */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-elevation-2 border-l-4 border-l-danger bg-gradient-to-br from-danger/5 to-white">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-danger/10 rounded-xl flex items-center justify-center mb-3">
              <AlertTriangle className="h-6 w-6 text-danger" />
            </div>
            <div className="text-2xl font-bold text-danger">{stats.criticalItems}</div>
            <p className="text-sm text-muted-foreground font-medium">Kritisch</p>
          </CardContent>
        </Card>

        <Card className="card-elevation-2 border-l-4 border-l-warning bg-gradient-to-br from-warning/5 to-white">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center mb-3">
              <Clock className="h-6 w-6 text-warning" />
            </div>
            <div className="text-2xl font-bold text-warning">{stats.lowStockItems}</div>
            <p className="text-sm text-muted-foreground font-medium">Niedriger Bestand</p>
          </CardContent>
        </Card>

        <Card className="card-elevation-2 border-l-4 border-l-primary bg-gradient-to-br from-primary/5 to-white">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
              <Euro className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">€{stats.totalValue.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground font-medium">Gesamtwert</p>
          </CardContent>
        </Card>

        <Card className="card-elevation-2 border-l-4 border-l-secondary bg-gradient-to-br from-secondary/5 to-white">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-3">
              <Calendar className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-2xl font-bold text-secondary">{stats.expiringItems}</div>
            <p className="text-sm text-muted-foreground font-medium">Läuft ab</p>
          </CardContent>
        </Card>
      </div>

      {/* 🆕 CONTROLES DE FILTRO Y ACCIONES */}
      <Card className="card-elevation-2">
        <CardHeader>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Zutaten suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="all">Alle Kategorien</option>
                <option value="meat">Fleisch</option>
                <option value="fish">Fisch</option>
                <option value="vegetables">Gemüse</option>
                <option value="dairy">Milchprodukte</option>
                <option value="grains">Getreide</option>
                <option value="spices">Gewürze</option>
                <option value="beverages">Getränke</option>
                <option value="frozen">Tiefkühlkost</option>
                <option value="canned">Konserven</option>
                <option value="fresh">Frischwaren</option>
              </select>
              
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="all">Alle Lagerorte</option>
                {storageLocations.map(location => (
                  <option key={location.id} value={location.id}>
                    {location.icon} {location.name}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedChef}
                onChange={(e) => setSelectedChef(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="all">Alle Köche</option>
                {chefs.map(chef => (
                  <option key={chef.id} value={chef.id}>
                    {chef.name}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="all">Alle Prioritäten</option>
                <option value="critical">Kritisch</option>
                <option value="high">Hoch</option>
                <option value="medium">Mittel</option>
                <option value="low">Niedrig</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="btn-outline-contrast"
              >
                                 {viewMode === 'grid' ? 'Liste' : 'Grid'}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setViewMode('storage')}
                className={cn("btn-outline-contrast", viewMode === 'storage' && "bg-primary text-primary-foreground")}
              >
                                 <MapPin className="h-4 w-4 mr-2" />
                 Lager
              </Button>
              
              <Button
                onClick={() => setShowAddForm(true)}
                className="btn-primary"
              >
                                 <Plus className="h-4 w-4 mr-2" />
                 Neue Zutat
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 🆕 VISTA DE INGREDIENTES */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredIngredients.map(renderIngredientCard)}
        </div>
      )}
      
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filteredIngredients.map(ingredient => (
            <Card key={ingredient.id} className="card-elevation-1">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{ingredient.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {ingredient.currentStock} {ingredient.unit} • {ingredient.supplier}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={cn(
                      ingredient.currentStock === 0 ? "bg-danger" : 
                      ingredient.currentStock < ingredient.minStock ? "bg-warning" : "bg-success"
                    )}>
                                             {ingredient.currentStock < ingredient.minStock ? 'Niedrig' : 'OK'}
                    </Badge>
                                         <Button size="sm" variant="outline" onClick={() => setEditingIngredient(ingredient.id)}>
                       Bearbeiten
                     </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
             {viewMode === 'storage' && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {storageLocations.map(location => {
             const locationIngredients = normalizedIngredients.filter(i => i.storageLocationId === location.id);
            const utilization = (location.currentUsage / location.capacity) * 100;
            
            return (
              <Card key={location.id} className="card-elevation-2">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{location.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{location.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{location.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 🆕 INFORMACIÓN DE UBICACIÓN */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {location.temperature && (
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-muted-foreground" />
                        <span>{location.temperature}°C</span>
                      </div>
                    )}
                    {location.humidity && (
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-muted-foreground" />
                        <span>{location.humidity}%</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span>{locationIngredients.length} Artikel</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{utilization.toFixed(1)}% uso</span>
                    </div>
                  </div>
                  
                  {/* 🆕 BARRA DE UTILIZACIÓN */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                                           <span className="text-muted-foreground">Kapazität</span>
                     <span className="font-medium">{location.currentUsage} / {location.capacity}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          utilization > 90 ? "bg-danger" :
                          utilization > 75 ? "bg-warning" : "bg-success"
                        )}
                        style={{ width: `${Math.min(utilization, 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* 🆕 LISTA DE INGREDIENTES EN ESTA UBICACIÓN */}
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {locationIngredients.slice(0, 5).map(ingredient => (
                      <div key={ingredient.id} className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded">
                        <span className="truncate">{ingredient.name}</span>
                        <span className={cn(
                          "font-medium",
                          ingredient.currentStock === 0 ? "text-danger" :
                          ingredient.currentStock < ingredient.minStock ? "text-warning" : "text-success"
                        )}>
                          {ingredient.currentStock}
                        </span>
                      </div>
                    ))}
                    {locationIngredients.length > 5 && (
                      <div className="text-center text-xs text-muted-foreground">
                                                 +{locationIngredients.length - 5} weitere...
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* 🆕 FORMULARIO DE NUEVO INGREDIENTE */}
      {showAddForm && (
        <Card className="card-elevation-3 border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-white rounded-t-xl border-b">
                           <CardTitle className="text-xl text-foreground flex items-center gap-2">
                 <Plus className="h-5 w-5 text-primary" />
                 Neue Zutat
               </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <Input
                 placeholder="Zutatname"
                 value={newIngredientForm.name}
                 onChange={(e) => setNewIngredientForm({ ...newIngredientForm, name: e.target.value })}
                 className="input-professional"
               />
              
                             <Input
                 placeholder="Einheit (kg, L, Stück, etc.)"
                 value={newIngredientForm.unit}
                 onChange={(e) => setNewIngredientForm({ ...newIngredientForm, unit: e.target.value })}
                 className="input-professional"
               />
              
              <select
                value={newIngredientForm.category}
                onChange={(e) => setNewIngredientForm({ ...newIngredientForm, category: e.target.value as any })}
                className="input-professional"
              >
                                 <option value="meat">Fleisch</option>
                 <option value="fish">Fisch</option>
                 <option value="vegetables">Gemüse</option>
                 <option value="dairy">Milchprodukte</option>
                 <option value="grains">Getreide</option>
                 <option value="spices">Gewürze</option>
                 <option value="beverages">Getränke</option>
                 <option value="frozen">Tiefkühlkost</option>
                 <option value="canned">Konserven</option>
                 <option value="fresh">Frischwaren</option>
              </select>
              
              <select
                value={newIngredientForm.priority}
                onChange={(e) => setNewIngredientForm({ ...newIngredientForm, priority: e.target.value as any })}
                className="input-professional"
              >
                                 <option value="low">Niedrig</option>
                 <option value="medium">Mittel</option>
                 <option value="high">Hoch</option>
                 <option value="critical">Kritisch</option>
              </select>
              
              <select
                value={newIngredientForm.storageLocationId}
                onChange={(e) => setNewIngredientForm({ ...newIngredientForm, storageLocationId: e.target.value })}
                className="input-professional"
              >
                {storageLocations.map(location => (
                  <option key={location.id} value={location.id}>
                    {location.icon} {location.name}
                  </option>
                ))}
              </select>
              
              <select
                value={newIngredientForm.responsibleChefId}
                onChange={(e) => setNewIngredientForm({ ...newIngredientForm, responsibleChefId: e.target.value })}
                className="input-professional"
              >
                {chefs.map(chef => (
                  <option key={chef.id} value={chef.id}>
                    {chef.name} - {chef.specialty}
                  </option>
                ))}
              </select>
              
                             <Input
                 placeholder="Lieferant"
                 value={newIngredientForm.supplier}
                 onChange={(e) => setNewIngredientForm({ ...newIngredientForm, supplier: e.target.value })}
                 className="input-professional"
               />
              
                             <Input
                 placeholder="Geschätzter Preis pro Einheit"
                 type="number"
                 step="0.01"
                 value={newIngredientForm.estimatedPrice}
                 onChange={(e) => setNewIngredientForm({ ...newIngredientForm, estimatedPrice: parseFloat(e.target.value) || 0 })}
                 className="input-professional"
               />
              
                             <Input
                 placeholder="Mindestbestand"
                 type="number"
                 value={newIngredientForm.minStock}
                 onChange={(e) => setNewIngredientForm({ ...newIngredientForm, minStock: parseFloat(e.target.value) || 0 })}
                 className="input-professional"
               />
              
                             <Input
                 placeholder="Maximalbestand"
                 type="number"
                 value={newIngredientForm.maxStock}
                 onChange={(e) => setNewIngredientForm({ ...newIngredientForm, maxStock: parseFloat(e.target.value) || 0 })}
                 className="input-professional"
               />
              
                             <Input
                 placeholder="Nachbestellpunkt"
                 type="number"
                 value={newIngredientForm.reorderPoint}
                 onChange={(e) => setNewIngredientForm({ ...newIngredientForm, reorderPoint: parseFloat(e.target.value) || 0 })}
                 className="input-professional"
               />
              
                             <Input
                 placeholder="Lieferzeit (Tage)"
                 type="number"
                 value={newIngredientForm.leadTime}
                 onChange={(e) => setNewIngredientForm({ ...newIngredientForm, leadTime: parseInt(e.target.value) || 1 })}
                 className="input-professional"
               />
              
                             <Input
                 placeholder="Losgröße"
                 type="number"
                 value={newIngredientForm.batchSize}
                 onChange={(e) => setNewIngredientForm({ ...newIngredientForm, batchSize: parseFloat(e.target.value) || 1 })}
                 className="input-professional"
               />
            </div>
            
                         <div className="mt-4">
               <Input
                 placeholder="Zusätzliche Notizen"
                 value={newIngredientForm.notes}
                 onChange={(e) => setNewIngredientForm({ ...newIngredientForm, notes: e.target.value })}
                 className="input-professional"
               />
             </div>
            
            <div className="flex items-center gap-4 mt-6">
                             <Button onClick={handleAddIngredient} className="btn-primary">
                 <Plus className="h-4 w-4 mr-2" />
                 Zutat hinzufügen
               </Button>
               <Button onClick={() => setShowAddForm(false)} variant="outline" className="btn-outline-contrast">
                 Abbrechen
               </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 🆕 MENSAJE SI NO HAY INGREDIENTES */}
      {filteredIngredients.length === 0 && (
        <Card className="card-elevation-2">
          <CardContent className="p-12 text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                         <h3 className="text-xl font-semibold text-foreground mb-2">Keine Zutaten gefunden</h3>
             <p className="text-muted-foreground mb-4">
               {searchTerm || selectedCategory !== 'all' || selectedLocation !== 'all' || selectedChef !== 'all' || selectedPriority !== 'all'
                 ? 'Versuchen Sie die Suchfilter anzupassen'
                 : 'Beginnen Sie mit dem Hinzufügen Ihrer ersten Zutat'
               }
             </p>
             {!searchTerm && selectedCategory === 'all' && selectedLocation === 'all' && selectedChef === 'all' && selectedPriority === 'all' && (
               <Button onClick={() => setShowAddForm(true)} className="btn-primary">
                 <Plus className="h-4 w-4 mr-2" />
                 Erste Zutat hinzufügen
               </Button>
             )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdvancedIngredientManager;
