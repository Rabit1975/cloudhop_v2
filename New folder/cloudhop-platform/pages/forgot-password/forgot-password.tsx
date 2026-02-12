import React, { useState, useCallback, type FormEvent } from 'react';
import classNames from 'classnames';
import { Heading } from '@cloudrabbit/design.typography.heading';
import { TextInput } from '@cloudrabbit/design.inputs.text-input';
import { Button } from '@cloudrabbit/design.actions.button';
import styles from './forgot-password.module.scss';

export type ForgotPasswordProps = {
  /**
   * Additional class names for the component.
   */
  className?: string;

  /**
   * Callback function when the form is submitted.
   * Useful for testing or overriding default behavior.
   */
  onSubmit?: (email: string) => void;
};

export function ForgotPassword({ className, onSubmit }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(email);
    }
    setIsSubmitted(true);
  }, [email, onSubmit]);

  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Heading element="h1" visualLevel="h3" className={styles.title}>
            {isSubmitted ? 'Check your email' : 'Forgot Password'}
          </Heading>
        </div>

        {!isSubmitted ? (
          <>
            <p className={styles.description}>
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className={styles.form}>
              <TextInput
                id="forgot-password-email" // Added unique ID for accessibility
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className={styles.input}
              />
              <Button type="submit" appearance="primary" className={styles.submitButton}>
                Send Reset Link
              </Button>
            </form>
            <div className={styles.footer}>
              <Button href="/login" appearance="tertiary" className={styles.backLink}>
                Back to Login
              </Button>
            </div>
          </>
        ) : (
          <div className={styles.successState}>
            <p className={styles.description}>
              We have sent a password reset link to <strong>{email}</strong>. 
              Please check your inbox and follow the instructions.
            </p>
            <Button href="/login" appearance="primary" className={styles.submitButton}>
              Return to Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}