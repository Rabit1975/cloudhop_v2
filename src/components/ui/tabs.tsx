import React, { createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

export type TabsValue = string;

interface TabsContextValue {
  value: TabsValue;
  onValueChange: (value: TabsValue) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps {
  value: TabsValue;
  onValueChange?: (value: TabsValue) => void;
  children: React.ReactNode;
  className?: string;
}

export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export interface TabsTriggerProps {
  value: TabsValue;
  children: React.ReactNode;
  className?: string;
}

export interface TabsContentProps {
  value: TabsValue;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      {children}
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: TabsListProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsList must be used within Tabs');

  return (
    <div className={cn(
      'inline-flex h-10 items-center justify-center rounded-lg bg-black/20 p-1 text-white/60',
      className
    )}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const isActive = context.value === value;

  return (
    <button
      onClick={() => context.onValueChange?.(value)}
      className={cn(
        'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
        'hover:bg-white/10',
        isActive && 'bg-cyan-500/20 text-cyan-400',
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  const isActive = context.value === value;

  return (
    <div
      className={cn(
        'mt-2',
        isActive ? 'block' : 'hidden',
        className
      )}
    >
      {children}
    </div>
  );
}
