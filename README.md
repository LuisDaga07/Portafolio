# 🚀 Portafolio Profesional - Luis Garcia

Un portafolio web moderno y profesional construido con React, diseñado para mostrar habilidades, proyectos y experiencia de desarrollo.

## ✨ Características Principales

### 🎨 **Diseño Moderno y Profesional**
- **Gradientes elegantes**: Paleta de colores moderna con gradientes azul-púrpura
- **Tipografía responsive**: Uso de `clamp()` para escalado automático de fuentes
- **Efectos visuales**: Sombras, transparencias y efectos de blur para profundidad
- **Animaciones suaves**: Transiciones CSS y animaciones de entrada con Fade

### 🌟 **Componentes Mejorados**
- **Home**: Página de inicio con gradientes de texto y botón de scroll elegante
- **Navegación**: Barra de navegación con efecto de blur y transiciones suaves
- **Proyectos**: Tarjetas con efectos hover y animaciones de entrada escalonadas
- **Habilidades**: Grid de habilidades con efectos hover y tooltips
- **Social**: Iconos sociales con efectos de elevación y tooltips informativos

### 🎯 **Experiencia de Usuario**
- **Scroll suave**: Navegación fluida entre secciones
- **Responsive design**: Optimizado para todos los dispositivos
- **Tema oscuro/claro**: Cambio de tema con transiciones suaves
- **Accesibilidad**: Mejores contrastes y estados de focus

### 🛠 **Tecnologías Utilizadas**
- **React 18** con hooks modernos
- **Styled Components** para estilos dinámicos
- **React Bootstrap** para componentes UI
- **React Reveal** para animaciones
- **Typewriter Effect** para texto animado

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <tu-repositorio>
cd portafolio

# Instalar dependencias
npm install
# o
yarn install

# Ejecutar en modo desarrollo
npm start
# o
yarn start
```

### Construcción para producción
```bash
npm run build
# o
yarn build
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Home.jsx        # Página de inicio mejorada
│   ├── NavBar.jsx      # Navegación con efectos
│   ├── Projects.jsx    # Lista de proyectos
│   ├── Skills.jsx      # Habilidades técnicas
│   ├── About.jsx       # Información personal
│   └── Social.jsx      # Enlaces sociales
├── theme/              # Sistema de temas
│   ├── themes.js       # Paleta de colores
│   └── GlobalStyles.js # Estilos globales
├── css/                # Archivos CSS adicionales
│   └── skills.css      # Estilos específicos de habilidades
└── constants/          # Configuración y endpoints
```

## 🎨 Personalización

### Colores del Tema
Los colores principales se pueden modificar en `src/theme/themes.js`:

```javascript
export const lightTheme = {
  accentColor: '#667eea',        // Color principal
  secondaryAccentColor: '#764ba2', // Color secundario
  // ... otros colores
};
```

### Estilos CSS
Los estilos principales están en `src/App.css` y se pueden personalizar según necesidades.

## 📱 Responsive Design

El portafolio está optimizado para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🌟 Características Destacadas

### Efectos Visuales
- **Gradientes de texto** en títulos principales
- **Sombras dinámicas** que cambian con el hover
- **Transiciones suaves** en todos los elementos interactivos
- **Efectos de blur** en la navegación y tarjetas

### Animaciones
- **Fade in** escalonado para proyectos
- **Slide up** para habilidades
- **Scale y rotate** en iconos sociales
- **Elevación** en tarjetas al hacer hover

### Interactividad
- **Tooltips** informativos en iconos sociales
- **Estados de hover** en todos los elementos clickeables
- **Scroll suave** entre secciones
- **Cambio de tema** con transiciones

## 🔧 Configuración Avanzada

### Añadir Nuevas Secciones
1. Crear el componente en `src/components/`
2. Añadir la ruta en `public/profile/routes.json`
3. Crear el archivo JSON correspondiente en `public/profile/`

### Modificar Animaciones
Las animaciones se controlan principalmente con:
- **React Reveal** para efectos de entrada
- **CSS transitions** para hover y estados
- **CSS animations** para efectos especiales

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE.md` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Contacto

- **Luis Garcia** - Desarrollador Full Stack
- **GitHub**: [@tu-usuario](https://github.com/tu-usuario)
- **LinkedIn**: [Tu perfil](https://linkedin.com/in/tu-perfil)

---

⭐ **¡Dale una estrella si te gustó el proyecto!**
