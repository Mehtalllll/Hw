import { IPageInation, IServer } from '../Types/Global.type';
import { Iposts } from '../Types/Posts.type';
import { ListLimit } from '../Utils/Config';
import { GenerateClient } from './Client';
import { Urls } from './Urls';

interface IFetchPostsReqDto extends IPageInation {}
interface IFetchPostsResDto extends IServer {
  posts: Iposts[];
}
type FetchPostApi = (_?: IFetchPostsReqDto) => Promise<IFetchPostsResDto>;
export const fetchPostsList: FetchPostApi = async params => {
  const Client = GenerateClient();
  const response = await Client.get<IFetchPostsResDto>(Urls.posts.List, {
    params: { limit: params?.limit || ListLimit, skip: params?.skip || 0 },
  });
  return response.data;
};

type FetchPostApiById = (_: number) => Promise<Iposts>;
export const fetchPostsById: FetchPostApiById = async (id: number) => {
  const Client = GenerateClient();
  const response = await Client.get<Iposts>(Urls.posts.ById(id));
  return response.data;
};
