import { useState } from 'react';
import { useDeviceType } from '../hooks/useDeviceType';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, X } from 'lucide-react';

interface MobileNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  criticalItems: number;
  shoppingItems: number;
}

const MobileNavigation = ({
  activeTab,
  setActiveTab,
  criticalItems,
  shoppingItems
}: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useDeviceType();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'inventory', label: 'Inventario', icon: '📦' },
    { id: 'shopping', label: 'Compras', icon: '🛒', badge: shoppingItems },
    { id: 'chefs', label: 'Chefs', icon: '👨‍🍳' }
  ];

  if (!isMobile) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-80">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menú</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="flex-1 p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </div>
                {tab.badge && (
                  <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
