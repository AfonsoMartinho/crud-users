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
    @observable currentSeed?: string;

    constructor(){
        this.usersService = new UsersService()
        this.currentSeed = undefined;
        makeAutoObservable(this);
    }

    @action setUsersList = (usersData:any) => {
        this.usersList = usersData.map((user:any) => {
            return {
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
            }
        })
    }

    @action addMoreUsersToList = (usersData:any) => {
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

    @action getUsersList = async (nationality?:NationalitiesType, gender?: GendersType, pageNumber?: number) => {
        const resultsNumber = 12;
        const currentServiceParameters = `?nat=${nationality || ''}&gender=${gender || ''}&results=${resultsNumber}&page=${pageNumber || 1}`
        const usersData = await this.usersService.getUsersWithParams(currentServiceParameters);
        this.currentSeed = this.usersService.currentSeed;
        
        if(pageNumber === 1) this.setUsersList(usersData);
        else this.addMoreUsersToList(usersData);
    }
}