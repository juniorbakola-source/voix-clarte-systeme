// 🍏 Keynote Apple PRO - Single File App
// Premium slide deck with morph / slide / fade / scale / blur transitions.
//
// Controls:
//   → / Space   : next slide
//   ← / Backspace: previous slide
//   Home / End  : jump to first / last
//   F           : toggle fullscreen
//   T           : cycle transition style (fade · slide · morph · blur · scale)

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  SLIDE DATA                                                         */
/* ------------------------------------------------------------------ */

const slidesData = [
  {
    id: "cover",
    kind: "cover",
    eyebrow: "Operational Excellence",
    title: "One bite at a time",
    subtitle: "How world-class teams eat the elephant — together.",
    accent: "#0A84FF",
  },
  {
    id: "elephant",
    kind: "statement",
    word: "ELEPHANT",
    caption: "An impossible problem. Until you change the way you look at it.",
    accent: "#FF453A",
  },
  {
    id: "promise",
    kind: "split",
    title: "From overwhelmed to operationally excellent.",
    bullets: [
      "Make complexity tangible",
      "Turn strategy into daily bites",
      "Align COMEX, managers & shop floor",
    ],
    accent: "#30D158",
  },
  {
    id: "kpis",
    kind: "metrics",
    title: "What good looks like",
    metrics: [
      { label: "Efficiency", value: "92%", delta: "+14 pts" },
      { label: "Cost", value: "-18%", delta: "YoY" },
      { label: "Quality (PPM)", value: "120", delta: "-62%" },
      { label: "Engagement", value: "4.6/5", delta: "+0.9" },
    ],
    accent: "#0A84FF",
  },
  {
    id: "system",
    kind: "pillars",
    title: "The Bite System",
    pillars: [
      { name: "Diagnose", text: "See the elephant. Name the problem." },
      { name: "Slice", text: "Break it into daily, owned bites." },
      { name: "Execute", text: "Cadence, visual mgmt, scoring." },
      { name: "Compound", text: "Standardize. Replicate. Scale." },
    ],
    accent: "#BF5AF2",
  },
  {
    id: "wow",
    kind: "statement",
    word: "THE ELEPHANT IS GONE",
    caption: "Nobody ate the elephant. Everyone took a bite.",
    accent: "#30D158",
  },
  {
    id: "cta",
    kind: "cover",
    eyebrow: "Your move",
    title: "Take the first bite — today.",
    subtitle: "Pick one problem. Own it. Ship it before Friday.",
    accent: "#FF9F0A",
  },
];

/* ------------------------------------------------------------------ */
/*  TRANSITIONS                                                        */
/* ------------------------------------------------------------------ */

