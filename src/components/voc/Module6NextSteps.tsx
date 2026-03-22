import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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
  { id: "plaintes", label: "Plaintes\nClients (559)", icon: "📋", group: "source", x: 5, y: 10 },
  { id: "avis", label: "Avis en Ligne\n& Réseaux (150)", icon: "📡", group: "source", x: 5, y: 28 },
  { id: "nc-produit", label: "NC Produit\nFini (151)", icon: "⚠️", group: "source", x: 5, y: 46 },
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
  source: { bg: "bg-destructive/15", border: "border-destructive/40", text: "text-destructive" },
  channel: { bg: "bg-blue-500/15", border: "border-blue-500/40", text: "text-blue-600 dark:text-blue-400" },
  process: { bg: "bg-amber-500/15", border: "border-amber-500/40", text: "text-amber-700 dark:text-amber-400" },
  action: { bg: "bg-primary/15", border: "border-primary/40", text: "text-primary" },
  output: { bg: "bg-emerald-500/15", border: "border-emerald-500/40", text: "text-emerald-700 dark:text-emerald-400" },
};

const groupLabels: Record<FlowNode["group"], string> = {
  source: "Sources VOC",
  channel: "Canaux d'Interaction",
  process: "Boîtes Noires",
  action: "Actions CAPA",
  output: "Tableau de Bord",
};

// --- System Flow Data ---
const layers = [
  { id: "input", label: "ENTRÉE", sub: "Plaintes, NC, Avis", cls: "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400" },
  { id: "process", label: "TRAITEMENT", sub: "Kano + CTQ + Score", cls: "bg-primary/10 border-primary/30 text-primary" },
  { id: "decide", label: "DÉCISION", sub: "Moteur de Priorisation", cls: "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400" },
  { id: "act", label: "ACTION", sub: "Actions CAPA", cls: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400" },
  { id: "output", label: "SORTIE", sub: "KPIs & Métriques", cls: "bg-muted border-border text-foreground" },
];

const feedbackLoops = [
  { label: "CAPA → Production", desc: "Les actions correctives réduisent les NC et reprises", type: "équilibrage" },
  { label: "Dérive CTQ → Escalade", desc: "PPM > 10 000 déclenche alerte qualité", type: "équilibrage" },
  { label: "Revue Gouvernance", desc: "Quotidien (QC) / Hebdo (Direction) / Mensuel (Stratégique)", type: "renforcement" },
];

function AnimatedParticle({ fromNode, toNode, delay }: { fromNode: FlowNode; toNode: FlowNode; delay: number }) {
  return (
    <motion.circle
      r="3"
      fill="hsl(var(--accent))"
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
  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();

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
          Vision du système VOC intégré vers lequel l'organisation doit évoluer. Explorez l'écosystème complet et l'architecture cible.
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
                {i < layers.length - 1 && (
                  <span className="text-muted-foreground text-xs">→</span>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="border-t border-dashed border-border pt-3 space-y-2"
          >
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 font-semibold">Boucles de Rétroaction</p>
            <div className="flex flex-wrap gap-2">
              {feedbackLoops.map((loop, i) => (
                <div key={i} className="flex-1 min-w-[140px] p-2 rounded border border-dashed border-primary/20 bg-primary/5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-accent text-xs">↺</span>
                    <span className="text-[10px] font-bold text-primary">{loop.label}</span>
                  </div>
                  <div className="text-[9px] text-muted-foreground mt-1">{loop.desc}</div>
                  <div className="text-[8px] text-muted-foreground/60 mt-1 uppercase">Boucle {loop.type}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ecosystem Diagram */}
      <div ref={r3.ref} className={r3.className}>
        <div className="consulting-card p-4">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Écosystème VOC — Flux Interactif Complet</p>
          <p className="text-xs text-muted-foreground mb-4">Survolez un nœud pour visualiser ses connexions dans le système.</p>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mb-4">
            {(Object.keys(groupLabels) as Array<FlowNode["group"]>).map(g => (
              <div key={g} className="flex items-center gap-1.5">
                <div className={`h-2.5 w-2.5 rounded-sm border ${groupColors[g].bg} ${groupColors[g].border}`} />
                <span className="text-[10px] text-muted-foreground">{groupLabels[g]}</span>
              </div>
            ))}
          </div>

          {/* Interactive Diagram */}
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
                      stroke={isFeedback ? "hsl(var(--accent))" : isHighlighted ? "hsl(var(--primary))" : "hsl(var(--border))"}
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

            {/* Nodes */}
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
                    className={`px-2 py-1.5 rounded border text-center ${colors.bg} ${colors.border} ${isPulsing && !activeNode ? "ring-1 ring-primary/30" : ""} backdrop-blur-sm transition-shadow`}
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

            {/* Feedback loop label */}
            <motion.div className="absolute bottom-1 right-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
              <div className="flex items-center gap-1.5">
                <span className="text-accent text-xs">↺</span>
                <span className="text-[8px] text-accent font-semibold">Boucles de Rétroaction</span>
              </div>
            </motion.div>
          </div>

          {/* Active node info */}
          <AnimatePresence>
            {activeNode && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="mt-3 p-3 rounded border border-primary/20 bg-primary/5"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getNode(activeNode).icon}</span>
                  <div>
                    <div className="text-xs font-bold text-primary">
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

      {/* Call to action */}
      <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
        <p className="text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
          « La transformation VOC n'est pas un projet IT.<br/>
          <span className="text-accent font-bold">C'est un changement de culture organisationnelle.</span> »
        </p>
        <p className="text-sm text-primary-foreground/60 mt-4">Prêts à passer du mode réactif au mode prédictif ?</p>
      </div>
    </div>
  );
}
