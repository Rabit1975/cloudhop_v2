import React from 'react';
import { cn } from '../../lib/utils';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsSection({ title, description, children, className }: SettingsSectionProps) {
  return (
    <div className={cn("bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6", className)}>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">{title}</h2>
        {description && (
          <p className="text-sm text-gray-400">{description}</p>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

interface SettingsItemProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsItem({ title, description, children, className }: SettingsItemProps) {
  return (
    <div className={cn("flex items-center justify-between p-4 bg-white/5 rounded-lg", className)}>
      <div className="flex-1">
        <div className="text-white font-medium">{title}</div>
        {description && (
          <div className="text-sm text-gray-400 mt-1">{description}</div>
        )}
      </div>
      <div className="ml-4">
        {children}
      </div>
    </div>
  );
}

interface SettingsToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export function SettingsToggle({ enabled, onToggle, disabled = false, label }: SettingsToggleProps) {
  return (
    <button
      onClick={() => onToggle(!enabled)}
      disabled={disabled}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        enabled ? "bg-cyan-500" : "bg-gray-600",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
          enabled ? "translate-x-6" : "translate-x-1"
        )}
      />
      {label && <span className="sr-only">{label}</span>}
    </button>
  );
}

interface SettingsSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  disabled?: boolean;
  className?: string;
}

export function SettingsSelect({ value, onValueChange, options, disabled = false, className }: SettingsSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      disabled={disabled}
      className={cn(
        "px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-gray-800">
          {option.label}
        </option>
      ))}
    </select>
  );
}

interface SettingsSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  unit?: string;
}

export function SettingsSlider({ value, onValueChange, min, max, step = 1, disabled = false, label, unit }: SettingsSliderProps) {
  return (
    <div className="flex items-center gap-4">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onValueChange(Number(e.target.value))}
        disabled={disabled}
        className="flex-1 accent-cyan-500"
      />
      <span className="text-sm text-gray-400 min-w-[60px] text-right">
        {value}{unit}
      </span>
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
}

interface SettingsInputProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  disabled?: boolean;
  maxLength?: number;
  className?: string;
}

export function SettingsInput({ value, onValueChange, placeholder, type = 'text', disabled = false, maxLength, className }: SettingsInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      className={cn(
        "px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-cyan-400",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    />
  );
}

interface SettingsButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}

export function SettingsButton({ children, onClick, variant = 'primary', disabled = false, className }: SettingsButtonProps) {
  const variants = {
    primary: "bg-cyan-500 hover:bg-cyan-600 text-white",
    secondary: "bg-white/10 hover:bg-white/20 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-4 py-2 rounded-lg font-medium text-sm transition-colors",
        variants[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
}

interface SettingsCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function SettingsCard({ title, description, icon, children, className }: SettingsCardProps) {
  return (
    <div className={cn("bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4", className)}>
      <div className="flex items-start gap-3 mb-4">
        {icon && <div className="text-cyan-400">{icon}</div>}
        <div>
          <h3 className="text-white font-medium">{title}</h3>
          {description && (
            <p className="text-sm text-gray-400 mt-1">{description}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

interface SettingsGroupProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsGroup({ title, children, className }: SettingsGroupProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}

interface SettingsAlertProps {
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  description?: string;
  className?: string;
}

export function SettingsAlert({ type, title, description, className }: SettingsAlertProps) {
  const types = {
    info: "bg-blue-500/20 border-blue-500/30 text-blue-300",
    warning: "bg-yellow-500/20 border-yellow-500/30 text-yellow-300",
    error: "bg-red-500/20 border-red-500/30 text-red-300",
    success: "bg-green-500/20 border-green-500/30 text-green-300",
  };

  return (
    <div className={cn("p-4 rounded-lg border", types[type], className)}>
      <div className="font-medium">{title}</div>
      {description && (
        <div className="text-sm mt-1 opacity-80">{description}</div>
      )}
    </div>
  );
}

interface SettingsProgressProps {
  value: number;
  max: number;
  label?: string;
  color?: 'cyan' | 'green' | 'yellow' | 'red';
  className?: string;
}

export function SettingsProgress({ value, max, label, color = 'cyan', className }: SettingsProgressProps) {
  const colors = {
    cyan: "bg-cyan-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">{label}</span>
          <span className="text-white">{value} / {max}</span>
        </div>
      )}
      <div className="w-full bg-white/10 rounded-full h-2">
        <div
          className={cn("h-2 rounded-full transition-all", colors[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface SettingsBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

export function SettingsBadge({ children, variant = 'default', className }: SettingsBadgeProps) {
  const variants = {
    default: "bg-gray-500/20 text-gray-300",
    success: "bg-green-500/20 text-green-300",
    warning: "bg-yellow-500/20 text-yellow-300",
    error: "bg-red-500/20 text-red-300",
  };

  return (
    <span className={cn("px-2 py-1 rounded-full text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}
