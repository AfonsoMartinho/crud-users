export interface IName {
    title: string,
    first: string,
    last: string
}

export interface IStreet {
    number: number,
    name: string,
}

export interface ITimezone {
    offset: number,
    description: string
}

export interface ILocation{
    street: IStreet
    city: string,
    state: string,
    country: string,
    postcode: number,
    coordinates: {
        latitude: number,
        longitude: number
    },
    timezone: ITimezone
}

export interface IPicture {
    large: string,
    medium: string,
    thumbnail: string
}