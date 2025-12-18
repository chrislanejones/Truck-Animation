# Truck Animation – Cinematic 3D Experience

A cinematic, Interactive 3D experience built with **React Three Fiber**, **\*Three.js**, and **Theatre.js**.

Features a fully animated painter’s truck with realistic landing physics, suspension recoil, camera shake, and smooth UI transitions.

## 🌐 Live Demo

**[View Live Demo →](https://vercel.com/chrislanejones-projects/truck-animation-m13n)**

![Van Animation Preview](/public/images/Paint-Van-Business.jpg)

---

# ✨ Features

- 🚚 Cinematic vehicle spawn (GTA-style drop & suspension)
- 🎥 Camera shake synced to impact
- 🧀 Theatre.js timeline-driven animation
- 🎮 Interactive UI with Framer Motion
- 🎻 HDR environment lighting
- 🧃 Animated character inside vehicle
- 🦀 Lowlatency Vite builds
- 🟵 Responsive design

---

# 🖼 Preview

Images are stored locally to avoid external dependency issues.

```
public/
k℗images/
    ℗Daves-Paint.jpg
    ╜Paint-Van-Business.jpg
```

Example usage:

```jsx
<img src="/images/Daves-Paint.jpg" alt="Truck Preview" />
```

---

# 🛠 Tech Stack

- **React 19** - **Vite 7**
- **Three.js**
- **@react-three/fiber**
- **@react-three/drei**
- **Theatre.js**
- **Framer Motion** - **Tailwind CSS**
- **GLTF / FBX**

---

# 🛔 Getting Started

## Requirements

- Node.js 16+

*

- pnpm (recommended)

## Install

```bash
pnpm install
```

## Dev Server

```bash
pnpm dev
```

## Production Build

```bash
pnpm build
pnpm preview
```

---

# 🍃 Vehicle Physics

- Vehicle spawns airborne (no ground flash)
- Front driver wheel lands first
- Rear passenger wheel settles last
- Single spring-based landing
- Suspension pitch & roll recoil
- Camera shake synced to impact

---

# 📖 License

MIT License

---

Built with ❤ using modern WebGL tooling.
