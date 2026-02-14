import React, { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@cloudrabbit/cloudhop-platform.hooks.use-auth';
import { Spinner } from '@cloudrabbit/design.loaders.spinner';
import { User, type UserRole } from '@cloudrabbit/cloudhop-platform.entities.user';
import styles from './protected-route.module.scss';

export type ProtectedRouteProps = {
  /**
   * The content to render if the user is authenticated and authorized.
   */
  children?: ReactNode;

  /**
   * The path to redirect to if the user is not authenticated or authorized.
   * @default "/"
   */
  redirectTo?: string;

  /**
   * List of user roles allowed to access this route.
   * If not provided, any authenticated user can access.
   */
  allowedRoles?: string[];

  /**
   * User instance for testing purposes.
   * Passing a user object will force the authenticated state.
   * @internal
   */
  testUser?: User;
};

export function ProtectedRoute({
  children,
  redirectTo = '/',
  allowedRoles,
  testUser,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth(testUser);
  const location = useLocation();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="medium" variant="primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const hasPermission = allowedRoles.some((role) =>
      user.hasRole(role as UserRole)
    );

    if (!hasPermission) {
      return <Navigate to={redirectTo} replace />;
    }
  }

  return <>{children}</>;
}