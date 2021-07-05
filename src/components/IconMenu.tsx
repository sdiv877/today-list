import React, { FC } from 'react';
import { FormControl, InputLabel, Select } from "@material-ui/core";

import Task from '../models/Task'

//Props types
interface IconMenuProps {
    submission: Task,
    setSubmission: React.Dispatch<React.SetStateAction<Task>>,
}

const IconMenu: FC<IconMenuProps> = (props): JSX.Element => {
    // When a change happens, setIcon to the value in the option tag (as a string) that was selected
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>, submission: Task, setSubmission: React.Dispatch<React.SetStateAction<Task>>) => {

        const submissionCopy = submission;
        submissionCopy.icon = event.target.value as string;

        setSubmission(submissionCopy);
    };

    return (
        <div className="IconMenu">
            <FormControl>
                <InputLabel>Icon</InputLabel>
                <Select
                    native
                    onChange={(event) => { handleChange(event, props.submission, props.setSubmission) }}
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