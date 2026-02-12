import React, { type ReactNode } from 'react';

export type EmptyContainerProps = {
  children?: ReactNode;
};

export function EmptyContainer({ children }: EmptyContainerProps) {
  return <>{children}</>;
}