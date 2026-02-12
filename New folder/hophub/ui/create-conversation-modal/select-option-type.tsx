import React from 'react';

export type SelectOption = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};