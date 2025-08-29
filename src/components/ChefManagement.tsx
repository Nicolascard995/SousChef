import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Chef, Ingredient, ShoppingItem } from "../types/kitchen";
import { Edit2, Save, X, Plus, User, Users, Package, ShoppingCart, AlertTriangle, ChefHat, Star, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChefManagementProps {
  chefs: Chef[];
  ingredients: Ingredient[];
  shoppingList: ShoppingItem[];
  updateChef: (chefId: string, updates: Partial<Chef>) => void;
  addChef: (chef: Omit<Chef, 'id'>) => void;
}

const ChefManagement = ({ 
  chefs, 
  ingredients, 
  shoppingList, 
  updateChef, 
  addChef 
}: ChefManagementProps) => {
  const [editingChef, setEditingChef] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', specialty: '' });
  const [addingChef, setAddingChef] = useState(false);
  const [newChefForm, setNewChefForm] = useState({ name: '', specialty: '', color: 'hsl(var(--chef-1))' });

  const colors = [
    'hsl(var(--chef-1))', 'hsl(var(--chef-2))', 'hsl(var(--chef-3))', 'hsl(var(--chef-4))', 
    'hsl(var(--chef-5))', 'hsl(var(--chef-6))', 'hsl(var(--chef-7))', 'hsl(var(--chef-8))'
  ];

  const startEditing = (chef: Chef) => {
    setEditingChef(chef.id);
    setEditForm({ name: chef.name, specialty: chef.specialty });
  };

  const saveChef = (chefId: string) => {
    if (editForm.name.trim() && editForm.specialty.trim()) {
      updateChef(chefId, {
        name: editForm.name.trim(),
        specialty: editForm.specialty.trim()
      });
    }
    setEditingChef(null);
  };

  const cancelEditing = () => {
    setEditingChef(null);
    setEditForm({ name: '', specialty: '' });
  };

  const handleAddChef = () => {
    if (newChefForm.name.trim() && newChefForm.specialty.trim()) {
      addChef({
        name: newChefForm.name.trim(),
        specialty: newChefForm.specialty.trim(),
        color: newChefForm.color,
        avatar: newChefForm.name.charAt(0).toUpperCase()
      });
      setNewChefForm({ name: '', specialty: '', color: 'hsl(var(--chef-1))' });
      setAddingChef(false);
    }
  };

  const getChefStats = (chefId: string) => {
    const chefIngredients = ingredients.filter(i => i.responsibleChefId === chefId);
    const chefShoppingItems = shoppingList.filter(i => i.responsibleChefId === chefId);
    const pendingItems = chefShoppingItems.filter(i => !i.completed).length;
    const criticalItems = chefIngredients.filter(i => i.currentStock === 0).length;
    
    return {
      totalIngredients: chefIngredients.length,
      pendingItems,
      criticalItems,
      estimatedCost: chefShoppingItems.reduce((sum, item) => sum + item.estimatedCost, 0)
    };
  };

  // Calculate overall stats
  const totalChefs = chefs.length;
  const totalIngredients = ingredients.length;
  const totalPendingItems = shoppingList.filter(i => !i.completed).length;
  const totalCriticalItems = ingredients.filter(i => i.currentStock === 0).length;

  return (
    <div className="space-y-8 p-8 bg-gradient-to-br from-background to-muted/30 min-h-screen">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-professional">
          <Users className="h-6 w-6 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Küchenbrigade
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Köche und ihre Verantwortlichkeiten verwalten - Professionelle Teamführung für Ihre Küche
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-elevation-2 border-l-4 border-l-primary bg-gradient-to-br from-primary/5 to-white">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">{totalChefs}</div>
            <p className="text-sm text-muted-foreground font-medium">Aktive Köche</p>
          </CardContent>
        </Card>

        <Card className="card-elevation-2 border-l-4 border-l-secondary bg-gradient-to-br from-secondary/5 to-white">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-3">
              <Package className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-2xl font-bold text-secondary">{totalIngredients}</div>
            <p className="text-sm text-muted-foreground font-medium">Verwaltete Artikel</p>
          </CardContent>
        </Card>

        <Card className="card-elevation-2 border-l-4 border-l-warning bg-gradient-to-br from-warning/5 to-white">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center mb-3">
              <ShoppingCart className="h-6 w-6 text-warning" />
            </div>
            <div className="text-2xl font-bold text-warning">{totalPendingItems}</div>
            <p className="text-sm text-muted-foreground font-medium">Ausstehende Einkäufe</p>
          </CardContent>
        </Card>

        <Card className="card-elevation-2 border-l-4 border-l-danger bg-gradient-to-br from-danger/5 to-white">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-danger/10 rounded-xl flex items-center justify-center mb-3">
              <AlertTriangle className="h-6 w-6 text-danger" />
            </div>
            <div className="text-2xl font-bold text-danger">{totalCriticalItems}</div>
            <p className="text-sm text-muted-foreground font-medium">Kritische Artikel</p>
          </CardContent>
        </Card>
      </div>

      {/* Add New Chef Section */}
      <div className="flex justify-center">
        <Button 
          onClick={() => setAddingChef(true)} 
          className="btn-primary text-lg px-8 py-4"
        >
          <Plus className="h-5 w-5 mr-2" />
          Neuen Koch hinzufügen
        </Button>
      </div>

      {/* Add New Chef Form */}
      {addingChef && (
        <Card className="card-elevation-3 border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-white rounded-t-xl border-b">
            <CardTitle className="text-xl text-foreground flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Neuen Koch hinzufügen
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Name</label>
                <Input
                  type="text"
                  value={newChefForm.name}
                  onChange={(e) => setNewChefForm({ ...newChefForm, name: e.target.value })}
                  className="input-professional"
                  placeholder="Vorname Nachname"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Spezialität</label>
                <Input
                  type="text"
                  value={newChefForm.specialty}
                  onChange={(e) => setNewChefForm({ ...newChefForm, specialty: e.target.value })}
                  className="input-professional"
                  placeholder="z.B. Fleisch, Fisch, Desserts"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Farbe wählen</label>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewChefForm({ ...newChefForm, color })}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 transition-all duration-200",
                      newChefForm.color === color 
                        ? "border-foreground scale-110 shadow-professional" 
                        : "border-border hover:scale-105"
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button onClick={handleAddChef} className="btn-primary">
                <Save className="h-4 w-4 mr-2" />
                Koch hinzufügen
              </Button>
              <Button 
                onClick={() => setAddingChef(false)} 
                variant="outline" 
                className="btn-outline-contrast"
              >
                <X className="h-4 w-4 mr-2" />
                Abbrechen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chef Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {chefs.map(chef => {
          const stats = getChefStats(chef.id);
          const isEditing = editingChef === chef.id;
          
          return (
            <Card key={chef.id} className="card-elevation-3 hover:shadow-professional-lg transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-muted/30 to-white rounded-t-xl border-b">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "chef-avatar-large shadow-professional",
                      "border-4 border-white"
                    )}
                    style={{ 
                      backgroundColor: chef.color,
                      borderColor: chef.color + '40'
                    }}>
                      {chef.avatar}
                    </div>
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="space-y-3">
                          <Input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="input-professional"
                            placeholder="Name"
                          />
                          <Input
                            type="text"
                            value={editForm.specialty}
                            onChange={(e) => setEditForm({ ...editForm, specialty: e.target.value })}
                            className="input-professional"
                            placeholder="Spezialität"
                          />
                        </div>
                      ) : (
                        <>
                          <CardTitle className="text-xl text-foreground mb-1">{chef.name}</CardTitle>
                          <p className="text-muted-foreground font-medium">{chef.specialty}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Star className="h-4 w-4 text-warning" />
                            <span className="text-sm text-muted-foreground">Experte</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {!isEditing && (
                    <Button 
                      onClick={() => startEditing(chef)} 
                      variant="outline" 
                      size="sm"
                      className="btn-outline-contrast"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Chef Stats Overview */}
                {!isEditing && (
                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border/50">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{stats.totalIngredients}</div>
                      <div className="text-xs text-muted-foreground">Artikel</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-warning">{stats.pendingItems}</div>
                      <div className="text-xs text-muted-foreground">Einkäufe</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-danger">{stats.criticalItems}</div>
                      <div className="text-xs text-muted-foreground">Kritisch</div>
                    </div>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="p-6">
                {isEditing ? (
                  <div className="flex items-center gap-4 pt-4">
                    <Button onClick={() => saveChef(chef.id)} className="btn-primary">
                      <Save className="h-4 w-4 mr-2" />
                      Speichern
                    </Button>
                    <Button 
                      onClick={cancelEditing} 
                      variant="outline" 
                      className="btn-outline-contrast"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Abbrechen
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Performance Indicators */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Verantwortungsbereich</span>
                        <span className="font-medium">{stats.totalIngredients} Artikel</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill bg-primary"
                          style={{ width: `${Math.min((stats.totalIngredients / 20) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Status Badges */}
                    <div className="flex flex-wrap gap-2">
                      {stats.criticalItems > 0 && (
                                        <Badge className="badge-danger">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {stats.criticalItems} kritisch
                </Badge>
                      )}
                      {stats.pendingItems > 0 && (
                        <Badge className="badge-warning">
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          {stats.pendingItems} Einkäufe
                        </Badge>
                      )}
                      {stats.totalIngredients > 0 && (
                        <Badge className="badge-success">
                          <Package className="h-3 w-3 mr-1" />
                          {stats.totalIngredients} verwaltet
                        </Badge>
                      )}
                    </div>

                    {/* Estimated Costs */}
                    {stats.estimatedCost > 0 && (
                      <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium text-primary">Geschätzte Einkaufskosten</span>
                        </div>
                        <div className="text-lg font-bold text-primary mt-1">
                          €{stats.estimatedCost.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {chefs.length === 0 && (
        <Card className="card-elevation-2">
          <CardContent className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-muted/50 rounded-2xl flex items-center justify-center mb-4">
              <ChefHat className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Noch keine Köche hinzugefügt</h3>
            <p className="text-muted-foreground mb-6">
              Fügen Sie Ihre erste Küchenbrigade hinzu, um mit dem Bestandsmanagement zu beginnen.
            </p>
            <Button onClick={() => setAddingChef(true)} className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Ersten Koch hinzufügen
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChefManagement;