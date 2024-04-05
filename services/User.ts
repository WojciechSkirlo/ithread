import axios from 'axios';

class UserService {
  public static async me(): Promise<UserResponse> {
    return (await axios.get('/api/user/me')).data;
  }
}

interface UserResponse {
  email: string;
  username: string;
}

export default UserService;
