import axios from 'axios';
import { User } from '@ts/index';

class UserService {
  public static async me(): Promise<User> {
    return (await axios.get('/api/user/me')).data;
  }

  public static async search(query: string): Promise<User[]> {
    return (await axios.get(`/api/user/search?q=${query}`)).data;
  }

  public static async sendRequest(userId: string): Promise<any> {
    return (await axios.post(`/api/user/send-request`, { userId })).data;
  }
}

export default UserService;
