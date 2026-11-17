---
name: twenty-first-dev
description: >-
  Integration and authoring guide for 21st.dev luxury UI components (shadcn/ui, Tailwind CSS,
  Framer Motion, Lucide, and Radix primitives). Use when constructing, customizing, or porting
  21st.dev components such as animated lamps, interactive spotlights, border beams, glowing cards,
  bento grids, split reveals, dynamic auth portals, and magnetic buttons into the application.
---

# 21st.dev: Design System & Component Library Integration

21st.dev is the open-source library of community-crafted, high-design components built on top of Tailwind CSS, React, and Framer Motion. This skill provides direct design blueprints, component recipes, and integration patterns.

---

## 1. Core Architecture & Stack

Every 21st.dev component follows a strict modern stack:
- **Styling:** Tailwind CSS (v3 / v4 compatible) with custom utility animations.
- **Motion:** `framer-motion` (spring dynamics, `AnimatePresence`, layout animations).
- **Icons:** SVG brand vectors or `lucide-react`.
- **Accessibility:** Radix UI primitives or standard ARIA roles.

---

## 2. Standard 21st.dev Patterns

### Pattern 1: Volumetric Lamp Beam (Aceternity / 21st.dev style)
```tsx
<div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full z-0">
  <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
    <motion.div
      initial={{ opacity: 0.5, width: "15rem" }}
      whileInView={{ opacity: 1, width: "30rem" }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
      style={{
        backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
      }}
      className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-amber-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
    />
  </div>
</div>
```

### Pattern 2: Animated Border Beam
```tsx
<div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 overflow-hidden">
  <div className="absolute inset-0 border-beam pointer-events-none animate-border-beam" />
  {/* Content */}
</div>
```

### Pattern 3: Interactive Physics Pull-String (Lamp Switch)
- Cord with anchor at top lamp socket.
- Spring-loaded tassel with gesture drag / tap trigger.
- Synchronized sound toggle using Web Audio oscillator:
```ts
function playLampClick(isOn: boolean) {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = isOn ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(isOn ? 800 : 400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  } catch (e) {
    // Audio unavailable or blocked
  }
}
```

---

## 3. Best Practices
1. **Zero External Asset Dependency:** Always prefer SVG and CSS shaders for lamps, beams, and particles over heavy external raster images so load times remain instantaneous.
2. **Theme Sensitivity:** Ensure components look stunning in both dark mode (deep obsidian with radiant amber/cyan light) and light mode.
3. **Smooth State Transitions:** Use Framer Motion's `AnimatePresence mode="wait"` when toggling between login, registration, and OTP modes.
