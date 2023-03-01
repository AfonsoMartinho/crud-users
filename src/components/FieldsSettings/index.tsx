import React, { useState } from "react";
import { Button, Switch } from "@mui/material";
import { NationalitiesType } from "../../constants/nationalities";
import { ILocation, IPicture } from "../../interfaces/common";
import { Label } from "@mui/icons-material";

export type FilterableUserFields = keyof {
    gender: string,
    dob: number,
    location: ILocation,
    email: string,
    registered: {
        date: Date,
        age: number
    },
    phone: string,
    picture: IPicture,
    nat: NationalitiesType,
}


interface IFieldsSettingProps {
	onFieldsChange: (fields?: FilterableUserFields[]) => void;
}


export const FieldsSettings = ({ onFieldsChange }: IFieldsSettingProps): JSX.Element => {
    const rootClassName = 'fields-settings'
    const excludedFields: FilterableUserFields[] = [ 'gender', 'dob', 'location', 'email', 'registered', 'phone', 'picture', 'nat'];
    type mySwitches = {
        gender: boolean,
        dob: boolean,
        location: boolean,
        email: boolean,
        registered: boolean,
        phone: boolean,
        picture: boolean,
        nat: boolean
    }
    const [availableFields, setAvailableFields] = React.useState({
        gender: true,
        dob: true,
        location: true,
        email: true,
        registered: true,
        phone: true,
        picture: true,
        nat: true
    })

    React.useEffect(() => {
        const fieldsToExclude:FilterableUserFields[] = [];
        for (const key in availableFields) {
            if(!availableFields[key as FilterableUserFields]) fieldsToExclude.push(key as FilterableUserFields);
        } 
        onFieldsChange(fieldsToExclude)
    }, [availableFields])

    const passAllFieldsToTrue = () => {
        const myObject: mySwitches = Object.fromEntries(
            Object.keys(availableFields).map(key => [key, true])
        ) as mySwitches;
        setAvailableFields(myObject)
    }
    

    return (
        <div className={rootClassName}>
            <h2>Choose wich users fields to show</h2>
            <div className={`${rootClassName}__list`}>
                <Button onClick={()=>passAllFieldsToTrue()}>Select All</Button>
                { excludedFields.map((field)=> { return (
                    <div className={`${rootClassName}__list-item`} key={field}>
                        <h5>{field}</h5>
                        <Switch
                            checked={availableFields[field]}
                            onChange={
                                (e)=>{
                                    setAvailableFields({...availableFields, [field]: e.target.checked})
                                    console.log(field);
                                }
                            }
                            value={field} />
                    </div>
                    )})
                }
            </div>
        </div>
    )
}