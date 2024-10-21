import React from 'react';
import {
  LoaderFunctionArgs,
  Navigate,
  useLoaderData,
  useParams,
} from 'react-router';
import { fetchPostsById } from '../api/Post.api.ts';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Iposts } from '../Types/Posts.type.ts';

export const PostById: React.FC = () => {
  const { id } = useParams();
  const Loaderdata = useLoaderData();
  const validId = !isNaN(Number(id));
  console.log(Loaderdata);

  const Post = useQuery({
    queryKey: ['fetching-Posts-ById', id],
    queryFn: () => fetchPostsById(Number(id)),
    enabled: validId,
  });

  if (!validId || (Post.error as AxiosError)?.status === 404) {
    return <Navigate to={'/404u'} />;
  }

  return (
    <>
      <p>Post id:{Post.data?.id}</p>
    </>
  );
};

export const FertchPostByIdLoader = async (data: LoaderFunctionArgs) => {
  console.log('data.params.id', data.params.id);
  let post: Iposts | undefined = undefined;
  try {
    post = await fetchPostsById(Number(data.params.id));
  } catch (error) {
    console.log('error', error);
  }
  return { post };
};
