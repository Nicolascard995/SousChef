import { useState } from 'react';
import { useDeviceType } from '../hooks/useDeviceType';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Filter, Plus } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  currentStock: number;
  unit: string;
  estimatedPrice: number;
  minStock: number;
  maxStock: number;
}

interface MobileInventoryProps {
  ingredients: Ingredient[];
  onAddIngredient: (ingredient: Omit<Ingredient, 'id'>) => void;
}

const MobileInventory = ({ ingredients, onAddIngredient }: MobileInventoryProps) => {
  const { isMobile } = useDeviceType();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  if (!isMobile) return null;

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 p-4">
      {/* Header con búsqueda y filtros */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar ingredientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
        </Button>
        <Button size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Filtros expandibles */}
      {showFilters && (
        <div className="bg-muted p-3 rounded-lg space-y-2">
          <div className="flex gap-2 overflow-x-auto">
            {['Todos', 'Carne', 'Pescado', 'Verduras', 'Lácteos'].map((category) => (
              <Button key={category} variant="secondary" size="sm">
                {category}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Lista de ingredientes en cards */}
      <div className="space-y-3">
        {filteredIngredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="bg-card border rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold">{ingredient.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {ingredient.currentStock} {ingredient.unit} en stock
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">
                  €{ingredient.estimatedPrice}
                </div>
                <div className="text-xs text-muted-foreground">
                  por {ingredient.unit}
                </div>
              </div>
            </div>
            
            {/* Barra de progreso de stock */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Stock mínimo: {ingredient.minStock}</span>
                <span>Stock máximo: {ingredient.maxStock}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min(
                      (ingredient.currentStock / ingredient.maxStock) * 100,
                      100
                    )}%`
                  }}
                />
              </div>
            </div>

            {/* Acciones rápidas */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Editar
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Mover
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileInventory;
