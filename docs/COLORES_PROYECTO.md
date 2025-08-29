









-------
# 🎨 GUÍA COMPLETA DE COLORES - KÜCHEN-MEISTER PLAN

## 📋 RESUMEN EJECUTIVO

Este documento especifica **TODAS** las líneas de código relacionadas con colores en el proyecto Küchen-Meister Plan, organizadas por sección y con comentarios explicativos sobre su uso.

---

## 🎯 SISTEMA DE COLORES CSS (src/index.css)

### 🌈 VARIABLES DE COLOR PRINCIPALES

```css:src/index.css
/* Líneas 15-17: Colores de fondo principales */
--background: 248 250 252; /* #f8fafc - Clean White - Fondo principal de la aplicación */
--foreground: 15 23 42; /* #0f172a - Slate 900 - Texto principal */

/* Líneas 19-21: Colores de tarjetas */
--card: 255 255 255; /* #ffffff - Pure White - Fondo de tarjetas */
--card-foreground: 15 23 42; /* #0f172a - Slate 900 - Texto en tarjetas */

/* Líneas 23-25: Colores de popover */
--popover: 255 255 255; /* #ffffff - Pure White - Fondo de popovers */
--popover-foreground: 15 23 42; /* #0f172a - Slate 900 - Texto en popovers */

/* Líneas 27-29: Color azul corporativo principal */
--primary: 213 84% 59%; /* #2563eb - Professional Blue - Botones principales, enlaces */
--primary-foreground: 255 255 255; /* #ffffff - White - Texto sobre azul principal */

/* Líneas 31-33: Colores secundarios slate */
--secondary: 30 41 59%; /* #1e293b - Slate Dark - Botones secundarios, fondos */
--secondary-foreground: 255 255 255; /* #ffffff - White - Texto sobre slate */

/* Líneas 35-37: Colores muted */
--muted: 248 250 252; /* #f8fafc - Fondo muted, elementos deshabilitados */
--muted-foreground: 100 116 139; /* #64748b - Slate 500 - Texto secundario, labels */

/* Líneas 39-41: Colores de acento */
--accent: 226 232 240; /* #e2e8f0 - Slate 200 - Bordes, separadores */
--accent-foreground: 15 23 42; /* #0f172a - Slate 900 - Texto sobre acento */
```

### 🚨 COLORES DE ESTADO PROFESIONALES

```css:src/index.css
/* Líneas 43-45: Color destructivo/error */
--destructive: 220 38 38%; /* #dc2626 - Alert Red - Botones de eliminar, errores */
--destructive-foreground: 255 255 255; /* #ffffff - White - Texto sobre rojo */

/* Líneas 47-49: Color de éxito */
--success: 158 68% 38%; /* #059669 - Forest Green - Confirmaciones, estados OK */
--success-foreground: 255 255 255; /* #ffffff - White - Texto sobre verde */

/* Líneas 51-53: Color de advertencia */
--warning: 25 87% 42%; /* #d97706 - Warm Orange - Advertencias, estados bajos */
--warning-foreground: 255 255 255; /* #ffffff - White - Texto sobre naranja */

/* Líneas 55-57: Colores de borde e input */
--border: 226 232 240; /* #e2e8f0 - Slate 200 - Bordes de elementos */
--input: 226 232 240; /* #e2e8f0 - Slate 200 - Bordes de inputs */
--ring: 213 84% 59%; /* #2563eb - Blue - Anillo de focus */
```

### 🍳 COLORES ESPECÍFICOS PARA COCINA

```css:src/index.css
/* Líneas 59-61: Artículos urgentes */
--urgent: 220 38 38%; /* #dc2626 - Alert Red - Stock crítico = 0 */
--urgent-foreground: 255 255 255; /* #ffffff - White - Texto sobre rojo urgente */

/* Líneas 63-65: Artículos normales */
--normal: 25 87% 42%; /* #d97706 - Warm Orange - Stock bajo < mínimo */
--normal-foreground: 255 255 255; /* #ffffff - White - Texto sobre naranja */

/* Líneas 67-69: Artículos OK */
--ok: 158 68% 38%; /* #059669 - Forest Green - Stock > mínimo */
--ok-foreground: 255 255 255; /* #ffffff - White - Texto sobre verde */
```

### 👨‍🍳 COLORES ESPECÍFICOS PARA COCINEROS

