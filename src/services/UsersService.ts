import { IUser } from "../models/User";
const baseApiURL = "https://randomuser.me/api/";

export class UsersService {
    getUsers = async ():Promise<IUser[]> => {
        const res = await fetch(baseApiURL);
        const data = await res.json();
        return data.results;
    }
    getUsersWithParams = async (params?: string):Promise<IUser[]> => {
        const res = await fetch(`${baseApiURL}${params || ''}`);
        const data = await res.json();
        return data.results;
    }
}

// export const getUsers = async ():Promise<IUser[]> => {
//     const res = await fetch(baseApiURL);
//     const data = await res.json();
//     return await data.results;
// }

// export const getUsersWithParams = async (params?: string):Promise<IUser[]> => {
//     const res = await fetch(`${baseApiURL}${params || ''}`);
//     const data = await res.json();
//     return await data.results;
// }