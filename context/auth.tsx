import { useState, useContext, createContext } from 'react';
import { SignInForm, SignUpForm } from '@ts/index';
import AuthService from '@services/Auth';

interface Context {
  signIn: (form: SignInForm) => void;
  signUp: (form: SignUpForm) => void;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<Context>({
  signIn: () => null,
  signUp: () => null,
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

export function AuthProvider(props: React.PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const signIn = async (form: SignInForm) => {
    try {
      const response = await AuthService.signIn(form);
      setIsAuthenticated(true);

      console.log('Response:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const signUp = (form: SignUpForm) => {
    const response = AuthService.signUp(form);

    console.log('Response:', response);
  };

  const signOut = () => {
    console.log('Sign out');
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
