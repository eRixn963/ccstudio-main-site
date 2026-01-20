import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, model } = body ?? {}

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const selectedModel = model ?? 'gpt-4.1-mini'

    // Create session in database
    const session = await prisma.chatSession.create({
      data: {
        model: selectedModel,
        prompt: prompt,
        response: '',
      },
    })

    // Call LLM API
    const llmResponse = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful, intelligent AI assistant for Core Code Ai Studio. Provide clear, accurate, and helpful responses.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        stream: true,
        max_tokens: 3000,
      }),
    })

    if (!llmResponse?.ok) {
      const errorText = await llmResponse?.text?.()
      console.error('LLM API Error:', errorText)
      return new Response(JSON.stringify({ error: 'Failed to get AI response' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    let fullResponse = ''

    const stream = new ReadableStream({
      async start(controller) {
        const reader = llmResponse?.body?.getReader()
        const decoder = new TextDecoder()
        const encoder = new TextEncoder()

        try {
          while (reader) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })
            const lines = chunk?.split('\n') ?? []

            for (const line of lines) {
              if (line?.startsWith('data: ')) {
                const data = line.slice(6)
                if (data === '[DONE]') {
                  controller.enqueue(encoder.encode('data: [DONE]\n\n'))
                  continue
                }
                try {
                  const parsed = JSON.parse(data)
                  const content = parsed?.choices?.[0]?.delta?.content ?? ''
                  if (content) {
                    fullResponse += content
                  }
                  controller.enqueue(encoder.encode(`data: ${data}\n\n`))
                } catch {
                  // Skip invalid JSON
                }
              }
            }
          }

          // Update session with full response
          await prisma.chatSession.update({
            where: { id: session?.id },
            data: { response: fullResponse },
          })
        } catch (error) {
          console.error('Stream error:', error)
          controller.error(error)
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('API Error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
