import React from 'react';

interface Context {
  signIn: () => void;
  signOut: () => void;
  isAuthenticated: boolean;
}

const AuthContext = React.createContext<Context>({
  signIn: () => null,
  signOut: () => null,
  isAuthenticated: true
});

// This hook can be used to access the user info.
export function useAuth() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function AuthProvider(props: React.PropsWithChildren) {
  return (
    <AuthContext.Provider
      value={{
        signIn: () => null,
        signOut: () => null,
        isAuthenticated: true
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
