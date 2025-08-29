import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BarChart3, ShoppingCart, Menu as MenuIcon, Users, ChefHat, AlertTriangle } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  criticalItems: number;
  shoppingItems: number;
}

const Navigation = ({ activeTab, setActiveTab, criticalItems, shoppingItems }: NavigationProps) => {
  const tabs = [
    { 
      id: 'dashboard', 
      label: 'Übersicht', 
      icon: BarChart3,
      badge: criticalItems > 0 ? criticalItems : undefined,
      badgeColor: 'bg-danger text-danger-foreground'
    },
    { 
      id: 'shopping', 
      label: 'Einkaufsliste', 
      icon: ShoppingCart,
      badge: shoppingItems > 0 ? shoppingItems : undefined,
      badgeColor: 'bg-primary text-primary-foreground'
    },
    { 
      id: 'inventory', 
      label: 'Bestände', 
      icon: MenuIcon,
      badge: undefined,
      badgeColor: ''
    },
    { 
      id: 'chefs', 
      label: 'Köche', 
      icon: Users,
      badge: undefined,
      badgeColor: ''
    },
  ];

  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-700 shadow-professional-lg">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Logo and Brand Section */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-professional border border-white/30">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-sm">
                Küchen-Meister
              </h1>
              <p className="text-white/90 text-sm font-medium drop-shadow-sm">
                Professionelles Inventar-Management
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - CONTRASTE PROFESIONAL */}
        <nav className="flex items-center justify-center">
          <div className="flex space-x-3 bg-white/25 backdrop-blur-sm rounded-2xl p-2 shadow-professional border border-white/30">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative flex items-center gap-3 px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300 min-h-[56px] group",
                    isActive 
                      ? "bg-white text-slate-800 shadow-professional scale-[1.02] border border-white/50" 
                      : "text-white hover:text-white hover:bg-white/30 border border-transparent"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    isActive ? "scale-110" : "group-hover:scale-105"
                  )} />
                  <span className="hidden sm:inline font-medium">{tab.label}</span>
                  
                  {tab.badge && (
                    <div
                      className={cn(
                        "ml-2 px-3 py-1.5 text-xs font-bold rounded-full shadow-professional transition-all duration-200",
                        isActive 
                          ? "bg-danger text-white animate-pulse-glow" 
                          : tab.badgeColor === 'bg-danger text-danger-foreground'
                            ? "bg-danger text-white animate-pulse-glow"
                            : "bg-primary text-white"
                      )}
                    >
                      {tab.badge}
                    </div>
                  )}
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-slate-800 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Critical Items Alert Banner - ALTO CONTRASTE */}
        {criticalItems > 0 && (
          <div className="mt-6 bg-gradient-to-r from-slate-100 to-white border-2 border-danger/60 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-center gap-3">
              <div className="bg-danger rounded-full p-2 animate-pulse-glow shadow-lg">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div className="text-center">
                <p className="text-slate-800 font-bold text-sm">
                  ⚠️ {criticalItems} Artikel sind kritisch niedrig!
                </p>
                <p className="text-slate-600 font-medium text-xs">
                  Sofortige Bestellung erforderlich
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;