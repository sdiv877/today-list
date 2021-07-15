import React, { FC } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

//Props types
interface IconMenuProps {
    selectedIcon: string,
    handleIconChange: (icon: string | null) => void
}

const IconMenu: FC<IconMenuProps> = (props): JSX.Element => {

    const handleChange = (icon: string) => {
        props.handleIconChange(icon);
    }

    return (
        <div className="IconMenu" style={{ minWidth: '425px', height: '30px' }}>
            <FormControl fullWidth>
                <InputLabel>Icon</InputLabel>

                <Select defaultValue='' value={props.selectedIcon} onChange={(event) => {
                    handleChange(event.target.value as string)
                }}>
                    <MenuItem value={'create'}>Pencil</MenuItem>
                    <MenuItem value={'assignment'}>Assignment</MenuItem>
                    <MenuItem value={'accessalarm'}>Clock</MenuItem>
                    <MenuItem value={'fastfood'}>Food</MenuItem>
                    <MenuItem value={'apartment'}>Location</MenuItem>
                    <MenuItem value={'fitnesscenter'}>Fitness</MenuItem>
                    <MenuItem value={'videogameasset'}>Gaming</MenuItem>
                </Select>
            </FormControl>
        </div>);
}

export default IconMenu;