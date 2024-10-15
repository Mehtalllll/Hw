import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MainLayout: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};
