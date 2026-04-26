// 🍏 Keynote Apple PRO - Single File App

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slidesData = [
  { title: "Operational Excellence", content: "Drive performance with clarity" },
  { title: "KPIs", content: "Efficiency 92% | Cost -18%" }
];

function Slide({ title, content }) {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80 }}>
      <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>{title}</motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 0.8, y: 0 }}>{content}</motion.p>
    </div>
  );
}

export default function App() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, slidesData.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Slide {...slidesData[index]} />
      </motion.div>
    </AnimatePresence>
  );
}