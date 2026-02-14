import React, { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useAuth } from '@cloudrabbit/cloudhop-platform.hooks.use-auth';
import { Button } from '@cloudrabbit/design.actions.button';
import { TextInput } from '@cloudrabbit/design.inputs.text-input';
import { Heading } from '@cloudrabbit/design.typography.heading';
import styles from './login.module.scss';

export type LoginProps = {
  /**
   * Additional class name for the login page wrapper.
   */
  className?: string;
};

export function Login({ className }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password });
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  if (user) return null;

  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Heading element="h1" visualLevel="h3" className={styles.title}>
            Welcome Back
          </Heading>
          <p className={styles.subtitle}>
            Enter your credentials to access CloudHop
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextInput
            id="email-address"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            required
            disabled={loading}
          />
          
          <TextInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            disabled={loading}
          />

          {error && (
            <div className={styles.errorMessage} role="alert">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            appearance="primary" 
            disabled={loading} 
            className={styles.submitButton}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        <div className={styles.footer}>
          <span className={styles.footerText}>Don&apos;t have an account?</span>
          <Button 
            appearance="tertiary" 
            href="/signup" 
            className={styles.signupButton}
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}