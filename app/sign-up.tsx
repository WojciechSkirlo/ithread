import { useReducer } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useAuth } from '@context/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import { Colors } from '@helpers/colors';
import { SignUpForm } from '@ts/index';
import UIInput from '@components/UI/Input';
import UIButton from '@components/UI/Button';
import UIFormGroup from '@components/UI/FormGroup';

interface FormState extends SignUpForm {
  errors: Record<string, string>;
}

interface FormAction {
  type: 'SET_USERNAME' | 'SET_EMAIL' | 'SET_PASSWORD' | 'SET_CONFIRM_PASSWORD' | 'SET_ERRORS';
  payload: string | Record<string, string>;
}

function reducer(state: FormState, action: FormAction) {
  const { type, payload } = action;

  if (typeof payload === 'string' && type !== 'SET_ERRORS') {
    switch (type) {
      case 'SET_USERNAME':
        return { ...state, username: payload };
      case 'SET_EMAIL':
        return { ...state, email: payload };
      case 'SET_PASSWORD':
        return { ...state, password: payload };
      case 'SET_CONFIRM_PASSWORD':
        return { ...state, confirm_password: payload };
    }
  }

  if (type === 'SET_ERRORS' && typeof payload === 'object') {
    return { ...state, errors: payload };
  }

  return state;
}

export default function SignUp() {
  const [state, dispatch] = useReducer(reducer, {
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    errors: {}
  });
  const { signUp } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!state.username) errors.username = 'Username is required';
    if (!state.email) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(state.email)) errors.email = 'Email is invalid';
    if (!state.password) errors.password = 'Password is required';
    if (state.password.length < 8) errors.password = 'Password should be at least 8 characters';
    if (!state.confirm_password) errors.confirm_password = 'Confirm Password is required';
    if (state.password !== state.confirm_password) errors.confirm_password = 'Passwords do not match';

    dispatch({ type: 'SET_ERRORS', payload: errors });

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) return;

      await signUp({
        username: state.username,
        email: state.email,
        password: state.password,
        confirm_password: state.confirm_password
      });
      router.push('/sign-in');
    } catch (error: any) {
      const status = error?.response?.status;

      if (status === 400) {
        const errors = error?.response?.data?.errors ?? {};
        dispatch({ type: 'SET_ERRORS', payload: errors });
      }
    }
  };

  return (
    <ScrollView>
      <View style={[styles.container, { paddingBottom: insets.bottom + 24, paddingTop: insets.top + 16 }]}>
        <View style={styles.logoContainer}>
          <Image source={require('@assets/icon.png')} style={styles.logo} />
          <Text style={styles.logoText}>One account {'\n'} Many Possibilities</Text>
        </View>
        <View style={styles.inputsButtonContainer}>
          <View style={styles.inputsContainer}>
            <UIFormGroup error={state.errors['username']}>
              <UIInput
                value={state.username}
                placeholder="Full name"
                onChangeText={(value) => dispatch({ type: 'SET_USERNAME', payload: value })}
              />
            </UIFormGroup>
            <UIFormGroup error={state.errors['email']}>
              <UIInput
                value={state.email}
                placeholder="Email"
                onChangeText={(value) => dispatch({ type: 'SET_EMAIL', payload: value })}
              />
            </UIFormGroup>
            <UIFormGroup error={state.errors['password']}>
              <UIInput
                value={state.password}
                type="password"
                placeholder="Password"
                onChangeText={(value) => dispatch({ type: 'SET_PASSWORD', payload: value })}
              />
            </UIFormGroup>
            <UIFormGroup error={state.errors['confirm_password']}>
              <UIInput
                value={state.confirm_password}
                type="password"
                placeholder="Confirm Password"
                onChangeText={(value) => dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: value })}
              />
            </UIFormGroup>
          </View>

          <View style={styles.buttonLinkContainer}>
            <UIButton text="Sign Up" onPress={handleSubmit} />
            <View style={styles.linkContainer}>
              <Text>Already have an account?</Text>
              <Link style={styles.link} href="/sign-in">
                Sign In
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
