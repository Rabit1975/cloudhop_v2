import React, { useState } from 'react'
import { useHopSpaces } from './useHopSpaces'

export default function GalaxyView() {
  const { spaces, loading, createSpaceFromAI, generateGalaxyFromAI } = useHopSpaces()
  const [input, setInput] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [mode, setMode] = useState<'single' | 'galaxy'>('single')

  async function generate() {
    if (!input.trim()) return
    setAiLoading(true)
    
    try {
      if (mode === 'single') {
        await createSpaceFromAI(input)
      } else {
        await generateGalaxyFromAI(input, 5)
      }
      setInput('')
    } catch (error) {
      console.error('AI generation failed:', error)
    }
    
    setAiLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      generate()
    }
  }

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      position: 'relative',
      background: 'radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%)',
      overflow: 'hidden'
    }}>
      {/* Galaxy Canvas */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', color: '#8888ff', fontSize: '18px' }}>
          {loading ? 'Loading Galaxy...' : `${spaces.length} Spaces in Galaxy`}
        </div>
      </div>

      {/* AI World Builder Panel */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        maxWidth: '90%',
        background: 'rgba(20, 20, 40, 0.95)',
        border: '1px solid rgba(136, 136, 255, 0.3)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <div style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: '#8888ff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🐇 <span>rabbit.ai World Builder</span>
          </div>
          
          {/* Mode Toggle */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setMode('single')}
              style={{
                padding: '6px 12px',
                background: mode === 'single' ? '#6366f1' : 'rgba(99, 102, 241, 0.2)',
                color: mode === 'single' ? 'white' : '#8888ff',
                border: '1px solid rgba(136, 136, 255, 0.3)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: mode === 'single' ? 'bold' : 'normal'
              }}
            >
              Single Space
            </button>
            <button
              onClick={() => setMode('galaxy')}
              style={{
                padding: '6px 12px',
                background: mode === 'galaxy' ? '#6366f1' : 'rgba(99, 102, 241, 0.2)',
                color: mode === 'galaxy' ? 'white' : '#8888ff',
                border: '1px solid rgba(136, 136, 255, 0.3)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: mode === 'galaxy' ? 'bold' : 'normal'
              }}
            >
              Galaxy (5 Spaces)
            </button>
          </div>
        </div>

        {/* Input */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={
            mode === 'single' 
              ? "Describe a HopSpace to create... (e.g., 'A serene underwater music studio with bioluminescent jellyfish')"
              : "Describe a galaxy theme... (e.g., 'A mystical forest ecosystem with interconnected nature spaces')"
          }
          disabled={aiLoading}
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '12px',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(136, 136, 255, 0.2)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            resize: 'vertical',
            fontFamily: 'inherit',
            outline: 'none'
          }}
        />

        {/* Generate Button */}
        <button
          onClick={generate}
          disabled={!input.trim() || aiLoading}
          style={{
            marginTop: '12px',
            width: '100%',
            padding: '12px',
            background: aiLoading || !input.trim() ? 'rgba(99, 102, 241, 0.3)' : '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: aiLoading || !input.trim() ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'background 0.2s'
          }}
        >
          {aiLoading ? '✨ Generating...' : `🚀 Generate ${mode === 'galaxy' ? 'Galaxy' : 'Space'}`}
        </button>

        {/* Help Text */}
        <div style={{
          marginTop: '12px',
          fontSize: '11px',
          color: 'rgba(136, 136, 255, 0.6)',
          textAlign: 'center'
        }}>
          Press Enter to generate • Shift+Enter for new line
        </div>
      </div>
    </div>
  )
}
