import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const onclickHandler = () => {
    navigate('/');
  };
  return (
    <div className="bg-slate-500 w-full h-16 flex flex-row justify-end px-4 gap-x-3 items-center">
      <Link to={'/'}>
        <button
          onClick={onclickHandler}
          className="w-fit h-fit bg-slate-700 text-white  border-2 rounded-md py-1 px-3 font-semibold text-lg "
        >
          Home
        </button>
      </Link>
      <Link to={'Users'}>
        <button className="w-fit h-fit bg-slate-700 text-white  border-2 rounded-md py-1 px-3 font-semibold text-lg ">
          User
        </button>
      </Link>
      <Link to={'Posts'}>
        <button className="w-fit h-fit bg-slate-700 text-white  border-2 rounded-md py-1 px-3 font-semibold text-lg ">
          Posts
        </button>
      </Link>
    </div>
  );
};
