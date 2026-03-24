import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { kanoReviewData, complaintsByType, complaintsByProblem, complaintsBySourceType, ctqMetrics } from "@/data/interviewData";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, PieChart, Pie } from "recharts";

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, className: visible ? "animate-reveal" : "opacity-0" };
};

// --- Ecosystem Diagram Data ---
interface FlowNode {
  id: string;
  label: string;
  icon: string;
  group: "source" | "channel" | "process" | "action" | "output";
  x: number;
  y: number;
}

interface FlowLink {
  from: string;
  to: string;
  animated?: boolean;
}

const nodes: FlowNode[] = [
  { id: "plaintes", label: "Plaintes\nClients (88)", icon: "📋", group: "source", x: 5, y: 10 },
  { id: "avis", label: "Avis en Ligne\n& Réseaux", icon: "📡", group: "source", x: 5, y: 28 },
  { id: "nc-produit", label: "NC Produit\nFini", icon: "⚠️", group: "source", x: 5, y: 46 },
  { id: "nc-fournisseur", label: "NC Réception\nFournisseurs", icon: "📦", group: "source", x: 5, y: 64 },
  { id: "reprises", label: "Reprises\nProduction", icon: "🔧", group: "source", x: 5, y: 82 },

  { id: "emails", label: "Emails", icon: "📧", group: "channel", x: 28, y: 8 },
  { id: "telephone", label: "Téléphone", icon: "📞", group: "channel", x: 28, y: 20 },
  { id: "google", label: "Google\nReviews", icon: "⭐", group: "channel", x: 28, y: 32 },
  { id: "reseaux", label: "Facebook\nYouTube TikTok", icon: "💬", group: "channel", x: 28, y: 44 },
  { id: "forums", label: "Forums\nOff-Road", icon: "🏁", group: "channel", x: 28, y: 56 },
  { id: "terrain", label: "Visites\nTerrain / Dealers", icon: "🏭", group: "channel", x: 28, y: 68 },
  { id: "formelles", label: "Réclamations\nFormelles / RMA", icon: "📄", group: "channel", x: 28, y: 80 },
  { id: "sondage", label: "Sondage\nAnnuel", icon: "📊", group: "channel", x: 28, y: 92 },

  { id: "ctq", label: "Définition\nCTQ", icon: "🎯", group: "process", x: 52, y: 18 },
  { id: "kano", label: "Catégorisation\nKano", icon: "📊", group: "process", x: 52, y: 43 },
  { id: "scoring", label: "Score Composite\nFréq × Sév × Kano", icon: "⚡", group: "process", x: 52, y: 68 },

  { id: "corrective", label: "Actions\nCorrectives", icon: "🔴", group: "action", x: 75, y: 30 },
  { id: "preventive", label: "Actions\nPréventives", icon: "🟢", group: "action", x: 75, y: 60 },

  { id: "dashboard", label: "Dashboard\nVOC ELKA", icon: "📈", group: "output", x: 93, y: 45 },
];

const links: FlowLink[] = [
  { from: "plaintes", to: "emails", animated: true },
  { from: "plaintes", to: "telephone", animated: true },
  { from: "plaintes", to: "formelles", animated: true },
  { from: "avis", to: "google", animated: true },
  { from: "avis", to: "reseaux", animated: true },
  { from: "avis", to: "forums", animated: true },
  { from: "nc-produit", to: "formelles", animated: true },
  { from: "nc-fournisseur", to: "emails", animated: true },
  { from: "nc-fournisseur", to: "terrain", animated: true },
  { from: "reprises", to: "terrain", animated: true },
  { from: "reprises", to: "formelles", animated: true },
  { from: "emails", to: "ctq", animated: true },
  { from: "telephone", to: "ctq", animated: true },
  { from: "google", to: "kano", animated: true },
  { from: "reseaux", to: "kano", animated: true },
  { from: "forums", to: "kano", animated: true },
  { from: "terrain", to: "ctq", animated: true },
  { from: "formelles", to: "scoring", animated: true },
  { from: "sondage", to: "kano", animated: true },
  { from: "ctq", to: "scoring", animated: true },
  { from: "kano", to: "scoring", animated: true },
  { from: "scoring", to: "corrective", animated: true },
  { from: "scoring", to: "preventive", animated: true },
  { from: "corrective", to: "dashboard", animated: true },
  { from: "preventive", to: "dashboard", animated: true },
  { from: "dashboard", to: "plaintes" },
  { from: "corrective", to: "reprises" },
];

