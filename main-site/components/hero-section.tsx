'use client'

import { motion } from 'framer-motion'
import { Zap, Cpu, Sparkles } from 'lucide-react'

// Devil Icon Component
function DevilIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4L7 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 4L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="14" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="9" cy="13" r="1.5" fill="currentColor" />
      <circle cx="15" cy="13" r="1.5" fill="currentColor" />
      <path d="M9 17C9 17 10.5 18.5 12 18.5C13.5 18.5 15 17 15 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 4C4 4 5 6 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 4C20 4 19 6 17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// Brain Computer Icon Component
function BrainComputerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Brain left side */}
      <path d="M6 9C6 7 7.5 5 10 5C10 5 10 3 12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 9C4.5 9 3 10.5 3 12C3 13.5 4 14.5 5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 15C4 16 4 18 6 19C8 20 10 19 10 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Brain connections */}
      <path d="M10 9L10 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M8 11L10 12L8 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      {/* Connection line */}
      <path d="M12 12L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />
      {/* Computer/Monitor */}
      <rect x="15" y="8" width="6" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 13V15" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 15H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Screen glow */}
      <rect x="16" y="9" width="4" height="3" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

export default function HeroSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0a0a0f_70%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Three Badge Section */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Badge 1: Advanced Ai Studio */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300 font-medium">Advanced Ai Studio</span>
            </div>
            
            {/* Badge 2: Dark Net Access */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
              <DevilIcon className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-300 font-medium">Dark Net Access: <span className="text-green-400">ON</span></span>
            </div>
            
            {/* Badge 3: Ai Tools, Learning, Models, Agent's */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <BrainComputerIcon className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-medium">Ai Tools, Learning, Models, Agent&apos;s</span>
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="text-white">Unleash the power of </span>
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
              AI & Core Code Studio
            </span>
            <span className="text-white"> and create amazing content </span>
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              10x faster
            </span>
          </h1>

          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Machine learning algorithms build intelligent models based on sample data, 
            enabling you to generate elegantly structured content with references in just a few clicks.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {[
              { icon: Zap, text: 'Lightning Fast' },
              { icon: Cpu, text: 'Multi-Model Support' },
              { icon: Sparkles, text: 'AI Powered' },
            ].map((item, i) => (
              <div 
                key={i} 
                className="flex items-center gap-2 text-gray-400"
              >
                <item.icon className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
