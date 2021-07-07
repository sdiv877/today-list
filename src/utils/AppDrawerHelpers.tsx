import React from 'react'
import { Create, Check, Delete, BarChart, Settings } from '@material-ui/icons';

export function getIcon(iconName: string) {
    const style = {
        fontSize: 48,
        marginLeft: "4px",
    };

    switch (iconName) {
        case 'Current Tasks':
            return <Create style={style} />;
        case 'Completed Tasks':
            return <Check style={style} />;
        case 'Recycle Bin':
            return <Delete style={style} />;
        case 'Stats':
            return <BarChart style={style} />;
        case 'Settings':
            return <Settings style={style} />;
        default:
            return <Create style={style} />;
    }
}