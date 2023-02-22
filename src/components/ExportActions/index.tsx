import { Chip, Typography } from "@mui/material";
import { useRootStore } from "../../StoreContext";
import { FormatsType } from "../../stores/UsersStore";


export const ExportActions = (): JSX.Element => {
    const { usersStore } = useRootStore();
    const rootClassName = 'export-actions';

    const handleFileExport = (format: FormatsType) => {
        console.log('Export to ', format);
        usersStore.exportUsersList(format)
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