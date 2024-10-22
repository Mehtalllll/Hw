import React from 'react';
import {
  // LoaderFunctionArgs,
  Navigate,
  Outlet,
  // useLocation,
  // useLoaderData,
  useParams,
} from 'react-router';
import { fetchPostsById } from '../api/Post.api.ts';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PostCard, PostCardSkeleton } from '../components/Post-card.tsx';
import { fetchSingleUsersByids } from '../api/users.api.ts copy.ts';
import { Link } from 'react-router-dom';

export const PostById: React.FC = () => {
  const { id } = useParams();
  const validId = !isNaN(Number(id));
  // const Location = useLocation();
  // const Loaderdata = useLoaderData();
  // console.log(Loaderdata);

  const Post = useQuery({
    queryKey: ['fetching-Posts-info', id],
    queryFn: () => fetchPostsById(Number(id)),
    enabled: validId,
  });
  const user = useQuery({
    queryKey: ['fetch-User-By-id', Post.data?.userId],
    queryFn: () => fetchSingleUsersByids(Number(Post.data?.userId)),
    enabled: Post.isSuccess,
  });

  if (
    !validId ||
    (Post.error as AxiosError)?.status === 404 ||
    (user.error as AxiosError)?.status === 404
  ) {
    return <Navigate to={'/404u'} />;
  }

  if (!user.isSuccess || !Post.isSuccess) {
    return (
      <main className="min-h-screen bg-slate-200 w-full pt-5">
        <section className=" mx-auto max-w-[500px] w-full py-10">
          <PostCardSkeleton />
        </section>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-slate-200 w-full pt-5">
      <section className=" mx-auto max-w-[500px] w-full py-10">
        <PostCard extentBody={true} Post={Post.data} user={user.data} />
        {!location?.pathname.includes('comments') && (
          <div className="w-full flex justify-center pt-2">
            <Link to={`comments`}>
              {' '}
              <button className="hover:underline text-white font-semibold bg-slate-500 rounded-md px-2 py-1 cursor-pointer text-sm ">
                Show commetns
              </button>
            </Link>
          </div>
        )}
        <div className="w-full">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

// export const FertchPostByIdLoader = async (data: LoaderFunctionArgs) => {
//   console.log('data.params.id', data.params.id);
//   let post: Iposts | undefined = undefined;
//   try {
//     post = await fetchPostsById(Number(data.params.id));
//   } catch (error) {
//     console.log('error', error);
//   }
//   return { post };
// };
