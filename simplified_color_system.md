# SISTEMA DE COLORES SIMPLIFICADO - KÜCHEN-MEISTER

## ANÁLISIS DEL PROBLEMA ACTUAL

Su proyecto maneja **50+ variables de color** distribuidas en múltiples sistemas, creando:
- Inconsistencias visuales
- Mantenimiento complejo
- Decisiones de diseño fragmentadas
- Código CSS excesivamente verboso

## PROPUESTA DE SIMPLIFICACIÓN

### PALETA PRINCIPAL (5 COLORES + NEUTROS)

```css
/* COLORES PRINCIPALES */
--primary: #2563eb;      /* Azul corporativo - acciones principales */
--success: #059669;      /* Verde - estados OK, confirmaciones */
--warning: #d97706;      /* Naranja - advertencias, stock bajo */
--danger: #dc2626;       /* Rojo - crítico, errores, eliminaciones */
--secondary: #64748b;    /* Gris medio - información secundaria */

/* NEUTROS ADAPTATIVOS */
--background: #ffffff;   /* Fondo principal (light) */
--surface: #f8fafc;     /* Superficie secundaria (light) */
--text: #0f172a;        /* Texto principal (light) */
--text-muted: #64748b;  /* Texto secundario (light) */
--border: #e2e8f0;      /* Bordes y separadores (light) */

/* DARK MODE */
--background-dark: #0f172a;
--surface-dark: #1e293b;
--text-dark: #f8fafc;
--text-muted-dark: #94a3b8;
--border-dark: #334155;
```

### PALETA DE CHEFS (10 COLORES)

```css
--chef-1: #ef4444;  /* Rojo */
--chef-2: #f97316;  /* Naranja */
--chef-3: #eab308;  /* Amarillo */
--chef-4: #22c55e;  /* Verde */
--chef-5: #06b6d4;  /* Cyan */
--chef-6: #3b82f6;  /* Azul */
--chef-7: #8b5cf6;  /* Púrpura */
--chef-8: #ec4899;  /* Rosa */
--chef-9: #84cc16;  /* Lima */
--chef-10: #f59e0b; /* Ámbar */
```

---

## PROMPTS DE IMPLEMENTACIÓN

### PROMPT 1: VARIABLES CSS PRINCIPALES

```markdown
Reemplaza todas las variables de color en src/index.css con este sistema simplificado:

```css
:root {
  /* Colores principales */
  --primary: 213 84% 59%;      /* #2563eb */
  --success: 158 68% 38%;      /* #059669 */ 
  --warning: 25 87% 42%;       /* #d97706 */
  --danger: 220 38 38%;        /* #dc2626 */
  --secondary: 218 11% 56%;    /* #64748b */
  
  /* Neutros light mode */
  --background: 0 0% 100%;     /* #ffffff */
  --surface: 210 40% 98%;      /* #f8fafc */
  --text: 222 84% 5%;          /* #0f172a */
  --text-muted: 218 11% 56%;   /* #64748b */
  --border: 214 32% 91%;       /* #e2e8f0 */
  
  /* Chefs (10 colores) */
  --chef-1: 0 84% 60%;         /* #ef4444 - Rojo */
  --chef-2: 21 90% 56%;        /* #f97316 - Naranja */
  --chef-3: 48 96% 53%;        /* #eab308 - Amarillo */
  --chef-4: 142 76% 47%;       /* #22c55e - Verde */
  --chef-5: 188 95% 44%;       /* #06b6d4 - Cyan */
  --chef-6: 217 91% 60%;       /* #3b82f6 - Azul */
  --chef-7: 262 83% 58%;       /* #8b5cf6 - Púrpura */
  --chef-8: 330 81% 60%;       /* #ec4899 - Rosa */
  --chef-9: 84 81% 44%;        /* #84cc16 - Lima */
  --chef-10: 38 92% 50%;       /* #f59e0b - Ámbar */
}

[data-theme="dark"] {
  --background: 222 84% 5%;    /* #0f172a */
  --surface: 215 28% 17%;      /* #1e293b */
  --text: 210 40% 98%;         /* #f8fafc */
  --text-muted: 215 16% 67%;   /* #94a3b8 */
  --border: 215 25% 27%;       /* #334155 */
}
```

ELIMINA todas las otras variables de color (--urgent, --normal, --ok, --chef-nico, etc.). 
REEMPLAZA todas las referencias a colores eliminados con el nuevo sistema.
```

