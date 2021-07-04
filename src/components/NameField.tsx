import React from 'react';
import { makeStyles, TextField } from "@material-ui/core"

const NameField: React.VoidFunctionComponent = () => {

    const useStyles = makeStyles(() => ({
        root: {
            textAlign: 'center', 
            fontSize: 40,
            fontFamily: 'Montserrat',
            fontWeight: 500,
             
            paddingTop:0, 
            paddingBottom:0
        },
      }));

      const classes = useStyles();

    return (
        <div className="NameField">
            <TextField
                fullWidth
                InputProps={{ disableUnderline:true }}
                inputProps={{ className:classes.root}}
                placeholder="Enter your name"
            />
        </div>);
}

//style: { textAlign: 'center', fontSize: "4vmax", fontFamily: 'Montserrat', fontWeight: 500 }
export default NameField;