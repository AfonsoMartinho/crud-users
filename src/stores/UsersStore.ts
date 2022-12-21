import { observable, action, runInAction, makeAutoObservable } from "mobx";
import { GendersType } from "../constants/genders";
import { NationalitiesType } from "../constants/nationalities";
import { UsersService } from '../services/UsersService'
import { IUser } from "../models/User";

export interface IUsersStore {
    readonly usersService: UsersService;

}

export class UsersStore implements IUsersStore{
    @observable usersList: IUser[] = [];
    @observable usersService: UsersService;

    constructor(){
        this.usersService = new UsersService()
        makeAutoObservable(this);
    }

    @action setUsersList = (usersData: IUser[]) => {
        this.usersList = usersData;
    }

    @action getUser = async () => {
        const usersData = await this.usersService.getUser();

        runInAction(() => {
            this.setUsersList(usersData);
        })
    }

    @action getUsersList = async (usersLength?: number) => {
        const usersData = await this.usersService.getUsersWithParams(`?results=${usersLength || 20}`);

        runInAction(() => {
            this.setUsersList(usersData);
        })
    }

    @action getUsersByNationality = async (nationality: NationalitiesType) => {
        const usersData = await this.usersService.getUsersWithParams(`?nat=${nationality}`);
        runInAction(() => {
            this.setUsersList(usersData);
        })
    };

    @action getUsersByGender = async (gender: GendersType) => {
        const usersData = await this.usersService.getUsersWithParams(`?gender=${gender}`)
        runInAction(() => {
            this.setUsersList(usersData) 
        })
    };

    @action getUsersWithpagination = async (page: number, resultsPerPage?: number) => {
        const usersdata = await this.usersService.getUsersWithParams(`?page=${page}&results=${resultsPerPage || 10}`)
        runInAction(()=> {
            this.setUsersList(usersdata);
        })
    };
}