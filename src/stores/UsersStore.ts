import { observable, action, runInAction, makeAutoObservable, computed } from "mobx";
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

    @action setUsersList = (usersData:any) => {
        usersData.forEach((user:any) => {
            this.usersList.push({
                id: user.login.uuid,
                gender: user.gender,
                name: user.name,
                location: user.location,
                email: user.email,
                registered: user.registered,
                phone: user.phone,
                picture: user.picture,
                nat: user.nat,
            })
        })
    }

    @action getUser = async () => {
        const usersData = await this.usersService.getUser();

        runInAction(() => {
            this.setUsersList(usersData);
        })
    }

    @action getUsersList = async (usersLength?: number) => {
        const usersData = await this.usersService.getUsersWithParams(`?results=${usersLength || 200}`);

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