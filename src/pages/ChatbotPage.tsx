import { FormEvent, useState } from 'react'

type Message = {
  id: number
  role: 'user' | 'assistant'
  text: string
}

const EXAMPLES = [
  'Why does insurance affect cancer screening?',
  'How do policies help underserved communities?',
  'What does ACS CAN advocate for?',
]

function looksMedicalQuestion(prompt: string): boolean {
  const lower = prompt.toLowerCase()

  return (
    lower.includes('should i') ||
    lower.includes('my doctor') ||
    lower.includes('symptom') ||
    lower.includes('diagnose') ||
    lower.includes('diagnosis') ||
    lower.includes('treat') ||
    lower.includes('treatment') ||
    lower.includes('screening result') ||
    lower.includes('test result') ||
    lower.includes('stage ') ||
    lower.includes('what should i do') ||
    lower.includes('ct scan') ||
    lower.includes('mri') ||
    lower.includes('chemotherapy') ||
    lower.includes('radiation')
  )
}

function looksLikeCancerPolicyQuestion(prompt: string): boolean {
  const lower = prompt.toLowerCase()

  return (
    lower.includes('policy') ||
    lower.includes('insurance') ||
    lower.includes('medicaid') ||
    lower.includes('medicare') ||
    lower.includes('coverage') ||
    lower.includes('screening') ||
    lower.includes('preventive care') ||
    lower.includes('access to care') ||
    lower.includes('underserved') ||
    lower.includes('rural') ||
    lower.includes('equity') ||
    lower.includes('acs ') ||
    lower.includes('acs can') ||
    lower.includes('american cancer society')
  )
}

async function fetchPolicyAnswer(
  conversation: Message[],
): Promise<string> {
  const apiKey = import.meta.env.VITE_POLICY_LENS_API_KEY

  if (!apiKey) {
    return 'The policy chatbot is not fully configured yet because an API key is missing. Please check the environment settings.';
  }

  const systemPrompt =
    'You are an educational assistant for the Policy Lens cancer policy web app. Your job is to explain cancer policy in simple, calm language for students and community members with no prior knowledge. Focus on: cancer screening basics, how insurance rules affect access, how policies can improve or limit access for urban, suburban, and underserved communities, and what advocacy groups like the American Cancer Society Cancer Action Network (ACS CAN) work toward. You must NOT give medical advice, interpret test results, or tell people what they personally should do. For any medical or diagnostic question, politely say you cannot answer and encourage the user to talk with a health care professional. Keep answers short, clear, and free of jargon.'

  const messagesForApi = [
    { role: 'system', content: systemPrompt },
    ...conversation.map((message) => ({
      role: message.role,
      content: message.text,
    })),
  ]

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'X-Title': 'Policy Lens',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: messagesForApi,
        max_tokens: 400,
      }),
    })

    if (!response.ok) {
      return 'I could not reach the policy model right now. Please try again in a moment.';
    }

    const json = await response.json()
    const content =
      json?.choices?.[0]?.message?.content ??
      'I had trouble generating a response. Please try asking your question again.'

    if (typeof content === 'string') {
      return content.trim()
    }

    // Some models may return an array of segments
    if (Array.isArray(content)) {
      const joined = content
        .map((segment: { type?: string; text?: string }) => segment.text ?? '')
        .join(' ')
      return joined.trim() || 'I had trouble generating a response. Please try again.'
    }

    return 'I had trouble generating a response. Please try again.'
  } catch (error) {
    console.error('Policy chatbot error', error)
    return 'Something went wrong while contacting the policy model. Please check your connection and try again.'
  }
}

export function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      text: 'Welcome to the Policy Lens chatbot. I can answer simple, educational questions about cancer policy, insurance barriers, and how advocacy can improve access to screening—not medical or personal health questions.',
    },
  ])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isThinking) return

    setError(null)

    const nextId = messages.length ? messages[messages.length - 1].id + 1 : 1
    const userMessage: Message = { id: nextId, role: 'user', text: trimmed }

    // Block medical / diagnostic questions before calling the model
    if (looksMedicalQuestion(trimmed)) {
      const assistantMessage: Message = {
        id: nextId + 1,
        role: 'assistant',
        text: 'I’m here to explain cancer policy, not to give medical advice. For questions about your health, test results, or what you personally should do, please talk with a health care professional who knows your situation.',
      }
      setMessages((prev) => [...prev, userMessage, assistantMessage])
      setInput('')
      return
    }

    // Only handle cancer policy questions; gently decline everything else
    if (!looksLikeCancerPolicyQuestion(trimmed)) {
      const assistantMessage: Message = {
        id: nextId + 1,
        role: 'assistant',
        text: 'This chatbot is focused on cancer policy, insurance barriers, and access to screening. I’m not able to answer questions outside of that topic.',
      }
      setMessages((prev) => [...prev, userMessage, assistantMessage])
      setInput('')
      return
    }

    setIsThinking(true)
    setMessages((prev) => [...prev, userMessage])
    setInput('')

    const conversationForApi = [...messages, userMessage].map(
      ({ id, ...rest }) => rest,
    )
    const replyText = await fetchPolicyAnswer(conversationForApi)

    const assistantMessage: Message = {
      id: nextId + 1,
      role: 'assistant',
      text: replyText,
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsThinking(false)
  }

  const handleExampleClick = (example: string) => {
    setInput(example)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            AI Cancer Policy Chatbot
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            Ask simple, educational questions about cancer screening,
            insurance barriers, and how policy affects access—especially for
            underserved communities.
          </p>
          <p className="text-xs font-medium text-amber-700">
            This chatbot provides general educational information about
            cancer policy and advocacy only. It does not provide medical
            advice, diagnosis, or treatment recommendations.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Connected to policy model
            </p>
            <p className="text-[11px] text-slate-500">
              Responses come from a cancer policy–focused AI model.
            </p>
          </div>
          <p className="mt-2 text-xs text-slate-600">
            Your questions and answers stay focused on cancer screening,
            insurance barriers, underserved communities, and advocacy—not
            medical advice or personal health decisions.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Try asking:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => handleExampleClick(example)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-left text-xs text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-[340px] flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-800 border border-slate-200'
                }`}
              >
                <p className="whitespace-pre-wrap text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
                Thinking about your question&hellip;
              </div>
            </div>
          )}
          {error && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl border border-rose-100 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                {error}
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t border-slate-200 bg-slate-50 px-3 py-3"
        >
          <div className="flex items-end gap-2">
            <textarea
              rows={2}
              className="min-h-[40px] flex-1 resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              placeholder="Ask about cancer policy, screening access, or insurance barriers (not personal medical questions)…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={!input.trim() || isThinking}
              className="inline-flex h-9 items-center justify-center rounded-xl bg-blue-600 px-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Send
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

