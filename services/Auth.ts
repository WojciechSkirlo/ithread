import axios from 'axios';
import { Statement, SignInForm, SignUpForm } from '@ts/index';

class AuthService {
  public static async signIn(form: SignInForm) {
    return (await axios.post<SignInResponse>('/api/auth/sign-in', form)).data;
  }

  public static async signUp(form: SignUpForm) {
    return (await axios.post<Statement>('/api/auth/sign-up', form)).data;
  }

  public static async refreshToken() {
    return (await axios.post('/api/auth/refresh-token')).data;
  }
}

interface SignInResponse extends Statement {
  token: string;
}

export default AuthService;
