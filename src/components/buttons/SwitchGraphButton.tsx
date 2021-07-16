import React, { FC } from 'react';
import { consoleLog } from '../../utils/logging'
import { Button } from '@material-ui/core';

// Props types
interface SwitchGraphButtonProps {
    label: string,
    graphRange: number[],
    year: number,
    setYear?: (year: number) => void,
}

const SwitchGraphButton: FC<SwitchGraphButtonProps> = (props): JSX.Element => {
    const [disabled, setDisabled] = React.useState(false);

    React.useEffect(() => {
        consoleLog('button use effect called');

        if (props.label === 'prev') {
            // If the year === the respective value of range for the button
            // disable it.
            if (props.graphRange[0] === props.year) {
                setDisabled(true);
            } else {
                setDisabled(false);
            }
        } else {
            if (props.graphRange[1] === props.year) {
                setDisabled(true);
            } else {
                setDisabled(false);
            }
        }

    })

    function handleClick(): void {
        // Depending on label, choose which range to compare to
        // If the next page would be in bounds for this button, then setYear
        if (props.label === 'prev') {
            if (props.year > props.graphRange[0]) {
                props.setYear(props.year - 1)
            }
        } else {
            if (props.year < props.graphRange[1]) {
                props.setYear(props.year + 1)
            }
        }
    }

    return (
        <Button variant='outlined' style={{ marginLeft: "6px" }} disabled={disabled} onClick={handleClick}>
            {props.label}
        </Button>
    );
}

export default SwitchGraphButton;
