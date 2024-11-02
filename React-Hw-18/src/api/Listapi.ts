import axios from 'axios';
import { Icard } from '../Types/Card.type';

export interface IProducts {
  products: Icard[];
  total: number;
  skip: number;
  limit: number;
}

export const FetchProducts = async (): Promise<IProducts> => {
  const response = await axios.get('https://dummyjson.com/products');
  return response.data;
};
