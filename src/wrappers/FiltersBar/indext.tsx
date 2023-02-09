import { Label } from "@mui/icons-material";
import { Button, Chip, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { GendersType } from "../../constants/genders";
import { Nationalities, NationalitiesType } from "../../constants/nationalities";

interface IFiltersBarProps {
	onClearFilters: () => void;
	onGenderFilter: (gender: GendersType) => void;
	onNationalityFilter: (nationality: NationalitiesType) => void;
}


export const FiltersBar = ({ onClearFilters, onGenderFilter, onNationalityFilter }: IFiltersBarProps): JSX.Element => {
    const [currentNationality, setCurrentNationality] = React.useState('');
    const rootClassName = 'filters-bar';
    return (
        <div className={rootClassName}>
            <InputLabel id="demo-simple-select-label">Natinality</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Nationality"
                value={currentNationality}
                onChange={(e)=>onNationalityFilter(e.target.value as NationalitiesType)}
            >
                <MenuItem value="AU">AU</MenuItem>
                <MenuItem value="BR">BR</MenuItem>
                <MenuItem value="GB">GB</MenuItem>
            </Select>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Chip label="Female" onClick={()=>onGenderFilter('female')} variant="outlined" onDelete={()=>onClearFilters()} />
            <Chip label="Male" onClick={()=>onGenderFilter('male')} variant="outlined" onDelete={()=>onClearFilters()} />
            <Button onClick={()=>onClearFilters()}>X</Button>
        </div>
    )
}