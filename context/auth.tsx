import axios from 'axios';
import { useState, useContext, createContext, PropsWithChildren, useEffect } from 'react';
import { User, SignInForm, SignUpForm } from '@ts/index';
import AuthService from '@services/Auth';
import UserService from '@services/User';

interface Context {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (form: SignInForm) => Promise<void>;
  signUp: (form: SignUpForm) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<Context>({
  isAuthenticated: true,
  user: null,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => null
});

// This hook can be used to access the user info.
export function useAuth() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function AuthProvider(props: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  // const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (form: SignInForm) => {
    try {
      const response = await AuthService.signIn(form);

      setToken(response.token);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  const signUp = async (form: SignUpForm) => {
    await AuthService.signUp(form);
  };

  const signOut = () => {
    setToken(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : undefined;

    const fetchUser = async () => {
      const response = await UserService.me();

      setUser(response);
    };

    token ? fetchUser() : setUser(null);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        signIn,
        signUp,
        signOut
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