const groupColors: Record<FlowNode["group"], { bg: string; border: string; text: string }> = {
  source: { bg: "bg-[hsl(15,55%,45%)]/15", border: "border-[hsl(15,55%,45%)]/50", text: "text-[hsl(15,55%,35%)]" },
  channel: { bg: "bg-[hsl(205,60%,30%)]/15", border: "border-[hsl(205,60%,30%)]/50", text: "text-[hsl(205,60%,25%)]" },
  process: { bg: "bg-[hsl(40,65%,50%)]/15", border: "border-[hsl(40,65%,50%)]/50", text: "text-[hsl(40,65%,35%)]" },
  action: { bg: "bg-[hsl(185,70%,30%)]/15", border: "border-[hsl(185,70%,30%)]/50", text: "text-[hsl(185,70%,22%)]" },
  output: { bg: "bg-[hsl(152,40%,42%)]/15", border: "border-[hsl(152,40%,42%)]/50", text: "text-[hsl(152,40%,30%)]" },
};

const groupLabels: Record<FlowNode["group"], string> = {
  source: "Sources VOC",
  channel: "Canaux d'Interaction",
  process: "Boîtes Noires",
  action: "Actions CAPA",
  output: "Tableau de Bord",
};

const layers = [
  { id: "input", label: "ENTRÉE", sub: "Plaintes, NC, Avis", cls: "bg-[hsl(15,55%,45%)]/10 border-[hsl(15,55%,45%)]/30 text-[hsl(15,55%,35%)]" },
  { id: "process", label: "TRAITEMENT", sub: "Kano + CTQ + Score", cls: "bg-[hsl(40,65%,50%)]/10 border-[hsl(40,65%,50%)]/30 text-[hsl(40,65%,35%)]" },
  { id: "decide", label: "DÉCISION", sub: "Moteur de Priorisation", cls: "bg-[hsl(358,81%,52%)]/10 border-[hsl(358,81%,52%)]/30 text-[hsl(358,81%,52%)]" },
  { id: "act", label: "ACTION", sub: "Actions CAPA", cls: "bg-[hsl(185,70%,30%)]/10 border-[hsl(185,70%,30%)]/30 text-[hsl(185,70%,22%)]" },
  { id: "output", label: "SORTIE", sub: "KPIs & Métriques", cls: "bg-[hsl(152,40%,42%)]/10 border-[hsl(152,40%,42%)]/30 text-[hsl(152,40%,30%)]" },
];

const feedbackLoops = [
  { label: "CAPA → Production", desc: "Les actions correctives réduisent les NC et reprises", type: "équilibrage" },
  { label: "Dérive CTQ → Escalade", desc: "PPM > 10 000 déclenche alerte qualité", type: "équilibrage" },
  { label: "Revue Gouvernance", desc: "Quotidien (QC) / Hebdo (Direction) / Mensuel (Stratégique)", type: "renforcement" },
];

const KANO_COLORS: Record<string, string> = {
  "Must-be": "hsl(358, 81%, 52%)",
  "Performance": "hsl(38, 80%, 50%)",
  "Attractive": "hsl(152, 60%, 40%)",
  "Indifferent": "hsl(0, 0%, 71%)",
};

const KANO_BG: Record<string, string> = {
  "Must-be": "bg-red-100 text-red-800 border-red-200",
  "Performance": "bg-amber-100 text-amber-800 border-amber-200",
  "Attractive": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Indifferent": "bg-gray-100 text-gray-600 border-gray-200",
};

const SEVERITY_BADGE: Record<string, string> = {
  critical: "bg-red-500 text-white",
  high: "bg-red-400 text-white",
  medium: "bg-amber-400 text-amber-900",
  low: "bg-gray-300 text-gray-700",
};

function AnimatedParticle({ fromNode, toNode, delay }: { fromNode: FlowNode; toNode: FlowNode; delay: number }) {
  return (
    <motion.circle
      r="3"
      fill="hsl(358, 81%, 52%)"
      initial={{ cx: `${fromNode.x}%`, cy: `${fromNode.y}%` }}
      animate={{
        cx: [`${fromNode.x}%`, `${toNode.x}%`],
        cy: [`${fromNode.y}%`, `${toNode.y}%`],
      }}
      transition={{
        duration: 2 + Math.random(),
        delay,
        repeat: Infinity,
        repeatDelay: 1.5 + Math.random() * 2,
        ease: "easeInOut",
      }}
      opacity={0.8}
    />
  );
}

