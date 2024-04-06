import { useReducer } from 'react';
import { useAuth } from '@context/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Link, Redirect, useRouter } from 'expo-router';
import { Colors } from '@helpers/colors';
import { SignInForm } from '@ts/index';
import Input from '@components/UI/Input';
import Button from '@components/UI/Button';
import FormGroup from '@components/UI/FormGroup';

interface FormState extends SignInForm {
  errors: Record<string, string>;
}

interface FormAction {
  type: 'SET_EMAIL' | 'SET_PASSWORD' | 'SET_ERRORS';
  payload: string | Record<string, string>;
}

function reducer(state: FormState, action: FormAction) {
  const { type, payload } = action;

  if (typeof payload === 'string' && type !== 'SET_ERRORS') {
    switch (type) {
      case 'SET_EMAIL':
        return { ...state, email: payload };
      case 'SET_PASSWORD':
        return { ...state, password: payload };
    }
  }

  if (type === 'SET_ERRORS' && typeof payload === 'object') {
    return { ...state, errors: payload };
  }

  return state;
}

export default function SignIn() {
  const [state, dispatch] = useReducer(reducer, { email: 'admin@test.pl', password: '', errors: {} });
  const { signIn, isAuthenticated } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!state.email) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(state.email)) errors.email = 'Email is invalid';
    if (!state.password) errors.password = 'Password is required';

    dispatch({ type: 'SET_ERRORS', payload: errors });

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) return;

      await signIn({ email: state.email, password: state.password });
      router.push('/');
    } catch (error: any) {
      const status = error?.response?.status;

      if (status === 401) {
        const errors = error?.response?.data?.errors ?? {};
        dispatch({ type: 'SET_ERRORS', payload: errors });
      }
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View
        style={[
          styles.container,
          {
            paddingBottom: insets.bottom + 24,
            paddingTop: insets.top + 16
          }
        ]}
      >
        <View style={styles.logoContainer}>
          <Image source={require('@assets/icon.png')} style={styles.logo} />
          <Text style={styles.logoText}>One account {'\n'} Many Possibilities</Text>
        </View>
        <View style={styles.inputsButtonContainer}>
          <View style={styles.inputsContainer}>
            <FormGroup error={state.errors['email']}>
              <Input
                value={state.email}
                placeholder="Email"
                onChangeText={(value) => dispatch({ type: 'SET_EMAIL', payload: value })}
              />
            </FormGroup>
            <FormGroup error={state.errors['password']}>
              <Input
                value={state.password}
                type="password"
                placeholder="Password"
                onChangeText={(value) => dispatch({ type: 'SET_PASSWORD', payload: value })}
              />
            </FormGroup>
          </View>

          <View style={styles.buttonLinkContainer}>
            <Button text="Sign In" onPress={handleSubmit} />
            <View style={styles.linkContainer}>
              <Text>Not a member yet?</Text>
              <Link style={styles.link} href="/sign-up">
                Sign Up
              </Link>
              <Link style={styles.link} href="/">
                Testasdasd
              </Link>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16
  },
  logoContainer: {
    maxWidth: 220,
    alignItems: 'center'
  },
  logo: {
    height: 52,
    width: 52,
    marginTop: 32
  },
  logoText: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 32,
    marginTop: 8
  },
  inputsButtonContainer: {
    gap: 12,
    flex: 1,
    width: '100%'
  },
  inputsContainer: {
    gap: 12
  },
  buttonLinkContainer: {
    marginTop: 12,
    alignItems: 'center'
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: 12
  },
  link: {
    color: Colors.Accent,
    marginLeft: 4,
    fontWeight: '500'
  }
});
