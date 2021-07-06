import React, { FC } from 'react';
import { FormControl, InputLabel, Select } from "@material-ui/core";

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
        <div className="IconMenu">
            <FormControl>
                <InputLabel>Icon</InputLabel>
                <Select
                    native
                    onChange={(event) => { handleChange(event.target.value as string) }}
                >
                    <option aria-label="None" value="" />
                    <option value={'create'}>Pencil</option>
                    <option value={'assignment'}>Assignment</option>
                    <option value={'accessalarm'}>Clock</option>
                    <option value={'fastfood'}>Food</option>
                    <option value={'apartment'}>Location</option>
                    <option value={'fitnesscenter'}>Fitness</option>
                    <option value={'videogameasset'}>Gaming</option>
                </Select>
            </FormControl>
        </div>);
}

export default IconMenu;