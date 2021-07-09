import React, { FC } from 'react';

import { Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

// Props types
interface AddTasksFabProps {
    setShow: (show: boolean) => void,
}

const useStyles = makeStyles(() => ({
    root: {
        margin: 0,
        top: 'auto',
        right: "10vmin",
        bottom: "10vmin",
        left: 'auto',
        position: 'fixed',
    },
}));

// LOGGED IN DEV TOOLS
window.api.receiveText('text-from-main', (event, text) => {
    console.log('Text from main: ' + text)
})

const AddTasksFab: FC<AddTasksFabProps> = (props): JSX.Element => {
    const classes = useStyles();

    return (
        <Fab color="primary" aria-label="add" className={classes.root} onClick={() => {
            props.setShow(true);

            // window.api.sendText('text-from-renderer', 'ping');
        }}>
            <AddIcon />
        </Fab>);
}

export default AddTasksFab;