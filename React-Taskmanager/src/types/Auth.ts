import { IUser } from "./users";

export interface IAuthDto{
    username:string;
    password:string;
}

export interface IloginResDto{
    user:IUser;
    token:string;
}