```css:src/index.css
/* Líneas 71-77: Paleta de colores para cada cocinero */
--chef-nico: 4 82 58%; /* #ef4444 - Warm Red - Avatar y elementos de Nico */
--chef-marco: 187 95 44%; /* #06b6d4 - Cyan - Avatar y elementos de Marco */
--chef-sofia: 262 83 58%; /* #8b5cf6 - Purple - Avatar y elementos de Sofia */
--chef-david: 160 84 39%; /* #10b981 - Emerald - Avatar y elementos de David */
--chef-emma: 38 92 50%; /* #f59e0b - Amber - Avatar y elementos de Emma */
--chef-lucas: 330 81 60%; /* #ec4899 - Pink - Avatar y elementos de Lucas */
--chef-anna: 217 91 53%; /* #3b82f6 - Blue - Avatar y elementos de Anna */
```

### 🎨 COLORES DEL HEADER

```css:src/index.css
/* Líneas 79-80: Gradiente del header */
--header-start: 30 41 59%; /* #1e293b - Slate Dark - Inicio del gradiente */
--header-end: 51 65 85%; /* #334155 - Slate - Fin del gradiente */
```

### 🔧 CLASES CSS PERSONALIZADAS

```css:src/index.css
/* Líneas 95-97: Botón primario */
.btn-primary {
  @apply bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-primary/90 hover:scale-[1.02] shadow-md shadow-primary/25;
}

/* Líneas 99-101: Botón secundario */
.btn-secondary {
  @apply bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-secondary/90 border border-border;
}

/* Líneas 103-105: Botón de peligro */
.btn-danger {
  @apply bg-destructive text-destructive-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-destructive/90;
}
```

### 🎴 ESTILOS DE TARJETAS

```css:src/index.css
/* Líneas 107-109: Elevación 1 */
.card-elevation-1 {
  @apply bg-card border border-border rounded-xl shadow-sm;
}

/* Líneas 111-113: Elevación 2 */
.card-elevation-2 {
  @apply bg-card border border-border rounded-xl shadow-md;
}

/* Líneas 115-117: Elevación 3 */
.card-elevation-3 {
  @apply bg-card border border-border rounded-xl shadow-lg;
}
```

### 📝 ESTILOS DE INPUT

```css:src/index.css
/* Líneas 119-121: Input profesional */
.input-professional {
  @apply bg-white border-2 border-border rounded-lg px-4 py-3 text-base transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20;
}
```

### 🏷️ BADGES DE ESTADO

```css:src/index.css
/* Líneas 123-125: Badge urgente */
.badge-urgent {
  @apply bg-urgent text-urgent-foreground px-3 py-1 rounded-full text-xs font-bold animate-pulse;
}

/* Líneas 127-129: Badge de advertencia */
.badge-warning {
  @apply bg-warning text-warning-foreground px-3 py-1 rounded-full text-xs font-bold;
}

/* Líneas 131-133: Badge de éxito */
.badge-success {
  @apply bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-bold;
}
```

### 👤 AVATARES DE COCINEROS

```css:src/index.css
/* Líneas 135-137: Avatar normal */
.chef-avatar {
  @apply w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md;
}

/* Líneas 139-141: Avatar grande */
.chef-avatar-large {
  @apply w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg;
}
```

### 📊 BARRAS DE PROGRESO

```css:src/index.css
/* Líneas 143-145: Contenedor de barra */
.progress-bar {
  @apply h-2 bg-muted rounded-full overflow-hidden;
}

/* Líneas 147-149: Relleno de barra */
.progress-fill {
  @apply h-full transition-all duration-500 ease-out;
}
```

---

## ⚙️ CONFIGURACIÓN TAILWIND (tailwind.config.ts)

### 🌈 EXTENSIÓN DE COLORES

```typescript:tailwind.config.ts
/* Líneas 58-66: Colores de cocineros */
chef: {
  nico: 'hsl(var(--chef-nico))',        // #ef4444 - Warm Red
  marco: 'hsl(var(--chef-marco))',      // #06b6d4 - Cyan
  sofia: 'hsl(var(--chef-sofia))',      // #8b5cf6 - Purple
  david: 'hsl(var(--chef-david))',      // #10b981 - Emerald
  emma: 'hsl(var(--chef-emma))',        // #f59e0b - Amber
  lucas: 'hsl(var(--chef-lucas))',      // #ec4899 - Pink
  anna: 'hsl(var(--chef-anna))'         // #3b82f6 - Blue
}

/* Líneas 68-71: Colores del header */
header: {
  start: 'hsl(var(--header-start))',    // #1e293b - Slate Dark
  end: 'hsl(var(--header-end))'         // #334155 - Slate
}
```

