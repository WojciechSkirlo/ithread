import axios from 'axios';
import { User, Resource } from '@ts/index';

class UserService {
  public static async me(): Promise<Resource<User>> {
    return (await axios.get('/api/user/me')).data;
  }

  public static async search(query: string): Promise<Resource<User[]>> {
    return (await axios.get(`/api/user/search?q=${query}`)).data;
  }

  public static async requests(): Promise<Resource<User[]>> {
    return (await axios.get('/api/user/requests')).data;
  }

  public static async sendRequest(friendId: string): Promise<Resource<User>> {
    return (await axios.post(`/api/user/send-request`, { friendId })).data;
  }

  public static async acceptRequest(requestId: string): Promise<Resource<User>> {
    return (await axios.post(`/api/user/accept-request`, { requestId })).data;
  }
}

export default UserService;
