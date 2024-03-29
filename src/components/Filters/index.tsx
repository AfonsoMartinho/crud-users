import React, { useEffect } from "react";
import classNames from "classnames";
import { Button, Chip, IconButton, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { GendersType } from "../../constants/genders";
import { Nationalities, NationalitiesType } from "../../constants/nationalities";

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
    const [openMobileMenu, setOpenMobileMenu] = React.useState<boolean>(false);
    const rootClassName = 'filters';

    const availableNationalities: NationalitiesType[] = Object.values(Nationalities);;

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
    }, [activeGender, activetNationality])
    

    const handleClearAllFilters = () => {
        setActiveGender('');
        setActiveNationality('All');
    }

    return (
        <div className={rootClassName}>
            <div className={`${rootClassName}__mobile-toggle hide-desktop`}>
                <IconButton color="primary" onClick={()=>setOpenMobileMenu(!openMobileMenu)} >
                    <MenuIcon />
                </IconButton>
            </div>
            <div className={classNames(`${rootClassName}-wrapper`, {'open-mobile': openMobileMenu})} >
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
                        className={`${rootClassName}__nationality-select`}
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
                <Button className={`${rootClassName}__clear-button`} size="small" variant="outlined" color="warning" component="label" onClick={()=>handleClearAllFilters()}>
                    <input hidden />
                    Clear Filters
                </Button>
            </div>
        </div>
    )
}