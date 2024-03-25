import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@helpers/colors';
import UIInput from '@components/UI/Input';
import UIButton from '@components/UI/Button';

export default function SignUp() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView>
      <View style={[styles.container, { paddingBottom: insets.bottom + 24, paddingTop: insets.top + 16 }]}>
        <View style={styles.logoContainer}>
          <Image source={require('@assets/icon.png')} style={styles.logo} />
          <Text style={styles.logoText}>One account {'\n'} Many Possibilities</Text>
        </View>
        <View style={styles.inputsButtonContainer}>
          <View style={styles.inputsContainer}>
            <UIInput value="" placeholder="Username" />
            <UIInput value="" placeholder="Email" />
            <UIInput value="" type="password" placeholder="Password" />
            <UIInput value="" type="password" placeholder="Confirm Password" />
          </View>

          <View style={styles.buttonLinkContainer}>
            <UIButton text="Sign Up" />
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
