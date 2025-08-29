import { useState } from 'react';
import { useTouchGestures } from '../hooks/useTouchGestures';
import { Button } from './ui/button';
import { Edit, Trash2, Move } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  currentStock: number;
  unit: string;
  estimatedPrice: number;
  minStock: number;
  maxStock: number;
}

interface SwipeableIngredientCardProps {
  ingredient: Ingredient;
  onEdit: () => void;
  onDelete: () => void;
  onMove: () => void;
}

export const SwipeableIngredientCard = ({
  ingredient,
  onEdit,
  onDelete,
  onMove
}: SwipeableIngredientCardProps) => {
  const [showActions, setShowActions] = useState(false);

  const { onTouchStart, onTouchEnd } = useTouchGestures({
    onSwipeLeft: () => setShowActions(true),
    onSwipeRight: () => setShowActions(false),
    threshold: 80
  });

  return (
    <div
      className="relative overflow-hidden bg-card border rounded-lg"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Contenido principal */}
      <div className={`p-4 transition-transform ${showActions ? '-translate-x-20' : ''}`}>
        <h3 className="font-semibold">{ingredient.name}</h3>
        <p className="text-sm text-muted-foreground">
          {ingredient.currentStock} {ingredient.unit} en stock
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-bold">€{ingredient.estimatedPrice}</span>
          <span className="text-xs text-muted-foreground">por {ingredient.unit}</span>
        </div>
      </div>

      {/* Acciones de swipe */}
      <div className={`absolute right-0 top-0 h-full flex transition-transform ${
        showActions ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <Button
          variant="secondary"
          size="sm"
          onClick={onEdit}
          className="rounded-none h-full px-3"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onMove}
          className="rounded-none h-full px-3"
        >
          <Move className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          className="rounded-none h-full px-3"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
