/**
 * ============================================================
 * App.jsx — Root Application Component
 * ============================================================
 *
 * Entry point for the LSEI hero section.
 * Currently renders only the HeroSection component.
 * Additional sections (Services, About, etc.) can be added
 * below as the site grows.
 *
 * ============================================================
 */

import HeroSection from './components/HeroSection'
import Projects from './components/Projects'
import CodeEditor from './components/CodeEditor'

function App() {
  return (
    /* Main wrapper — full-width, no extra styling needed.
       The HeroSection handles its own background and layout. */
    <main>
      {/* ── Hero Section ──
           Full-viewport split-layout hero.
           See HeroSection.jsx for detailed documentation. */}
      <HeroSection />

      {/* ── Projects Section ──
           Grid of 6 strategic project overviews.
           See Projects.jsx for detailed documentation. */}
      <Projects />

      {/* ── Code Editor Section ──
           Interactive code editor component.
           See CodeEditor.jsx for detailed documentation. */}
      <CodeEditor />
      
    </main>
  )
}

export default App
