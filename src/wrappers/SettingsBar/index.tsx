import { Button, Drawer } from '@mui/material';
import React from 'react'
import { ExcludableUserFields, FieldsSettings } from '../../components/FieldsSettings';

interface ISettingsBarProps {
    onFieldsChange: (fields?: ExcludableUserFields[]) => void;
}

const SettingsBar = ({onFieldsChange}: ISettingsBarProps) => {
  const rootClassName = 'settings-bar'
  const [isOpen, setIsOpen] = React.useState<boolean>(true)
    return (
    <div className={rootClassName}>
        <Button onClick={()=>setIsOpen(true)}>Settings</Button>
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={()=>setIsOpen(false)}
        >
            <FieldsSettings onFieldsChange={(fields) => onFieldsChange(fields)}/>
        </Drawer>
    </div>
  )
}

export default SettingsBar