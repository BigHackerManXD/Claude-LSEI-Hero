/**
 * ============================================================
 * NetworkVisualization.jsx
 * ============================================================
 *
 * Renders an abstract, enterprise-grade generative network
 * visualization using SVG + Canvas. Features:
 *
 * - Structured nodes connected by clean lines
 * - Subtle floating animation on nodes
 * - Controlled Electric Teal (#2BB3A3) accent palette
 * - Responsive sizing via viewBox
 * - Minimal, high-signal aesthetic (not "AI-startup-cheesy")
 *
 * The visualization uses a predefined node layout rather than
 * random placement to maintain a designed, intentional feel.
 * ============================================================
 */

import { useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'

/**
 * Generates the predefined set of nodes for the network.
 * Each node has:
 *  - x, y: position (0–100 coordinate system, mapped to viewBox)
 *  - size: radius of the node circle
 *  - type: 'primary' (teal), 'secondary' (lighter), or 'tertiary' (faint)
 *  - delay: animation delay for staggered entrance
 */
const NODES = [
  // ── Primary cluster: top-right focal point ──
  { id: 1,  x: 55, y: 22, size: 4,   type: 'primary',   delay: 0.3 },
  { id: 2,  x: 72, y: 15, size: 2.5, type: 'secondary', delay: 0.5 },
  { id: 3,  x: 80, y: 32, size: 3.5, type: 'primary',   delay: 0.4 },
  { id: 4,  x: 65, y: 38, size: 2.5, type: 'secondary', delay: 0.6 },

  // ── Central constellation ──
  { id: 5,  x: 50, y: 50, size: 5,   type: 'primary',   delay: 0.2 },
  { id: 6,  x: 38, y: 42, size: 2,   type: 'tertiary',  delay: 0.7 },
  { id: 7,  x: 62, y: 55, size: 2.5, type: 'secondary', delay: 0.5 },

  // ── Bottom-right spread ──
  { id: 8,  x: 78, y: 60, size: 3.5, type: 'primary',   delay: 0.4 },
  { id: 9,  x: 88, y: 48, size: 2,   type: 'tertiary',  delay: 0.8 },
  { id: 10, x: 70, y: 72, size: 2.5, type: 'secondary', delay: 0.6 },

  // ── Top-left subtle nodes ──
  { id: 11, x: 30, y: 18, size: 2,   type: 'tertiary',  delay: 0.9 },
  { id: 12, x: 42, y: 30, size: 2.5, type: 'secondary', delay: 0.7 },

  // ── Bottom scatter ──
  { id: 13, x: 55, y: 78, size: 2.5, type: 'secondary', delay: 0.6 },
  { id: 14, x: 85, y: 75, size: 2,   type: 'tertiary',  delay: 0.9 },
  { id: 15, x: 45, y: 65, size: 2,   type: 'tertiary',  delay: 0.8 },

  // ── Far edges (sparse, adds depth) ──
  { id: 16, x: 20, y: 55, size: 1.5, type: 'tertiary',  delay: 1.0 },
  { id: 17, x: 92, y: 25, size: 1.5, type: 'tertiary',  delay: 1.0 },
  { id: 18, x: 35, y: 80, size: 1.5, type: 'tertiary',  delay: 1.1 },
]

/**
 * Defines which nodes connect to which, creating the network edges.
 * Connections are intentionally sparse — not everything connects —
 * to keep the design minimal and structured.
 */
const CONNECTIONS = [
  // ── Top cluster connections ──
  [1, 2],   [1, 3],   [2, 3],   [1, 4],   [3, 4],

  // ── Central hub (node 5) radiates outward ──
  [5, 1],   [5, 4],   [5, 7],   [5, 6],   [5, 12],

  // ── Right-side structure ──
  [3, 8],   [7, 8],   [8, 9],   [8, 10],  [3, 9],
  [3, 17],

  // ── Left-side whispers ──
  [6, 11],  [11, 12], [12, 1],  [6, 16],

  // ── Bottom lattice ──
  [7, 10],  [10, 13], [13, 15], [5, 15],
  [10, 14], [14, 13], [15, 18],
]

/**
 * Returns the fill color for a node based on its type.
 * Uses LSEI Design System colors:
 *  - primary:   Electric Teal at full opacity
 *  - secondary: Electric Teal at reduced opacity
 *  - tertiary:  Navy-lighter, barely visible
 */
function getNodeColor(type) {
  switch (type) {
    case 'primary':
      return 'rgba(43, 179, 163, 0.65)'   // Electric Teal, visible but not harsh
    case 'secondary':
      return 'rgba(43, 179, 163, 0.3)'    // Electric Teal, muted
    case 'tertiary':
      return 'rgba(43, 179, 163, 0.12)'   // Electric Teal, barely there
    default:
      return 'rgba(43, 179, 163, 0.12)'
  }
}

/**
 * Returns the glow radius for a node based on its type.
 * Primary nodes get a soft radial glow; others don't.
 */
function getGlowRadius(type) {
  switch (type) {
    case 'primary':   return 12
    case 'secondary': return 6
    default:          return 0
  }
}

/**
 * NetworkVisualization Component
 *
 * Renders the full SVG-based network visualization.
 * Uses Framer Motion for entrance animations and CSS
 * keyframes for the subtle floating idle motion.
 *
 * @param {string} className - Additional Tailwind classes for the container
 */
export default function NetworkVisualization({ className = '' }) {
  /**
   * Memoize node/connection data so React doesn't re-create
   * arrays on every render (performance optimization).
   */
  const nodes = useMemo(() => NODES, [])
  const connections = useMemo(() => CONNECTIONS, [])

  return (
    /* 
     * Outer container — fills the parent and positions the SVG.
     * 'overflow-hidden' clips any animated elements that drift outside.
     */
    <div className={`relative w-full h-full overflow-hidden ${className}`}>

      {/* 
       * SVG canvas with a 100x100 viewBox coordinate system.
       * This makes positioning nodes easy (use 0–100 values)
       * and the viewBox scales responsively to any container size.
       */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        /* preserveAspectRatio ensures the visualization covers 
           the container while maintaining proportions */
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── SVG Definitions: filters and gradients ── */}
        <defs>
          {/* Soft glow filter applied to primary nodes for ambient light */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Large ambient glow behind the central focal point */}
          <radialGradient id="ambient-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(43, 179, 163, 0.06)" />
            <stop offset="100%" stopColor="rgba(43, 179, 163, 0)" />
          </radialGradient>

          {/* Gradient for connection lines — fades at endpoints for softness */}
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(43, 179, 163, 0.15)" />
            <stop offset="50%" stopColor="rgba(43, 179, 163, 0.08)" />
            <stop offset="100%" stopColor="rgba(43, 179, 163, 0.15)" />
          </linearGradient>
        </defs>

        {/* ── Ambient background glow (very subtle, centered) ── */}
        <circle cx="55" cy="45" r="40" fill="url(#ambient-glow)" />

        {/* ── Connection Lines ──
             Rendered first (behind nodes) as thin, semi-transparent lines.
             Each line animates in with a stroke-dasharray reveal effect. */}
        {connections.map(([fromId, toId], index) => {
          // Find the source and target node objects
          const from = nodes.find(n => n.id === fromId)
          const to = nodes.find(n => n.id === toId)

          // Skip if either node is missing (defensive guard)
          if (!from || !to) return null

          return (
            <motion.line
              key={`connection-${fromId}-${toId}`}
              /* Node positions map directly to SVG coordinates */
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              /* Subtle line styling — thin, low opacity */
              stroke="rgba(43, 179, 163, 0.12)"
              strokeWidth="0.15"
              /* ── Framer Motion: line draw-in animation ──
                 Uses pathLength to animate from 0 → 1 (draws the line) */
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: {
                  duration: 1.5,
                  delay: 0.8 + index * 0.06,  // Stagger each line
                  ease: 'easeInOut',
                },
                opacity: {
                  duration: 0.5,
                  delay: 0.8 + index * 0.06,
                },
              }}
            />
          )
        })}

        {/* ── Network Nodes ──
             Rendered as circles with optional glow effects.
             Each node floats gently using CSS animation after entering. */}
        {nodes.map((node) => (
          <g key={`node-${node.id}`}>
            {/* Glow halo — only visible on primary/secondary nodes.
                Creates the soft teal ambient light effect. */}
            {getGlowRadius(node.type) > 0 && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={getGlowRadius(node.type)}
                fill={
                  node.type === 'primary'
                    ? 'rgba(43, 179, 163, 0.06)'   // Visible glow
                    : 'rgba(43, 179, 163, 0.03)'   // Subtle glow
                }
                /* Fade in the glow slightly after the node appears */
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: node.delay + 0.3 }}
              />
            )}

            {/* Main node circle */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={getNodeColor(node.type)}
              /* Primary nodes get the SVG glow filter */
              filter={node.type === 'primary' ? 'url(#glow)' : undefined}
              /* ── Framer Motion: scale-in entrance ──
                 Nodes start at scale 0 and pop in with a spring */
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                delay: node.delay,
              }}
              /* ── CSS class for idle floating animation ──
                 Applied after the entrance animation completes */
              className="animate-float"
              style={{
                /* Each node gets a unique animation delay for organic motion.
                   Multiplied by node.id to desynchronize the floats. */
                animationDelay: `${node.id * 0.7}s`,
                /* Transform origin at the node's center for proper scaling */
                transformOrigin: `${node.x}px ${node.y}px`,
              }}
            />
          </g>
        ))}

        {/* ── Pulsing accent dots ──
             Small bright dots that pulse on key primary nodes,
             drawing the eye to focal points. */}
        {nodes
          .filter(n => n.type === 'primary')
          .map((node) => (
            <motion.circle
              key={`pulse-${node.id}`}
              cx={node.x}
              cy={node.y}
              r={node.size * 0.35}
              fill="rgba(43, 179, 163, 1)"
              /* Pulsing opacity animation — breathes gently */
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: node.delay + 1,
                ease: 'easeInOut',
              }}
            />
          ))}
      </svg>

      {/* ── Decorative grid overlay ──
           Very faint grid lines that add a structured, technical feel.
           Pure CSS, no JS overhead. */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(43, 179, 163, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(43, 179, 163, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}
