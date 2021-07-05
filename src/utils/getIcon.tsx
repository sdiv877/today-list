import React from 'react'
import { Create, Assignment, AccessAlarm, Fastfood, Apartment, FitnessCenter, VideogameAsset } from '@material-ui/icons';

function getIcon(iconName: string) {
    switch(iconName) {
        case 'create':
            return <Create />;
        case 'assignment':
            return <Assignment />;
        case 'accessalarm':
            return <AccessAlarm />;
        case 'fastfood':
            return <Fastfood />;
        case 'apartment':
            return <Apartment />;
        case 'fitnesscenter':
            return <FitnessCenter />;
        case 'videogameasset':
            return <VideogameAsset />;
        default:
            return <Create />;
    }
}

export default getIcon;