const TRANSITIONS = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  slide: {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -80 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  morph: {
    initial: { opacity: 0, scale: 1.04, filter: "blur(12px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 0.96, filter: "blur(12px)" },
    transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(24px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(24px)" },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  scale: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.06 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};
const TRANSITION_KEYS = Object.keys(TRANSITIONS);

/* ------------------------------------------------------------------ */
/*  SLIDE RENDERERS                                                    */
/* ------------------------------------------------------------------ */

const baseSlide = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "0 8vw",
  background: "#000",
  color: "#fff",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'SF Pro Display', Inter, sans-serif",
  letterSpacing: "-0.02em",
};

function CoverSlide({ slide }) {
  return (
    <div style={{ ...baseSlide }}>
      <motion.p
        layoutId={`eyebrow-${slide.id}`}
        style={{
          color: slide.accent,
          fontSize: 18,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          marginBottom: 24,
        }}
      >
        {slide.eyebrow}
      </motion.p>
      <motion.h1
        layoutId={`title-${slide.id}`}
        style={{ fontSize: "clamp(56px, 8vw, 128px)", fontWeight: 700, lineHeight: 1.02, margin: 0 }}
      >
        {slide.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        style={{ fontSize: 26, marginTop: 28, maxWidth: 880, lineHeight: 1.4 }}
      >
        {slide.subtitle}
      </motion.p>
    </div>
  );
}

function StatementSlide({ slide }) {
  return (
    <div style={{ ...baseSlide, alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <motion.h1
        initial={{ opacity: 0, scale: 0.9, letterSpacing: "0.4em" }}
        animate={{ opacity: 1, scale: 1, letterSpacing: "0.05em" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: "clamp(72px, 12vw, 220px)",
          fontWeight: 800,
          color: slide.accent,
          margin: 0,
        }}
      >
        {slide.word}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 0.75, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        style={{ fontSize: 24, marginTop: 36, maxWidth: 760 }}
      >
        {slide.caption}
      </motion.p>
    </div>
  );
}

function SplitSlide({ slide }) {
  return (
    <div style={{ ...baseSlide, flexDirection: "row", alignItems: "center", gap: 80 }}>
      <motion.h2
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        style={{ flex: 1, fontSize: "clamp(40px, 5vw, 76px)", fontWeight: 700, lineHeight: 1.1, margin: 0 }}
      >
        {slide.title}
      </motion.h2>
      <ul style={{ flex: 1, listStyle: "none", padding: 0, margin: 0 }}>
        {slide.bullets.map((b, i) => (
          <motion.li
            key={b}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
            style={{
              fontSize: 28,
              padding: "20px 0",
              borderBottom: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <span style={{ color: slide.accent, fontWeight: 700 }}>0{i + 1}</span>
            {b}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function MetricsSlide({ slide }) {
  return (
    <div style={{ ...baseSlide }}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, margin: 0, marginBottom: 56 }}
      >
        {slide.title}
      </motion.h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
        {slide.metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              padding: 28,
              borderRadius: 20,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div style={{ fontSize: 14, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.15em" }}>
              {m.label}
            </div>
            <div style={{ fontSize: 56, fontWeight: 700, marginTop: 12, color: slide.accent }}>
              {m.value}
            </div>
            <div style={{ fontSize: 16, opacity: 0.7, marginTop: 6 }}>{m.delta}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PillarsSlide({ slide }) {
  return (
    <div style={{ ...baseSlide }}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, margin: 0, marginBottom: 56 }}
      >
        {slide.title}
      </motion.h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
        {slide.pillars.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 40, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              padding: 32,
              borderRadius: 24,
              background: `linear-gradient(160deg, ${slide.accent}22, transparent)`,
              border: `1px solid ${slide.accent}55`,
              minHeight: 240,
            }}
          >
            <div style={{ fontSize: 14, opacity: 0.5, marginBottom: 12 }}>0{i + 1}</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{p.name}</div>
            <div style={{ fontSize: 16, opacity: 0.75, marginTop: 14, lineHeight: 1.5 }}>{p.text}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function renderSlide(slide) {
  switch (slide.kind) {
    case "cover": return <CoverSlide slide={slide} />;
    case "statement": return <StatementSlide slide={slide} />;
    case "split": return <SplitSlide slide={slide} />;
    case "metrics": return <MetricsSlide slide={slide} />;
    case "pillars": return <PillarsSlide slide={slide} />;
    default: return null;
  }
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

// Autoplay speed presets (seconds per slide)
const SPEED_PRESETS = [3, 5, 8, 12, 20];
const DEFAULT_SPEED = 8;
const LOOP_AUTOPLAY = true;

export default function App() {
  const [index, setIndex] = useState(0);
  const [transitionKey, setTransitionKey] = useState("morph");
  const [direction, setDirection] = useState(1);
  const [autoplay, setAutoplay] = useState(false);
  const [speed, setSpeed] = useState(DEFAULT_SPEED); // seconds per slide
  const [paused, setPaused] = useState(false);       // temporary pause (hover / manual nav)
  const [tick, setTick] = useState(0);                // forces progress restart on manual nav

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => {
      if (i >= slidesData.length - 1) return LOOP_AUTOPLAY && autoplay ? 0 : i;
      return i + 1;
    });
  }, [autoplay]);
  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const goTo = useCallback((i) => {
    setDirection(i > index ? 1 : -1);
    setIndex(Math.max(0, Math.min(slidesData.length - 1, i)));
  }, [index]);

  const toggleAutoplay = useCallback(() => setAutoplay((a) => !a), []);
  const cycleSpeed = useCallback(() => {
    setSpeed((s) => {
      const i = SPEED_PRESETS.indexOf(s);
      return SPEED_PRESETS[(i + 1) % SPEED_PRESETS.length];
    });
  }, []);

  // Autoplay timer — restarts on slide change, speed change, pause toggle
  useEffect(() => {
    if (!autoplay || paused) return;
    const ms = speed * 1000;
    const id = setTimeout(() => next(), ms);
    return () => clearTimeout(id);
  }, [autoplay, paused, speed, index, tick, next]);

  // Manual nav resets the autoplay countdown
  const manualNext = useCallback(() => { setTick((t) => t + 1); next(); }, [next]);
  const manualPrev = useCallback(() => { setTick((t) => t + 1); prev(); }, [prev]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); manualNext(); }
      else if (e.key === " ") {
        // Space = play/pause when autoplay is on, otherwise advance
        e.preventDefault();
        if (autoplay) setPaused((p) => !p);
        else manualNext();
      }
      else if (e.key === "ArrowLeft" || e.key === "Backspace") { e.preventDefault(); manualPrev(); }
      else if (e.key === "Home") goTo(0);
      else if (e.key === "End") goTo(slidesData.length - 1);
      else if (e.key.toLowerCase() === "f") {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
        else document.exitFullscreen?.();
      } else if (e.key.toLowerCase() === "t") {
        setTransitionKey((k) => {
          const i = TRANSITION_KEYS.indexOf(k);
          return TRANSITION_KEYS[(i + 1) % TRANSITION_KEYS.length];
        });
      } else if (e.key.toLowerCase() === "a") {
        toggleAutoplay();
      } else if (e.key.toLowerCase() === "s") {
        cycleSpeed();
      } else if (e.key.toLowerCase() === "p") {
        setPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [manualNext, manualPrev, goTo, autoplay, toggleAutoplay, cycleSpeed]);

  const slide = slidesData[index];
  const variant = useMemo(() => {
    const base = TRANSITIONS[transitionKey];
    if (transitionKey !== "slide") return base;
    return {
      ...base,
      initial: { opacity: 0, x: 80 * direction },
      exit: { opacity: 0, x: -80 * direction },
    };
  }, [transitionKey, direction]);

  return (
    <div style={{ background: "#000", overflow: "hidden", position: "relative" }}>
      <LayoutGroup>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            initial={variant.initial}
            animate={variant.animate}
            exit={variant.exit}
            transition={variant.transition}
            style={{ position: "relative" }}
          >
            {renderSlide(slide)}
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>

      {/* Progress bar */}
      <div
        style={{
          position: "fixed", left: 0, right: 0, bottom: 0, height: 3,
          background: "rgba(255,255,255,0.08)", zIndex: 50,
        }}
      >
        <motion.div
          animate={{ width: `${((index + 1) / slidesData.length) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: "100%", background: slide.accent }}
        />
      </div>

      {/* HUD */}
      <div
        style={{
          position: "fixed", bottom: 24, right: 28, zIndex: 50,
          display: "flex", gap: 14, alignItems: "center",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          fontSize: 12, color: "rgba(255,255,255,0.55)", letterSpacing: "0.12em", textTransform: "uppercase",
        }}
      >
        <span>{String(index + 1).padStart(2, "0")} / {String(slidesData.length).padStart(2, "0")}</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>{transitionKey}</span>
      </div>

      {/* Click zones */}
      <button onClick={prev} aria-label="Previous"
        style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: "20%", background: "transparent", border: 0, cursor: "w-resize" }} />
      <button onClick={next} aria-label="Next"
        style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: "20%", background: "transparent", border: 0, cursor: "e-resize" }} />
    </div>
  );
}
