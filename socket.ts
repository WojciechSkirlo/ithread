import { io } from 'socket.io-client';
const url = process.env.EXPO_PUBLIC_API_URL || 'http://127.0.0.1:4000';

const socket = io(url);
export default socket;
