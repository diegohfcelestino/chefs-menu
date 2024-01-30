import React from 'react';

import AnIcon from 'react-native-vector-icons/AntDesign';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';

import theme from '../assets/theme';

const size = 35;
const color = theme.whiteLight;

export const IconArrowRight = (props) => {
  return <FA5Icon name="arrow-right" size={size} color={color} {...props} />;
};

export const IconArrowLeft = (props) => {
  return <FA5Icon name="arrow-left" size={size} color={color} {...props} />;
};

export const IconOpenMenu = (props) => {
  return <AnIcon name="menu-unfold" size={size} color={color} {...props} />;
};

export const IconCloseMenu = (props) => {
  return <AnIcon name="menu-fold" size={size} color={color} {...props} />;
};

