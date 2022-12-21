import { NationalitiesType } from "../constants/nationalities"
import { ILocation, IName, IPicture } from "../interfaces/common"

export interface IUser {
    uuid: string,
    gender: string,
    name: IName
    location: ILocation,
    email: string,
    registered: {
        date: Date,
        age: number
    },
    phone: string,
    picture: IPicture,
    nat: NationalitiesType
}