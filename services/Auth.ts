import axios from 'axios';
import { Resource, SignInForm, SignUpForm, Statement } from '@ts/index';

class AuthService {
  public static async signIn(form: SignInForm): Promise<Resource<string>> {
    return (await axios.post('/api/auth/sign-in', form)).data;
  }

  public static async signUp(form: SignUpForm): Promise<Statement> {
    return (await axios.post('/api/auth/sign-up', form)).data;
  }

  // public static async refreshToken() {
  //   return (await axios.post('/api/auth/refresh-token')).data;
  // }
}

export default AuthService;
