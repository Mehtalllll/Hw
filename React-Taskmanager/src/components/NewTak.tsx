import * as React from 'react';
import { AxiosError } from 'axios';

import { Input } from './Inputs';
import { classNames } from '../utils/ClassNames';
import { ICreateTaskReq } from '../types/Task';
import { addTask } from '../apis/Task';
import { toast } from 'react-toastify';

export const NewTaskForm: React.FC = () => {
  const [Loading, setLoading] = React.useState<boolean>(false);
  const [Values, setValues] = React.useState<ICreateTaskReq>({
    title: '',
    description: '',
  });
  const [Error, setError] = React.useState<ICreateTaskReq>({
    title: '',
    description: '',
  });
  const [serverError, setserverError] = React.useState<string>('');

  const OnSubmitHandler: React.FormEventHandler<HTMLFormElement> = async e => {
    setLoading(true);
    e.preventDefault();
    try {
      await addTask(Values);
      toast.success('Created');
      setTimeout(() => {
        window.location.href = '/Tasks';
      }, 1000);
    } catch (error: unknown) {
      const err = error as AxiosError;
      console.log(err.response?.data);
      const response = err.response?.data as { message: Array<string> };
      if (Array.isArray(response?.message)) {
        const NewError: ICreateTaskReq = {
          title: '',
          description: '',
        };
        for (const msg of response.message) {
          if (msg.includes('title')) {
            NewError.title = msg;
          } else if (msg.includes('description')) {
            NewError.description = msg;
          } else setserverError(msg);
        }
        setError(NewError);
      } else if (typeof response?.message === 'string') {
        setserverError(response.message);
      }
    }
  };
  const OnValueChange = (field: keyof ICreateTaskReq, value: string) => {
    const NewValues = { ...Values };
    NewValues[field] = value;
    setValues(NewValues);
    console.log(Values);
    const NewErrors = { ...Error };
    NewErrors[field] = '';
    setError(NewErrors);
  };

  return (
    <form onSubmit={OnSubmitHandler} className="">
      <Input
        onChange={e => OnValueChange('title', e.target.value)}
        label="title"
        placeholder="title"
        value={Values.title}
        Error={Error.title}
      />
      <Input
        onChange={e => OnValueChange('description', e.target.value)}
        label="description"
        placeholder="description"
        type="description"
        value={Values.description}
        Error={Error.description}
      />
      <button
        disabled={Loading}
        className={classNames(
          'bg-slate-800 text-white font-semibold p-1',
          ' rounded-sm w-full mt-2 hover:bg-slate-700',
          'disabled:bg-slate-500',
        )}
      >
        Login
      </button>
      <p
        className={classNames(
          'font-normal pl-1 text-xs text-red-500',
          serverError ? 'block' : 'hidden',
        )}
      >
        {serverError}
      </p>
    </form>
  );
};
