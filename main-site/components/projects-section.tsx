'use client'

import { motion } from 'framer-motion'
import { Folder, ExternalLink, Calendar, Tag } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'AI Content Generator',
    description: 'Automated content creation tool powered by multiple AI models for blog posts, articles, and marketing copy.',
    tags: ['AI', 'Content', 'Automation'],
    date: 'Jan 2026',
    status: 'Active',
  },
  {
    id: 2,
    title: 'Neural Code Assistant',
    description: 'Intelligent code completion and debugging assistant that integrates with popular IDEs.',
    tags: ['Coding', 'Developer Tools', 'AI'],
    date: 'Dec 2025',
    status: 'Active',
  },
  {
    id: 3,
    title: 'Data Analysis Pipeline',
    description: 'Automated data processing and visualization pipeline with AI-driven insights.',
    tags: ['Data', 'Analytics', 'ML'],
    date: 'Nov 2025',
    status: 'Beta',
  },
  {
    id: 4,
    title: 'Smart Document Parser',
    description: 'Extract and structure information from various document formats using advanced NLP.',
    tags: ['NLP', 'Documents', 'Extraction'],
    date: 'Oct 2025',
    status: 'Active',
  },
  {
    id: 5,
    title: 'Voice-to-Text Studio',
    description: 'Real-time speech recognition and transcription with multi-language support.',
    tags: ['Speech', 'Audio', 'Transcription'],
    date: 'Sep 2025',
    status: 'Coming Soon',
  },
  {
    id: 6,
    title: 'Image Enhancement AI',
    description: 'Upscale, restore, and enhance images using state-of-the-art AI models.',
    tags: ['Images', 'Enhancement', 'AI'],
    date: 'Aug 2025',
    status: 'Coming Soon',
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case 'Active':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'Beta':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    case 'Coming Soon':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 relative">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Folder className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">Project Catalog</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Core Code <span className="bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our latest projects created with or connected to Core Code Ai Studio. 
            From AI tools to automation pipelines, discover what&apos;s being built.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative bg-[#12121a] border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center">
                    <Folder className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-white/5 text-gray-400 rounded-md"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {project.date}
                  </div>
                  <button className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors">
                    View Details
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
