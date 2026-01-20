'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  ChevronDown, 
  Loader2, 
  Bot, 
  User, 
  Copy, 
  Check,
  Sparkles,
  Cpu
} from 'lucide-react'

const AI_MODELS = [
  { id: 'gpt-4.1', name: 'GPT-4.1', provider: 'OpenAI', color: 'from-green-500 to-emerald-500' },
  { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', provider: 'OpenAI', color: 'from-green-400 to-teal-500' },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', color: 'from-orange-500 to-amber-500' },
  { id: 'claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', provider: 'Anthropic', color: 'from-orange-400 to-yellow-500' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'Google', color: 'from-blue-500 to-indigo-500' },
  { id: 'llama-3.3-70b', name: 'Llama 3.3 70B', provider: 'Meta', color: 'from-purple-500 to-violet-500' },
  { id: 'o3-mini', name: 'O3 Mini', provider: 'OpenAI', color: 'from-cyan-500 to-blue-500' },
]

export default function PromptInterface() {
  const [prompt, setPrompt] = useState('')
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState('')
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = async () => {
    if (!prompt?.trim() || isLoading) return
    
    setIsLoading(true)
    setResponse('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim(), model: selectedModel?.id ?? 'gpt-4.1-mini' }),
      })

      if (!res?.ok) {
        throw new Error('Failed to get response')
      }

      const reader = res?.body?.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ''

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk?.split('\n') ?? []
        
        for (const line of lines) {
          if (line?.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              const content = parsed?.choices?.[0]?.delta?.content ?? ''
              if (content) {
                fullResponse += content
                setResponse(fullResponse)
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error)
      setResponse('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const copyToClipboard = async () => {
    if (!response) return
    await navigator?.clipboard?.writeText?.(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="prompt" className="py-12 md:py-20 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Main prompt card */}
          <div className="bg-[#12121a] rounded-2xl border border-white/5 shadow-2xl overflow-hidden pulse-glow">
            {/* Model selector bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0e0e16]">
              <div className="flex items-center gap-3">
                <Cpu className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-400">Select AI Model</span>
              </div>
              
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 px-4 py-2 bg-[#1a1a25] rounded-lg border border-white/10 hover:border-blue-500/50 transition-all duration-200"
                >
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedModel?.color ?? 'from-blue-500 to-cyan-500'}`} />
                  <span className="text-white font-medium text-sm">{selectedModel?.name ?? 'Select Model'}</span>
                  <span className="text-gray-500 text-xs">({selectedModel?.provider ?? 'AI'})</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      className="absolute right-0 top-full mt-2 w-64 bg-[#1a1a25] rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                    >
                      {AI_MODELS.map((model) => (
                        <button
                          key={model?.id}
                          onClick={() => {
                            setSelectedModel(model)
                            setIsDropdownOpen(false)
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${
                            selectedModel?.id === model?.id ? 'bg-blue-500/10' : ''
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${model?.color ?? 'from-gray-500 to-gray-400'}`} />
                          <div className="flex-1 text-left">
                            <div className="text-white text-sm font-medium">{model?.name ?? 'Unknown'}</div>
                            <div className="text-gray-500 text-xs">{model?.provider ?? 'AI'}</div>
                          </div>
                          {selectedModel?.id === model?.id && (
                            <Check className="w-4 h-4 text-blue-400" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Prompt input area */}
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <textarea
                    ref={textareaRef}
                    value={prompt}
                    onChange={(e) => setPrompt(e?.target?.value ?? '')}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything... Write a poem, explain quantum physics, help me code..."
                    className="w-full bg-transparent text-white placeholder-gray-500 resize-none outline-none text-lg leading-relaxed min-h-[100px]"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Press Enter to send, Shift+Enter for new line</span>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !prompt?.trim()}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Generate</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Response area */}
          <AnimatePresence>
            {(response || isLoading) && (
              <motion.div
                className="mt-6 bg-[#12121a] rounded-2xl border border-white/5 shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0e0e16]">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${selectedModel?.color ?? 'from-blue-500 to-cyan-500'} flex items-center justify-center`}>
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-white font-medium text-sm">{selectedModel?.name ?? 'AI Model'}</span>
                      <span className="text-gray-500 text-sm ml-2">{isLoading ? 'Thinking...' : 'Response'}</span>
                    </div>
                  </div>
                  {response && (
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm text-gray-400 hover:text-white"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
                <div className="p-6">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {response || (
                        <span className="inline-flex items-center gap-2 text-gray-500">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Generating response...
                        </span>
                      )}
                      {isLoading && response && (
                        <span className="inline-block w-2 h-5 bg-blue-400 ml-1 cursor-blink" />
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
