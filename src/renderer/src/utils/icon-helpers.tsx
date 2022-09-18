import React, { ReactElement } from 'react';
import {
  AccessAlarm,
  Apartment,
  Assignment,
  BarChart,
  Check,
  Create,
  Delete,
  Fastfood,
  FitnessCenter,
  Settings,
  VideogameAsset
} from '@material-ui/icons';

import { AppDrawerIcon, TaskIcon } from '../../../common/models/icons.model';

class AppDrawerUtil {
  public static getIcon(
    iconName: AppDrawerIcon,
    selected: boolean
  ): ReactElement {
    const style = {
      fontSize: 48,
      marginLeft: '4px',
      color: selected ? '#FFFFFF' : '#747983'
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
}

class TaskIconUtil {
  public static valueOf(iconName: string): TaskIcon {
    return iconName as TaskIcon;
  }

  public static getIcon(iconName: TaskIcon): ReactElement {
    const style = {
      fontSize: 35
    };

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
}

export { AppDrawerIcon, AppDrawerUtil, TaskIcon, TaskIconUtil };
