import { ReactNode } from 'react';
import { Navbar } from '../Components/Navbar';

export const PageLayout: React.FC<{
  children: ReactNode | JSX.Element | JSX.Element[];
}> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
