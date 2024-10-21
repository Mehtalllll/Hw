import { useQuery } from '@tanstack/react-query';
import { fetchPostsList } from '../api/Post.api.ts';
import React, { useState } from 'react';
import { PostCard, PostCardSkeleton } from '../components/Post-card.tsx';
import { fetchUsersListByids } from '../api/users.api.ts copy.ts';
import { Iposts } from '../Types/Posts.type.ts';
import { IUser } from '../Types/Users.type copy.ts';
import { ListLimit } from '../Utils/Config.ts';

interface IData {
  user: IUser;
  post: Iposts;
}
export const PostsPage: React.FC = () => {
  const [Page, setPage] = useState<number>(1);
  const [Data, setData] = useState<IData[] | undefined>();

  const Posts = useQuery({
    queryKey: ['fetching-Posts', Page],
    queryFn: () => fetchPostsList({ skip: Page * ListLimit - ListLimit }),
  });

  const Users = useQuery({
    queryKey: ['fetching-Users-By-Ids'],
    queryFn: () =>
      fetchUsersListByids(
        (Posts.data?.posts || []).map(el => Number(el.userId)),
      ),
    enabled: Posts.isSuccess,
  });

  console.log(Users.isPending);

  React.useEffect(() => {
    if (!Posts.isSuccess || !Posts.data) return;
    // console.log(Posts.data);
  }, [Posts.isSuccess, Posts.data]);

  React.useEffect(() => {
    if (!Posts.error || !Posts.isError) return;
    throw new Error('Somthing went wrong');
  }, [Posts.error, Posts.isError]);

  React.useEffect(() => {
    if (!Posts.isSuccess || !Users.isSuccess) return;
    if (!Posts.data || !Users.data) return;
    const NewData: IData[] = [];
    for (const Post of Posts.data.posts) {
      const user = Users.data.find(
        el => Number(el.id) === Number(Post.userId),
      ) as IUser;
      NewData.push({ user, post: Post });
    }
    setData(prevData => (prevData ? [...prevData, ...NewData] : NewData));
  }, [Posts.isSuccess, Users.isSuccess, Posts.data, Users.data]);

  return (
    <main className="bg-slate-200 min-h-screen w-full">
      <section className="mx-auto max-w-[600px] w-full flex flex-col gap-y-2 pt-5 p-2">
        {(Posts.isLoading || Users.isLoading) && (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        )}
        {Data &&
          Data.map((item, index) => {
            return <PostCard key={index} user={item.user} Post={item.post} />;
          })}
      </section>
    </main>
  );
};
