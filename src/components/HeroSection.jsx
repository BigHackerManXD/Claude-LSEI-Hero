/**
 * ============================================================
 * HeroSection.jsx
 * ============================================================
 *
 * The LSEI hero section — a split-layout component:
 *   LEFT  40%  →  Headline, subheadline, CTA (negative space)
 *   RIGHT 60%  →  Abstract network visualization
 *
 * Design system adherence:
 *   - Deep Navy (#0A1A2F) background with subtle gradient
 *   - Inter 64px/700 display headline
 *   - "strategic" accented in Electric Teal (#2BB3A3)
 *   - Body text in #B8BCC3 (inverse-secondary)
 *   - Framer Motion cascade entrance animations
 *   - Generous whitespace (96–120px vertical padding)
 *
 * Animation sequence (cascade):
 *   1. Overline tag fades in
 *   2. Headline slides up
 *   3. Subheadline fades in
 *   4. CTA button slides up
 *   5. Network visualization draws in (parallel)
 *
 * ============================================================
 */

import { motion } from 'framer-motion'
import NetworkVisualization from './NetworkVisualization'

/**
 * Container animation variant — orchestrates staggered children.
 * Each child animates 0.2s after the previous one.
 */
const containerVariants = {
  /* Hidden state: no children visible yet */
  hidden: { opacity: 1 },
  /* Visible state: triggers children in sequence */
  visible: {
    opacity: 1,
    transition: {
      /* staggerChildren: delay between each child's animation start */
      staggerChildren: 0.2,
      /* delayChildren: wait 0.3s before the first child begins */
      delayChildren: 0.3,
    },
  },
}

/**
 * Individual item animation variant — each text block
 * slides up from 30px below and fades in.
 */
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,             // Start 30px below final position
  },
  visible: {
    opacity: 1,
    y: 0,              // Arrive at natural position
    transition: {
      type: 'spring',  // Spring physics for organic feel
      stiffness: 100,  // Lower = softer spring
      damping: 15,     // Controls oscillation decay
      mass: 1,         // Natural weight
    },
  },
}

/**
 * CTA button animation — slightly different timing
 * for a more deliberate entrance after text settles.
 */
const ctaVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 18,
      delay: 0.1,      // Extra beat after stagger position
    },
  },
}

/**
 * Right-side visualization entrance — fades and scales in
 * from a slightly smaller size for depth effect.
 */
const visualVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,       // Start slightly smaller
    x: 20,             // Slide in from the right
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],  // Custom ease-out curve
      delay: 0.2,                        // Starts slightly after text
    },
  },
}

/**
 * HeroSection Component
 *
 * Renders the full-viewport hero with split layout.
 * The right column (network visualization) is absolutely positioned
 * to fill the right 58% of the viewport, while the left column
 * uses flex centering within a max-width container.
 */
