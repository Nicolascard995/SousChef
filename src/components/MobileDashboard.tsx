import { useDeviceType } from '../hooks/useDeviceType';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface KitchenStats {
  criticalItems: number;
  shoppingItems: number;
  totalIngredients: number;
  totalValue: number;
}

interface Chef {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  color: string;
}

interface MobileDashboardProps {
  stats: KitchenStats;
  chefs: Chef[];
}

const MobileDashboard = ({ stats, chefs }: MobileDashboardProps) => {
  const { isMobile } = useDeviceType();

  if (!isMobile) return null;

  return (
    <div className="space-y-4 p-4">
      {/* Métricas en cards apiladas */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Items Críticos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {stats.criticalItems}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Lista Compras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {stats.shoppingItems}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métricas adicionales */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Ingredientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {stats.totalIngredients}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Valor Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              €{stats.totalValue.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chefs en scroll horizontal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Chefs Activos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {chefs.map((chef) => (
              <div
                key={chef.id}
                className="flex-shrink-0 text-center"
                style={{ minWidth: '80px' }}
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: chef.color }}
                >
                  {chef.avatar}
                </div>
                <p className="text-sm font-medium">{chef.name}</p>
                <p className="text-xs text-muted-foreground">{chef.specialty}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileDashboard;
