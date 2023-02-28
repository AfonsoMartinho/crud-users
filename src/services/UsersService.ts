import { observable } from "mobx";
import { GendersType } from "../constants/genders";
import { NationalitiesType } from "../constants/nationalities";
import { IUser } from "../models/User";
import { FormatsType } from "../stores/UsersStore";

const baseApiURL = "https://randomuser.me/api/";

export type AvailableParams = {
    nationality?: NationalitiesType,
    gender?: GendersType,
    results?: number,
    pageNumber?: number
}

export class UsersService {
    @observable currentSeed?: string;
    @observable currentQueryParameters?: string;

    getUsersWithParams = async (params: AvailableParams):Promise<IUser[]> => {
        const { nationality, gender, results, pageNumber } = params;
        const queryParameters = `?nat=${nationality || ''}&gender=${gender || ''}&results=${results || 12}&page=${pageNumber || 1}`

        const res = await fetch(`${baseApiURL}${queryParameters}`);
        const data = await res.json();

        this.currentSeed = data.info.seed
        this.currentQueryParameters = queryParameters;

        return await data.results;
    }

    exportCurrentUsersList = (format: FormatsType): void => {
        if(!this.currentSeed) return;
        window.open(`${baseApiURL}${this.currentQueryParameters || ''}?seed=${this.currentSeed}&format=${format}&dl`);
    }
}