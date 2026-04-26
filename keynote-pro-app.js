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

/**
 * Inline-editable text. Click to edit when `editing` is true.
 * Uses contentEditable to preserve typography & avoid input boxes.
 */
function Editable({ value, onChange, editing, as = "span", style, multiline = false, placeholder }) {
  const Tag = as;
  const ref = React.useRef(null);

  // Keep DOM in sync when value changes externally and field isn't focused.
  React.useEffect(() => {
    if (ref.current && document.activeElement !== ref.current) {
      if (ref.current.innerText !== (value ?? "")) ref.current.innerText = value ?? "";
    }
  }, [value]);

  const handleBlur = () => {
    if (!ref.current) return;
    onChange?.(ref.current.innerText);
  };
  const handleKeyDown = (e) => {
    if (!multiline && e.key === "Enter") { e.preventDefault(); ref.current?.blur(); }
    if (e.key === "Escape") { e.preventDefault(); ref.current?.blur(); }
    e.stopPropagation(); // never trigger global shortcuts while typing
  };

  return (
    <Tag
      ref={ref}
      contentEditable={editing}
      suppressContentEditableWarning
      spellCheck={false}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      data-placeholder={placeholder}
      style={{
        ...style,
        outline: "none",
        cursor: editing ? "text" : "default",
        borderRadius: editing ? 6 : 0,
        boxShadow: editing ? "inset 0 0 0 1px rgba(255,255,255,0.18)" : "none",
        padding: editing ? "2px 6px" : 0,
        margin: editing ? "-2px -6px" : 0,
        transition: "box-shadow 0.2s ease",
        minWidth: editing ? 24 : undefined,
      }}
    >
      {value}
    </Tag>
  );
}

function CoverSlide({ slide, editing, patch }) {
  return (
    <div style={{ ...baseSlide }}>
      <Editable
        as="p" editing={editing} value={slide.eyebrow}
        onChange={(v) => patch({ eyebrow: v })}
        style={{
          color: slide.accent, fontSize: 18, fontWeight: 600,
          textTransform: "uppercase", letterSpacing: "0.2em",
          marginBottom: 24, display: "block",
        }}
      />
      <Editable
        as="h1" editing={editing} value={slide.title}
        onChange={(v) => patch({ title: v })}
        style={{ fontSize: "clamp(56px, 8vw, 128px)", fontWeight: 700, lineHeight: 1.02, margin: 0, display: "block" }}
      />
      <Editable
        as="p" editing={editing} value={slide.subtitle} multiline
        onChange={(v) => patch({ subtitle: v })}
        style={{ fontSize: 26, marginTop: 28, maxWidth: 880, lineHeight: 1.4, opacity: 0.7, display: "block" }}
      />
    </div>
  );
}

