import React from "react";
import { Button, List, ListItem, ListItemText, Switch, Typography } from "@mui/material";
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
            <Typography className={`${rootClassName}__title`} fontSize={16} fontWeight="500" textAlign="center">User Fields to show</Typography>
            <List className={`${rootClassName}__list`}>
                <ListItem>
                    <Button onClick={()=>passAllFieldsToTrue()}>Select All</Button>
                </ListItem>
                { Object.keys(availableFields).map((field) => (
                    <ListItem key={field}>
                        <ListItemText primary={ExcludableFields[field as ExcludableUserFields]} />
                        <Switch
                            checked={availableFields[field as ExcludableUserFields]}
                            onChange={(e)=>{setAvailableFields({...availableFields, [field]: e.target.checked})}}
                            value={field} />
                    </ListItem>
                    ))
                }
            </List>
        </div>
    )
}