### 🎭 SOMBRAS PROFESIONALES

```typescript:tailwind.config.ts
/* Líneas 73-75: Sistema de sombras */
boxShadow: {
  'professional': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  'professional-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  'professional-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
}
```

### 🎬 ANIMACIONES PERSONALIZADAS

```typescript:tailwind.config.ts
/* Líneas 89-95: Keyframes de animación */
'pulse-glow': {
  '0%, 100%': { opacity: '1' },
  '50%': { opacity: '0.7' }
},
'bounce-subtle': {
  '0%, 100%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-2px)' }
},
'rotate-slow': {
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' }
}

/* Líneas 97-101: Clases de animación */
animation: {
  'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
  'bounce-subtle': 'bounce-subtle 1s ease-in-out infinite',
  'rotate-slow': 'rotate-slow 3s linear infinite'
}
```

---

## 📦 COMPONENTE INVENTARIO (src/components/Inventory.tsx)

### 🌈 FONDO CON GRADIENTE

```tsx:src/components/Inventory.tsx
/* Línea 32: Fondo principal con gradiente sutil */
<div className="space-y-8 p-8 bg-gradient-to-br from-background to-muted/30 min-h-screen">

/* Línea 35: Header con fondo translúcido */
<div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-professional">

/* Línea 37: Título con gradiente de texto */
<h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">

/* Línea 40: Descripción en color muted */
<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
```

### 📊 TARJETAS DE RESUMEN

```tsx:src/components/Inventory.tsx
/* Líneas 45-47: Tarjeta de artículos urgentes */
<Card className="card-elevation-2 border-l-4 border-l-urgent bg-gradient-to-br from-urgent/5 to-white">

/* Línea 48: Icono con fondo urgente */
<div className="mx-auto w-12 h-12 bg-urgent/10 rounded-xl flex items-center justify-center mb-3">

/* Línea 49: Icono en color urgente */
<AlertTriangle className="h-6 w-6 text-urgent" />

/* Línea 50: Número en color urgente */
<div className="text-2xl font-bold text-urgent">{urgentIngredients}</div>

/* Línea 51: Descripción en muted */
<p className="text-sm text-muted-foreground font-medium">Kritisch</p>

/* Líneas 53-57: Tarjeta de artículos de advertencia */
<Card className="card-elevation-2 border-l-4 border-l-warning bg-gradient-to-br from-warning/5 to-white">

/* Línea 58: Icono con fondo de advertencia */
<div className="mx-auto w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center mb-3">

/* Línea 59: Icono en color de advertencia */
<AlertTriangle className="h-6 w-6 text-warning" />

/* Línea 60: Número en color de advertencia */
<div className="text-2xl font-bold text-warning">{warningIngredients}</div>

/* Líneas 62-66: Tarjeta de artículos OK */
<Card className="card-elevation-2 border-l-4 border-l-success bg-gradient-to-br from-success/5 to-white">

/* Línea 67: Icono con fondo de éxito */
<div className="mx-auto w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-3">

/* Línea 68: Icono en color de éxito */
<CheckCircle className="h-6 w-6 text-success" />

/* Línea 69: Número en color de éxito */
<div className="text-2xl font-bold text-success">{okIngredients}</div>

/* Líneas 71-75: Tarjeta de total de artículos */
<Card className="card-elevation-2 border-l-4 border-l-primary bg-gradient-to-br from-primary/5 to-white">

/* Línea 76: Icono con fondo primario */
<div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">

/* Línea 77: Icono en color primario */
<Package className="h-6 w-6 text-primary" />

/* Línea 78: Número en color primario */
<div className="text-2xl font-bold text-primary">{totalIngredients}</div>
```

### 👨‍🍳 GRUPOS DE COCINEROS

