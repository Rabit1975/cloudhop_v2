import React from 'react'

interface AudioFeatures {
  bass: number
  mid: number
  high: number
  energy: number
  bpm: number
}

interface EmotionalState {
  valence: number
  arousal: number
  dominance: number
}

interface MusicDiagnosticsSectionProps {
  audioFeatures?: AudioFeatures
  emotionalState?: EmotionalState
  isActive: boolean
}

export const MusicDiagnosticsSection: React.FC<MusicDiagnosticsSectionProps> = ({
  audioFeatures,
  emotionalState,
  isActive
}) => {
  const formatValue = (value: number): string => {
    return (value * 100).toFixed(1) + '%'
  }

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
          fontSize: '18px',
          fontWeight: 600,
          color: '#fff',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        Music Engine Diagnostics
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: isActive ? '#00ff00' : '#666'
          }}
        />
      </div>

      {audioFeatures && (
        <div style={{ marginBottom: '20px' }}>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '12px'
            }}
          >
            Audio Features
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { label: 'Bass', value: audioFeatures.bass },
              { label: 'Mid', value: audioFeatures.mid },
              { label: 'High', value: audioFeatures.high },
              { label: 'Energy', value: audioFeatures.energy }
            ].map(({ label, value }) => (
              <div key={label}>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginBottom: '4px'
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    height: '6px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      width: formatValue(value),
                      height: '100%',
                      background: `linear-gradient(90deg, #6366f1, #8b5cf6)`,
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginTop: '2px'
                  }}
                >
                  {formatValue(value)}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: '12px',
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            BPM: <span style={{ fontWeight: 600 }}>{audioFeatures.bpm.toFixed(0)}</span>
          </div>
        </div>
      )}

      {emotionalState && (
        <div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '12px'
            }}
          >
            Emotional State
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            {[
              { label: 'Valence', value: emotionalState.valence },
              { label: 'Arousal', value: emotionalState.arousal },
              { label: 'Dominance', value: emotionalState.dominance }
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    color: '#fff',
                    marginBottom: '4px'
                  }}
                >
                  {(value * 100).toFixed(0)}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!audioFeatures && !emotionalState && (
        <div
          style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.5)',
            textAlign: 'center',
            padding: '20px'
          }}
        >
          No audio data available
        </div>
      )}
    </div>
  )
}
