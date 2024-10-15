import React from 'react';
import { Navbar } from '../components/Navbar';

export const Dashboard: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="pt-10">{children}</div>
    </>
  );
};
