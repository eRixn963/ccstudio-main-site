'use client'

import { Github, Twitter, Globe } from 'lucide-react'

// Custom DNA Neural Network Logo (same as header)
function DNANeuralLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dnaPurpleFooter" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id="neuralGlowFooter" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      
      {/* Background circle */}
      <circle cx="20" cy="20" r="19" fill="url(#dnaPurpleFooter)" opacity="0.9" />
      
      {/* DNA Strand - Left helix */}
      <path d="M10 8 Q14 14, 10 20 Q6 26, 10 32" stroke="url(#neuralGlowFooter)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M16 8 Q12 14, 16 20 Q20 26, 16 32" stroke="url(#neuralGlowFooter)" strokeWidth="2" fill="none" strokeLinecap="round" />
      
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

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <DNANeuralLogo />
            <span className="text-xl font-bold">
              <span className="text-white">CCAiS </span>
              <span className="text-purple-400">© 2026</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="https://www.corecodes.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Globe className="w-5 h-5 text-purple-400" />
              <span className="text-xl font-bold">
                <span className="text-white">corecodes</span>
                <span className="text-purple-400">.org</span>
              </span>
            </a>
            <a 
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Core Code Ai Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
