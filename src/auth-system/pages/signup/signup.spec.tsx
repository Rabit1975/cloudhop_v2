import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { useAuth } from '@cloudrabbit/cloudhop-platform.hooks.use-auth';
import { Signup } from './signup.js';
import styles from './signup.module.scss';

vi.mock('@cloudrabbit/cloudhop-platform.hooks.use-auth');

const mockedUseAuth = vi.mocked(useAuth);

describe('Signup Component', () => {
  it('should render the signup form', () => {
    mockedUseAuth.mockReturnValue({
      signup: vi.fn(),
      login: vi.fn(), // Added missing login property
      user: null,
      loading: false,
      logout: vi.fn()
    });
    const { container } = render(
      <MockProvider>
        <Signup />
      </MockProvider>
    );

    const titleElement = container.querySelector(`.${styles.title}`);
    expect(titleElement).toBeInTheDocument();
  });

  it('should display an error message if signup fails', async () => {
    const errorMessage = 'Failed to create account.';
    mockedUseAuth.mockReturnValue({
      signup: vi.fn().mockRejectedValue(new Error(errorMessage)),
      login: vi.fn(), // Added missing login property
      user: null,
      loading: false,
      logout: vi.fn()
    });

    const { container } = render(
      <MockProvider>
        <Signup />
      </MockProvider>
    );

    const nameInput = container.querySelector<HTMLInputElement>('#name');
    const emailInput = container.querySelector<HTMLInputElement>('#email');
    const passwordInput = container.querySelector<HTMLInputElement>('#password');
    const submitButton = container.querySelector<HTMLButtonElement>(`.${styles.submitButton}`);

    fireEvent.change(nameInput!, { target: { value: 'Test Name' } });
    fireEvent.change(emailInput!, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput!, { target: { value: 'password123' } });
    fireEvent.click(submitButton!);

    await waitFor(() => {
      const errorElement = container.querySelector(`.${styles.errorMessage}`);
      expect(errorElement).toHaveTextContent(errorMessage);
    });
  });

  it('should disable the submit button when loading', () => {
    mockedUseAuth.mockReturnValue({
      signup: vi.fn(),
      login: vi.fn(), // Added missing login property
      user: null,
      loading: true,
      logout: vi.fn()
    });

    const { container } = render(
      <MockProvider>
        <Signup />
      </MockProvider>
    );

    const submitButton = container.querySelector<HTMLButtonElement>(`.${styles.submitButton}`);
    expect(submitButton).toBeDisabled();
  });
});