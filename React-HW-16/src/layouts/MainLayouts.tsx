import React from 'react';
import { Outlet } from 'react-router';
import { Navbar } from '../components/Navbar';

export const MainLayouts: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
