import React from 'react'

interface InfluenceNode {
  name: string
  weight: number
  color: string
}

interface InfluenceChainVisualizerProps {
  influences: InfluenceNode[]
  title?: string
}

export const InfluenceChainVisualizer: React.FC<InfluenceChainVisualizerProps> = ({
  influences,
  title = 'Influence Chain'
}) => {
  const maxWeight = Math.max(...influences.map(n => n.weight), 1)

  return (
    <div
      style={{
        padding: '20px',
        background: 'rgba(20, 20, 30, 0.8)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div
        style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#fff',
          marginBottom: '16px'
        }}
      >
        {title}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {influences.map((node, index) => {
          const percentage = (node.weight / maxWeight) * 100

          return (
            <div key={index} style={{ position: 'relative' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '6px'
                }}
              >
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: node.color,
                      boxShadow: `0 0 8px ${node.color}`
                    }}
                  />
                  {node.name}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}
                >
                  {node.weight.toFixed(2)}
                </div>
              </div>

              <div
                style={{
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: `${percentage}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${node.color}, ${node.color}88)`,
                    borderRadius: '4px',
                    transition: 'width 0.5s ease',
                    boxShadow: `0 0 12px ${node.color}44`
                  }}
                />
              </div>

              {index < influences.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: '-12px',
                    transform: 'translateX(-50%)',
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.3)'
                  }}
                >
                  ↓
                </div>
              )}
            </div>
          )
        })}
      </div>

      {influences.length === 0 && (
        <div
          style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.5)',
            textAlign: 'center',
            padding: '20px'
          }}
        >
          No influences active
        </div>
      )}
    </div>
  )
}
