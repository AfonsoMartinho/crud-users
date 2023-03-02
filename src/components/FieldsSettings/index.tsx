import React from "react";
import { Button, Switch } from "@mui/material";
import { ExcludableFields } from "../../constants/excludableFields";

export type ExcludableUserFields = keyof ExcludableUserSwitches

type ExcludableUserSwitches = {
    gender: boolean,
    dob: boolean,
    location: boolean,
    email: boolean,
    registered: boolean,
    phone: boolean,
    picture: boolean,
    nat: boolean
}

interface IFieldsSettingProps {
	onFieldsChange: (fields?: ExcludableUserFields[]) => void;
}


export const FieldsSettings = ({ onFieldsChange }: IFieldsSettingProps): JSX.Element => {
    const rootClassName = 'fields-settings'
    const [availableFields, setAvailableFields] = React.useState<ExcludableUserSwitches>({
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
        const fieldsToExclude:ExcludableUserFields[] = [];
        for (const key in availableFields) {
            if(!availableFields[key as ExcludableUserFields]) fieldsToExclude.push(key as ExcludableUserFields);
        } 
        onFieldsChange(fieldsToExclude)
    }, [availableFields])

    const passAllFieldsToTrue = () => {
        setAvailableFields(
            Object.fromEntries(
                Object.keys(availableFields).map(key => [key, true])
            ) as ExcludableUserSwitches
        )
    }
    

    return (
        <div className={rootClassName}>
            <h2>Choose wich users fields to show</h2>
            <div className={`${rootClassName}__list`}>
                <Button onClick={()=>passAllFieldsToTrue()}>Select All</Button>
                { Object.keys(availableFields).map((field) => (
                    <div className={`${rootClassName}__list-item`} key={field}>
                        <h5>{ExcludableFields[field as ExcludableUserFields]}</h5>
                        <Switch
                            checked={availableFields[field as ExcludableUserFields]}
                            onChange={(e)=>{setAvailableFields({...availableFields, [field]: e.target.checked})}}
                            value={field} />
                    </div>
                    ))
                }
            </div>
        </div>
    )
}