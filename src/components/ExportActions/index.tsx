import React from "react";
import { Chip, Typography } from "@mui/material";

type FormatsType = 'csv' | 'xml';


export const ExportActions = (): JSX.Element => {
    const rootClassName = 'export-actions';

    const handleFileExport = (format: FormatsType) => {
        console.log('Export to ', format);
    }

    return (
        <div className={rootClassName}>
            <Typography>Export to:</ Typography>
            <div className={`${rootClassName}__buttons`}>
                <Chip 
                    label="CSV" 
                    onClick={()=>handleFileExport('csv')}
                    variant="outlined" />
                <Chip 
                    label="XML" 
                    onClick={()=>handleFileExport('xml')}
                    variant="outlined" />
                
            </div>
        </div>
    )
}