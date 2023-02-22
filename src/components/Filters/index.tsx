import React, { useEffect } from "react";
import { Chip, IconButton, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useRootStore } from "../../StoreContext";
import { GendersType } from "../../constants/genders";
import { NationalitiesType } from "../../constants/nationalities";
import { IUser } from "../../models/User";

export type FilterType = {
    nationality?: NationalitiesType | '';
    gender?: GendersType | '';
};

interface IFiltersProps {
	onFilter: (filter: FilterType) => void;
}


export const Filters = ({ onFilter }: IFiltersProps): JSX.Element => {
    const [activetNationality, setActiveNationality] = React.useState<NationalitiesType | 'All'>('All');
    const [activeGender, setActiveGender] = React.useState<GendersType | ''>('');
    const rootClassName = 'filters';
    const { usersStore } = useRootStore();

    const availableNationalities: NationalitiesType[] = Array.from(new Set(usersStore.usersList.map((user: IUser) => user.nationality)));

    const handleNationalityChange = (e: SelectChangeEvent) => {
        if( e.target.value === '') handleClearAllFilters();
        setActiveNationality(e.target.value as NationalitiesType | 'All');
    };

    const handleGenderFilter = (gender?: GendersType) => {
        setActiveGender(gender || '');
    }

    useEffect(() => {
        onFilter({
            nationality: activetNationality === 'All' ? '' : activetNationality,
            gender: activeGender
        })
    }, [activeGender,activetNationality])
    

    const handleClearAllFilters = () => {
        setActiveGender('');
        setActiveNationality('All');
    }

    return (
        <div className={rootClassName}>
            <div className={`${rootClassName}-wrapper`}>
                <div className={`${rootClassName}__gender`}>
                    <Chip 
                        label="Female" 
                        onClick={()=>handleGenderFilter('female')}
                        variant="outlined"
                        onDelete={() =>handleGenderFilter()}
                        color={activeGender === 'female' ? "secondary" : "default"} />
                    <Chip
                        label="Male"
                        onClick={()=>handleGenderFilter('male')}
                        variant="outlined"
                        onDelete={()=> handleGenderFilter()}
                        color={activeGender === 'male' ? "primary" : "default"} />
                </div>
                <div className={`${rootClassName}__nationality`}>
                    <Typography>Nationality:</ Typography>
                    <Select
                        labelId="nationality-select-label"
                        id="natinality-select"
                        label="Nationality"
                        size="small"
                        value={activetNationality}
                        onChange={handleNationalityChange}
                        defaultValue="All"
                    >
                        <MenuItem key="All" value="All">All</MenuItem>
                        {availableNationalities.map(nationality  => (
                            <MenuItem key={nationality} value={nationality}>
                                {nationality}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            <IconButton color="primary" component="label" onClick={()=>handleClearAllFilters()}>
                <input hidden />
                <CloseIcon />
            </IconButton>
            </div>
        </div>
    )
}