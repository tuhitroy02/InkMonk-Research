---
name: ui-ux-pro-max
description: >-
  Expert guide and design engine for crafting $10,000-tier luxury websites and web applications.
  Use when designing or refactoring user interfaces, adding Framer Motion animations, implementing
  dynamic 3D lighting/lamp effects, creating high-converting hero sections, bento grids, glassmorphism,
  or polishing frontend micro-interactions to look like an elite Silicon Valley product.
---

# UI/UX Pro Max: $10,000 Website Design & Engineering

The **UI/UX Pro Max** framework guides the design and implementation of award-winning, premium digital experiences that surpass generic AI-generated templates. It bridges cutting-edge visual design, fluid physics-based animation (Framer Motion), volumetric lighting, and high-converting information architecture.

---

## 1. The $10,000 Aesthetic Philosophy

1. **Obsidian & Platinum Palette:**
   - Backgrounds: Multi-stop dark obsidian gradients (`#030712`, `#060B18`, `#0A0F1D`).
   - Cards & Surfaces: Translucent glassmorphism (`backdrop-blur-xl`, `bg-white/[0.03]` to `bg-white/[0.07]`) with 1px razor-sharp borders (`border-white/10` or `border-cyan-500/20`).
   - Lighting & Accents: Amber Gold (`#F59E0B`), Electric Cyan (`#06B6D4`), and Emerald (`#10B981`) used as focused luminescent lasers, volumetric light cones, and radial halos.

2. **Depth & Volumetric Lighting:**
   - Avoid flat grey cards. Layer shadows with dual or triple radii:
     ```css
     box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.7),
                 0 0 20px -2px rgba(245, 158, 11, 0.15),
                 inset 0 1px 0 rgba(255, 255, 255, 0.1);
     ```
   - Utilize angled conic gradients and polygon clip-paths for directional lamp/spotlight effects.

3. **Typography Mastery:**
   - Hierarchy: Distinctive editorial display fonts for titles, balanced with clean geometric sans-serifs for body text.
   - Text Alignment Rule: Centralized titles and value propositions, left-aligned bullet lists and detailed specification rows.
   - Micro-Tracking: `tracking-wider` and `uppercase font-mono` for small badges and telemetry chips.

---

## 2. Framer Motion Animation Standards

Always use Framer Motion for natural, fluid spring dynamics rather than linear CSS transitions:

```tsx
import { motion, AnimatePresence } from 'framer-motion';

// Standard Spring Preset
export const springTransition = {
  type: 'spring',
  stiffness: 320,
  damping: 28,
  mass: 0.8,
};

// Fade & Slide Reveal
export const revealVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25 } }
};
```

### Motion Choreography:
- **Stagger Children:** Stagger list and grid elements by `0.08s - 0.12s` to guide the eye through content hierarchically.
- **Interactive Pull / Cord Strings:** Use spring chains with overshoot (`damping: 14`) for realistic pull cords and mechanical switches.
- **Hover Micro-Interactions:** Subtle scale (`scale: 1.02`), box-shadow bloom, and border glow on hover.

---

## 3. Signature UI Components

### A. 3D Animated Lamp & Volumetric Cone
- Articulated lamp fixture with interactive pull-chain.
- Dynamic cone of light (`clip-path: polygon(42% 0, 58% 0, 100% 100%, 0 100%)`) with warm amber gradients and Gaussian blur.
- Ambient fireflies and dust motes drifting through the beam.
- State-driven illumination: cards inside the beam light up with high specular highlights.

### B. High-Converting Bento Grids
- Irregular grid cells (col-span-2, col-span-3) highlighting core capabilities, live metrics, and real-time previews.
- Interactive hover spotlights that follow the user's cursor.

### C. Glassmorphic Modal & Floating Dock
- Semi-transparent backdrop with blur and subtle noise texture.
- Floating action bars with icon-only or pill layouts.

---

## 4. Engineering Quality Checklist

- [ ] Responsive across all viewports (320px mobile to 4K desktop).
- [ ] Accessible contrasts (WCAG AA compliant).
- [ ] Graceful fallback when animations are reduced or scripts disabled.
- [ ] No layout shifts (CLS = 0).
- [ ] Clean SSR compatibility with Next.js App Router (`'use client'` boundary applied correctly).
