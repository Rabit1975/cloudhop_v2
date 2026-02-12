import React from 'react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MockProvider } from '@cloudrabbit/cloudhop-platform.testing.mock-provider';
import { mockUsers, UserRole, User } from '@cloudrabbit/cloudhop-platform.entities.user';
import { ProtectedRoute } from './protected-route.js';

const [baseUser] = mockUsers();

const adminUser = User.from({
  ...baseUser.toObject(),
  roles: [UserRole.Admin],
});

const regularUser = User.from({
  ...baseUser.toObject(),
  roles: [UserRole.User],
});

const ProtectedContent = ({ title = 'Protected Content' }: { title?: string }) => (
  <div style={{
    padding: '24px',
    background: 'var(--colors-surface-secondary)',
    border: '1px solid var(--colors-positive-border)',
    borderRadius: '8px',
    color: 'var(--colors-text-primary)'
  }}>
    <h3 style={{ marginTop: 0 }}>{title}</h3>
    <p>You have successfully accessed this protected route.</p>
  </div>
);

const RedirectTarget = () => {
  const location = useLocation();
  return (
    <div style={{
      padding: '24px',
      background: 'var(--colors-surface-warning)',
      border: '1px solid var(--colors-warning-border)',
      borderRadius: '8px',
      color: 'var(--colors-text-primary)'
    }}>
      <h3 style={{ marginTop: 0 }}>Access Denied / Login Required</h3>
      <p>Redirected. Previous location: <code>{location.state?.from?.pathname || 'None'}</code></p>
    </div>
  );
};

export const LoadingState = () => {
  return (
    <MockProvider>
      <div style={{ height: '300px', border: '1px dashed #ccc', position: 'relative' }}>
        <ProtectedRoute>
          <ProtectedContent />
        </ProtectedRoute>
      </div>
    </MockProvider>
  );
};

export const AuthenticatedAdmin = () => {
  return (
    <MockProvider>
      <ProtectedRoute testUser={adminUser}>
        <ProtectedContent title="Admin Dashboard" />
      </ProtectedRoute>
    </MockProvider>
  );
};

export const RoleBasedAccessGranted = () => {
  return (
    <MockProvider>
      <div style={{ padding: '20px' }}>
        <p style={{ marginBottom: '10px' }}>User Role: <strong>User</strong> | Required: <strong>User</strong></p>
        <ProtectedRoute testUser={regularUser} allowedRoles={['user']}>
          <ProtectedContent title="User Settings" />
        </ProtectedRoute>
      </div>
    </MockProvider>
  );
};

export const RoleBasedAccessDenied = () => {
  return (
    <MockProvider noRouter>
      <MemoryRouter initialEntries={['/admin']}>
        <div style={{ padding: '20px' }}>
          <p style={{ marginBottom: '10px' }}>User Role: <strong>User</strong> | Required: <strong>Admin</strong></p>
          <Routes>
            <Route path="/" element={<RedirectTarget />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute testUser={regularUser} allowedRoles={['admin']}>
                  <ProtectedContent title="Secret Admin Panel" />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </MemoryRouter>
    </MockProvider>
  );
};

export const UnauthenticatedRedirect = () => {
  return (
    <MockProvider noRouter>
       <MemoryRouter initialEntries={['/protected']}>
         <div style={{ padding: '20px' }}>
           <p>Simulating unauthenticated user accessing protected route.</p>
           <Routes>
             <Route path="/" element={<RedirectTarget />} />
             <Route path="/login" element={<RedirectTarget />} />
             <Route 
               path="/protected" 
               element={
                 <ProtectedRoute redirectTo="/login">
                   <ProtectedContent />
                 </ProtectedRoute>
               } 
             />
           </Routes>
         </div>
       </MemoryRouter>
    </MockProvider>
  );
};