function StatementSlide({ slide, editing, patch }) {
  return (
    <div style={{ ...baseSlide, alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <Editable
        as="h1" editing={editing} value={slide.word}
        onChange={(v) => patch({ word: v })}
        style={{
          fontSize: "clamp(72px, 12vw, 220px)", fontWeight: 800,
          color: slide.accent, margin: 0, display: "block",
          letterSpacing: "0.05em",
        }}
      />
      <Editable
        as="p" editing={editing} value={slide.caption} multiline
        onChange={(v) => patch({ caption: v })}
        style={{ fontSize: 24, marginTop: 36, maxWidth: 760, opacity: 0.75, display: "block" }}
      />
    </div>
  );
}

function SplitSlide({ slide, editing, patch }) {
  const updateBullet = (i, v) => {
    const bullets = [...slide.bullets];
    bullets[i] = v;
    patch({ bullets });
  };
  return (
    <div style={{ ...baseSlide, flexDirection: "row", alignItems: "center", gap: 80 }}>
      <Editable
        as="h2" editing={editing} value={slide.title} multiline
        onChange={(v) => patch({ title: v })}
        style={{ flex: 1, fontSize: "clamp(40px, 5vw, 76px)", fontWeight: 700, lineHeight: 1.1, margin: 0 }}
      />
      <ul style={{ flex: 1, listStyle: "none", padding: 0, margin: 0 }}>
        {slide.bullets.map((b, i) => (
          <li
            key={i}
            style={{
              fontSize: 28, padding: "20px 0",
              borderBottom: "1px solid rgba(255,255,255,0.12)",
              display: "flex", alignItems: "center", gap: 18,
            }}
          >
            <span style={{ color: slide.accent, fontWeight: 700 }}>0{i + 1}</span>
            <Editable
              as="span" editing={editing} value={b}
              onChange={(v) => updateBullet(i, v)}
              style={{ flex: 1 }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MetricsSlide({ slide, editing, patch }) {
  const updateMetric = (i, key, v) => {
    const metrics = slide.metrics.map((m, j) => (j === i ? { ...m, [key]: v } : m));
    patch({ metrics });
  };
  return (
    <div style={{ ...baseSlide }}>
      <Editable
        as="h2" editing={editing} value={slide.title}
        onChange={(v) => patch({ title: v })}
        style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, margin: 0, marginBottom: 56, display: "block" }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
        {slide.metrics.map((m, i) => (
          <div
            key={i}
            style={{
              padding: 28, borderRadius: 20,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Editable as="div" editing={editing} value={m.label}
              onChange={(v) => updateMetric(i, "label", v)}
              style={{ fontSize: 14, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.15em" }}
            />
            <Editable as="div" editing={editing} value={m.value}
              onChange={(v) => updateMetric(i, "value", v)}
              style={{ fontSize: 56, fontWeight: 700, marginTop: 12, color: slide.accent }}
            />
            <Editable as="div" editing={editing} value={m.delta}
              onChange={(v) => updateMetric(i, "delta", v)}
              style={{ fontSize: 16, opacity: 0.7, marginTop: 6 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PillarsSlide({ slide, editing, patch }) {
  const updatePillar = (i, key, v) => {
    const pillars = slide.pillars.map((p, j) => (j === i ? { ...p, [key]: v } : p));
    patch({ pillars });
  };
  return (
    <div style={{ ...baseSlide }}>
      <Editable as="h2" editing={editing} value={slide.title}
        onChange={(v) => patch({ title: v })}
        style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 700, margin: 0, marginBottom: 56, display: "block" }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
        {slide.pillars.map((p, i) => (
          <div
            key={i}
            style={{
              padding: 32, borderRadius: 24,
              background: `linear-gradient(160deg, ${slide.accent}22, transparent)`,
              border: `1px solid ${slide.accent}55`,
              minHeight: 240,
            }}
          >
            <div style={{ fontSize: 14, opacity: 0.5, marginBottom: 12 }}>0{i + 1}</div>
            <Editable as="div" editing={editing} value={p.name}
              onChange={(v) => updatePillar(i, "name", v)}
              style={{ fontSize: 28, fontWeight: 700 }}
            />
            <Editable as="div" editing={editing} value={p.text} multiline
              onChange={(v) => updatePillar(i, "text", v)}
              style={{ fontSize: 16, opacity: 0.75, marginTop: 14, lineHeight: 1.5 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function renderSlide(slide, editing, patch) {
  const props = { slide, editing, patch };
  switch (slide.kind) {
    case "cover": return <CoverSlide {...props} />;
    case "statement": return <StatementSlide {...props} />;
    case "split": return <SplitSlide {...props} />;
    case "metrics": return <MetricsSlide {...props} />;
    case "pillars": return <PillarsSlide {...props} />;
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
  const [slides, setSlides] = useState(slidesData);
  const [index, setIndex] = useState(0);
  // Two independent transition styles
  const [manualTransitionKey, setManualTransitionKey] = useState("slide");
  const [autoTransitionKey, setAutoTransitionKey] = useState("morph");
  const [direction, setDirection] = useState(1);
  const [autoplay, setAutoplay] = useState(false);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const [editing, setEditing] = useState(false);
  // Track whether the LAST nav was driven by the autoplay timer
  const [lastNavAuto, setLastNavAuto] = useState(false);

  // Patch current slide (used by Editable inside slides)
  const patchSlide = useCallback((partial) => {
    setSlides((arr) => arr.map((s, i) => (i === index ? { ...s, ...partial } : s)));
  }, [index]);

  const next = useCallback((fromAuto = false) => {
    setLastNavAuto(fromAuto);
    setDirection(1);
    setIndex((i) => {
      if (i >= slides.length - 1) return LOOP_AUTOPLAY && autoplay ? 0 : i;
      return i + 1;
    });
  }, [autoplay, slides.length]);
  const prev = useCallback(() => {
    setLastNavAuto(false);
    setDirection(-1);
    setIndex((i) => Math.max(i - 1, 0));
  }, []);
  const goTo = useCallback((i) => {
    setLastNavAuto(false);
    setDirection(i > index ? 1 : -1);
    setIndex(Math.max(0, Math.min(slides.length - 1, i)));
  }, [index, slides.length]);

  const toggleAutoplay = useCallback(() => setAutoplay((a) => !a), []);
  const cycleSpeed = useCallback(() => {
    setSpeed((s) => {
      const i = SPEED_PRESETS.indexOf(s);
      return SPEED_PRESETS[(i + 1) % SPEED_PRESETS.length];
    });
  }, []);
  const cycleManualTransition = useCallback(() => {
    setManualTransitionKey((k) => TRANSITION_KEYS[(TRANSITION_KEYS.indexOf(k) + 1) % TRANSITION_KEYS.length]);
  }, []);
  const cycleAutoTransition = useCallback(() => {
    setAutoTransitionKey((k) => TRANSITION_KEYS[(TRANSITION_KEYS.indexOf(k) + 1) % TRANSITION_KEYS.length]);
  }, []);

  // Autoplay timer
  useEffect(() => {
    if (!autoplay || paused || editing) return;
    const id = setTimeout(() => next(true), speed * 1000);
    return () => clearTimeout(id);
  }, [autoplay, paused, editing, speed, index, tick, next]);

  const manualNext = useCallback(() => { setTick((t) => t + 1); next(false); }, [next]);
  const manualPrev = useCallback(() => { setTick((t) => t + 1); prev(); }, [prev]);

  useEffect(() => {
    const onKey = (e) => {
      // Don't hijack keys while user is typing inside an editable field
      if (editing && e.target?.isContentEditable) return;
      if (e.key === "ArrowRight") { e.preventDefault(); manualNext(); }
      else if (e.key === " ") {
        e.preventDefault();
        if (autoplay) setPaused((p) => !p); else manualNext();
      }
      else if (e.key === "ArrowLeft" || e.key === "Backspace") { e.preventDefault(); manualPrev(); }
      else if (e.key === "Home") goTo(0);
      else if (e.key === "End") goTo(slides.length - 1);
      else if (e.key.toLowerCase() === "f") {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
        else document.exitFullscreen?.();
      } else if (e.key.toLowerCase() === "t") { cycleManualTransition(); }
      else if (e.key.toLowerCase() === "y") { cycleAutoTransition(); }
      else if (e.key.toLowerCase() === "a") { toggleAutoplay(); }
      else if (e.key.toLowerCase() === "s") { cycleSpeed(); }
      else if (e.key.toLowerCase() === "p") { setPaused((p) => !p); }
      else if (e.key.toLowerCase() === "e") { setEditing((v) => !v); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editing, manualNext, manualPrev, goTo, autoplay, toggleAutoplay, cycleSpeed, cycleManualTransition, cycleAutoTransition, slides.length]);

  const slide = slides[index];
  // Pick the active transition based on what triggered the nav
  const activeTransitionKey = lastNavAuto ? autoTransitionKey : manualTransitionKey;
  const variant = useMemo(() => {
    const base = TRANSITIONS[activeTransitionKey];
    if (activeTransitionKey !== "slide") return base;
    return {
      ...base,
      initial: { opacity: 0, x: 80 * direction },
      exit: { opacity: 0, x: -80 * direction },
    };
  }, [activeTransitionKey, direction]);

  return (
    <div
      style={{ background: "#000", overflow: "hidden", position: "relative" }}
      onMouseEnter={() => autoplay && !editing && setPaused(true)}
      onMouseLeave={() => autoplay && !editing && setPaused(false)}
    >
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
            {renderSlide(slide, editing, patchSlide)}
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>

      {/* Slide progress bar */}
      <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, height: 3, background: "rgba(255,255,255,0.08)", zIndex: 50 }}>
        <motion.div
          animate={{ width: `${((index + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: "100%", background: slide.accent }}
        />
      </div>

      {/* Autoplay countdown */}
      {autoplay && !editing && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.06)", zIndex: 50 }}>
          <motion.div
            key={`${index}-${tick}-${speed}-${paused}`}
            initial={{ width: "0%" }}
            animate={{ width: paused ? "0%" : "100%" }}
            transition={{ duration: paused ? 0 : speed, ease: "linear" }}
            style={{ height: "100%", background: slide.accent, opacity: 0.8 }}
          />
        </div>
      )}

      {/* Edit-mode banner */}
      {editing && (
        <div style={{
          position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 70,
          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
          color: "#fff", padding: "8px 16px", borderRadius: 999, fontSize: 12,
          letterSpacing: "0.18em", textTransform: "uppercase", backdropFilter: "blur(12px)",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
        }}>
          ✎ Editing — click any text · Esc to commit · E to exit
        </div>
      )}

      {/* HUD + controls */}
      <div
        style={{
          position: "fixed", bottom: 22, right: 28, zIndex: 60,
          display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", maxWidth: "70vw", justifyContent: "flex-end",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          fontSize: 12, color: "rgba(255,255,255,0.7)", letterSpacing: "0.12em", textTransform: "uppercase",
        }}
      >
        <span style={{ opacity: 0.6 }}>
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <span style={{ opacity: 0.3 }}>·</span>
        <button onClick={(e) => { e.stopPropagation(); toggleAutoplay(); }} style={hudBtn(autoplay, slide.accent)}>
          {autoplay ? (paused ? "▶ resume" : "⏸ pause") : "▶ auto"}
        </button>
        <button onClick={(e) => { e.stopPropagation(); cycleSpeed(); }} style={hudBtn(false, slide.accent)}>
          {speed}s
        </button>
        <span style={{ opacity: 0.3 }}>·</span>
        <button onClick={(e) => { e.stopPropagation(); cycleManualTransition(); }} style={hudBtn(!lastNavAuto, slide.accent)} title="Manual transition (T)">
          ✋ {manualTransitionKey}
        </button>
        <button onClick={(e) => { e.stopPropagation(); cycleAutoTransition(); }} style={hudBtn(lastNavAuto, slide.accent)} title="Autoplay transition (Y)">
          ⟳ {autoTransitionKey}
        </button>
        <span style={{ opacity: 0.3 }}>·</span>
        <button onClick={(e) => { e.stopPropagation(); setEditing((v) => !v); }} style={hudBtn(editing, slide.accent)} title="Toggle edit (E)">
          {editing ? "✓ done" : "✎ edit"}
        </button>
      </div>

      {/* Click zones — disabled in edit mode so clicks reach the editable text */}
      {!editing && (
        <>
          <button onClick={manualPrev} aria-label="Previous"
            style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: "20%", background: "transparent", border: 0, cursor: "w-resize" }} />
          <button onClick={manualNext} aria-label="Next"
            style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: "20%", background: "transparent", border: 0, cursor: "e-resize" }} />
        </>
      )}
    </div>
  );
}

function hudBtn(active, accent) {
  return {
    background: active ? `${accent}22` : "rgba(255,255,255,0.05)",
    color: active ? accent : "rgba(255,255,255,0.8)",
    border: `1px solid ${active ? accent + "66" : "rgba(255,255,255,0.12)"}`,
    borderRadius: 999,
    padding: "6px 12px",
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "inherit",
  };
}
