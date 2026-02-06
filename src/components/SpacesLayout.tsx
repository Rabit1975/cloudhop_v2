import React, { useState, useRef, useEffect } from 'react'

const SpacesLayout: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [brushSize, setBrushSize] = useState(10)
  const [brushColor, setBrushColor] = useState('#8B5CF6')
  const [isDrawing, setIsDrawing] = useState(false)

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.fillStyle = '#111827'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center space-x-3">
          <span>✨</span>
          <span>Creative Spaces</span>
        </h1>
        <p className="text-gray-400">Fluid art canvas & creative tools</p>
      </div>

      <div className="text-center py-8">
        <span className="text-6xl mb-4">✨</span>
        <h2 className="text-2xl font-bold mb-2">Fluid Art Studio</h2>
        <p className="text-gray-400">Interactive canvas with AI tools coming soon!</p>
      </div>
    </div>
  )
}

export default SpacesLayout
