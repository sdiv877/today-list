import React, { FC } from 'react';
import { Card, Typography, makeStyles } from '@material-ui/core';

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
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            </style>

            <Card className={classes.card}>
                <Typography className={classes.text}>
                    {props.text}
                </Typography>
            </Card>
        </div>
    );
}

export default HeaderCard;
