import { IComments } from '../Types/commetnsType';
import { IPageInation, IServer } from '../Types/Global.type';
import { ListLimit } from '../Utils/Config';
import { GenerateClient } from './Client';
import { Urls } from './Urls';

interface IfetchPostCommentsRequestDto extends IPageInation {
  Postid: number;
}

interface IfetchPostCommentsResDto extends IServer {
  comments: IComments[];
}
type fetchPostsCommentsType = (
  _: IfetchPostCommentsRequestDto,
) => Promise<IfetchPostCommentsResDto>;
export const fetchPostsComments: fetchPostsCommentsType = async ({
  Postid,
  ...params
}) => {
  const Client = GenerateClient();
  const response = Client.get<IfetchPostCommentsResDto>(
    Urls.comments.ByPostId(Postid),
    { params: { limit: params?.limit || ListLimit, skip: params?.skip || 0 } },
  );

  return (await response).data;
};
