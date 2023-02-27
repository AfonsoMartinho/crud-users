import { observable } from "mobx";
import { IUser } from "../models/User";
import { FormatsType } from "../stores/UsersStore";

const baseApiURL = "https://randomuser.me/api/";

export class UsersService {
    @observable currentSeed?: string;

    getUsersWithParams = async (params?: string):Promise<IUser[]> => {
        const res = await fetch(`${baseApiURL}${params || ''}`);
        const data = await res.json();
        this.currentSeed = data.info.seed
        return await data.results;
    }

    exportCurrentUsersList = (format: FormatsType): void => {
        if(!this.currentSeed) return;
        window.open(`${baseApiURL}?seed=${this.currentSeed}&format=${format}&dl`);
    }
}