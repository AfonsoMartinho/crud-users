import React, { useState } from 'react'
import { Drawer, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { ExcludableUserFields, FieldsSettingsContent } from '../../components/FieldsSettings/content';

interface ISettingsBarProps {
    onFieldsChange: (fields?: ExcludableUserFields[]) => void;
}

const FieldsSettings = ({onFieldsChange}: ISettingsBarProps) => {
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
            <FieldsSettingsContent onCloseDrawer={() => setIsOpen(false)} onFieldsChange={(fields: ExcludableUserFields[]) => handleFieldsChange(fields)}/>
        </Drawer>
    </div>
  )
}

export default FieldsSettings