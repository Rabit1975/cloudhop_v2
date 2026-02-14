import { useApolloClient, useMutation, gql } from '@apollo/client';
import { User } from '@cloudrabbit/cloudhop-platform.entities.user';
import { useCurrentUser, GET_CURRENT_USER } from './use-current-user.js';
import { LoginUserOptions, CreateUserOptions } from './auth-types.js';

const LOGIN_USER = gql`
  mutation LoginUser($options: LoginUserOptions!) {
    loginUser(options: $options) {
      id
      userId
      username
      email
      imageUrl
      roles
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($options: CreateUserOptions!) {
    createUser(options: $options) {
      id
      userId
      username
      email
      imageUrl
      roles
    }
  }
`;

const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser
  }
`;

export type UseAuthResult = {
  user: User | null;
  loading: boolean;
  login: (options: LoginUserOptions) => Promise<void>;
  signup: (options: CreateUserOptions) => Promise<void>;
  logout: () => Promise<void>;
};

export function useAuth(mockUser?: User): UseAuthResult {
  const client = useApolloClient();
  const { user, loading } = useCurrentUser({ mockUser });
  
  const [loginMutation] = useMutation(LOGIN_USER);
  const [createUserMutation] = useMutation(CREATE_USER);
  const [logoutMutation] = useMutation(LOGOUT_USER);

  const login = async (options: LoginUserOptions) => {
    await loginMutation({ 
      variables: { options },
      refetchQueries: [{ query: GET_CURRENT_USER }]
    });
  };

  const signup = async (options: CreateUserOptions) => {
    await createUserMutation({ 
      variables: { options },
      refetchQueries: [{ query: GET_CURRENT_USER }]
    });
  };

  const logout = async () => {
    await logoutMutation();
    await client.resetStore();
  };

  return {
    user,
    loading,
    login,
    signup,
    logout
  };
}