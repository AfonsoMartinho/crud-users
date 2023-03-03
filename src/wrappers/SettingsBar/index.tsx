import { Button, Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { ExcludableUserFields, ExcludableUserSwitches, FieldsSettings } from '../../components/FieldsSettings';

interface ISettingsBarProps {
    onFieldsChange: (fields?: ExcludableUserFields[]) => void;
}

const SettingsBar = ({onFieldsChange}: ISettingsBarProps) => {
  const rootClassName = 'settings-bar'
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const handleFieldsChange = (fields: ExcludableUserFields[]) => {
    onFieldsChange(fields)
    setIsOpen(false)
  };
  

  return (
    <div className={rootClassName}>
        <Button onClick={()=>setIsOpen(true)}>Settings</Button>
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={()=>setIsOpen(false)}
        >
            <FieldsSettings onFieldsChange={(fields: ExcludableUserFields[]) => handleFieldsChange(fields)}/>
        </Drawer>
    </div>
  )
}

export default SettingsBar