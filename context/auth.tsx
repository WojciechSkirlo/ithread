import React from 'react';

const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false
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
  //   const [[isLoading, session], setSession] = useStorageState('session');
  const session = 'test';
  const isLoading = false;
  // const setSession = (test: string) => null;
  // const

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // Perform sign-in logic here
        },
        signOut: () => {},
        session,
        isLoading
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
