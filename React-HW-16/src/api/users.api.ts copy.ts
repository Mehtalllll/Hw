import { IUser } from '../Types/Users.type copy';
import { GenerateClient } from './Client';
import { Urls } from './Urls';

// interface IFetchUsersListByIdResDto extends IServer {
//   Posts: IUser;
// }
type fetchUsersListByidsType = (_: Array<number>) => Promise<Array<IUser>>;
export const fetchUsersListByids: fetchUsersListByidsType = async ids => {
  const Client = GenerateClient();
  const responses = await Promise.all(
    ids.map(async id => {
      return Client.get<IUser>(Urls.Users.ById(id));
    }),
  );

  const data: IUser[] = [];
  for (const r of responses) {
    data.push(r.data);
  }

  return data;
};
