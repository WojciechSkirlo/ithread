import axios from 'axios';
import { Resource, User } from '@ts/index';

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

  public static async friends(query: string): Promise<Resource<User[]>> {
    return (await axios.get(`/api/user/friends?q=${query}`)).data;
  }

  public static async conversations(): Promise<Resource<any>> {
    return (await axios.get('/api/user/conversations')).data;
  }

  public static async startConversation(friendId: string): Promise<Resource<User>> {
    return (await axios.post(`/api/user/start-conversation`, { friendId })).data;
  }
}

export default UserService;
