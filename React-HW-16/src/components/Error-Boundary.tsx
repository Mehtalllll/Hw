import React from 'react';
import { useRouteError } from 'react-router';
import { NotFound } from '../pages/Not-found';
export const ErrorBounadry: React.FC = () => {
  const error = useRouteError();

  if (error && (error as any).status === 404) {
    return <NotFound />;
  }
  return (
    <>
      <p>somthing went wrong</p>
      <p>{(error as Error).message}</p>
    </>
  );
};
