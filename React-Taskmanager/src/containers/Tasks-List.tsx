import React from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { Itask } from '../types/Task';
import {
  CompeleteTaask,
  getTaskslist,
  inprogressTaask,
  removeTask,
} from '../apis/Task';
import { TaskCard, TaskCardScleton } from '../components/Task-card';
import { ErrorHandler } from '../utils/ErrorHandler';

export const Taskslist: React.FC = () => {
  const [List, setList] = React.useState<Itask[]>([]);
  const [Loading, setLoading] = React.useState<boolean>(true);
  const fetchTaskList = async () => {
    setLoading(true);
    try {
      const response = await getTaskslist();
      setList(response);
      console.log(response);
    } catch (error) {
      ErrorHandler(error as AxiosError);
    }
    setLoading(false);
  };

  const remove = async (id: number) => {
    setLoading(true);

    try {
      await removeTask(id);
      setList(List.filter(el => Number(el.id) !== Number(id)));
      toast.success('Removed!');
    } catch (error) {
      ErrorHandler(error as AxiosError);
    }
    setLoading(false);
  };

  const done = async (id: number) => {
    setLoading(true);

    try {
      await CompeleteTaask(id);
      setList(List.filter(el => Number(el.id) !== Number(id)));
      setList(
        List.map(el => {
          if (Number(el.id) === Number(id)) {
            return { ...el, isCompleted: true };
          }
          return el;
        }),
      );
      toast.success('Updated');
    } catch (error) {
      ErrorHandler(error as AxiosError);
    }
    setLoading(false);
  };
  const Inprogerss = async (id: number) => {
    setLoading(true);

    try {
      await inprogressTaask(id);
      setList(List.filter(el => Number(el.id) !== Number(id)));
      setList(
        List.map(el => {
          if (Number(el.id) === Number(id)) {
            return { ...el, isCompleted: false };
          }
          return el;
        }),
      );
      toast.success('Updated');
    } catch (error) {
      ErrorHandler(error as AxiosError);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchTaskList();
  }, []);

  return (
    <div className="grid grid-cols-1 max-w-[600px] space-y-3 pt-4 mx-auto">
      <p className="font-semibold">Inprogerss Tasks list</p>
      {Loading && !List.length && (
        <>
          {[1, 2, 3].map(el => (
            <TaskCardScleton key={el} />
          ))}
        </>
      )}
      {List.filter(el => !el.isCompleted).map(el => (
        <TaskCard
          done={done}
          Inprogerss={Inprogerss}
          Loading={Loading}
          remove={remove}
          key={el.id}
          {...el}
        />
      ))}
      <p className="font-semibold pt-8">Completed Tasks list</p>
      {Loading && !List.length && (
        <>
          {[1, 2, 3].map(el => (
            <TaskCardScleton key={el} />
          ))}
        </>
      )}
      {List.filter(el => el.isCompleted).map(el => (
        <TaskCard
          Inprogerss={Inprogerss}
          done={done}
          Loading={Loading}
          remove={remove}
          key={el.id}
          {...el}
        />
      ))}
    </div>
  );
};
