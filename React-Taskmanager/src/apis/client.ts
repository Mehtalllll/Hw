import axios from 'axios';
import { getSession } from './Session-management';

const ServerUrl = 'http://localhost:3000';
export const generateClient = () => {
  const Session = getSession();
  return axios.create({
    baseURL: ServerUrl,
    headers: { Authorization: `Bearer ${Session}` },
  });
};
