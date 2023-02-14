import { Button, Chip, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useEffect } from "react";
import { GendersType } from "../../constants/genders";
import { Nationalities, NationalitiesType } from "../../constants/nationalities";
import { IUser } from "../../models/User";
import { useRootStore } from "../../StoreContext";

export type FilterType = {
    nationality?: NationalitiesType | '';
    gender?: GendersType | '';
};

interface IFiltersBarProps {
	onClearAllFilters: () => void;
	onFilter: (filter: FilterType) => void;
}


export const FiltersBar = ({ onClearAllFilters, onFilter }: IFiltersBarProps): JSX.Element => {
    const [activetNationality, setActiveNationality] = React.useState<NationalitiesType | 'All'>('All');
    const [activeGender, setActiveGender] = React.useState<GendersType | ''>('');
    const rootClassName = 'filters-bar';
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
        // onClearAllFilters();
    }

    return (
        <div className={rootClassName}>
            <InputLabel id="nationality-select-label">Nationality</InputLabel>
            <Select
                labelId="nationality-select-label"
                id="natinality-select"
                label="Nationality"
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

            <InputLabel id="gender-chips-helper-label">Gender</InputLabel>
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
            <Button onClick={()=>handleClearAllFilters()}>Clear filters</Button>
        </div>
    )
}