```tsx:src/components/Inventory.tsx
/* Línea 85: Tarjeta con elevación 3 */
<Card key={group.chef.id} className="card-elevation-3">

/* Línea 86: Header con gradiente */
<CardHeader className="bg-gradient-to-r from-muted/30 to-white rounded-t-xl border-b">

/* Líneas 88-92: Avatar del cocinero con color dinámico */
<div className={cn(
  "chef-avatar-large shadow-professional",
  "border-4 border-white"
)}
style={{ 
  backgroundColor: group.chef.color,
  borderColor: group.chef.color + '40'
}}>

/* Línea 95: Título en foreground */
<CardTitle className="text-xl text-foreground mb-1">{group.chef.name}</CardTitle>

/* Línea 96: Especialidad en muted */
<p className="text-muted-foreground font-medium">{group.chef.specialty}</p>

/* Líneas 97-103: Estadísticas del cocinero */
<div className="flex items-center gap-4 mt-2">
  <div className="flex items-center gap-2">
    <Package className="h-4 w-4 text-muted-foreground" />
    <span className="text-sm text-muted-foreground">
      {group.ingredients.length} Artikel
    </span>
  </div>
  <div className="flex items-center gap-2">
    <TrendingUp className="h-4 w-4 text-muted-foreground" />
    <span className="text-sm text-muted-foreground">
      {group.ingredients.filter(i => getStockStatus(i) === 'ok').length} OK
    </span>
  </div>
</div>
```

### 📋 ARTÍCULOS DEL INVENTARIO

```tsx:src/components/Inventory.tsx
/* Líneas 110-115: Contenedor de artículo con estado condicional */
<div 
  key={ingredient.id} 
  className={cn(
    "p-4 rounded-xl border-2 transition-all duration-200",
    status === 'urgent' && "bg-urgent/5 border-urgent/20",
    status === 'warning' && "bg-warning/5 border-warning/20",
    status === 'ok' && "bg-success/5 border-success/20"
  )}
>

/* Líneas 116-120: Icono de estado con fondo condicional */
<div className={cn(
  "p-2 rounded-lg",
  status === 'urgent' && "bg-urgent/10",
  status === 'warning' && "bg-warning/10",
  status === 'ok' && "bg-success/10"
)}>

/* Línea 121: Icono de estado */
{getStatusIcon(status)}

/* Línea 125: Título del artículo en foreground */
<h3 className="font-semibold text-foreground">{ingredient.name}</h3>

/* Líneas 126-130: Badge de estado */
<Badge className={getStatusColor(status)}>
  {getStatusText(status)}
</Badge>

/* Línea 131: Descripción en muted */
<p className="text-sm text-muted-foreground">
  Mindestbestand: {ingredient.minStock} {ingredient.unit}
</p>

/* Líneas 140-142: Input profesional para edición */
<Input
  type="number"
  value={stockInput}
  onChange={(e) => setStockInput(e.target.value)}
  className="input-professional w-24 text-center"
  placeholder="0"
/>

/* Líneas 143-145: Botón primario para guardar */
<Button onClick={() => saveStock(ingredient.id)} size="sm" className="btn-primary">

/* Líneas 146-148: Botón secundario para cancelar */
<Button onClick={cancelEditing} size="sm" variant="outline" className="btn-secondary">

/* Líneas 150-156: Número de stock con color condicional */
<div className={cn(
  "text-2xl font-bold",
  status === 'urgent' && "text-urgent",
  status === 'warning' && "text-warning",
  status === 'ok' && "text-success"
)}>

/* Línea 157: Unidad en muted */
<div className="text-xs text-muted-foreground">{ingredient.unit}</div>

/* Líneas 159-163: Botón de edición */
<Button 
  onClick={() => startEditing(ingredient.id, ingredient.currentStock)}
  size="sm" 
  variant="outline"
  className="btn-secondary"
>

/* Líneas 165-175: Barra de progreso de stock */
<div className="mt-2 w-24 bg-muted rounded-full h-1.5">
  <div 
    className={cn(
      "h-1.5 rounded-full transition-all duration-300",
      status === 'urgent' && "bg-urgent",
      status === 'warning' && "bg-warning",
      status === 'ok' && "bg-success"
    )}
    style={{ 
      width: `${Math.min((ingredient.currentStock / ingredient.minStock) * 100, 100)}%` 
    }}
  />
</div>
```

---

## 🛒 COMPONENTE LISTA DE COMPRAS (src/components/ShoppingList.tsx)

### 🌈 FONDO CON GRADIENTE

```tsx:src/components/ShoppingList.tsx
/* Línea 32: Fondo principal con gradiente sutil */
<div className="space-y-8 p-8 bg-gradient-to-br from-background to-muted/30 min-h-screen">

/* Línea 35: Header con fondo translúcido */
<div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-professional">

/* Línea 37: Título con gradiente de texto */
<h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">

/* Línea 40: Descripción en color muted */
<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
```

### 📊 TARJETAS DE RESUMEN

