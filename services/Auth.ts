import axios from 'axios';
import { SignInForm, SignUpForm } from '@ts/index';

class AuthService {
  public static async signIn(form: SignInForm): Promise<string> {
    return (await axios.post('/api/auth/sign-in', form)).data;
  }

  public static async signUp(form: SignUpForm): Promise<string> {
    return (await axios.post('/api/auth/sign-up', form)).data;
  }
}

export default AuthService;
