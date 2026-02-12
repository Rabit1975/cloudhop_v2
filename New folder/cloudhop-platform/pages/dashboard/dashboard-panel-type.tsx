import type { ComponentType } from 'react';

export type DashboardPanelType = {
  /**
   * Unique identifier for the panel.
   */
  name: string;

  /**
   * Order weight for sorting. Lower numbers appear first.
   */
  weight?: number;

  /**
   * The component to render within the dashboard grid.
   * This component should generally be or return a PanelCard.
   */
  component: ComponentType;
};