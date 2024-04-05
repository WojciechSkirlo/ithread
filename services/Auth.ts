import axios from 'axios';
import { Statement, SignInForm, SignUpForm } from '@ts/index';

class AuthService {
  public static async signIn(form: SignInForm): Promise<SignInResponse> {
    return (await axios.post('/api/auth/sign-in', form)).data;
  }

  public static async signUp(form: SignUpForm): Promise<Statement> {
    return (await axios.post('/api/auth/sign-up', form)).data;
  }
}

interface SignInResponse extends Statement {
  token: string;
}

export default AuthService;
