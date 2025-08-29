import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { KitchenStats, Chef, Ingredient } from "../types/kitchen";
import { TrendingUp, AlertTriangle, ShoppingCart, Users, Euro, ChefHat, Package, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardProps {
  stats: KitchenStats;
  chefs: Chef[];
  ingredients: Ingredient[];
  weeklyBudget: number;
  setWeeklyBudget: (budget: number) => void;
}

const Dashboard = ({ stats, chefs, ingredients, weeklyBudget, setWeeklyBudget }: DashboardProps) => {
  const [editingBudget, setEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState(weeklyBudget.toString());

  const budgetPercentage = (stats.weeklySpent / stats.weeklyBudget) * 100;
  const isBudgetExceeded = budgetPercentage > 100;

  const criticalIngredients = ingredients.filter(i => i.currentStock === 0);
  const lowStockIngredients = ingredients.filter(i => i.currentStock > 0 && i.currentStock < i.minStock);

  const handleBudgetSave = () => {
    const newBudget = parseFloat(budgetInput);
    if (!isNaN(newBudget) && newBudget > 0) {
      setWeeklyBudget(newBudget);
    }
    setEditingBudget(false);
  };

  const getChefById = (id: string) => chefs.find(chef => chef.id === id);

  return (
    <div className="space-y-8 p-8 bg-gradient-to-br from-background to-muted/30 min-h-screen">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-professional">
          <ChefHat className="h-6 w-6 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Küchen-Übersicht
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Bestandsmanagement für professionelle Küchenbrigade - Übersicht, Kontrolle, Effizienz
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Critical Items Card */}
        <Card className={cn(
          "card-elevation-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-professional-lg border-l-4",
          stats.criticalItems > 0 ? "border-l-danger bg-gradient-to-br from-danger/5 to-white" : "border-l-muted"
        )}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-foreground">Dringende Artikel</CardTitle>
            <div className={cn(
              "p-2 rounded-full",
              stats.criticalItems > 0 ? "bg-danger/10" : "bg-muted/50"
            )}>
              <AlertTriangle className={cn(
                "h-5 w-5",
                stats.criticalItems > 0 ? 'text-danger animate-pulse-glow' : 'text-muted-foreground'
              )} />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className={cn(
              "text-3xl font-bold",
              stats.criticalItems > 0 ? "text-danger" : "text-muted-foreground"
            )}>
              {stats.criticalItems}
            </div>
            <p className="text-xs text-muted-foreground font-medium">Bestand = 0</p>
            {stats.criticalItems > 0 && (
                      <div className="w-full bg-danger/20 rounded-full h-1.5">
          <div className="bg-danger h-1.5 rounded-full animate-pulse-glow" style={{ width: '100%' }} />
        </div>
            )}
          </CardContent>
        </Card>

        {/* Shopping List Card */}
        <Card className="card-elevation-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-professional-lg border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-foreground">Einkaufsliste</CardTitle>
            <div className="p-2 rounded-full bg-primary/10">
              <ShoppingCart className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold text-foreground">{stats.shoppingItems}</div>
            <p className="text-xs text-muted-foreground font-medium">Zu kaufende Artikel</p>
            <div className="w-full bg-primary/20 rounded-full h-1.5">
              <div className="bg-primary h-1.5 rounded-full transition-all duration-500" style={{ width: `${Math.min((stats.shoppingItems / 20) * 100, 100)}%` }} />
            </div>
          </CardContent>
        </Card>

        {/* Budget Card */}
        <Card className={cn(
          "card-elevation-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-professional-lg border-l-4",
          isBudgetExceeded ? "border-l-danger bg-gradient-to-br from-danger/5 to-white" : "border-l-success bg-gradient-to-br from-success/5 to-white"
        )}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-foreground">Wochenkosten</CardTitle>
            <div className={cn(
              "p-2 rounded-full",
              isBudgetExceeded ? "bg-danger/10" : "bg-success/10"
            )}>
              <Euro className={cn(
                "h-5 w-5",
                isBudgetExceeded ? 'text-danger' : 'text-success'
              )} />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className={cn(
              "text-3xl font-bold",
              isBudgetExceeded ? "text-danger" : "text-success"
            )}>
              €{stats.weeklySpent.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground font-medium">von €{stats.weeklyBudget.toFixed(2)}</p>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                isBudgetExceeded ? "bg-danger" : "bg-success"
              )} style={{ width: `${Math.min(budgetPercentage, 100)}%` }} />
            </div>
          </CardContent>
        </Card>

        {/* Active Chefs Card */}
        <Card className="card-elevation-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-professional-lg border-l-4 border-l-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-foreground">Aktive Köche</CardTitle>
            <div className="p-2 rounded-full bg-secondary/10">
              <Users className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold text-foreground">{stats.activeChefs}</div>
            <p className="text-xs text-muted-foreground font-medium">Küchenbrigade</p>
            <div className="flex -space-x-2">
              {chefs.slice(0, 4).map((chef, index) => (
                <div
                  key={chef.id}
                  className="w-6 h-6 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: chef.color }}
                >
                  {chef.avatar}
                </div>
              ))}
              {chefs.length > 4 && (
                <div className="w-6 h-6 rounded-full bg-muted border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold text-muted-foreground">
                  +{chefs.length - 4}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress Section */}
      <Card className="card-elevation-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold">Wochenbudget Übersicht</CardTitle>
              <p className="text-sm text-muted-foreground">
                Kostenkontrolle und Ausgabenverfolgung
              </p>
            </div>
            {editingBudget ? (
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                  className="input-professional w-32"
                  placeholder="Budget"
                />
                <Button onClick={handleBudgetSave} className="btn-primary">
                  Speichern
                </Button>
                <Button onClick={() => setEditingBudget(false)} variant="outline" className="btn-outline-contrast">
                  Abbrechen
                </Button>
              </div>
            ) : (
              <Button onClick={() => setEditingBudget(true)} className="btn-outline-contrast">
                Budget bearbeiten
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Budget Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ausgaben</span>
              <span className="font-medium">
                €{stats.weeklySpent.toFixed(2)} / €{stats.weeklyBudget.toFixed(2)}
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className={cn(
                  "progress-fill",
                  isBudgetExceeded ? "bg-danger" : "bg-success"
                )}
                style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>100%</span>
              {isBudgetExceeded && (
                <span className="text-danger font-medium">
                  +{((budgetPercentage - 100) * 100).toFixed(0)}% über Budget
                </span>
              )}
            </div>
          </div>

          {/* Budget Status */}
          <div className={cn(
            "p-4 rounded-xl border-2 text-center",
            isBudgetExceeded 
                              ? "bg-danger/5 border-danger/20 text-danger" 
              : "bg-success/5 border-success/20 text-success"
          )}>
            <div className="flex items-center justify-center gap-2 mb-2">
              {isBudgetExceeded ? (
                <AlertTriangle className="h-5 w-5 animate-pulse-glow" />
              ) : (
                <TrendingUp className="h-5 w-5" />
              )}
              <span className="font-semibold">
                {isBudgetExceeded ? 'Budget überschritten' : 'Budget im Rahmen'}
              </span>
            </div>
            <p className="text-sm opacity-90">
              {isBudgetExceeded 
                ? `€${(stats.weeklySpent - stats.weeklyBudget).toFixed(2)} über dem Limit`
                : `€${(stats.weeklyBudget - stats.weeklySpent).toFixed(2)} noch verfügbar`
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-elevation-2 hover:shadow-professional-lg transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Bestand prüfen</h3>
              <p className="text-sm text-muted-foreground">Aktuelle Lagerbestände überwachen</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevation-2 hover:shadow-professional-lg transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <ShoppingCart className="h-8 w-8 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Einkaufsliste</h3>
              <p className="text-sm text-muted-foreground">Fehlende Artikel bestellen</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevation-2 hover:shadow-professional-lg transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Clock className="h-8 w-8 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Zeit sparen</h3>
              <p className="text-sm text-muted-foreground">Effizientes Bestandsmanagement</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;