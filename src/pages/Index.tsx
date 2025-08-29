import { useState } from 'react';
import { useKitchenData } from '../hooks/useKitchenData';
import { useAuth } from '../hooks/useAuth';
import Navigation from '../components/Navigation';
import MobileNavigation from '../components/MobileNavigation';
import Dashboard from '../components/Dashboard';
import MobileDashboard from '../components/MobileDashboard';
import ShoppingList from '../components/ShoppingList';
import Inventory from '../components/Inventory';
import MobileInventory from '../components/MobileInventory';
import ChefManagement from '../components/ChefManagement';
import AdvancedIngredientManager from '../components/AdvancedIngredientManager';
import Login from '../components/Login';
import { Button } from '../components/ui/button';
import SecurityWatermark from '../components/SecurityWatermark';
import { useDeviceType } from '../hooks/useDeviceType';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const kitchenData = useKitchenData();
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  const { isMobile } = useDeviceType();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return isMobile ? (
          <MobileDashboard
            stats={kitchenData.stats}
            chefs={kitchenData.chefs}
          />
        ) : (
          <Dashboard
            stats={kitchenData.stats}
            chefs={kitchenData.chefs}
            ingredients={kitchenData.ingredients}
            weeklyBudget={kitchenData.weeklyBudget}
            setWeeklyBudget={kitchenData.setWeeklyBudget}
          />
        );
      case 'shopping':
        return (
          <ShoppingList
            chefs={kitchenData.chefs}
            shoppingList={kitchenData.shoppingList}
            toggleShoppingItem={kitchenData.toggleShoppingItem}
            markAllChefItemsCompleted={kitchenData.markAllChefItemsCompleted}
          />
        );
      case 'inventory':
        return isMobile ? (
          <MobileInventory
            ingredients={kitchenData.ingredients}
            onAddIngredient={kitchenData.addIngredient}
          />
        ) : (
          <AdvancedIngredientManager
            chefs={kitchenData.chefs}
            ingredients={kitchenData.ingredients}
            storageLocations={kitchenData.storageLocations}
            onAddIngredient={kitchenData.addIngredient}
            onUpdateIngredient={kitchenData.updateIngredient}
            onDeleteIngredient={kitchenData.deleteIngredient}
            onMoveIngredient={kitchenData.moveIngredient}
          />
        );
      case 'chefs':
        return (
          <ChefManagement
            chefs={kitchenData.chefs}
            ingredients={kitchenData.ingredients}
            shoppingList={kitchenData.shoppingList}
            updateChef={kitchenData.updateChef}
            addChef={kitchenData.addChef}
          />
        );
      default:
        return null;
    }
  };

  // 🆕 MOSTRAR LOGIN SI NO ESTÁ AUTENTICADO
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Laden...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* 🆕 TU LOGO PERSONALIZADO */}
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 p-2">
                <img 
                  src="/logo-horizontal.svg" 
                  alt="Nico3D Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-sm">Küchen-Inventar</h1>
                <p className="text-sm text-slate-300">Professionelle Bestandsverwaltung</p>
                <p className="text-xs text-slate-400">Powered by Nico3D</p>
              </div>
            </div>
            
            {/* 🆕 INFO DE USUARIO Y LOGOUT */}
            <div className="flex items-center gap-4">
              <div className="text-right text-white">
                <p className="text-sm font-medium">{user?.username}</p>
                <p className="text-xs text-slate-300 capitalize">{user?.role}</p>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="border-white/40 text-white hover:bg-white/20 hover:border-white/60 bg-slate-700/50"
              >
                Abmelden
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      {isMobile ? (
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600">
          <h2 className="text-lg font-semibold text-white">Küchen-Inventar</h2>
          <MobileNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            criticalItems={kitchenData.stats.criticalItems}
            shoppingItems={kitchenData.stats.shoppingItems}
          />
        </div>
      ) : (
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          criticalItems={kitchenData.stats.criticalItems}
          shoppingItems={kitchenData.stats.shoppingItems}
        />
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto">
        {renderActiveTab()}
      </main>
      
      {/* 🆕 MARCA DE AGUA DE SEGURIDAD */}
      <SecurityWatermark />
    </div>
  );
};

export default Index;
