import { gql, useQuery } from '@apollo/client';
import { User, UserRole } from '@cloudrabbit/cloudhop-platform.entities.user';

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      userId
      username
      email
      imageUrl
      roles
    }
  }
`;

export type UseCurrentUserOptions = {
  mockUser?: User;
};

export type CurrentUserResult = {
  user: User | null;
  loading: boolean;
  error?: Error;
  refetch: () => Promise<any>;
};

export function useCurrentUser({ mockUser }: UseCurrentUserOptions = {}): CurrentUserResult {
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    skip: !!mockUser,
  });

  if (mockUser) {
    return { 
      user: mockUser, 
      loading: false, 
      refetch: async () => null 
    };
  }

  const user = data?.getCurrentUser
    ? User.from({
        id: data.getCurrentUser.id,
        userId: data.getCurrentUser.userId,
        username: data.getCurrentUser.username,
        displayName: data.getCurrentUser.username,
        email: data.getCurrentUser.email,
        roles: (data.getCurrentUser.roles as UserRole[]) || [],
        imageUrl: data.getCurrentUser.imageUrl || undefined,
      })
    : null;

  return {
    user,
    loading,
    error,
    refetch,
  };
}