import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { fetchPostsComments } from '../api/comments.api';
import { ListLimit } from '../Utils/Config';

export const PostComments: React.FC = () => {
  const { id } = useParams();
  const [page, setPage] = useState<number>(1);

  const comments = useQuery({
    queryKey: ['Postcomments', id, page],
    queryFn: () =>
      fetchPostsComments({
        Postid: Number(id),
        skip: (page - 1) * ListLimit,
      }),
    enabled: !!id,
  });

  if (comments.isLoading) {
    return <p>Loading comments...</p>;
  }

  if (comments.isError) {
    return <p>Error loading comments: {comments.error.message}</p>;
  }

  return (
    <section>
      <p>Comments for post {id}</p>
      {comments.data?.comments.map(el => (
        <p key={el.id}>{el.body}</p>
      ))}
      {comments.data && comments.data.comments.length > 0 && (
        <button
          disabled={
            (comments.data.comments.length || 0) >= (comments.data.total || 0)
          }
          className="hover:underline text-white font-semibold bg-slate-500 rounded-md px-2 py-1 cursor-pointer text-sm "
          onClick={() => setPage(prevPage => prevPage + 1)}
        >
          Load More...
        </button>
      )}
    </section>
  );
};