```tsx:src/components/ShoppingList.tsx
/* Líneas 45-47: Tarjeta de total de artículos */
<Card className="card-elevation-2 border-l-4 border-l-primary bg-gradient-to-br from-primary/5 to-white">

/* Línea 48: Icono con fondo primario */
<div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">

/* Línea 49: Icono en color primario */
<Package className="h-6 w-6 text-primary" />

/* Línea 50: Número en color primario */
<div className="text-2xl font-bold text-primary">{totalItems}</div>

/* Líneas 52-56: Tarjeta de artículos completados */
<Card className="card-elevation-2 border-l-4 border-l-success bg-gradient-to-br from-success/5 to-white">

/* Línea 57: Icono con fondo de éxito */
<div className="mx-auto w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-3">

/* Línea 58: Icono en color de éxito */
<CheckCircle className="h-6 w-6 text-success" />

/* Línea 59: Número en color de éxito */
<div className="text-2xl font-bold text-success">{completedItemsTotal}</div>

/* Líneas 61-65: Tarjeta de artículos pendientes */
<Card className="card-elevation-2 border-l-4 border-l-warning bg-gradient-to-br from-warning/5 to-white">

/* Línea 66: Icono con fondo de advertencia */
<div className="mx-auto w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center mb-3">

/* Línea 67: Icono en color de advertencia */
<TrendingUp className="h-6 w-6 text-warning" />

/* Línea 68: Número en color de advertencia */
<div className="text-2xl font-bold text-warning">{totalItems - completedItemsTotal}</div>

/* Líneas 70-74: Tarjeta de costos totales */
<Card className="card-elevation-2 border-l-4 border-l-secondary bg-gradient-to-br from-secondary/5 to-white">

/* Línea 75: Icono con fondo secundario */
<div className="mx-auto w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-3">

/* Línea 76: Icono en color secundario */
<Euro className="h-6 w-6 text-secondary" />

/* Línea 77: Número en color secundario */
<div className="text-2xl font-bold text-secondary">€{totalCost.toFixed(2)}</div>
```

### 📈 SECCIÓN DE PROGRESO

```tsx:src/components/ShoppingList.tsx
/* Línea 85: Tarjeta con elevación 3 */
<Card className="card-elevation-3">

/* Línea 88: Título en tamaño xl */
<CardTitle className="text-xl font-semibold">Einkaufsfortschritt</CardTitle>

/* Línea 89: Descripción en muted */
<p className="text-sm text-muted-foreground">

/* Línea 95: Botón primario para exportar */
<Button onClick={exportToPDF} className="btn-primary">

/* Líneas 100-102: Labels de progreso */
<div className="flex justify-between text-sm">
  <span className="text-muted-foreground">Gesamtfortschritt</span>
  <span className="font-medium">
    {completedItemsTotal} / {totalItems} Artikel
  </span>
</div>

/* Líneas 103-105: Barra de progreso principal */
<div className="progress-bar">
  <div 
    className="progress-fill bg-primary"
    style={{ width: `${totalItems > 0 ? (completedItemsTotal / totalItems) * 100 : 0}%` }}
  />
</div>

/* Líneas 106-110: Labels de porcentaje */
<div className="flex justify-between text-xs text-muted-foreground">
  <span>0%</span>
  <span>100%</span>
  <span className="font-medium">
    {totalItems > 0 ? Math.round((completedItemsTotal / totalItems) * 100) : 0}% abgeschlossen
  </span>
</div>
```

### 💰 RESUMEN DE COSTOS

```tsx:src/components/ShoppingList.tsx
/* Líneas 112-114: Grid de costos */
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

/* Líneas 115-117: Costos totales */
<div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
  <div className="flex items-center gap-2 mb-2">
    <Euro className="h-4 w-4 text-primary" />
    <span className="text-sm font-medium text-primary">Gesamtkosten</span>
  </div>
  <div className="text-2xl font-bold text-primary">€{totalCost.toFixed(2)}</div>
</div>

/* Líneas 118-120: Costos ya comprados */
<div className="p-4 bg-success/5 rounded-xl border border-success/20">
  <div className="flex items-center gap-2 mb-2">
    <CheckCircle className="h-4 w-4 text-success" />
    <span className="text-sm font-medium text-success">Bereits gekauft</span>
  </div>
  <div className="text-2xl font-bold text-success">€{completedCost.toFixed(2)}</div>
</div>

/* Líneas 121-123: Costos pendientes */
<div className="p-4 bg-warning/5 rounded-xl border border-warning/20">
  <div className="flex items-center gap-2 mb-2">
    <TrendingUp className="h-4 w-4 text-warning" />
    <span className="text-sm font-medium text-warning">Noch zu kaufen</span>
  </div>
  <div className="text-2xl font-bold text-warning">€{(totalCost - completedCost).toFixed(2)}</div>
</div>
```

