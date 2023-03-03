import React, { useState } from 'react'
import { Drawer, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { ExcludableUserFields, FieldsSettings } from '../../components/FieldsSettings';

interface ISettingsBarProps {
    onFieldsChange: (fields?: ExcludableUserFields[]) => void;
}

const SettingsBar = ({onFieldsChange}: ISettingsBarProps) => {
  const rootClassName = 'settings-bar'
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleFieldsChange = (fields: ExcludableUserFields[]) => {
    onFieldsChange(fields)
    setIsOpen(false)
  };
  

  return (
    <div className={rootClassName}>
        <IconButton color="primary" onClick={()=>setIsOpen(true)} >
          <SettingsIcon />
        </IconButton>
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={()=>setIsOpen(false)}
        >
            <FieldsSettings onCloseDrawer={() => setIsOpen(false)} onFieldsChange={(fields: ExcludableUserFields[]) => handleFieldsChange(fields)}/>
        </Drawer>
    </div>
  )
}

export default SettingsBar