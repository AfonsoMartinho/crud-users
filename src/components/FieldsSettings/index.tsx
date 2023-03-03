import React, { useEffect, useState } from "react";
import { Button, Divider, List, ListItem, ListItemText, Switch, Typography } from "@mui/material";
import { ExcludableFields } from "../../constants/excludableFields";
import { UsersStore } from "../../stores/UsersStore";
import { useRootStore } from "../../StoreContext";

export type ExcludableUserFields = keyof ExcludableUserSwitches

export type ExcludableUserSwitches = {
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
	onFieldsChange: (fields: ExcludableUserFields[] | []) => void;
}


export const FieldsSettings = ({ onFieldsChange }: IFieldsSettingProps): JSX.Element => {
    const rootClassName = 'fields-settings'
    const { usersStore } = useRootStore();
    const [isAllChecked, setIsAllChecked] = useState<boolean>(true)
    const [availableFields, setAvailableFields] = useState<ExcludableUserSwitches>({
        gender: true,
        dob: true,
        location: true,
        email: true,
        registered: true,
        phone: true,
        picture: true,
        nat: true
    })

    const handleSettingsChanges = () => {
        const fieldsToExclude:ExcludableUserFields[] = [];
        for (const key in availableFields) {
            if(!availableFields[key as ExcludableUserFields]) fieldsToExclude.push(key as ExcludableUserFields);
        } 
        onFieldsChange(fieldsToExclude)
    }

    const changeAllFilters = (filtersValue: boolean) => {
        setAvailableFields(
            Object.fromEntries(
                Object.keys(availableFields).map(key => [key, filtersValue])
            ) as ExcludableUserSwitches
        )
        setIsAllChecked(filtersValue);
    }

    const setFieldsFromStore = () => {
        const parsedPreviousExcludedFields:ExcludableUserSwitches = availableFields;
        if (!usersStore.previousExcludedFields) return;
        
        usersStore.previousExcludedFields.forEach(field => {
                parsedPreviousExcludedFields[field] = false;
        }) 

        console.log('Setting')
        
        setAvailableFields(parsedPreviousExcludedFields)
    }

    useEffect(() => {
      setFieldsFromStore()
    },[])
    
    
    useEffect(() => {
        const activeFields: ExcludableUserFields[] = []

        Object.keys(availableFields).forEach(key => {
            if(availableFields[key as ExcludableUserFields] === true) activeFields.push(key as ExcludableUserFields)
        })

        if(activeFields.length === Object.keys(availableFields).length) setIsAllChecked(true);
        else setIsAllChecked(false);
        
    }, [availableFields])
    

    return (
        <div className={rootClassName}>
            <Typography variant="h5" className={`${rootClassName}__title`}>User Fields to show</Typography>
            <List className={`${rootClassName}__list`}>
                <ListItem className={`${rootClassName}__list-all`}>
                    <Typography >Select All</Typography>
                    <Switch
                        color="default"
                        checked={isAllChecked}
                        onChange={(e)=>changeAllFilters(e.target.checked)}
                        value="all" />
                </ListItem>
                <Divider />
                { Object.keys(availableFields).map((field) => (
                    <ListItem key={field}>
                        <ListItemText primary={ExcludableFields[field as ExcludableUserFields]} />
                        <Switch
                            color="default"
                            checked={availableFields[field as ExcludableUserFields]}
                            onChange={(e)=>{setAvailableFields({...availableFields, [field]: e.target.checked})}}
                            value={field} />
                    </ListItem>
                    ))
                }
                <Divider />
                <ListItem className={`${rootClassName}__list-all`}>
                    <Button variant="outlined" onClick={()=> handleSettingsChanges()}>Apply Changes</Button>
                </ListItem>
            </List>
        </div>
    )
}