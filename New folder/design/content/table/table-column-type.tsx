import type { ReactNode } from 'react';

export type TableColumn = {
  /**
   * Unique key for the column data index.
   * Used to access data in the record if render is not provided.
   */
  key: string;

  /**
   * Title to display in the header.
   */
  title: ReactNode;

  /**
   * Custom render function for the cell.
   * Receives the entire record.
   */
  render?: (record: any) => ReactNode;

  /**
   * Width of the column.
   */
  width?: string | number;

  /**
   * Text alignment for the column cells and header.
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Class name for the column cells.
   */
  className?: string;
};