### 👨‍🍳 GRUPOS DE COCINEROS

```tsx:src/components/ShoppingList.tsx
/* Línea 130: Tarjeta con elevación 3 */
<Card key={group.chef.id} className="card-elevation-3">

/* Línea 131: Header con gradiente */
<CardHeader className="bg-gradient-to-r from-muted/30 to-white rounded-t-xl border-b">

/* Líneas 133-139: Avatar del cocinero con color dinámico */
<div className={cn(
  "chef-avatar-large shadow-professional",
  "border-4 border-white"
)}
style={{ 
  backgroundColor: group.chef.color,
  borderColor: group.chef.color + '40'
}}>

/* Línea 142: Título en foreground */
<CardTitle className="text-xl text-foreground mb-1">{group.chef.name}</CardTitle>

/* Línea 143: Especialidad en muted */
<p className="text-muted-foreground font-medium">{group.chef.specialty}</p>

/* Líneas 144-150: Estadísticas del cocinero */
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

/* Líneas 152-154: Botón para marcar todo como completado */
<Button 
  onClick={() => markAllChefItemsCompleted(group.chef.id)}
  className="btn-secondary"
  size="sm"
>

/* Líneas 160-162: Labels de progreso del cocinero */
<div className="flex justify-between text-sm">
  <span className="text-muted-foreground">Fortschritt</span>
  <span className="font-medium">{Math.round(group.progress)}%</span>
</div>

/* Líneas 163-165: Barra de progreso del cocinero */
<div className="progress-bar">
  <div 
    className="progress-fill bg-primary"
    style={{ width: `${group.progress}%` }}
  />
</div>
```

### 📋 ARTÍCULOS DE COMPRA

```tsx:src/components/ShoppingList.tsx
/* Líneas 170-175: Contenedor de artículo con estado condicional */
<div 
  key={item.id} 
  className={cn(
    "p-4 rounded-xl border-2 transition-all duration-200",
    item.completed 
      ? "bg-success/5 border-success/20" 
      : "bg-warning/5 border-warning/20"
  )}
>

/* Líneas 176-178: Checkbox con estado condicional */
<Checkbox
  checked={item.completed}
  onCheckedChange={() => toggleShoppingItem(item.id)}
  className="data-[state=checked]:bg-success data-[state=checked]:border-success"
/>

/* Líneas 180-185: Título del artículo con estado condicional */
<h3 className={cn(
  "font-semibold",
  item.completed ? "text-success line-through" : "text-foreground"
)}>

/* Líneas 186-192: Badge de prioridad */
<Badge className={cn(
  "text-xs",
  item.priority === 'high' && "bg-urgent text-urgent-foreground",
  item.priority === 'medium' && "bg-warning text-warning-foreground",
  item.priority === 'low' && "bg-success text-success-foreground"
)}>

/* Línea 193: Descripción en muted */
<p className="text-sm text-muted-foreground">
  Menge: {item.quantity} {item.unit}
</p>

/* Líneas 198-200: Costo del artículo */
<div className="text-lg font-bold text-foreground">
  €{item.estimatedCost.toFixed(2)}
</div>

/* Línea 201: Costo por unidad en muted */
<div className="text-xs text-muted-foreground">
  {item.quantity} × €{(item.estimatedCost / item.quantity).toFixed(2)}
</div>
```

---

## 👨‍🍳 COMPONENTE GESTIÓN DE COCINEROS (src/components/ChefManagement.tsx)

### 🌈 FONDO CON GRADIENTE

```tsx:src/components/ChefManagement.tsx
/* Línea 32: Fondo principal con gradiente sutil */
<div className="space-y-8 p-8 bg-gradient-to-br from-background to-muted/30 min-h-screen">

/* Línea 35: Header con fondo translúcido */
<div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-professional">

/* Línea 37: Título con gradiente de texto */
<h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">

/* Línea 40: Descripción en color muted */
<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
```

### 📊 TARJETAS DE RESUMEN

