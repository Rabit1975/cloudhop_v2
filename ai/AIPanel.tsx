import React, { useState, useRef, useEffect } from 'react'
import { useAI } from '../../kernel/providers/AIProvider'

export default function AIPanel() {
  const { run, history } = useAI()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  async function send() {
    if (!input.trim()) return
    
    setLoading(true)
    try {
      await run({ prompt: input })
      setInput('') // Clear input after sending
    } catch (err) {
      console.error('AI request failed:', err)
    }
    setLoading(false)
  }

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  return (
    <div className="ai-panel" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1.5rem',
      height: '100%',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>
        🐇 rabbit.ai
      </div>

      {/* Message History */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #ddd',
          backgroundColor: '#f9f9f9',
          minHeight: '300px',
          maxHeight: '500px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        {history.length === 0 ? (
          <div style={{ color: '#999', fontStyle: 'italic', textAlign: 'center', marginTop: '2rem' }}>
            Start a conversation with rabbit.ai
          </div>
        ) : (
          history.map((msg, idx) => (
            <div
              key={idx}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                backgroundColor: msg.role === 'user' ? '#007bff' : '#fff',
                color: msg.role === 'user' ? '#fff' : '#333',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                border: msg.role === 'assistant' ? '1px solid #ddd' : 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ 
                fontSize: '0.75rem', 
                fontWeight: '600', 
                marginBottom: '0.25rem',
                opacity: 0.8
              }}>
                {msg.role === 'user' ? 'You' : '🐇 rabbit.ai'}
              </div>
              <div style={{
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                fontSize: '0.95rem',
                lineHeight: '1.5'
              }}>
                {msg.content}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Box */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            send()
          }
        }}
        placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
        disabled={loading}
        style={{
          width: '100%',
          minHeight: '80px',
          padding: '0.75rem',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          resize: 'vertical',
          opacity: loading ? 0.6 : 1
        }}
      />

      {/* Send Button */}
      <button
        onClick={send}
        disabled={loading || !input.trim()}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: '500',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: loading || !input.trim() ? '#ccc' : '#007bff',
          color: 'white',
          cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s'
        }}
      >
        {loading ? 'Thinking…' : 'Send'}
      </button>
    </div>
  )
}
