import React from "react";
import { Chip, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useRootStore } from "../../StoreContext";
import { FormatsType } from "../../stores/UsersStore";


export const ExportActions = (): JSX.Element => {
    const { usersStore } = useRootStore();
    const rootClassName = 'export-actions';
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(menuAnchorEl);

    const handleFileExport = (format: FormatsType) => {
        setMenuAnchorEl(null);
        usersStore.exportUsersList(format)
    }

    return (
        <div className={rootClassName}>
             <IconButton 
                id="export-button"
                color="primary"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e)=>setMenuAnchorEl(e.currentTarget)} >
                <FileDownloadIcon />
            </IconButton>
            <Menu 
                id="export-menu"
                open={open}
                className={`${rootClassName}__buttons`}
                anchorEl={menuAnchorEl}
                onClose={()=> setMenuAnchorEl(null)}
            >
                <MenuItem onClick={()=>handleFileExport('csv')}>CSV</MenuItem>
                <MenuItem onClick={()=>handleFileExport('xml')}>XML</MenuItem>
            </Menu>
        </div>
    )
}