export default function HeroSection() {
  return (
    /* ── Hero wrapper ──
       Full viewport height, Deep Navy background with subtle gradient.
       Position relative so the absolute right column is contained.
       Uses the LSEI hero gradient: 135deg from navy-700 → deep-surface → navy-500 */
    <section
      id="hero-section"
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
      "
      style={{
        /* LSEI Hero Gradient — subtle depth, not flat */
        background: 'linear-gradient(135deg, #0A1A2F 0%, #0D1F35 50%, #163050 100%)',
        padding: '0 3rem',
        // border: '1px solid red', HELPER
      }}
    >
      {/* ════════════════════════════════════════════
          RIGHT COLUMN — Absolutely positioned, 58% width
          Contains the network visualization.
          Positioned behind the left column content (z-0).
          On mobile, this becomes a background element.
          ════════════════════════════════════════════ */}
      <motion.div
        className="
          absolute
          top-0
          right-0
          w-full
          lg:w-[55%]
          h-full
          z-0
        "
        variants={visualVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Network visualization fills this column */}
        <NetworkVisualization className="w-full h-full" />

        {/* ── Edge fade overlays ──
             Gradient masks on the edges so the visualization
             fades seamlessly into the background instead of
             having a hard cut. */}

        {/* Left edge — blends into the text column */}
        <div
          className="absolute inset-y-0 left-0 w-48 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(10, 26, 47, 1) 0%, rgba(10, 26, 47, 0.6) 40%, transparent 100%)',
          }}
        />

        {/* Top edge */}
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(10, 26, 47, 0.8) 0%, transparent 100%)',
          }}
        />

        {/* Bottom edge */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(0deg, rgba(10, 26, 47, 0.8) 0%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* ════════════════════════════════════════════
          LEFT COLUMN — Content area, constrained width
          Contains: overline tag, headline, subheadline, CTA
          Uses a max-width container with generous left padding.
          z-10 ensures text sits above the visualization.
          ════════════════════════════════════════════ */}
      <div
        className="
          relative
          z-10
          min-h-screen
          flex
          items-center
        "

        style={{
          // border: '1px solid green', HELPER
          paddingBottom: '0px'
        }}
      >
        <div
          className="
            w-full
            max-w-[1440px]
            mx-auto
            px-8
            sm:pt-12
            lg:pt-16
            xl:pt-20
            py-24
            sm:py-28
            lg:py-0
          "
        >
          <motion.div
            className="
              w-full
              lg:w-[45%]
              lg:max-w-[560px]
            "
            /* Framer Motion: animate children in staggered cascade */
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* ── Overline tag ──
                 Small label above the headline that signals the category.
                 Uses LSEI tag styling: teal-50 bg, teal-600 text, 12px/500. */}
            <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
              <span
                className="
                  inline-block
                  rounded-md
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  tracking-wider
                  uppercase
                "
                style={{
                  backgroundColor: 'rgba(43, 179, 163, 0.1)',  // Teal wash on dark bg
                  color: '#2BB3A3',                               // Electric Teal text
                  letterSpacing: '0.08em',
                }}
              >
                Enterprise Technology Consulting
              </span>
            </motion.div>

            {/* ── Main Headline ──
                 Display size: 64px on desktop, scales down on mobile.
                 Weight 700, tight letter-spacing (-0.02em).
                 The word "strategic" is wrapped in a <span> for teal accent.
                 Per design: "Headlines don't shout, they command." */}
            <motion.h1
              variants={itemVariants}
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                xl:text-[64px]
                font-bold
                leading-[1.05]
                mb-6
                sm:mb-8
              "
              style={{
                color: '#FFFFFF',
                letterSpacing: '-0.02em',     // Tight tracking for authority
                fontFamily: '"Inter", sans-serif',
                marginBottom: '2rem',
              }}
            >
              {/* First line of headline — white */}
              Transforming enterprises{' '}

              {/* Line break to separate the two logical phrases */}
              <br />

              {/* Second line — "through" in white, "strategic" in teal */}
              through{' '}
              <span
                style={{ color: '#2BB3A3' }}    // Electric Teal accent
                className="relative inline-block"
              >
                strategic
                {/* ── Underline accent ──
                     A subtle teal line beneath "strategic" for extra emphasis.
                     Animates in after the word appears. */}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] rounded-full"
                  style={{ backgroundColor: 'rgba(43, 179, 163, 0.4)' }}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
                />
              </span>

              {/* Final word */}
              <br />
              technology.
            </motion.h1>

            {/* ── Subheadline ──
                 Body Large: 18px/400, inverse-secondary color (#B8BCC3).
                 Max width prevents overly long lines for readability. */}
            <motion.p
              variants={itemVariants}
              className="
                text-base
                sm:text-lg
                leading-relaxed
                mb-8
                sm:mb-10
                max-w-[480px]
              "
              style={{
                color: '#B8BCC3',             // LSEI inverse-secondary text
                lineHeight: 1.75,              // Generous line height for readability
                marginBottom: '2rem',
              }}
            >
              We help organizations make confident technology decisions,
              modernize critical systems, and accelerate digital
              transformation with clarity and precision.
            </motion.p>

            {/* ── CTA Group ──
                 Primary CTA button + phone number.
                 Button uses LSEI "Primary Accent" styling:
                 Electric Teal bg, white text, 8px radius. */}
            <motion.div
              variants={ctaVariants}
              className="flex flex-col  items-start gap-4 sm:gap-6 mt-8"
              // className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
            >
              {/* Primary CTA Button */}
              <a
                href="#contact"
                id="hero-cta-button"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2x1
                  px-12
                  py-6
                  text-md
                  font-bold
                  tracking-wider
                  leading-tight
                  transition-all
                  duration-200
                  ease-out
                  focus:outline-none
                "
                style={{
                  backgroundColor: '#2BB3A3',   // Electric Teal
                  color: '#FFFFFF',
                  borderRadius: '30px', 
                  // This padding is for the button
                  padding: '12px 24px',         // LSEI button radius
                }}
                /* Hover: darken to teal-500; Active: darken further + slight scale */
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#239A8C'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(43, 179, 163, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2BB3A3'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.backgroundColor = '#1B7A6F'
                  e.currentTarget.style.transform = 'scale(0.98)'
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.backgroundColor = '#239A8C'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
              >
                {/* Button label */}
                Schedule Consultation

                {/* Arrow icon — slides right on hover via group-hover */}
                <svg
                  className="w-4 mt-6 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

            {/*  Div above the Phone and Email to force into same row (group of related items)  */}
            <div className="flex items-center gap-6 text-md text-white/60"
              style={{
                paddingBottom: '10px'
              }}
              >
              {/* Phone number — secondary action, understated */}
              <a
                href="tel:+2797491668"
                id="hero-phone-link"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-md 
                  transition-colors
                  duration-200
                "
                style={{ color: '#9DA2AB' }}    // Slate — tertiary text
                onMouseEnter={(e) => e.currentTarget.style.color = '#2BB3A3'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9DA2AB'}
              >
                {/* Phone icon */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                +279 749 1668
              </a>
              
              <a 
                href="mailto:meijerkeegan@gmail.com"
                id="hero-email-link"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-md 
                  transition-colors
                  duration-200
                "
                style={{ color: '#9DA2AB' }}    // Slate — tertiary text
                onMouseEnter={(e) => e.currentTarget.style.color = '#2BB3A3'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9DA2AB'}
              >
                {/* Email icon */}
                <svg 
                  className="w-6 h-6"   
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  stroke-width={1.5}  
                >
                  <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                meijerkeegan@gmail.com</a>
            </div>
            </motion.div>

            {/* ── Trust indicators ──
                 Subtle social proof below the CTA.
                 Fades in last in the cascade. */}
            <motion.div
              variants={itemVariants}
              className="
                mt-12
                sm:mt-16
                pt-10
                flex
                items-center
                gap-8
              "
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                margin: '10px 1rem'  // Subtle divider
              }}
            >
              {/* Trust metric 1 */}
              <div
                style={{
                  paddingBottom: '10px',
                  margin: '10px 5px'  // Subtle divider
                }}
              >
                <div
                  className="text-2xl font-bold"
                  style={{ color: '#FFFFFF' }}
                >
                  150+
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: '#5E6470' }}   // Dark slate
                >
                  Enterprise clients
                </div>
              </div>

              {/* Vertical divider */}
              <div
                className="h-10 w-px"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
              />

              {/* Trust metric 2 */}
              <div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: '#FFFFFF' }}
                >
                  98%
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: '#5E6470' }}
                >
                  Client retention
                </div>
              </div>

              {/* Vertical divider */}
              <div
                className="h-10 w-px"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
              />

              {/* Trust metric 3 */}
              <div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: '#FFFFFF' }}
                >
                  12yr
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: '#5E6470' }}
                >
                  Industry experience
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom gradient fade ──
           Ensures the hero transitions smoothly to the next section.
           Sits at the absolute bottom of the hero. */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(0deg, #0A1A2F 0%, transparent 100%)',
        }}
      />
    </section>
  )
}
