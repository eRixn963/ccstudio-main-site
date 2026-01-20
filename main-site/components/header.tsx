'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { name: 'Features', target: 'features' },
  { name: 'Models', target: 'prompt' },
  { name: 'Projects', target: 'projects', isExternal: false },
  { name: 'Downloads', target: 'downloads', isExternal: false },
  { name: 'Blogs', target: 'https://blog.corecodes.org', isExternal: true },
]

// Custom DNA Neural Network Logo
function DNANeuralLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dnaPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id="neuralGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      
      {/* Background circle */}
      <circle cx="20" cy="20" r="19" fill="url(#dnaPurple)" opacity="0.9" />
      
      {/* DNA Strand - Left helix */}
      <path d="M10 8 Q14 14, 10 20 Q6 26, 10 32" stroke="url(#neuralGlow)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M16 8 Q12 14, 16 20 Q20 26, 16 32" stroke="url(#neuralGlow)" strokeWidth="2" fill="none" strokeLinecap="round" />
      
      {/* DNA connecting bars */}
      <line x1="10" y1="11" x2="16" y2="11" stroke="#e9d5ff" strokeWidth="1.5" />
      <line x1="10" y1="17" x2="16" y2="17" stroke="#e9d5ff" strokeWidth="1.5" />
      <line x1="10" y1="23" x2="16" y2="23" stroke="#e9d5ff" strokeWidth="1.5" />
      <line x1="10" y1="29" x2="16" y2="29" stroke="#e9d5ff" strokeWidth="1.5" />
      
      {/* Neural Network nodes */}
      <circle cx="26" cy="12" r="3" fill="#e9d5ff" />
      <circle cx="32" cy="20" r="3" fill="#c084fc" />
      <circle cx="26" cy="28" r="3" fill="#e9d5ff" />
      <circle cx="22" cy="20" r="2.5" fill="#f3e8ff" />
      
      {/* Neural connections */}
      <line x1="16" y1="14" x2="22" y2="20" stroke="#c084fc" strokeWidth="1" opacity="0.8" />
      <line x1="16" y1="26" x2="22" y2="20" stroke="#c084fc" strokeWidth="1" opacity="0.8" />
      <line x1="22" y1="20" x2="26" y2="12" stroke="#e9d5ff" strokeWidth="1.5" />
      <line x1="22" y1="20" x2="32" y2="20" stroke="#e9d5ff" strokeWidth="1.5" />
      <line x1="22" y1="20" x2="26" y2="28" stroke="#e9d5ff" strokeWidth="1.5" />
      <line x1="26" y1="12" x2="32" y2="20" stroke="#c084fc" strokeWidth="1" opacity="0.6" />
      <line x1="26" y1="28" x2="32" y2="20" stroke="#c084fc" strokeWidth="1" opacity="0.6" />
      
      {/* Glow effect */}
      <circle cx="32" cy="20" r="2" fill="#f3e8ff" opacity="0.8" />
    </svg>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMenuOpen(false)
  }

  const scrollToPrompt = () => {
    scrollToSection('prompt')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DNANeuralLogo />
            <span className="text-xl font-bold tracking-tight">
              <span className="text-white">Core Code </span>
              <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">Ai Studio</span>
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              item.isExternal ? (
                <motion.a
                  key={item.name}
                  href={item.target}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ) : (
                <motion.button
                  key={item.name}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  onClick={() => scrollToSection(item.target)}
                >
                  {item.name}
                </motion.button>
              )
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <motion.button
              className="hidden md:block px-5 py-2.5 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-lg font-medium text-sm hover:opacity-90 transition-all duration-200 shadow-lg shadow-purple-500/25"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToPrompt}
            >
              DASHBOARD
            </motion.button>
            
            <button 
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4 border-t border-white/5 pt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  item.isExternal ? (
                    <a
                      key={item.name}
                      href={item.target}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors text-left py-2"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <button
                      key={item.name}
                      className="text-gray-400 hover:text-white transition-colors text-left py-2"
                      onClick={() => scrollToSection(item.target)}
                    >
                      {item.name}
                    </button>
                  )
                ))}
                <button 
                  className="mt-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-lg font-medium text-sm"
                  onClick={scrollToPrompt}
                >
                  DASHBOARD
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
