import { useState } from 'react';
import { Iposts } from '../Types/Posts.type';
import { IUser } from '../Types/Users.type copy';

import { AiOutlineLike } from 'react-icons/ai';
import { AiOutlineDislike } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa';
import { stringToColour, StringTotextColor } from '../Utils/StringToColer';
import { ClassNames } from '../Utils/Classnames';

interface IPostCardProps {
  user: IUser;
  Post: Iposts;
}
export const PostCard: React.FC<IPostCardProps> = ({ user, Post }) => {
  const [like, setlike] = useState<boolean>(false);
  const [dislike, setdislike] = useState<boolean>(false);
  const OnclicklikeHandler = () => {
    setlike(!like);
  };
  const OnclickdislikeHandler = () => {
    setdislike(!dislike);
  };
  return (
    <div className="shadow-md w-full px-4 py-3 max-w-[600px] h-fit bg-white rounded-lg text-justify">
      <div className="flex flex-row items-center gap-x-3 ">
        <img
          className="w-12 h-12 rounded-full border-2 border-slate-500"
          src={user.image}
          alt={user.username}
        />
        <div className="overflow-hidden pb-1">
          <p className="truncate capitalize font-bold text-lg text-slate-800 ">
            {user.username}
          </p>
          <p className=" font-semibold text-xs text-slate-600 truncate ">
            {user.email}
          </p>
        </div>
      </div>
      <p className="truncate text-lg capitalize font-semibold text-slate-800 pt-3 pb-1">
        {Post.title}
      </p>
      <p className="text-justify line-clamp-1 text-sm font-medium text-slate-600">
        {Post.body.slice(0, 100)}
      </p>
      <div className="flex gap-x-2 pt-3">
        {Post.tags.map((el, i) => {
          const ColorHash = stringToColour(el);
          return (
            <p
              key={i}
              style={{
                backgroundColor: ColorHash,
                color: StringTotextColor(ColorHash),
              }}
              className={ClassNames(
                'rounded-md p-1 text-xs w-fit border border-slate-300 font-semibold',
              )}
            >
              #{el}
            </p>
          );
        })}
      </div>

      <div className="pt-4 flex flex-row gap-x-3 text-xs font-semibold">
        <div className="flex flex-row items-center gap-x-2">
          <AiOutlineLike
            onClick={OnclicklikeHandler}
            className={
              like
                ? 'w-5 h-5 text-red-500 cursor-pointer'
                : 'w-5 h-5 text-gray-500 cursor-pointer'
            }
          />
          <p>{Post.reactions.likes}</p>
        </div>
        <div className="flex flex-row items-center gap-x-2 pt-1">
          <AiOutlineDislike
            onClick={OnclickdislikeHandler}
            className={
              dislike
                ? 'w-5 h-5 text-red-500 cursor-pointer'
                : 'w-5 h-5 text-gray-500 cursor-pointer'
            }
          />
          <p>{Post.reactions.dislikes}</p>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <FaRegEye className="w-5 h-5 text-gray-500" />
          <p>{Post.views}</p>
        </div>
      </div>
    </div>
  );
};

export const PostCardSkeleton: React.FC = () => {
  return (
    <div className="max-w-[600px] h-fit rounded-lg px-4 py-3 bg-white shadow-md">
      <div className="flex flex-row gap-x-2">
        <div className="w-12 h-12 bg-gray-300 animate-pulse rounded-full"></div>
        <div className="flex flex-col gap-y-2 py-1">
          <div className="w-20 h-5 bg-gray-300 animate-pulse rounded-lg"></div>
          <div className="w-32 h-3 bg-gray-300 animate-pulse rounded-lg"></div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="mt-3 w-32 h-5 bg-gray-300 animate-pulse rounded-lg"></div>
        <div className=" w-60 h-3 bg-gray-300 animate-pulse rounded-lg"></div>
        <div className=" w-72 h-3 bg-gray-300 animate-pulse rounded-lg"></div>
        <div className=" w-52 h-3 bg-gray-300 animate-pulse rounded-lg"></div>
      </div>
      <div className="pt-4 flex flex-row gap-x-3 text-xs font-semibold">
        <div className="flex flex-row items-center gap-x-2">
          <AiOutlineLike className={'w-5 h-5 text-gray-500 cursor-pointer'} />
          <p className="w-8 h-4 bg-gray-300 animate-pulse rounded-lg "></p>
        </div>
        <div className="flex flex-row items-center gap-x-2 pt-1">
          <AiOutlineDislike
            className={'w-5 h-5 text-gray-500 cursor-pointer'}
          />
          <p className="w-8 h-4 bg-gray-300 animate-pulse rounded-lg pb-1"></p>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <FaRegEye className="w-5 h-5 text-gray-500" />
          <p className="w-8 h-4 bg-gray-300 animate-pulse rounded-lg "></p>
        </div>
      </div>
    </div>
  );
};
