import { generateClient } from "./client";
import { Urls } from "../utils/urls";
import { IAuthDto, IloginResDto } from "../types/Auth";


type LoginType = (_: IAuthDto) => Promise<IloginResDto>;
export const Login: LoginType = async (body) => {
    const client = generateClient();
    const response = await client.post(Urls.auth.Login, body);
    return response.data
};
type SignupType = (_: IAuthDto) => Promise<IloginResDto>;
export const Signup: SignupType = async (body) => {
    const client = generateClient();
    const response = await client.post(Urls.auth.Signup, body);
    return response.data
};


