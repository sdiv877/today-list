import React from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(() => ({
    root: {
        margin: 0,
        top: 'auto',
        right: 80,
        bottom: 80,
        left: 'auto',
        position: 'fixed',
    },
}));

const AddTasksFab: React.VoidFunctionComponent = () => {
    const classes = useStyles();

    return (
        <Fab color="primary" aria-label="add" className={classes.root}>
            <AddIcon />
        </Fab>);
}

export default AddTasksFab;