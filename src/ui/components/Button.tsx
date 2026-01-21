import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
}

export function Button({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = {
    padding: size === 'small' ? '6px 12px' : size === 'large' ? '12px 24px' : '8px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 500
  }

  const variantStyles = {
    primary: { backgroundColor: '#0066cc', color: 'white' },
    secondary: { backgroundColor: '#6c757d', color: 'white' },
    danger: { backgroundColor: '#dc3545', color: 'white' }
  }

  return (
    <button 
      style={{ ...baseStyles, ...variantStyles[variant] }} 
      {...props}
    >
      {children}
    </button>
  )
}
