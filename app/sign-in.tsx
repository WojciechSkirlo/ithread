import { useReducer } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@helpers/colors';
import UIInput from '@components/UI/Input';
import UIButton from '@components/UI/Button';

interface FormState {
  email: string;
  password: string;
}

interface FormAction {
  type: 'SET_EMAIL' | 'SET_PASSWORD';
  payload: string;
}

function reducer(state: FormState, action: FormAction) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_EMAIL':
      return { ...state, email: payload };
    case 'SET_PASSWORD':
      return { ...state, password: payload };
    default:
      return state;
  }
}

export default function SignIn() {
  const [state, dispatch] = useReducer(reducer, { email: '', password: '' });

  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleSubmit = () => {
    try {
      console.log('Email:', state.email);
      console.log('Password:', state.password);
    } catch (error) {
      console.log(error);
    }

    router.push('/');
  };

  return (
    <ScrollView>
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
            <UIInput
              value={state.email}
              placeholder="Email"
              onChangeText={(value) => dispatch({ type: 'SET_EMAIL', payload: value })}
            />
            <UIInput
              value={state.password}
              type="password"
              placeholder="Password"
              onChangeText={(value) => dispatch({ type: 'SET_PASSWORD', payload: value })}
            />
          </View>

          <View style={styles.buttonLinkContainer}>
            <UIButton text="Sign In" onPress={handleSubmit} />
            <View style={styles.linkContainer}>
              <Text>Not a member yet?</Text>
              <Link style={styles.link} href="/sign-up">
                Sign Up
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
