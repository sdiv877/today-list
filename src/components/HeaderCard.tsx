import { Card, Typography, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';

const useStyles = makeStyles(() => ({
    card: {
        paddingTop: 4,
        paddingBottom: 12,
    },
    text: {
        fontFamily: 'Montserrat',
        fontWeight: 500,
        fontSize: 40,

        textAlign: "center",
    },
}));

// Props types
interface HeaderCardProps {
    text: string,
}

const HeaderCard: FC<HeaderCardProps> = (props): JSX.Element => {
    const classes = useStyles();

    return (
        <div className="HeaderCard">
            <Card className={classes.card}>
                <Typography className={classes.text}>
                    {props.text}
                </Typography>
            </Card>
        </div>);
}

export default HeaderCard;