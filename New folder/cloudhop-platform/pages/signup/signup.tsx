import React, { useState, type FormEvent, useEffect, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@cloudrabbit/cloudhop-platform.hooks.use-auth';
import { Button } from '@cloudrabbit/design.actions.button';
import { TextInput } from '@cloudrabbit/design.inputs.text-input';
import { Heading } from '@cloudrabbit/design.typography.heading';
import classNames from 'classnames';
import styles from './signup.module.scss';

export type SignupProps = {
  /**
   * Custom class name for the signup page container.
   */
  className?: string;
};

export function Signup({ className }: SignupProps) {
  const { signup, user, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await signup(formData);
      // Successful signup will update 'user' from useAuth, triggering the useEffect redirect.
    } catch (err: any) {
      setError(err?.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Heading element="h1" visualLevel="h3" className={styles.title}>
            Join the Nebula
          </Heading>
          <p className={styles.subtitle}>
            Create your CloudHop account to start your journey.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.errorMessage}>{error}</div>}
          
          <TextInput
            id="name"
            name="name"
            label="Display Name"
            placeholder="Enter your display name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            className={styles.input}
            required
          />

          <TextInput
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            className={styles.input}
            required
          />

          <TextInput
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Create a secure password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            className={styles.input}
            required
          />

          <Button
            type="submit"
            appearance="primary"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <div className={styles.footer}>
          <span className={styles.footerText}>Already have an account?</span>
          <Button
            href="/login"
            appearance="tertiary"
            className={styles.loginLink}
          >
            Log in
          </Button>
        </div>
      </div>
    </div>
  );
}