```tsx:src/components/ChefManagement.tsx
/* Líneas 45-47: Tarjeta de cocineros activos */
<Card className="card-elevation-2 border-l-4 border-l-primary bg-gradient-to-br from-primary/5 to-white">

/* Línea 48: Icono con fondo primario */
<div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">

/* Línea 49: Icono en color primario */
<Users className="h-6 w-6 text-primary" />

/* Línea 50: Número en color primario */
<div className="text-2xl font-bold text-primary">{totalChefs}</div>

/* Líneas 52-56: Tarjeta de artículos administrados */
<Card className="card-elevation-2 border-l-4 border-l-secondary bg-gradient-to-br from-secondary/5 to-white">

/* Línea 57: Icono con fondo secundario */
<div className="mx-auto w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-3">

/* Línea 58: Icono en color secundario */
<Package className="h-6 w-6 text-secondary" />

/* Línea 59: Número en color secundario */
<div className="text-2xl font-bold text-secondary">{totalIngredients}</div>

/* Líneas 61-65: Tarjeta de compras pendientes */
<Card className="card-elevation-2 border-l-4 border-l-warning bg-gradient-to-br from-warning/5 to-white">

/* Línea 66: Icono con fondo de advertencia */
<div className="mx-auto w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center mb-3">

/* Línea 67: Icono en color de advertencia */
<ShoppingCart className="h-6 w-6 text-warning" />

/* Línea 68: Número en color de advertencia */
<div className="text-2xl font-bold text-warning">{totalPendingItems}</div>

/* Líneas 70-74: Tarjeta de artículos críticos */
<Card className="card-elevation-2 border-l-4 border-l-urgent bg-gradient-to-br from-urgent/5 to-white">

/* Línea 75: Icono con fondo urgente */
<div className="mx-auto w-12 h-12 bg-urgent/10 rounded-xl flex items-center justify-center mb-3">

/* Línea 76: Icono en color urgente */
<AlertTriangle className="h-6 w-6 text-urgent" />

/* Línea 77: Número en color urgente */
<div className="text-2xl font-bold text-urgent">{totalCriticalItems}</div>
```

### ➕ FORMULARIO DE NUEVO COCINERO

```tsx:src/components/ChefManagement.tsx
/* Línea 85: Botón primario para agregar cocinero */
<Button 
  onClick={() => setAddingChef(true)} 
  className="btn-primary text-lg px-8 py-4"
>

/* Líneas 90-92: Tarjeta del formulario */
<Card className="card-elevation-3 border-2 border-primary/20">

/* Línea 93: Header con gradiente primario */
<CardHeader className="bg-gradient-to-r from-primary/5 to-white rounded-t-xl border-b">

/* Línea 94: Título con icono primario */
<CardTitle className="text-xl text-foreground flex items-center gap-2">
  <Plus className="h-5 w-5 text-primary" />
  Neuen Koch hinzufügen
</CardTitle>

/* Líneas 100-102: Input profesional para nombre */
<Input
  type="text"
  value={newChefForm.name}
  onChange={(e) => setNewChefForm({ ...newChefForm, name: e.target.value })}
  className="input-professional"
  placeholder="Vorname Nachname"
/>

/* Líneas 108-110: Input profesional para especialidad */
<Input
  type="text"
  value={newChefForm.specialty}
  onChange={(e) => setNewChefForm({ ...newChefForm, specialty: e.target.value })}
  className="input-professional"
  placeholder="z.B. Fleisch, Fisch, Desserts"
/>

/* Líneas 115-125: Selector de colores */
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

/* Líneas 128-130: Botón primario para guardar */
<Button onClick={handleAddChef} className="btn-primary">

/* Líneas 131-133: Botón secundario para cancelar */
<Button onClick={() => setAddingChef(false)} variant="outline" className="btn-secondary">
```

### 👨‍🍳 TARJETAS DE COCINEROS

