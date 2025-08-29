import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Chef, ShoppingItem } from "../types/kitchen";
import { Download, CheckCircle, ShoppingCart, Euro, Package, TrendingUp, ChefHat, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ShoppingListProps {
  chefs: Chef[];
  shoppingList: ShoppingItem[];
  toggleShoppingItem: (ingredientId: string) => void;
  markAllChefItemsCompleted: (chefId: string) => void;
}

const ShoppingList = ({ 
  chefs, 
  shoppingList, 
  toggleShoppingItem, 
  markAllChefItemsCompleted 
}: ShoppingListProps) => {
  
  const groupedByChef = chefs.map(chef => {
    const items = shoppingList.filter(item => item.responsibleChefId === chef.id);
    const completedItems = items.filter(item => item.completed).length;
    const totalCost = items.reduce((sum, item) => sum + item.estimatedCost, 0);
    const completedCost = items.filter(item => item.completed).reduce((sum, item) => sum + item.estimatedCost, 0);
    
    return {
      chef,
      items,
      completedItems,
      totalItems: items.length,
      totalCost,
      completedCost,
      progress: items.length > 0 ? (completedItems / items.length) * 100 : 0
    };
  }).filter(group => group.totalItems > 0);

  const totalItems = shoppingList.length;
  const completedItemsTotal = shoppingList.filter(item => item.completed).length;
  const totalCost = shoppingList.reduce((sum, item) => sum + item.estimatedCost, 0);
  const completedCost = shoppingList.filter(item => item.completed).reduce((sum, item) => sum + item.estimatedCost, 0);

  const exportToPDF = () => {
    const printContent = `
      KÜCHEN-EINKAUFSLISTE
      =====================
      
      Gesamtübersicht:
      - Artikel: ${completedItemsTotal}/${totalItems}
      - Geschätzte Kosten: €${totalCost.toFixed(2)}
      
      ${groupedByChef.map(group => `
      ${group.chef.name.toUpperCase()} (${group.chef.specialty})
      ${'='.repeat(50)}
      Artikel: ${group.completedItems}/${group.totalItems}
      Kosten: €${group.totalCost.toFixed(2)}
      
      ${group.items.map(item => `
      ${item.completed ? '✓' : '☐'} ${item.name}
          Menge: ${item.quantity} ${item.unit}
          Kosten: €${item.estimatedCost.toFixed(2)}
          Priorität: ${item.priority}
      `).join('')}
      `).join('\n')}
    `;
    
    const blob = new Blob([printContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `einkaufsliste-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 p-8 bg-gradient-to-br from-background to-muted/30 min-h-screen">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-professional">
          <ShoppingCart className="h-6 w-6 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Einkaufsliste
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Professionelle Einkaufsplanung für Ihre Küchenbrigade - Übersicht, Kontrolle, Effizienz
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-elevation-2 border-l-4 border-l-primary bg-gradient-to-br from-primary/5 to-white">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">{totalItems}</div>
            <p className="text-sm text-muted-foreground font-medium">Gesamt Artikel</p>
          </CardContent>
        </Card>

        <Card className="card-elevation-2 border-l-4 border-l-success bg-gradient-to-br from-success/5 to-white">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-3">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div className="text-2xl font-bold text-success">{completedItemsTotal}</div>
            <p className="text-sm text-muted-foreground font-medium">Erledigt</p>
          </CardContent>
        </Card>

        <Card className="card-elevation-2 border-l-4 border-l-warning bg-gradient-to-br from-warning/5 to-white">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="h-6 w-6 text-warning" />
            </div>
            <div className="text-2xl font-bold text-warning">{totalItems - completedItemsTotal}</div>
            <p className="text-sm text-muted-foreground font-medium">Ausstehend</p>
          </CardContent>
        </Card>

        <Card className="card-elevation-2 border-l-4 border-l-secondary bg-gradient-to-br from-secondary/5 to-white">
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-3">
              <Euro className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-2xl font-bold text-secondary">€{totalCost.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground font-medium">Gesamtkosten</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card className="card-elevation-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold">Einkaufsfortschritt</CardTitle>
              <p className="text-sm text-muted-foreground">
                Übersicht über den aktuellen Einkaufsstatus
              </p>
            </div>
            <Button onClick={exportToPDF} className="btn-primary">
              <Download className="h-4 w-4 mr-2" />
              Liste exportieren
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Progress */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Gesamtfortschritt</span>
              <span className="font-medium">
                {completedItemsTotal} / {totalItems} Artikel
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill bg-primary"
                style={{ width: `${totalItems > 0 ? (completedItemsTotal / totalItems) * 100 : 0}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>100%</span>
              <span className="font-medium">
                {totalItems > 0 ? Math.round((completedItemsTotal / totalItems) * 100) : 0}% abgeschlossen
              </span>
            </div>
          </div>

          {/* Cost Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Euro className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Gesamtkosten</span>
              </div>
              <div className="text-2xl font-bold text-primary">€{totalCost.toFixed(2)}</div>
            </div>
            
            <div className="p-4 bg-success/5 rounded-xl border border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm font-medium text-success">Bereits gekauft</span>
              </div>
              <div className="text-2xl font-bold text-success">€{completedCost.toFixed(2)}</div>
            </div>
            
            <div className="p-4 bg-warning/5 rounded-xl border border-warning/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium text-warning">Noch zu kaufen</span>
              </div>
              <div className="text-2xl font-bold text-warning">€{(totalCost - completedCost).toFixed(2)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chef Groups */}
      {groupedByChef.length > 0 ? (
        <div className="space-y-8">
          {groupedByChef.map(group => (
            <Card key={group.chef.id} className="card-elevation-3">
              <CardHeader className="bg-gradient-to-r from-muted/30 to-white rounded-t-xl border-b">
                <div className="flex items-center justify-between">
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
                    <div>
                      <CardTitle className="text-xl text-foreground mb-1">{group.chef.name}</CardTitle>
                      <p className="text-muted-foreground font-medium">{group.chef.specialty}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {group.completedItems}/{group.totalItems} Artikel
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Euro className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            €{group.totalCost.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Button 
                      onClick={() => markAllChefItemsCompleted(group.chef.id)}
                      className="btn-outline-contrast"
                      size="sm"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Alle erledigen
                    </Button>
                  </div>
                </div>
                
                {/* Chef Progress Bar */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fortschritt</span>
                    <span className="font-medium">{Math.round(group.progress)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill bg-primary"
                      style={{ width: `${group.progress}%` }}
                    />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="grid gap-4">
                  {group.items.map(item => (
                    <div 
                      key={item.id} 
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all duration-200",
                        item.completed 
                          ? "bg-success/5 border-success/20" 
                          : "bg-warning/5 border-warning/20"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <Checkbox
                            checked={item.completed}
                            onCheckedChange={() => toggleShoppingItem(item.id)}
                            className="data-[state=checked]:bg-success data-[state=checked]:border-success"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className={cn(
                                "font-semibold",
                                item.completed ? "text-success line-through" : "text-foreground"
                              )}>
                                {item.name}
                              </h3>
                              <Badge className={cn(
                                "text-xs",
                                item.priority === 'high' && "bg-danger text-danger-foreground",
                                item.priority === 'medium' && "bg-warning text-warning-foreground",
                                item.priority === 'low' && "bg-success text-success-foreground"
                              )}>
                                {item.priority === 'high' ? 'HOCH' : 
                                 item.priority === 'medium' ? 'MITTEL' : 'NIEDRIG'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Menge: {item.quantity} {item.unit}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-bold text-foreground">
                            €{item.estimatedCost.toFixed(2)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.quantity} × €{(item.estimatedCost / item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card className="card-elevation-2">
          <CardContent className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-success/20 rounded-2xl flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Alle Bestände ausreichend!</h3>
            <p className="text-muted-foreground">
              Aktuell müssen keine Artikel eingekauft werden. Alle Zutaten sind über dem Mindestbestand.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ShoppingList;