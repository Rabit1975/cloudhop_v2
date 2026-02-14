import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ForgotPassword } from './forgot-password.js';

describe('ForgotPassword Component', () => {
  it('should render the initial state with the email input and submit button', () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Reset Link' })).toBeInTheDocument();
    expect(screen.getByText("Enter your email address and we'll send you a link to reset your password.")).toBeInTheDocument();
  });

  it('should call the onSubmit function when the form is submitted', () => {
    const onSubmit = vi.fn();
    render(
      <MemoryRouter>
        <ForgotPassword onSubmit={onSubmit} />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText('Email Address') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'Send Reset Link' }) as HTMLButtonElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith('test@example.com');
  });

  it('should render the success state after submitting the form', async () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText('Email Address') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'Send Reset Link' }) as HTMLButtonElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    // After submission, the title changes to "Check your email"
    expect(screen.getByRole('heading', { name: 'Check your email' })).toBeInTheDocument();
    
    // Find the description paragraph and check its text content
    const successDescription = screen.getByText((_text, element) => { // Use _text to indicate it's not used, and check element.textContent
      return (
        element.tagName.toLowerCase() === 'p' &&
        element.textContent?.includes('We have sent a password reset link to test@example.com. Please check your inbox and follow the instructions.')
      );
    });
    expect(successDescription).toBeInTheDocument();
    
    // The button in the success state is "Return to Login" (which is a link, not a submit button)
    expect(screen.getByRole('link', { name: 'Return to Login' })).toBeInTheDocument();
  });
});