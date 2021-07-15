import React, { FC } from 'react';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// Props types
interface DateTimePickerProps {
    selectedDate: Date,
    handleDateChange: (date: Date | null) => void,
}

const DateTimePicker: FC<DateTimePickerProps> = (props): JSX.Element => {

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
                variant="inline"
                ampm={false}
                style={{ minWidth: "425px" }}
                autoOk={true}
                value={props.selectedDate}
                onChange={(date) => props.handleDateChange(date)} />
        </MuiPickersUtilsProvider>
    );
}

export default DateTimePicker;