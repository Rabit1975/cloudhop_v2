import React from 'react';
import { render, screen } from '@testing-library/react';
import { Table } from './table.js';
import styles from './table.module.scss';

describe('Table Component', () => {
  const columns = [
    { key: 'name', title: 'Name' },
    { key: 'age', title: 'Age' },
  ];

  const data = [
    { id: '1', name: 'John Doe', age: 30 },
    { id: '2', name: 'Jane Smith', age: 25 },
  ];

  it('should render table headers correctly', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('should render table data correctly', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('should display loading message when loading is true', () => {
    render(<Table columns={columns} data={data} loading={true} />);
    const loadingOverlay = document.querySelector(`.${styles.loadingOverlay}`);
    expect(loadingOverlay).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display empty state message when data is empty and not loading', () => {
    const emptyStateMessage = 'No data available';
    render(<Table columns={columns} data={[]} emptyState={emptyStateMessage} />);
    expect(screen.getByText(emptyStateMessage)).toBeInTheDocument();
  });
});