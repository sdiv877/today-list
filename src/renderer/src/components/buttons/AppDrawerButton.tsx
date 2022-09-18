import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, Tooltip, withStyles } from '@material-ui/core';

import { AppDrawerIcon, AppDrawerUtil } from '../../utils/icon-helpers';

const ButtonTooltip = withStyles(() => ({
  tooltip: {
    color: 'white',
    fontSize: 17,
    fontWeight: 400
  }
}))(Tooltip);

// Prop types
interface AppDrawerButtonProps {
  label: AppDrawerIcon;
  selected: string;
  path: string;
}

const AppDrawerButton: FC<AppDrawerButtonProps> = (props): JSX.Element => {
  return (
    <ButtonTooltip title={props.label} arrow placement="right">
      <ListItem button disableRipple component={Link} to={props.path} replace>
        <ListItemIcon>
          {AppDrawerUtil.getIcon(props.label, props.selected === props.path)}
        </ListItemIcon>
      </ListItem>
    </ButtonTooltip>
  );
};

export default AppDrawerButton;