export default function Module6() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [pulseIndex, setPulseIndex] = useState(0);
  const [selectedKano, setSelectedKano] = useState<(typeof kanoReviewData)[0] | null>(null);
  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();
  const r4 = useReveal();
  const r5 = useReveal();
  const r6 = useReveal();
  const r7 = useReveal();

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex(prev => (prev + 1) % nodes.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const getNode = (id: string) => nodes.find(n => n.id === id)!;

  const highlightedLinks = activeNode
    ? links.filter(l => l.from === activeNode || l.to === activeNode)
    : [];
  const highlightedNodeIds = activeNode
    ? new Set([activeNode, ...highlightedLinks.map(l => l.from), ...highlightedLinks.map(l => l.to)])
    : null;

  return (
    <div className="space-y-8">
      <div ref={r1.ref} className={r1.className}>
        <h3 className="section-title text-xl mb-2">Prochaines étapes — Système VOC cible</h3>
        <p className="text-muted-foreground text-sm mb-6">
          Vision du système VOC intégré ELKA Suspension. Architecture cible, priorisation Kano et CTQ identifiés.
        </p>
      </div>

      {/* Architecture Flow */}
      <div ref={r2.ref} className={r2.className}>
        <div className="consulting-card">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Architecture Système — Boucle Fermée</p>
          <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-2">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-1 shrink-0"
              >
                <div className={`px-3 py-2 rounded border text-center ${layer.cls}`}>
                  <div className="text-[10px] font-bold tracking-widest">{layer.label}</div>
                  <div className="text-[9px] opacity-70 mt-0.5">{layer.sub}</div>
                </div>
                {i < layers.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="border-t border-dashed border-border pt-3 space-y-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 font-semibold">Boucles de Rétroaction</p>
            <div className="flex flex-wrap gap-2">
              {feedbackLoops.map((loop, i) => (
                <div key={i} className="flex-1 min-w-[140px] p-2 rounded border border-dashed border-[hsl(var(--elka-red))]/20 bg-red-50">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[hsl(var(--elka-red))] text-xs">↺</span>
                    <span className="text-[10px] font-bold text-foreground">{loop.label}</span>
                  </div>
                  <div className="text-[9px] text-muted-foreground mt-1">{loop.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ecosystem Diagram */}
      <div ref={r3.ref} className={r3.className}>
        <div className="consulting-card p-4">
          <p className="text-xs font-semibold text-[hsl(var(--elka-red))] uppercase tracking-widest mb-1">Écosystème VOC — ELKA Suspension — Flux Interactif Complet</p>
          <p className="text-xs text-muted-foreground mb-4">Survolez un nœud pour visualiser ses connexions dans le système.</p>

          <div className="flex flex-wrap gap-3 mb-4">
            {(Object.keys(groupLabels) as Array<FlowNode["group"]>).map(g => (
              <div key={g} className="flex items-center gap-1.5">
                <div className={`h-2.5 w-2.5 rounded-sm border ${groupColors[g].bg} ${groupColors[g].border}`} />
                <span className="text-[10px] text-muted-foreground">{groupLabels[g]}</span>
              </div>
            ))}
          </div>

          <div className="relative w-full" style={{ paddingBottom: "55%" }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {links.map((link, i) => {
                const from = getNode(link.from);
                const to = getNode(link.to);
                const isHighlighted = highlightedLinks.includes(link);
                const isFeedback = !link.animated;
                return (
                  <g key={i}>
                    <motion.line
                      x1={`${from.x}%`} y1={`${from.y}%`}
                      x2={`${to.x}%`} y2={`${to.y}%`}
                      stroke={isFeedback ? "hsl(358, 81%, 52%)" : isHighlighted ? "hsl(var(--foreground))" : "hsl(var(--border))"}
                      strokeWidth={isHighlighted ? 0.4 : 0.15}
                      strokeDasharray={isFeedback ? "1 1" : undefined}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: i * 0.03 }}
                    />
                    {link.animated && <AnimatedParticle fromNode={from} toNode={to} delay={i * 0.15} />}
                  </g>
                );
              })}
            </svg>

            {nodes.map((node, i) => {
              const colors = groupColors[node.group];
              const isPulsing = i === pulseIndex;
              const dimmed = highlightedNodeIds && !highlightedNodeIds.has(node.id);
              return (
                <motion.div
                  key={node.id}
                  className="absolute cursor-pointer select-none"
                  style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: dimmed ? 0.3 : 1, scale: isPulsing && !activeNode ? 1.1 : 1 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  whileHover={{ scale: 1.15, zIndex: 50 }}
                >
                  <div
                    className={`px-2 py-1.5 rounded border text-center ${colors.bg} ${colors.border} ${isPulsing && !activeNode ? "ring-1 ring-[hsl(var(--elka-red))]/30" : ""} backdrop-blur-sm transition-shadow`}
                    style={{ minWidth: "60px" }}
                  >
                    <div className="text-sm leading-none mb-0.5">{node.icon}</div>
                    <div className={`text-[7px] font-bold leading-tight whitespace-pre-line ${colors.text}`}>
                      {node.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <motion.div className="absolute bottom-1 right-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
              <div className="flex items-center gap-1.5">
                <span className="text-[hsl(var(--elka-red))] text-xs">↺</span>
                <span className="text-[8px] text-[hsl(var(--elka-red))] font-semibold">Boucles de Rétroaction</span>
              </div>
            </motion.div>
          </div>

          <AnimatePresence>
            {activeNode && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="mt-3 p-3 rounded border border-[hsl(var(--elka-red))]/20 bg-red-50"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getNode(activeNode).icon}</span>
                  <div>
                    <div className="text-xs font-bold text-foreground">
                      {getNode(activeNode).label.replace("\n", " ")}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      Connexions : {links.filter(l => l.from === activeNode || l.to === activeNode).length} liens actifs
                      {" • "}Groupe : {groupLabels[getNode(activeNode).group]}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ============================================================ */}
      {/* PRIORISATION KANO — Plaintes Clients */}
      {/* ============================================================ */}
      <div ref={r4.ref} className={r4.className}>
        <div className="consulting-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded bg-[hsl(var(--elka-red))] flex items-center justify-center text-white text-xs font-bold">K</div>
            <div>
              <p className="text-xs font-bold text-[hsl(var(--elka-red))] uppercase tracking-widest">Priorisation Kano — Plaintes Clients</p>
              <p className="text-[10px] text-muted-foreground">88 plaintes analysées • Catégorisation par famille de problème • WCM</p>
            </div>
          </div>

          {/* Complaints by Type - Pie */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Répartition par type</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={complaintsBySourceType}
                    dataKey="count"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    strokeWidth={2}
                    stroke="hsl(var(--card))"
                  >
                    {complaintsBySourceType.map((_, i) => (
                      <Cell key={i} fill={["hsl(358,81%,52%)", "hsl(38,80%,50%)", "hsl(0,0%,71%)"][i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value} plaintes`, ""]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-2">
                {complaintsBySourceType.map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: ["hsl(358,81%,52%)", "hsl(38,80%,50%)", "hsl(0,0%,71%)"][i] }} />
                    <span className="text-[10px] text-muted-foreground">{s.type} ({s.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* By Family */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Familles de problèmes</p>
              <div className="space-y-2">
                {complaintsByType.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-medium text-foreground">{c.category}</span>
                        <div className="flex items-center gap-1.5">
                          <span className={`wcm-badge border ${KANO_BG[c.kanoClass]}`}>{c.kanoClass}</span>
                          <span className={`wcm-badge ${SEVERITY_BADGE[c.severity]}`}>{c.count}</span>
                        </div>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-1.5">
                        <div className="h-1.5 rounded-full bg-[hsl(var(--elka-red))]" style={{ width: `${c.percentage}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Problems Bar Chart */}
          <div className="border-t border-border pt-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Top 10 problèmes — Pareto</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={complaintsByProblem.slice(0, 10)} layout="vertical" margin={{ left: 120 }}>
                <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis dataKey="problem" type="category" tick={{ fontSize: 10, fill: "hsl(var(--foreground))" }} width={115} />
                <Tooltip formatter={(value: number) => [`${value} occurrences`, ""]} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {complaintsByProblem.slice(0, 10).map((entry, i) => (
                    <Cell key={i} fill={KANO_COLORS[entry.kanoClass] || "hsl(0,0%,71%)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* PRIORISATION KANO — Avis en Ligne + Interviews */}
      {/* ============================================================ */}
      <div ref={r5.ref} className={r5.className}>
        <div className="consulting-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center text-white text-xs font-bold">A</div>
            <div>
              <p className="text-xs font-bold text-amber-700 uppercase tracking-widest">Priorisation Kano — Avis en Ligne & Interviews</p>
              <p className="text-[10px] text-muted-foreground">Classification des attributs qualité perçus par le client • Modèle Kano</p>
            </div>
          </div>

          {/* Kano Legend */}
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(KANO_BG).map(([k, cls]) => (
              <div key={k} className={`wcm-badge border ${cls}`}>
                {k === "Must-be" ? "🔴 Must-be (Basique)" : k === "Performance" ? "🟡 Performance" : k === "Attractive" ? "🟢 Attractive" : "⚪ Indifférent"}
              </div>
            ))}
          </div>

          <div className="grid gap-3">
            {kanoReviewData.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedKano(item)}
                className="p-3 rounded-lg border cursor-pointer hover:shadow-md active:scale-[0.99] transition-all bg-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm font-semibold text-foreground">{item.attribute}</span>
                      <span className={`wcm-badge border ${KANO_BG[item.kanoClass]}`}>{item.kanoClass}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${
                      item.sentiment === "Négatif" ? "bg-red-100 text-red-700" : item.sentiment === "Positif" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>{item.sentiment}</span>
                    <span className="text-[9px] text-muted-foreground">{item.source}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Kano Detail Modal */}
      <AnimatePresence>
        {selectedKano && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setSelectedKano(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card rounded-xl p-6 max-w-lg w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`wcm-badge border ${KANO_BG[selectedKano.kanoClass]}`}>{selectedKano.kanoClass}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    selectedKano.sentiment === "Négatif" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                  }`}>{selectedKano.sentiment}</span>
                </div>
                <button onClick={() => setSelectedKano(null)} className="p-1 rounded hover:bg-secondary active:scale-95 text-muted-foreground">✕</button>
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">{selectedKano.attribute}</h4>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">Source</p>
                  <p className="text-sm font-medium text-foreground mt-1">{selectedKano.source}</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">Fréquence</p>
                  <p className="text-sm font-medium text-foreground mt-1">{selectedKano.frequency}</p>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-[10px] uppercase tracking-wide text-[hsl(var(--elka-red))] font-semibold mb-1">Analyse</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{selectedKano.description}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* CTQ IDENTIFIÉS */}
      {/* ============================================================ */}
      <div ref={r6.ref} className={r6.className}>
        <div className="consulting-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded bg-[hsl(var(--elka-darkgray))] flex items-center justify-center text-white text-xs font-bold">C</div>
            <div>
              <p className="text-xs font-bold text-foreground uppercase tracking-widest">CTQ Identifiés — Critical to Quality</p>
              <p className="text-[10px] text-muted-foreground">Caractéristiques critiques à la qualité dérivées de la Voix du Client • WCM Pillar Quality</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[hsl(var(--elka-red))]/20">
                  <th className="text-left py-2 px-3 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">ID</th>
                  <th className="text-left py-2 px-3 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">CTQ Name</th>
                  <th className="text-left py-2 px-3 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">KPI Metric</th>
                  <th className="text-left py-2 px-3 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Unit</th>
                  <th className="text-left py-2 px-3 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Target</th>
                  <th className="text-left py-2 px-3 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Département</th>
                </tr>
              </thead>
              <tbody>
                {ctqMetrics.map((ctq, i) => (
                  <motion.tr
                    key={ctq.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="border-b border-border hover:bg-secondary/50 transition-colors"
                  >
                    <td className="py-3 px-3">
                      <span className="text-[10px] font-mono font-bold text-[hsl(var(--elka-red))]">{ctq.id}</span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-foreground text-xs">{ctq.name}</td>
                    <td className="py-3 px-3 text-xs text-muted-foreground">{ctq.kpiMetric}</td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-secondary font-medium">{ctq.unit}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">{ctq.targetValue}</span>
                    </td>
                    <td className="py-3 px-3 text-[11px] text-muted-foreground">{ctq.responsibleDepartment}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <p className="text-[10px] uppercase tracking-widest text-amber-700 font-bold mb-1">⚠️ Action requise</p>
            <p className="text-xs text-amber-800">Les valeurs cibles et actuelles doivent être définies pour chaque CTQ. Sans baseline ni target, aucune mesure d'amélioration n'est possible.</p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div ref={r7.ref} className={r7.className}>
        <div className="bg-[hsl(var(--elka-darkgray))] text-white rounded-xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded bg-[hsl(var(--elka-red))] flex items-center justify-center text-white font-bold text-xl">E</div>
          </div>
          <p className="text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            « La transformation VOC n'est pas un projet IT.<br/>
            <span className="text-[hsl(var(--elka-red))] font-bold">C'est un changement de culture organisationnelle.</span> »
          </p>
          <p className="text-sm text-white/50 mt-4">ELKA Suspension — World Class Manufacturing</p>
          <p className="text-xs text-white/30 mt-2">Prêts à passer du mode réactif au mode prédictif ?</p>
        </div>
      </div>
    </div>
  );
}
