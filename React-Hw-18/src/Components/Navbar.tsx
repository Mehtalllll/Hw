import { LuBaggageClaim } from 'react-icons/lu';
import { IoIosArrowDown } from 'react-icons/io';
import { RiSearch2Line } from 'react-icons/ri';
import { RootState } from '../Redux/Store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const numberOfProduct = useSelector((state: RootState) => {
    return state.cart.products.length;
  });

  return (
    <div className="fixed flex flex-row gap-x-6 bg-slate-600 w-full items-center justify-start pr-4 h-20">
      <button className="font-semibold w-full max-w-[140px] md:max-w-[300px] pl-2 text-slate-100 text-lg md:text-2xl  animate-bounce hover:underline">
        <Link to={'/'}>Shopping Cart</Link>
      </button>
      <div className="inline-flex items-center w-full max-w-[1000px] bg-slate-300 ">
        <input
          type="search"
          className="w-full  px-2 placeholder:text-lg  bg-slate-300 h-12"
          placeholder="Search..."
        />
        <RiSearch2Line className="mx-2 w-8 h-8 hover:opacity-65 cursor-pointer" />
      </div>
      <Link to={'cart'}>
        <button className="bg-green-500 w-full max-w-36 h-12 hover:underline px-2 flex justify-center hover:bg-green-400  items-center ">
          <LuBaggageClaim className="m-1 w-6 h-6 text-slate-900" />
          <p className="font-semibold text-lg text-slate-900 ">
            {numberOfProduct}
          </p>
          <IoIosArrowDown className="ml-4" />
        </button>
      </Link>
    </div>
  );
};
