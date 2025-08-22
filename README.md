# River County Painter - Interactive 3D Van Experience

A stunning 3D interactive experience showcasing a painter's van with smooth animations, realistic lighting, and professional UI transitions. Built with React Three Fiber, Theatre.js, and Framer Motion.

![Van Animation Preview](./preview.gif)

## ✨ Features

- **Cinematic 3D Scene**: Interactive van model with animated doors and detailed textures
- **Professional Animations**: Choreographed camera movements and object animations using Theatre.js
- **Smooth UI Transitions**: Beautiful page transitions powered by Framer Motion
- **Asset Loading**: Smart preloading system with progress tracking
- **Responsive Design**: Works across desktop and mobile devices
- **Real-time Lighting**: Dynamic lighting system with multiple light sources
- **Character Animation**: Animated avatar with driving animations

## 🛠️ Tech Stack

### Core Framework

- **React 18** - Modern React with hooks and suspense
- **Vite** - Lightning-fast build tool and dev server
- **JavaScript/JSX** - Component-based architecture

### 3D Graphics & Animation

- **React Three Fiber** - React renderer for Three.js
- **Three.js** - 3D graphics library
- **Theatre.js** - Professional animation and cinematography tool
- **React Three Drei** - Useful helpers for R3F

### UI & Animations

- **Framer Motion** - Production-ready motion library for React
- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS** - Additional styling for 3D canvas

### Asset Management

- **GLTF/GLB Models** - Optimized 3D model format
- **FBX Animations** - Character animation files
- **Texture Loading** - Efficient texture management

## 🚀 Getting Started

### Prerequisites

```bash
Node.js 16+ and npm/yarn
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/truck-animation.git
cd truck-animation
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Start development server**

```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Development

### Project Structure

```
src/
├── components/
│   ├── Scene.jsx          # Main 3D scene setup
│   ├── Experience.jsx     # 3D world and lighting
│   ├── Van-With Logo.jsx  # Van 3D model component
│   ├── Avatarclj.jsx      # Character model and animation
│   ├── Paint.jsx          # Paint can models
│   ├── Background.jsx     # Ground and environment
│   ├── UI.jsx             # Overlay UI with Framer Motion
│   └── Loading.jsx        # Asset loading screen
├── assets/
│   └── VanProject.theatre-project-state-IX.json
├── App.jsx                # Main application component
├── App.css               # Global styles
└── main.jsx              # React entry point
```

### Development Workflow

#### 3D Scene Development

- **Live Editing**: Theatre.js studio provides real-time animation editing
- **Hot Reload**: Vite enables instant updates during development
- **Component Isolation**: Each 3D element is a separate component

#### Animation System

- **Theatre.js Sequences**: Professional timeline-based animations
- **State Management**: React state controls animation playback
- **Transition System**: Smooth transitions between different scenes

#### UI Development with Framer Motion

```jsx
// Example animation variants
const variants = {
  Start: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.2, duration: 1.2 },
  },
  hidden: {
    y: 80,
    opacity: 0,
  },
};

<motion.div animate={currentScreen} variants={variants} initial="hidden">
  {/* Content */}
</motion.div>;
```

### Environment Setup

#### Development Mode

- Theatre.js Studio enabled for animation editing
- React DevTools available
- Hot module replacement
- Source maps for debugging

#### Production Mode

- Theatre.js Studio disabled
- Optimized bundles
- Asset compression
- Tree shaking

### Asset Pipeline

#### 3D Models

- **Van Model**: `/VanWithLogo.glb` - Main vehicle with logo textures
- **Character**: `/models/chrislanejones.glb` - Rigged character model
- **Animations**: `/animations/CLJDriving.fbx` - Character animations

#### Textures

- **Ground**: Road asphalt texture with repeat mapping
- **Paint Cans**: Custom paint texture mapping
- **Environment**: HDR environment maps for realistic lighting

## 🔧 Build & Deployment

### Build Process

```bash
# Development build with source maps
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Build Output

```
dist/
├── index.html
├── assets/
│   ├── index.[hash].js     # Main application bundle
│   ├── index.[hash].css    # Compiled styles
│   └── [asset].[hash].*    # 3D models, textures, etc.
└── models/                 # 3D assets
```

### Performance Optimizations

#### Code Splitting

- **Lazy Loading**: 3D scene loads separately from UI
- **Asset Preloading**: Smart preloading with progress tracking
- **Component Splitting**: Each major component is separately bundled

#### 3D Optimizations

- **LOD (Level of Detail)**: Different model complexity based on distance
- **Texture Compression**: Optimized texture formats
- **Geometry Optimization**: Reduced polygon counts where possible

#### Bundle Optimization

- **Tree Shaking**: Unused code elimination
- **Asset Compression**: Gzip/Brotli compression
- **Cache Optimization**: Long-term caching for static assets

### Deployment Options

#### Static Hosting (Recommended)

- **Vercel**: `npm run build` + Vercel CLI
- **Netlify**: Connect repository for auto-deploy
- **GitHub Pages**: Use `gh-pages` package

#### CDN Deployment

- Configure asset URLs for CDN hosting
- Optimize for global content delivery

## 🎨 Framer Motion Integration

### Animation Architecture

#### Page Transitions

```jsx
const pageVariants = {
  Start: { opacity: 1, y: 0 },
  Middle: { opacity: 1, y: 0 },
  End: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 80 },
};
```

#### Component Animations

- **Staggered Animations**: Sequential element reveals
- **Gesture Interactions**: Hover and click animations
- **Layout Animations**: Smooth layout changes
- **Scroll Animations**: Scroll-triggered animations

#### Performance Considerations

- **Transform-based Animations**: GPU-accelerated transforms
- **Will-change Optimization**: Proper layer promotion
- **Animation Cleanup**: Prevent memory leaks

### Custom Animation Hooks

```jsx
// Example custom hook for 3D-UI sync
const useSceneTransition = (currentScreen) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(currentScreen);
  }, [currentScreen]);

  return controls;
};
```

## 🎭 Theatre.js Workflow

### Animation Creation

1. **Studio Mode**: Enable in development for timeline editing
2. **Keyframe Animation**: Set keyframes for camera and objects
3. **Easing Curves**: Fine-tune animation curves
4. **Export State**: Save animation data to JSON

### Integration Patterns

```jsx
// Theatre.js object creation
<e.group theatreKey="World">
  <e.pointLight theatreKey="SunLight" />
  <Van scale={0.05} />
</e.group>
```

## 📱 Responsive Design

### Breakpoint Strategy

- **Mobile**: Simplified 3D scene, touch-optimized UI
- **Tablet**: Balanced performance and visual quality
- **Desktop**: Full-featured experience with all effects

### Performance Scaling

- **Automatic Quality**: Adjust rendering quality based on device
- **Touch Controls**: Mobile-friendly interaction patterns
- **Loading Optimization**: Faster loading on slower connections

## 🔍 Debugging & Development Tools

### Available Tools

- **React DevTools**: Component inspection
- **Theatre.js Studio**: Animation timeline editor
- **Three.js Inspector**: 3D scene debugging
- **Vite DevTools**: Build analysis

### Common Development Commands

```bash
# Start with debugging
npm run dev

# Build analysis
npm run build -- --analyze

# Type checking (if using TypeScript)
npm run type-check
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Theatre.js Team** - For the amazing animation tools
- **React Three Fiber** - For making 3D in React accessible
- **Framer Motion** - For beautiful UI animations
- **Three.js Community** - For the powerful 3D library

---

_Built with ❤️ using React, Three.js, Theatre.js, and Framer Motion_
