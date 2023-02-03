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
    @observable currentServiceParameters: string;

    constructor(){
        this.usersService = new UsersService()
        this.currentServiceParameters = '';
        makeAutoObservable(this);
    }

    @action setUsersList = (usersData:any) => {
        usersData.forEach((user:any) => {
            this.usersList.push({
                id: user.login.uuid,
                gender: user.gender,
                name: user.name,
                age: user.dob.age,
                location: user.location,
                email: user.email,
                registered: user.registered,
                phone: user.phone,
                picture: user.picture,
                nationality: user.nat,
            })
        })
    }

    @action getUser = async () => {
        const usersData = await this.usersService.getUser();

        runInAction(() => {
            this.setUsersList(usersData);
        })
    }

    @action deleteAllUsers = async () => {
        this.usersList = [];
    }

    @action getUsersList = async (nationality?:NationalitiesType, gender?: GendersType, usersLength?: number) => {
        this.currentServiceParameters = `?nat=${nationality || ''}&gender=${gender || ''}&results=${usersLength || 12}`
        const usersData = await this.usersService.getUsersWithParams(this.currentServiceParameters);

        runInAction(() => {
            this.setUsersList(usersData);
        })
    }
}