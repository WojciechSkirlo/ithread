import axios from 'axios';
import { Resource } from '@ts/index';

class ConversationService {
  public static async getConversations(): Promise<Resource<string>> {
    return (await axios.get('/api/auth/sign-in')).data;
  }
}

export default ConversationService;
