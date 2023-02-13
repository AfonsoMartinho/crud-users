import { Button, Chip, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { GendersType } from "../../constants/genders";
import { Nationalities, NationalitiesType } from "../../constants/nationalities";

interface IFiltersBarProps {
	onClearFilters: () => void;
	onGenderFilter: (gender: GendersType) => void;
	onNationalityFilter: (nationality: NationalitiesType) => void;
}


export const FiltersBar = ({ onClearFilters, onGenderFilter, onNationalityFilter }: IFiltersBarProps): JSX.Element => {
    const [currentNationality, setCurrentNationality] = React.useState('All');
    const rootClassName = 'filters-bar';

    const handleChange = (e: SelectChangeEvent) => {
        setCurrentNationality(e.target.value as string);
        if(e.target.value === 'All') onClearFilters();
        else {
            onNationalityFilter(e.target.value as NationalitiesType)
        }
    };
    return (
        <div className={rootClassName}>
            <InputLabel id="natinality-select-helper-label">Nationality</InputLabel>
            <Select
                labelId="natinality-select-label"
                id="natinality-select"
                label="Nationality"
                value={currentNationality}
                onChange={handleChange}
                defaultValue="All"
            >
            <MenuItem value="All">All</MenuItem>
            {Object.keys(Nationalities).map(nationality  => (
                <MenuItem key={nationality} value={nationality}>
                    {nationality}
                </MenuItem>
            ))}
            </Select>
            <Chip label="Female" onClick={()=>onGenderFilter('female')} variant="outlined" onDelete={()=>onClearFilters()} />
            <Chip label="Male" onClick={()=>onGenderFilter('male')} variant="outlined" onDelete={()=>onClearFilters()} />
            <Button onClick={()=>onClearFilters()}>X</Button>
        </div>
    )
}