import axios from 'axios';
import { useState, useContext, createContext, PropsWithChildren } from 'react';
import { SignInForm, SignUpForm } from '@ts/index';
import AuthService from '@services/Auth';

interface Context {
  signIn: (form: SignInForm) => Promise<void>;
  signUp: (form: SignUpForm) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<Context>({
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => null,
  isAuthenticated: true
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

  const signIn = async (form: SignInForm) => {
    try {
      const response = await AuthService.signIn(form);

      axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
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
    axios.defaults.headers.common['Authorization'] = undefined;
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        isAuthenticated
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