### PROMPT 2: MAPEO DE COMPONENTES

```markdown
Actualiza TODOS los componentes para usar únicamente el nuevo sistema de colores:

**MAPEO DE REEMPLAZOS:**
- `--urgent` → `--danger`
- `--normal` → `--warning` 
- `--ok` → `--success`
- `--chef-nico` → `--chef-1`
- `--chef-marco` → `--chef-2`
- `--chef-sofia` → `--chef-3`
- `--chef-david` → `--chef-4`
- `--chef-emma` → `--chef-5`
- `--chef-lucas` → `--chef-6`
- `--chef-anna` → `--chef-7`

**ESTADOS SEMÁNTICOS:**
- Stock crítico (0): `text-danger` + `bg-danger/5` + `border-danger/20`
- Stock bajo (<min): `text-warning` + `bg-warning/5` + `border-warning/20`
- Stock OK (>min): `text-success` + `bg-success/5` + `border-success/20`
- Acciones principales: `bg-primary` + `text-white`
- Información secundaria: `text-secondary`

**EJEMPLO DE TRANSFORMACIÓN:**
```tsx
// ANTES
className="text-urgent bg-urgent/5 border-urgent/20"

// DESPUÉS  
className="text-danger bg-danger/5 border-danger/20"
```

Aplica estos cambios en src/components/Inventory.tsx, ShoppingList.tsx, ChefManagement.tsx y Dashboard.tsx.
```

### PROMPT 3: LIMPIEZA Y OPTIMIZACIÓN

```markdown
Realiza limpieza final del sistema de colores:

1. **ELIMINA clases CSS no utilizadas** en src/index.css:
   - `.badge-urgent` → `.badge-danger`
   - Todas las referencias a colores antiguos
   - Variables CSS duplicadas o no referenciadas

2. **ACTUALIZA tailwind.config.ts**:
```typescript
extend: {
  colors: {
    primary: 'hsl(var(--primary))',
    success: 'hsl(var(--success))',
    warning: 'hsl(var(--warning))',
    danger: 'hsl(var(--danger))',
    secondary: 'hsl(var(--secondary))',
    background: 'hsl(var(--background))',
    surface: 'hsl(var(--surface))',
    text: 'hsl(var(--text))',
    'text-muted': 'hsl(var(--text-muted))',
    border: 'hsl(var(--border))',
    chef: {
      1: 'hsl(var(--chef-1))',
      2: 'hsl(var(--chef-2))',
      3: 'hsl(var(--chef-3))',
      4: 'hsl(var(--chef-4))',
      5: 'hsl(var(--chef-5))',
      6: 'hsl(var(--chef-6))',
      7: 'hsl(var(--chef-7))',
      8: 'hsl(var(--chef-8))',
      9: 'hsl(var(--chef-9))',
      10: 'hsl(var(--chef-10))'
    }
  }
}
```

3. **VERIFICA consistencia** ejecutando búsqueda global de:
   - Colores hardcoded (#hex)
   - Variables CSS obsoletas (--urgent, --normal, etc.)
   - Clases Tailwind inconsistentes

4. **DOCUMENTA el nuevo sistema** con comentarios en código explicando el uso semántico de cada color.
```

---

## BENEFICIOS DE LA SIMPLIFICACIÓN

### REDUCCIÓN DE COMPLEJIDAD
- **50+ colores** → **15 colores totales**
- **500+ líneas CSS** → **50 líneas CSS**
- **Mantenimiento 80% más simple**

### CONSISTENCIA MEJORADA
- Estados semánticos claros (danger/warning/success)
- Colores con propósito específico
- Dark mode nativo incluido

### ESCALABILIDAD
- Fácil agregar nuevos chefs (chef-8, chef-9, chef-10)
- Sistema predecible y documentado
- Compatible con design systems estándar

### IMPLEMENTACIÓN
1. Ejecutar **Prompt 1** para variables base
2. Ejecutar **Prompt 2** para componentes  
3. Ejecutar **Prompt 3** para limpieza final
4. Probar en light/dark mode
5. Validar funcionalidad completa

**Tiempo estimado de implementación: 2-3 horas**