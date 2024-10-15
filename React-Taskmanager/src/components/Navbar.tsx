import React from 'react';
import { delSession } from '../apis/Session-management';
import { toast } from 'react-toastify';
import { IUser } from '../types/users';
import { ErrorHandler } from '../utils/ErrorHandler';
import { AxiosError } from 'axios';
import { getUerInfo } from '../apis/User';

export const Navbar: React.FC = () => {
  const [info, Setinfo] = React.useState<IUser>();
  const FetchUserInfo = async () => {
    try {
      const response = await getUerInfo();
      Setinfo(response);
    } catch (error) {
      ErrorHandler(error as AxiosError);
    }
  };
  const Logout = () => {
    delSession();
    toast.success('Logouted');
    setTimeout(() => {
      window.location.href = 'test1';
    }, 1000);
  };

  React.useEffect(() => {
    FetchUserInfo();
  }, []);

  return (
    <nav className="w-full h-10 bg-slate-600 flex justify-between items-center  px-5 fixed">
      {!info ? (
        <div className="w-28 h-7 rounded-md animate-pulse bg-slate-300"></div>
      ) : (
        <p className="bg-slate-300 rounded-md font-semibold py-1 px-2 text-sm">
          {info.username}
        </p>
      )}
      <div className="flex flex-row gap-x-3">
        <a
          href="/New"
          className="bg-slate-300 rounded-md font-semibold py-1 px-2 text-sm hover:bg-slate-400 shadow-lg"
        >
          New
        </a>
        <button
          onClick={Logout}
          className="bg-slate-300 rounded-md font-semibold py-1 px-2 text-sm hover:bg-slate-400 shadow-lg"
        >
          Logout
        </button>
      </div>
      {/* <a href="/test1">test1</a>
      <a href="/test2">test2</a>
      <a href="/test3">test3</a> */}
    </nav>
  );
};
