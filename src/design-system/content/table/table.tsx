import React, { type ReactNode } from 'react';
import classNames from 'classnames';
import styles from './table.module.scss';
import type { TableColumn } from './table-column-type.js';

export type TableProps = {
  /**
   * Columns configuration.
   * Defines the structure and rendering logic for each column.
   */
  columns: TableColumn[];
  
  /**
   * Data array to display in the table.
   * Should contain objects with keys matching column keys.
   */
  data: Record<string, any>[];
  
  /**
   * Field name to use as a unique key for rows.
   * Defaults to 'id'.
   */
  keyField?: string;
  
  /**
   * Callback triggered when a row is clicked.
   */
  onRowClick?: (record: Record<string, any>) => void;
  
  /**
   * Displays a loading overlay over the table when true.
   */
  loading?: boolean;

  /**
   * Custom content to display when data is empty.
   */
  emptyState?: ReactNode;
  
  /**
   * Class name for the outer container.
   */
  className?: string;

  /**
   * Inline styles for the outer container.
   */
  style?: React.CSSProperties;
};

export function Table({
  columns,
  data,
  keyField = 'id',
  onRowClick,
  loading = false,
  emptyState,
  className,
  style,
}: TableProps) {
  
  const handleRowClick = (record: Record<string, any>) => {
    if (onRowClick) {
      onRowClick(record);
    }
  };

  const isEmpty = !loading && (!data || data.length === 0);

  return (
    <div className={classNames(styles.container, className)} style={style}>
      {loading && (
        <div className={styles.loadingOverlay}>
          Loading...
        </div>
      )}
      
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {columns.map((col) => (
              <th 
                key={col.key} 
                className={classNames(
                  col.className,
                  col.align === 'right' && styles.alignRight,
                  col.align === 'center' && styles.alignCenter
                )}
                style={{ width: col.width }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        {!isEmpty && (
          <tbody className={styles.tbody}>
            {data.map((record, index) => {
              // Ensure we have a valid key for React
              const rowKey = (record[keyField] || index).toString();
              return (
                <tr 
                  key={rowKey}
                  onClick={() => handleRowClick(record)}
                  className={classNames({ [styles.clickable]: !!onRowClick })}
                >
                  {columns.map((col) => {
                    const cellValue = record[col.key];
                    const content = col.render ? col.render(record) : cellValue;
                    return (
                      <td 
                        key={`${rowKey}-${col.key}`}
                        className={classNames(
                          col.className,
                          col.align === 'right' && styles.alignRight,
                          col.align === 'center' && styles.alignCenter
                        )}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      
      {isEmpty && (
        <div className={styles.emptyState}>
          {emptyState || 'No data available'}
        </div>
      )}
    </div>
  );
}