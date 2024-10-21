import axios from 'axios';

const ServerURL = 'https://dummyjson.com/';
export const GenerateClient = () => {
  return axios.create({ baseURL: ServerURL });
};
