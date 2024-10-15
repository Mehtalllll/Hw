import { IUser } from '../types/users';
import { Urls } from '../utils/urls';
import { generateClient } from './client';

type getUerInfoType = () => Promise<IUser>;
export const getUerInfo: getUerInfoType = async () => {
  const client = generateClient();
  const response = await client.get(Urls.User.info);
  return response.data;
};
