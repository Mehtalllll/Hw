import { IPageInation, IServer } from '../Types/Global.type';
import { Iposts } from '../Types/Posts.type';
import { ListLimit } from '../Utils/Config';
import { GenerateClient } from './Client';
import { Urls } from './Urls';

interface IFetchPostsReqDto extends IPageInation {
  tag?: string | null;
}
interface IFetchPostsResDto extends IServer {
  posts: Iposts[];
}
type FetchPostApi = (_?: IFetchPostsReqDto) => Promise<IFetchPostsResDto>;
export const fetchPostsList: FetchPostApi = async params => {
  const Client = GenerateClient();
  const url = !params?.tag ? Urls.posts.List : Urls.posts.ByTag(params.tag);
  const response = await Client.get<IFetchPostsResDto>(url, {
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
