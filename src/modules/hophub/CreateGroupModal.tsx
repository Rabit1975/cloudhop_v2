import React, { useState } from 'react'

export default function CreateGroupModal({ onClose, onCreate }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCreate() {
    if (!name.trim()) return
    setLoading(true)
    await onCreate(name, description || undefined)
    setLoading(false)
    onClose()
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#16213e',
        borderRadius: '12px',
        padding: '24px',
        width: '400px',
        maxWidth: '90%',
        border: '1px solid #0f3460'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#e94560', fontSize: '20px' }}>
          Create Group
        </h3>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#fff', fontSize: '14px' }}>
            Group Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="General, Projects, Fun..."
            style={{
              width: '100%',
              padding: '10px',
              background: '#0f3460',
              border: '1px solid #e94560',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#fff', fontSize: '14px' }}>
            Description (optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe this group..."
            rows={3}
            style={{
              width: '100%',
              padding: '10px',
              background: '#0f3460',
              border: '1px solid #0f3460',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '14px',
              outline: 'none',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              padding: '10px 20px',
              background: 'transparent',
              border: '1px solid #0f3460',
              borderRadius: '6px',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!name.trim() || loading}
            style={{
              padding: '10px 20px',
              background: name.trim() ? '#e94560' : '#666',
              border: 'none',
              borderRadius: '6px',
              color: '#fff',
              cursor: name.trim() ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            {loading ? 'Creating...' : 'Create Group'}
          </button>
        </div>
      </div>
    </div>
  )
}
