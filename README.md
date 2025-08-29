# 🍳 SousChef - Sistema de Gestión de Cocina Inteligente

## 📋 Descripción
SousChef es una aplicación web moderna para la gestión integral de cocinas profesionales, con funcionalidades avanzadas de inventario, gestión de chefs, y análisis de datos en tiempo real.

## 🚀 Características Principales
- **Dashboard Inteligente** con métricas en tiempo real
- **Gestión de Inventario** avanzada con alertas automáticas
- **Sistema de Usuarios** con roles y permisos
- **Interfaz Mobile-First** optimizada para dispositivos móviles
- **Integración con Supabase** para backend robusto
- **Sistema de Alertas** inteligente para gestión de stock

## 📁 Estructura del Proyecto

```
SousChef/
├── 📚 docs/                    # Documentación del proyecto
├── ⚙️  config/                  # Archivos de configuración
├── 🛠️  scripts/                 # Scripts de utilidad
├── 🎨 public/                   # Assets públicos
├── 💻 src/                      # Código fuente
│   ├── components/             # Componentes React
│   ├── hooks/                  # Hooks personalizados
│   ├── pages/                  # Páginas de la aplicación
│   ├── types/                  # Definiciones de TypeScript
│   └── utils/                  # Utilidades y helpers
└── 🔐 supabase/                # Configuración de Supabase
```

## 🛠️ Tecnologías Utilizadas
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Estado**: React Hooks + Context API
- **Testing**: Vitest + Testing Library

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/Nicolascard995/SousChef.git
cd SousChef

# Instalar dependencias
npm install

# Configurar variables de entorno
cp docs/.env.example .env
# Editar .env con tus credenciales

# Ejecutar en desarrollo
npm run dev
```

## 📚 Documentación
Consulta la carpeta `docs/` para documentación detallada:
- [Guía de Implementación Mobile](./docs/MOBILE_IMPLEMENTATION_README.md)
- [Documentación de Base de Datos](./docs/DATABASE_README.md)
- [Guía de Seguridad](./docs/SECURITY.md)
- [Roadmap de Mejoras](./docs/ROADMAP_IMPROVEMENTS.md)

## 🤝 Contribución
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor
**Nicolas Card** - [GitHub](https://github.com/Nicolascard995)

## 🙏 Agradecimientos
- Comunidad de React y TypeScript
- Equipo de Supabase
- Contribuidores de Shadcn/ui y Tailwind CSS