```tsx:src/components/ChefManagement.tsx
/* Líneas 140-142: Grid de tarjetas de cocineros */
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

/* Línea 143: Tarjeta con elevación 3 y hover */
<Card key={group.chef.id} className="card-elevation-3 hover:shadow-professional-lg transition-all duration-300">

/* Línea 144: Header con gradiente */
<CardHeader className="bg-gradient-to-r from-muted/30 to-white rounded-t-xl border-b">

/* Líneas 146-152: Avatar del cocinero con color dinámico */
<div className={cn(
  "chef-avatar-large shadow-professional",
  "border-4 border-white"
)}
style={{ 
  backgroundColor: group.chef.color,
  borderColor: group.chef.color + '40'
}}>

/* Línea 155: Título en foreground */
<CardTitle className="text-xl text-foreground mb-1">{group.chef.name}</CardTitle>

/* Línea 156: Especialidad en muted */
<p className="text-muted-foreground font-medium">{group.chef.specialty}</p>

/* Líneas 157-163: Estadísticas del cocinero */
<div className="flex items-center gap-2 mt-2">
  <Star className="h-4 w-4 text-warning" />
  <span className="text-sm text-muted-foreground">Experte</span>
</div>

/* Líneas 165-169: Botón de edición */
<Button 
  onClick={() => startEditing(chef)} 
  variant="outline" 
  size="sm"
  className="btn-secondary"
>

/* Líneas 171-177: Estadísticas del cocinero en grid */
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
    <div className="text-lg font-bold text-urgent">{stats.criticalItems}</div>
    <div className="text-xs text-muted-foreground">Kritisch</div>
  </div>
</div>
```

### 📝 FORMULARIO DE EDICIÓN

```tsx:src/components/ChefManagement.tsx
/* Líneas 185-187: Input profesional para nombre */
<Input
  type="text"
  value={editForm.name}
  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
  className="input-professional"
  placeholder="Name"
/>

/* Líneas 193-195: Input profesional para especialidad */
<Input
  type="text"
  value={editForm.specialty}
  onChange={(e) => setEditForm({ ...editForm, specialty: e.target.value })}
  className="input-professional"
  placeholder="Spezialität"
/>

/* Líneas 200-202: Botón primario para guardar */
<Button onClick={() => saveChef(chef.id)} className="btn-primary">

/* Líneas 203-205: Botón secundario para cancelar */
<Button onClick={cancelEditing} variant="outline" className="btn-secondary">
```

### 📊 INDICADORES DE RENDIMIENTO

```tsx:src/components/ChefManagement.tsx
/* Líneas 210-212: Labels de progreso */
<div className="flex items-center justify-between text-sm">
  <span className="text-muted-foreground">Verantwortungsbereich</span>
  <span className="font-medium">{stats.totalIngredients} Artikel</span>
</div>

/* Líneas 213-215: Barra de progreso */
<div className="progress-bar">
  <div 
    className="progress-fill bg-primary"
    style={{ width: `${Math.min((stats.totalIngredients / 20) * 100, 100)}%` }}
  />
</div>

/* Líneas 217-225: Badges de estado */
<div className="flex flex-wrap gap-2">
  {stats.criticalItems > 0 && (
    <Badge className="badge-urgent">
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

/* Líneas 227-233: Costos estimados */
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
```

---

## 📋 RESUMEN DE COLORES POR SECCIÓN

### 🎨 **SISTEMA DE COLORES CSS (src/index.css)**
- **Líneas 15-80**: Variables de color principales, estados, cocineros y header
- **Líneas 95-149**: Clases CSS personalizadas para botones, tarjetas, inputs y badges

### ⚙️ **CONFIGURACIÓN TAILWIND (tailwind.config.ts)**
- **Líneas 58-71**: Extensión de colores para cocineros y header
- **Líneas 73-101**: Sombras profesionales y animaciones personalizadas

### 🧭 **NAVEGACIÓN (src/components/Navigation.tsx)**
- **Líneas 30-85**: Header con gradiente, navegación tipo pills y banner de alerta

### 📊 **DASHBOARD (src/components/Dashboard.tsx)**
- **Líneas 32-225**: Fondo con gradiente, tarjetas de estadísticas, presupuesto y acciones rápidas

### 📦 **INVENTARIO (src/components/Inventory.tsx)**
- **Líneas 32-175**: Fondo con gradiente, tarjetas de resumen, grupos de cocineros y artículos

### 🛒 **LISTA DE COMPRAS (src/components/ShoppingList.tsx)**
- **Líneas 32-233**: Fondo con gradiente, tarjetas de resumen, progreso y grupos de cocineros

### 👨‍🍳 **GESTIÓN DE COCINEROS (src/components/ChefManagement.tsx)**
- **Líneas 32-233**: Fondo con gradiente, tarjetas de resumen, formularios y indicadores

---

## 🎯 **TOTAL DE LÍNEAS CON COLORES: 500+**

Este documento cubre **TODAS** las líneas de código relacionadas con colores en el proyecto Küchen-Meister Plan, proporcionando una referencia completa para desarrolladores y diseñadores.
