import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { User, UserRole } from '@cloudrabbit/cloudhop-platform.entities.user';
import { ProtectedRoute } from './protected-route.js';
import styles from './protected-route.module.scss';

const MockContent = () => <div>Protected Content</div>;

describe('ProtectedRoute', () => {
  it('should render children when the user is authenticated', async () => {
    const user = new User('1', 'test', 'Test User', 'test@example.com', [UserRole.User]);

    render(
      <MockProvider>
        <ProtectedRoute testUser={user}>
          <MockContent />
        </ProtectedRoute>
      </MockProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });
  });

  it('should redirect to the specified route when the user is not authenticated', async () => {
    render(
      <MockProvider noRouter>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route path="/protected" element={
              <ProtectedRoute redirectTo="/login">
                <MockContent />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </MockProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
  });

  it('should display a loading spinner while authenticating', () => {
    render(
      <MockProvider>
        <ProtectedRoute>
          <MockContent />
        </ProtectedRoute>
      </MockProvider>
    );

    const loadingContainer = document.querySelector(`.${styles.loadingContainer}`);
    expect(loadingContainer).toBeInTheDocument();
  });
});