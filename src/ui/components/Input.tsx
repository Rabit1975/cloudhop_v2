import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div style={{ marginBottom: '15px' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 500 }}>
          {label}
        </label>
      )}
      <input 
        style={{
          width: '100%',
          padding: '8px 12px',
          border: `1px solid ${error ? '#dc3545' : '#ccc'}`,
          borderRadius: '4px',
          fontSize: '14px'
        }}
        {...props}
      />
      {error && (
        <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '5px' }}>
          {error}
        </div>
      )}
    </div>
  )
}
