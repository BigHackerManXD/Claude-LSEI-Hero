import { motion } from 'framer-motion';

/**
 * Step 1: Define our project data.
 * In a real React app, this might come from an API or a database.
 * For now, we'll use a simple array of objects.
 */
const projectData = [
  {
    id: 1,
    title: "Global Supply Chain Optimization",
    category: "Operations",
    description: "Streamlined logistics for a Fortune 500 manufacturer, reducing overhead by 22% through predictive analytics.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Financial Risk Command Center",
    category: "FinTech",
    description: "Developed a real-time monitoring dashboard for executive decision-making during market volatility.",
    image: "https://images.unsplash.com/photo-1551288049-bbda38a5f9a2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Sustainable Infrastructure Initiative",
    category: "ESG Strategy",
    description: "Framework design for renewable energy transition across three European metropolitan regions.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Next-Gen Cloud Migration",
    category: "Technology",
    description: "End-to-end architecture redesign for a legacy banking system, migrating 4PB of data with zero downtime.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "Retail Personalization Engine",
    category: "Data Science",
    description: "AI-driven customer experience platform that increased conversion rates by 35% in six months.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    title: "Cyber Resilience Framework",
    category: "Security",
    description: "Comprehensive security audit and infrastructure hardening for a national healthcare provider.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  }
];

/**
 * Step 2: Create the Projects component.
 * This is the main piece of UI that we'll export and use in our App.
 */
const Projects = () => {
  return (
    /**
     * Step 3: The Section Wrapper.
     * We use a blue navy background (bg-white) and large vertical padding (py-24) 
     * to give the section an authoritative, airy feel.
     */
    <section 
      id='projects-section'
      className="
        relative  
        lg: min-h-screen
        w-full 
        overflow-hidden
        bg-navy-700 

      "        
      
      style={{
        background: 'radial-gradient(circle at center, rgba(43, 179, 163, 0.08) 0%, transparent 70%)',
        padding: '0 3rem',
        // border: '1px solid orange',
        // marginTop: '3rem'
        // HELPER
        
      }}>
      
      {/* Subtle Ambient Glow behind the grid */}
      <div 

        
          style={{
          background: 'radial-gradient(circle at center, rgba(43, 179, 163, 0.08) 0%, transparent 70%)',
          height: '10vh',
          width: '100%',
        }}
      />
      
      {/* Step 4: Section Header.
          This contains the title and a short lead paragraph to set the context. */}
      <div className="
          mx-auto 
          mb-16
          relative 
          z-10
          py-16
          px-12
          "
        >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
           { <span
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
              Selected Works
            </span>}
          <h2 
            className="
              text-[32px] 
              md:text-[48px] 
              font-bold 
              mb-6 
              tracking-[-0.01em] 
              md:tracking-[-0.02em] 
              leading-[1.2] 
              md:leading-[1.1] 
              text-white 
            "
          >
            Strategic impact through <br />
              <span
                style={{ color: '#2BB3A3' }}    // Electric Teal accent
                className="relative inline-block"
              >
                technological precision.
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

          </h2>
          <p className="text-text-tertiary text-[18px] font-normal leading-[1.75] max-w-2xl">
            We partner with industry leaders to solve complex challenges. Our projects 
            blend executive-level strategy with deep engineering expertise.
          </p>
        </motion.div>
      </div>

      {/*
          Step 5: The Project Grid.
          Using Tailwind's grid system: 1 column on mobile, 2 on tablet, 3 on desktop.
          We also add a gap (gap-8) to keep the cards spaced out properly.
          
          This creates a responsive grid layout using Tailwind CSS:
          max-w-[2400px] — caps the container width at 2400px
          mx-auto — centers the container horizontally
          grid — enables CSS Grid
          grid-cols-1 — 1 column on mobile
          md:grid-cols-2 — 2 columns on medium screens
          lg:grid-cols-3 — 3 columns on large screens
          gap-8 — spacing between grid items
          relative — positions the container relative to its normal position
          z-10 — sets stacking order above lower z-index elements
      */}
      <div className="max-w-[2400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Step 6: Mapping through our data.
            This is where React shines — we take our list of 6 projects and 
            tell React to generate a 'Card' for each one. */}
        {projectData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            /**
             * Step 7: The Project Card Styling.
             * LSEI "Dark Card" pattern for navy backgrounds.
             * Background: Deep Surface (#0D1F35), Border: 1px solid white/8%.
             * On hover, we lift 2px and maintain the feature teal border.
             */
            className="group bg-deep-surface rounded-[12px] border border-white/8 border-l-[3px] border-l-teal-400 shadow-none overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-[2px]"
          >
            {/* Project Image Container */}
            <div className="aspect-[3/2] overflow-hidden bg-soft-graphite">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Project Content Container */}
            <div className="p-6">
              {/* Category Badge - Dark Mode Style */}
              <div className="mb-4">
                <span className="inline-block bg-teal-400/10 text-teal-400 text-[12px] font-medium px-[10px] py-[4px] rounded-[6px] uppercase tracking-wide">
                  {project.category}
                </span>
              </div>

              {/* Title and Description - Dark Mode Hierarchy */}
              <h3 className="text-[22px] font-semibold mb-4 text-white group-hover:text-teal-400 transition-colors leading-[1.3]">
                {project.title}
              </h3>
              <p className="text-cool-grey text-[16px] leading-[1.75] font-normal mb-6">
                {project.description}
              </p>

              {/* View Case Study Link - Dark Mode */}
              <div className="flex items-center text-[14px] font-medium text-white/80 group-hover:text-teal-400 transition-colors cursor-pointer">
                View Case Study
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
