import { useQuery } from '@tanstack/react-query';
import { fetchPostsList } from '../api/Post.api.ts';
import React, { useState } from 'react';
import { PostCard, PostCardSkeleton } from '../components/Post-card.tsx';
import { fetchUsersListByids } from '../api/users.api.ts copy.ts';
import { Iposts } from '../Types/Posts.type.ts';
import { IUser } from '../Types/Users.type copy.ts';
import { ListLimit } from '../Utils/Config.ts';
import { Link, useSearchParams } from 'react-router-dom';

interface IData {
  user: IUser;
  post: Iposts;
}
export const PostsPage: React.FC = () => {
  const [Page, setPage] = useState<number>(1);
  const [Data, setData] = useState<IData[] | undefined>();
  const [SearchParams] = useSearchParams();
  console.log('tag', SearchParams.get('tag'));

  const Posts = useQuery({
    queryKey: ['fetching-Posts', Page, SearchParams.get('tag')],
    queryFn: () =>
      fetchPostsList({
        skip: Page * ListLimit - ListLimit,
        tag: SearchParams.get('tag'),
      }),
    // refetchOnWindowFocus: false,
  });

  const Users = useQuery({
    queryKey: [
      'fetching-Users-By-Ids',
      (Posts.data?.posts || []).map(el => String(el.userId)).join(' '),
    ],
    queryFn: () =>
      fetchUsersListByids(
        (Posts.data?.posts || []).map(el => Number(el.userId)),
      ),
    enabled: Posts.isSuccess,
    refetchOnWindowFocus: false,
  });

  // console.log(Users.isPending);

  React.useEffect(() => {
    setPage(1);
    setData([]);
  }, [SearchParams]);

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
        {Data &&
          Data.map((item, index) => {
            return (
              <Link key={index} to={`/post-Info/${item.post.id}`}>
                <PostCard user={item.user} Post={item.post} />
              </Link>
            );
          })}
        {(Posts.isLoading || Users.isLoading) && (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        )}
        {Posts.data?.total}
        <div className="flex justify-center">
          <button
            disabled={(Data?.length || 0) >= (Posts.data?.total || 0)}
            className="hover:underline text-white font-semibold bg-slate-500 rounded-md px-2 py-1 cursor-pointer text-sm "
            onClick={() => setPage(prevPage => prevPage + 1)}
          >
            Load More...
          </button>
        </div>
      </section>
    </main>
  );
};
