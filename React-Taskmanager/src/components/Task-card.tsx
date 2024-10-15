import { Itask } from '../types/Task';
import ShowMoreText from 'react-show-more-text';

import { TiDeleteOutline } from 'react-icons/ti';
import { IoCreateSharp } from 'react-icons/io5';
import { classNames } from '../utils/ClassNames';
import Spiner from './Spiner';
interface ItaskCardProps extends Itask {
  done: (id: number) => Promise<void>;
  remove: (id: number) => Promise<void>;
  Inprogerss: (id: number) => Promise<void>;
  Loading: boolean;
}
export const TaskCard: React.FC<ItaskCardProps> = ({
  title,
  description,
  isCompleted,
  id,
  Loading = false,
  remove,
  done,
  Inprogerss,
}) => {
  return (
    <div className="bg-white  shadow-md rounded-md py-3 px-5 space-y-2">
      <p
        className="font-bold text-slate-800 text-sm text-ellipsis tit"
        title={title}
      >
        {title}
      </p>
      <p className="font-normal text-slate-600 text-xs w-full">
        <ShowMoreText
          /* Default options */
          lines={3}
          more="Show more"
          less="Show less"
          className="content-css"
          anchorClass="show-more-less-clickable"
          onClick={() => console.log('ok')}
          expanded={false}
          width={490}
          truncatedEndingComponent={'... '}
        >
          {description}
        </ShowMoreText>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 space-x-1 pt-4">
        <button
          onClick={() => done(id)}
          disabled={Loading}
          className={classNames(
            'disabled:bg-slate-500',
            'rounded-md flex items-center justify-center',
            ' space-x-1  p-1 bg-green-600 hover:bg-green-500 text-white',
            isCompleted ? 'hidden' : '',
          )}
        >
          {Loading ? <Spiner /> : <IoCreateSharp className="w-5 h-5" />}
          <span className="font-semibold ">Complete</span>
        </button>
        <button
          onClick={() => Inprogerss(id)}
          disabled={Loading}
          className={classNames(
            'disabled:bg-slate-500',
            'rounded-md flex items-center justify-center',
            ' space-x-1  p-1 bg-orange-600 hover:bg-orange-500 text-white',
            !isCompleted ? 'hidden' : '',
          )}
        >
          {Loading ? <Spiner /> : <TiDeleteOutline className="w-5 h-5" />}
          <span className="font-semibold ">Inprogress</span>
        </button>
        <button
          onClick={() => remove(id)}
          disabled={Loading}
          className={classNames(
            'disabled:bg-slate-500 rounded-md flex items-center justify-center ',
            'space-x-1  p-1 bg-red-600 hover:bg-red-500 text-white',
          )}
        >
          {Loading ? <Spiner /> : <TiDeleteOutline className="w-5 h-5" />}
          <span className="font-semibold ">Remove</span>
        </button>
      </div>
    </div>
  );
};

export const TaskCardScleton: React.FC = () => {
  return (
    <div className="bg-white grid grid-cols-1 px-5 py-3 gap-y-2 rounded-md">
      <div className="animate-pulse h-6 w-20  bg-slate-400 rounded-md"></div>
      <div className="animate-pulse h-4 w-80 bg-slate-400 rounded-md "></div>
      <div className="animate-pulse h-4 w-60 bg-slate-400 rounded-md"></div>
      <div className="animate-pulse h-4 w-96 bg-slate-400 rounded-md"></div>
      <div className="grid grid-cols-2 gap-x-2 mt-2">
        <div className="animate-pulse h-7 w-full bg-slate-400 rounded-md"></div>
        <div className="animate-pulse h-7 w-full bg-slate-400 rounded-md"></div>
      </div>
    </div>
  );
};
