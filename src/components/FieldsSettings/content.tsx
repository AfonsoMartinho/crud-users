import React, { useEffect, useState } from "react";
import { Button, Divider, IconButton, List, ListItem, ListItemText, Switch, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useRootStore } from "../../StoreContext";
import { ExcludableFields } from "../../constants/excludableFields";


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

interface IFieldsSettingsContentProps {
	onFieldsChange: (fields: ExcludableUserFields[] | []) => void;
    onCloseDrawer?: () => void;
}


export const FieldsSettingsContent = ({ onFieldsChange, onCloseDrawer }: IFieldsSettingsContentProps): JSX.Element => {
    const rootClassName = 'fields-settings-content'
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
            <div className={`${rootClassName}__header`}>
                <Typography variant="h5" className={`${rootClassName}__header-title`}> User fields to show</Typography>
                { onCloseDrawer && (
                    <IconButton onClick={()=>onCloseDrawer()}  className={`${rootClassName}__header-close-btn`}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                )}
            </div>
            <List className={`${rootClassName}__list`}>
                <ListItem className={`${rootClassName}__list-all`}>
                    <Typography variant="h6">Select All</Typography>
                    <Switch
                        checked={isAllChecked}
                        onChange={(e)=>changeAllFilters(e.target.checked)}
                        value="all" />
                </ListItem>
                <Divider />
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
                <Divider />
                <ListItem className={`${rootClassName}__save-btn`}>
                    <Button variant="contained"  onClick={()=> handleSettingsChanges()}>Apply Changes</Button>
                </ListItem>
            </List>
        </div>
    )
}