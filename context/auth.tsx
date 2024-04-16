import axios from 'axios';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { SignInForm, SignUpForm, User } from '@ts/index';
import AuthService from '@services/Auth';
import UserService from '@services/User';

interface Context {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (form: SignInForm) => Promise<void>;
  signUp: (form: SignUpForm) => Promise<void>;
  signOut: () => void;
  sendRequest: (id: string) => Promise<void>;
  acceptRequest: (id: string) => Promise<void>;
}

const AuthContext = createContext<Context>({
  isAuthenticated: true,
  user: null,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => null,
  sendRequest: () => Promise.resolve(),
  acceptRequest: () => Promise.resolve()
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
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (form: SignInForm) => {
    try {
      const response = await AuthService.signIn(form);

      setToken(response.result);
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

  const sendRequest = async (id: string) => {
    const response = await UserService.sendRequest(id);
    response?.result && setUser(response.result);
  };

  const acceptRequest = async (id: string) => {
    const response = await UserService.acceptRequest(id);
    response?.result && setUser(response.result);
  };

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : undefined;

    const fetchUser = async () => {
      const response = await UserService.me();
      response?.result && setUser(response.result);
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
        signOut,
        sendRequest,
        acceptRequest
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
