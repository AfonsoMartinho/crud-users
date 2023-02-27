import { observable, action, makeAutoObservable, computed } from "mobx";
import { GendersType } from "../constants/genders";
import { NationalitiesType } from "../constants/nationalities";
import { UsersService } from '../services/UsersService'
import { IUser } from "../models/User";

export interface IUsersStore {
    readonly usersService: UsersService;
}

export type FormatsType = 'csv' | 'xml';

export class UsersStore implements IUsersStore{
    @observable usersList: IUser[] = [];
    @observable usersService: UsersService;
    @observable currentServiceParameters: string;
    @observable currentSeed?: string;

    constructor(){
        this.usersService = new UsersService()
        this.currentServiceParameters = '';
        this.currentSeed = undefined;
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

    @action deleteAllUsers = async () => {
        this.usersList = [];
    }

    @action deleteUser = async (userId: string) => {
        this.setUsersList(
            this.usersList.filter((user) => {
                return user.id !== userId
            })
        );
    }

    @action exportUsersList = async (format: FormatsType) => {
        this.usersService.exportCurrentUsersList(format);
    }

    @action getUsersList = async (nationality?:NationalitiesType, gender?: GendersType, usersLength?: number, pageNumber?: number) => {
        this.currentServiceParameters = `?nat=${nationality || ''}&gender=${gender || ''}&results=${usersLength || 2}&page=${pageNumber || 1}&seed=${this.currentSeed || ''}`
        const usersData = await this.usersService.getUsersWithParams(this.currentServiceParameters);
        this.currentSeed = this.usersService.currentSeed;
        
        this.setUsersList(usersData);
    }
}