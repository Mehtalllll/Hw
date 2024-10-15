import { ICreateTaskReq, Itask } from '../types/Task';
import { Urls } from '../utils/urls';
import { generateClient } from './client';

type getTasklistType = () => Promise<Itask[]>;
export const getTaskslist: getTasklistType = async () => {
  console.log(Urls.Task.list);

  const client = generateClient();
  const response = await client.get(Urls.Task.list);
  return response.data;
};

type removeByIdType = (_: number) => Promise<void>;
export const removeTask: removeByIdType = async id => {
  console.log(Urls.Task.list);

  const client = generateClient();
  const response = await client.delete(Urls.Task.removeById(id));
  return response.data;
};

type CompeleteTaskType = (id: number) => Promise<void>;
export const CompeleteTaask: CompeleteTaskType = async id => {
  console.log(Urls.Task.list);

  const client = generateClient();
  const response = await client.patch(Urls.Task.done(id));
  return response.data;
};

type InprogressTaskType = (id: number) => Promise<void>;
export const inprogressTaask: InprogressTaskType = async id => {
  console.log(Urls.Task.list);

  const client = generateClient();
  const response = await client.patch(Urls.Task.inprogress(id));
  return response.data;
};
type addTaskType = (_: ICreateTaskReq) => Promise<void>;
export const addTask: addTaskType = async body => {
  const client = generateClient();
  const response = await client.post(Urls.Task.Create, body);
  return response.data;
};
