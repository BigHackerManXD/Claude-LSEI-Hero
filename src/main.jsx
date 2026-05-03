/**
 * ============================================================
 * main.jsx — React Application Entry Point
 * ============================================================
 *
 * Mounts the React application to the DOM.
 * Imports the global CSS (which includes Tailwind + LSEI tokens).
 * Uses StrictMode for development-time warnings.
 *
 * ============================================================
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/* Global styles: Tailwind CSS + LSEI design system tokens */
import './index.css'

/* Root application component */
import App from './App.jsx'

/* Mount the React app into the #root div in index.html */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
