export interface Itask {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}
export interface ICreateTaskReq {
  title: string;
  description: string;
}
