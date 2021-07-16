import React, { ReactElement } from 'react'
import { Create, Assignment, AccessAlarm, Fastfood, Apartment, FitnessCenter, VideogameAsset } from '@material-ui/icons'

import Task from '../models/Task'

export function getIcon(iconName: string): ReactElement {
    const style = {
        fontSize: 35,
    }

    switch (iconName) {
        case 'create':
            return <Create style={style} />;
        case 'assignment':
            return <Assignment style={style} />;
        case 'accessalarm':
            return <AccessAlarm style={style} />;
        case 'fastfood':
            return <Fastfood style={style} />;
        case 'apartment':
            return <Apartment style={style} />;
        case 'fitnesscenter':
            return <FitnessCenter style={style} />;
        case 'videogameasset':
            return <VideogameAsset style={style} />;
        default:
            return <Create style={style} />;
    }
}

export function handleTaskField(task: string): string {
    if (task === '') {
        return "No task specified"
    }

    return task;
}

export function sortTaskList(list: Task[]): Task[] {
    const sortedList = list.sort((a: Task, b: Task) => {
        return a.date.valueOf() - b.date.valueOf();
    });

    return sortedList;
}