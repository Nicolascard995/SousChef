# 🎨 REGLAS DEL SISTEMA DE COLORES - KÜCHEN-MEISTER

## 🚫 **COLORES PROHIBIDOS (NO USAR NUNCA)**

### **Variables CSS Obsoletas**
```css
/* ❌ NUNCA USAR ESTOS COLORES */
--urgent          /* → Usar --danger */
--normal          /* → Usar --warning */
--ok              /* → Usar --success */
--chef-nico       /* → Usar --chef-1 */
--chef-marco      /* → Usar --chef-2 */
--chef-sofia      /* → Usar --chef-3 */
--chef-david      /* → Usar --chef-4 */
--chef-emma       /* → Usar --chef-5 */
--chef-lucas      /* → Usar --chef-6 */
--chef-anna       /* → Usar --chef-7 */
--header-start    /* → Usar --secondary */
--header-end      /* → Usar --muted */
```

### **Colores Hardcodeados Prohibidos**
```css
/* ❌ NUNCA USAR HEX CODES DIRECTOS */
#ef4444           /* → Usar hsl(var(--chef-1)) */
#3b82f6           /* → Usar hsl(var(--chef-2)) */
#f59e0b           /* → Usar hsl(var(--chef-3)) */
#22c55e           /* → Usar hsl(var(--chef-4)) */
#8b5cf6           /* → Usar hsl(var(--chef-5)) */
#f97316           /* → Usar hsl(var(--chef-6)) */
#06b6d4           /* → Usar hsl(var(--chef-7)) */
#ec4899           /* → Usar hsl(var(--chef-8)) */
```

## ✅ **SISTEMA DE COLORES CORRECTO**

### **Colores Principales (5)**
```css
--primary: 213 84% 59%      /* #2563eb - Azul corporativo */
--success: 158 68% 38%      /* #059669 - Verde éxito */
--warning: 25 87% 42%       /* #d97706 - Naranja advertencia */
--danger: 220 38 38%        /* #dc2626 - Rojo crítico */
--secondary: 218 11% 56%    /* #64748b - Gris medio */
```

### **Neutros (5)**
```css
--background: 0 0% 100%     /* #ffffff - Fondo principal */
--surface: 210 40% 98%      /* #f8fafc - Superficie secundaria */
--text: 222 84% 5%          /* #0f172a - Texto principal */
--text-muted: 218 11% 56%   /* #64748b - Texto secundario */
--border: 214 32% 91%       /* #e2e8f0 - Bordes */
```

### **Chefs (10 colores)**
```css
--chef-1: 0 84% 60%         /* #ef4444 - Rojo */
--chef-2: 21 90% 56%        /* #f97316 - Naranja */
--chef-3: 48 96% 53%        /* #eab308 - Amarillo */
--chef-4: 142 76% 47%       /* #22c55e - Verde */
--chef-5: 188 95% 44%       /* #06b6d4 - Cyan */
--chef-6: 217 91% 60%       /* #3b82f6 - Azul */
--chef-7: 262 83% 58%       /* #8b5cf6 - Púrpura */
--chef-8: 330 81% 60%       /* #ec4899 - Rosa */
--chef-9: 84 81% 44%        /* #84cc16 - Lima */
--chef-10: 38 92% 50%       /* #f59e0b - Ámbar */
```

## 🔧 **USO CORRECTO EN COMPONENTES**

### **Estados Semánticos**
```tsx
// ✅ CORRECTO - Estados de stock
const getStockStatus = (ingredient: Ingredient) => {
  if (ingredient.currentStock === 0) return 'danger';      // ❌ NO 'urgent'
  if (ingredient.currentStock < ingredient.minStock) return 'warning';  // ❌ NO 'normal'
  return 'success';                                         // ❌ NO 'ok'
};

// ✅ CORRECTO - Colores de chefs
const colors = [
  'hsl(var(--chef-1))', 'hsl(var(--chef-2))', 'hsl(var(--chef-3))',
  'hsl(var(--chef-4))', 'hsl(var(--chef-5))', 'hsl(var(--chef-6))',
  'hsl(var(--chef-7))', 'hsl(var(--chef-8))'
];

// ❌ INCORRECTO - Colores hardcodeados
const colors = ['#ef4444', '#3b82f6', '#f59e0b']; // NO USAR
```

### **Clases CSS Correctas**
```tsx
// ✅ CORRECTO - Estados de alerta
className="text-danger bg-danger/5 border-danger/20"    // ❌ NO text-urgent
className="text-warning bg-warning/5 border-warning/20" // ❌ NO text-normal
className="text-success bg-success/5 border-success/20" // ❌ NO text-ok

// ✅ CORRECTO - Colores de chefs
style={{ backgroundColor: 'hsl(var(--chef-1))' }}      // ❌ NO #ef4444
```

## 🚨 **CHECKLIST ANTES DE COMMIT**

### **Verificación Automática**
```bash
# Buscar colores prohibidos
grep -r "urgent\|normal\|ok" src/ --include="*.tsx" --include="*.ts"
grep -r "chef-nico\|chef-marco\|chef-sofia" src/ --include="*.tsx" --include="*.ts"
grep -r "#[0-9a-fA-F]\{6\}" src/ --include="*.tsx" --include="*.ts"
grep -r "header-start\|header-end" src/ --include="*.tsx" --include="*.ts"
```

### **Verificación Manual**
- [ ] ¿Usé `danger` en lugar de `urgent`?
- [ ] ¿Usé `success` en lugar de `ok`?
- [ ] ¿Usé `warning` en lugar de `normal`?
- [ ] ¿Usé `hsl(var(--chef-X))` en lugar de hex codes?
- [ ] ¿Usé `secondary` y `muted` en lugar de `header-start/end`?

## 📚 **REFERENCIAS RÁPIDAS**

### **Mapeo de Estados**
```tsx
// Stock crítico (0)
status === 'danger' → text-danger + bg-danger/5 + border-danger/20

// Stock bajo (< mínimo)
status === 'warning' → text-warning + bg-warning/5 + border-warning/20

// Stock OK (> mínimo)
status === 'success' → text-success + bg-success/5 + border-success/20
```

### **Mapeo de Chefs**
```tsx
// Chefs existentes
Nico → chef-1 (rojo)
Marco → chef-2 (naranja)
Sofia → chef-3 (amarillo)
David → chef-4 (verde)
Emma → chef-5 (cyan)
Lucas → chef-6 (azul)
Anna → chef-7 (púrpura)

// Chefs disponibles
chef-8 (rosa)
chef-9 (lima)
chef-10 (ámbar)
```

## 🎯 **OBJETIVO: CERO INCONSISTENCIAS**

**Recuerda**: Cada vez que uses un color, pregúntate:
1. ¿Es parte del sistema simplificado?
2. ¿Uso la variable CSS correcta?
3. ¿Sigo las convenciones semánticas?
4. ¿Puedo reutilizar un color existente?

**Resultado**: Un sistema de colores consistente, mantenible y escalable.
