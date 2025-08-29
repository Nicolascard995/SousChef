import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Chef, Ingredient } from "../types/kitchen";
import { Edit2, Save, X, Package, AlertTriangle, CheckCircle, ChefHat, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface InventoryProps {
  chefs: Chef[];
  ingredients: Ingredient[];
  updateIngredientStock: (ingredientId: string, newStock: number) => void;
}

const Inventory = ({ chefs, ingredients, updateIngredientStock }: InventoryProps) => {
  const [editingStock, setEditingStock] = useState<string | null>(null);
  const [stockInput, setStockInput] = useState('');

  const getChefById = (id: string) => chefs.find(chef => chef.id === id);

  const getStockStatus = (ingredient: Ingredient) => {
    if (ingredient.currentStock === 0) return 'danger';
    if (ingredient.currentStock < ingredient.minStock) return 'danger'; // Stock bajo = crítico
    return 'success';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'danger': return 'bg-danger text-danger-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'success': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'danger': return 'KRITISCH';
      case 'warning': return 'NIEDRIG';
      case 'success': return 'OK';
      default: return 'UNBEKANNT';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'danger': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'success': return <CheckCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const startEditing = (ingredientId: string, currentStock: number) => {
    setEditingStock(ingredientId);
    setStockInput(currentStock.toString());
  };

  const saveStock = (ingredientId: string) => {
    const newStock = parseFloat(stockInput);
    if (!isNaN(newStock) && newStock >= 0) {
      updateIngredientStock(ingredientId, newStock);
    }
    setEditingStock(null);
  };

  const cancelEditing = () => {
    setEditingStock(null);
    setStockInput('');
  };

  const groupedByChef = chefs.map(chef => ({
    chef,
    ingredients: ingredients.filter(ingredient => ingredient.responsibleChefId === chef.id)
  })).filter(group => group.ingredients.length > 0);

  // Calculate summary stats - SOLO 2 ESTADOS
  const totalIngredients = ingredients.length;
  const criticalIngredients = ingredients.filter(i => getStockStatus(i) === 'danger').length;
  const optimalIngredients = ingredients.filter(i => getStockStatus(i) === 'success').length;

  return (
    <div className="space-y-8 p-8 bg-gradient-to-br from-background to-muted/30 min-h-screen">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-professional">
          <Package className="h-6 w-6 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Bestandsverwaltung
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Aktuelle Bestände und Mindestmengen verwalten - Professionelle Übersicht für Ihre Küchenbrigade
        </p>
      </div>

      {/* Summary Stats - SOLO 3 ESTADOS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-elevation-2 border-l-4 border-l-danger bg-gradient-to-br from-danger/5 to-white">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-danger/10 rounded-xl flex items-center justify-center mb-3">
              <AlertTriangle className="h-6 w-6 text-danger" />
            </div>
            <div className="text-2xl font-bold text-danger">{criticalIngredients}</div>
            <p className="text-sm text-muted-foreground font-medium">Kritisch</p>
          </CardContent>
        </Card>

        <Card className="card-elevation-2 border-l-4 border-l-success bg-gradient-to-br from-success/5 to-white">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-3">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div className="text-2xl font-bold text-success">{optimalIngredients}</div>
            <p className="text-sm text-muted-foreground font-medium">Optimal</p>
          </CardContent>
        </Card>

        <Card className="card-elevation-2 border-l-4 border-l-primary bg-gradient-to-br from-primary/5 to-white">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">{totalIngredients}</div>
            <p className="text-sm text-muted-foreground font-medium">Gesamt</p>
          </CardContent>
        </Card>
      </div>

      {/* Chef Groups */}
      <div className="space-y-8">
        {groupedByChef.map(group => (
          <Card key={group.chef.id} className="card-elevation-3">
            <CardHeader className="bg-gradient-to-r from-muted/30 to-white rounded-t-xl border-b">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "chef-avatar-large shadow-professional",
                  "border-4 border-white"
                )}
                style={{ 
                  backgroundColor: group.chef.color,
                  borderColor: group.chef.color + '40'
                }}>
                  {group.chef.avatar}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl text-foreground mb-1">{group.chef.name}</CardTitle>
                  <p className="text-muted-foreground font-medium">{group.chef.specialty}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {group.ingredients.length} Artikel
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {group.ingredients.filter(i => getStockStatus(i) === 'success').length} Optimal
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4">
                {group.ingredients.map(ingredient => {
                  const status = getStockStatus(ingredient);
                  const isEditing = editingStock === ingredient.id;
                  
                  return (
                    <div 
                      key={ingredient.id} 
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all duration-200",
                        status === 'danger' && "bg-danger/5 border-danger/20",
                        status === 'warning' && "bg-warning/5 border-warning/20",
                        status === 'success' && "bg-success/5 border-success/20"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={cn(
                            "p-2 rounded-lg",
                            status === 'danger' && "bg-danger/10",
                            status === 'warning' && "bg-warning/10",
                            status === 'success' && "bg-success/10"
                          )}>
                            {getStatusIcon(status)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-semibold text-foreground">{ingredient.name}</h3>
                              <Badge className={getStatusColor(status)}>
                                {getStatusText(status)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Mindestbestand: {ingredient.minStock} {ingredient.unit}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {isEditing ? (
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                value={stockInput}
                                onChange={(e) => setStockInput(e.target.value)}
                                className="input-professional w-24 text-center"
                                placeholder="0"
                              />
                              <Button onClick={() => saveStock(ingredient.id)} size="sm" className="btn-primary">
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button onClick={cancelEditing} size="sm" variant="outline" className="btn-outline-contrast">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="text-right">
                              <div className="flex items-center gap-3">
                                <div className="text-center">
                                  <div className={cn(
                                    "text-2xl font-bold",
                                    status === 'danger' && "text-danger",
                                    status === 'warning' && "text-warning",
                                    status === 'success' && "text-success"
                                  )}>
                                    {ingredient.currentStock}
                                  </div>
                                  <div className="text-xs text-muted-foreground">{ingredient.unit}</div>
                                </div>
                                <Button 
                                  onClick={() => startEditing(ingredient.id, ingredient.currentStock)}
                                  size="sm" 
                                  variant="outline"
                                  className="btn-outline-contrast"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              {/* Stock Progress Bar */}
                              <div className="mt-2 w-24 bg-muted rounded-full h-1.5">
                                <div 
                                  className={cn(
                                    "h-1.5 rounded-full transition-all duration-300",
                                    status === 'danger' && "bg-danger",
                                    status === 'warning' && "bg-warning",
                                    status === 'success' && "bg-success"
                                  )}
                                  style={{ 
                                    width: `${Math.min((ingredient.currentStock / ingredient.minStock) * 100, 100)}%` 
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {groupedByChef.length === 0 && (
        <Card className="card-elevation-2">
          <CardContent className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-muted/50 rounded-2xl flex items-center justify-center mb-4">
              <ChefHat className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Keine Artikel gefunden</h3>
            <p className="text-muted-foreground">
              Es scheint, als hätten Sie noch keine Artikel oder Köche in Ihrem System.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Inventory;