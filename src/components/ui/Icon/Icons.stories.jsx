import React from 'react';
import { storiesOf } from '@storybook/react';
import { color } from '@storybook/addon-knobs';
import ArrowDown from './Icons/ArrowDown';
import ArrowRight from './Icons/ArrowRight';
import ArrowUp from './Icons/ArrowUp';
import ArrowUpDown from './Icons/ArrowUpDown';
import ChartIcon from './Icons/ChartIcon';
import Directory from './Icons/Directory';
import DotsIcon from './Icons/DotsIcon';
import Menu from './Icons/Menu';
import PlusCircle from './Icons/PlusCircle';
import Search from './Icons/Search';
import User from './Icons/User';
import UsersIcon from './Icons/UsersIcon';

import theme from './UIIcon.scss';

storiesOf('Icons', module)
  .add('default', () => {
    const iconColor = color('Color', '#000');

    return (
      <div className={theme['icon-stories']}>
        <ArrowDown color={iconColor} />
        <ArrowRight color={iconColor} />
        <ArrowUp color={iconColor} />
        <ArrowUpDown color={iconColor} />
        <ChartIcon color={iconColor} />
        <Directory color={iconColor} />
        <DotsIcon color={iconColor} />
        <Menu color={iconColor} />
        <PlusCircle color={iconColor} />
        <Search color={iconColor} />
        <User color={iconColor} />
        <UsersIcon color={iconColor} />
      </div>
    );
  });
