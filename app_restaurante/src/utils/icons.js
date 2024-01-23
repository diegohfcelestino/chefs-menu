import React from 'react';

import MIcon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import EIcon from 'react-native-vector-icons/Entypo';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/Fontisto';
import IoIcon from 'react-native-vector-icons/Ionicons';
import AnIcon from 'react-native-vector-icons/AntDesign';

import theme from '../assets/theme';

const size = 35;
const color = theme.whiteLight;

export const IconHome = (props) => {
  return <MIcon name="home" size={size} color={color} {...props} />;
};

export const IconPerson = (props) => {
  return <MIcon name="person" size={size} color={color} {...props} />;
};

export const IconVisibility = (props) => {
  return <MIcon name="visibility" size={size} color={color} {...props} />;
};

export const IconVisibilityOff = (props) => {
  return <MIcon name="visibility-off" size={size} color={color} {...props} />;
};

export const IconMail = (props) => {
  return <MIcon name="mail" size={size} color={color} {...props} />;
};

export const IconUserConfig = (props) => {
  return <FA5Icon name="user-cog" size={size} color={color} {...props} />;
};

export const IconEdit = (props) => {
  return <FA5Icon name="edit" size={size} color={color} {...props} />;
};

export const IconSearch = (props) => {
  return <FA5Icon name="search" size={size} color={color} {...props} />;
};

export const IconCheck = (props) => {
  return <FA5Icon name="check" size={size} color={color} {...props} />;
};

export const IconArrowRight = (props) => {
  return <FA5Icon name="arrow-right" size={size} color={color} {...props} />;
};

export const IconArrowLeft = (props) => {
  return <FA5Icon name="arrow-left" size={size} color={color} {...props} />;
};

export const IconSignOut = (props) => {
  return <FAIcon name="sign-out" size={size} color={color} {...props} />;
};

export const IconLocation = (props) => {
  return <MIcon name="location-pin" size={size} color={color} {...props} />;
};

export const IconMobile = (props) => {
  return <MIcon name="mobile-screen-share" size={size} color={color} {...props} />;
};

export const IconAtSign = (props) => {
  return <EIcon name="email" size={size} color={color} {...props} />;
};

export const IconDoctor = (props) => {
  return <FIcon name="doctor" size={size} color={color} {...props} />;
};

export const IconDoubleArrow = (props) => {
  return <FIcon name="arrow-swap" size={size} color={color} {...props} />;
};

export const IconLogout = (props) => {
  return <MCIcon name="logout" size={size} color={color} {...props} />;
};

export const IconBag = (props) => {
  return <MIcon name="shopping-basket" size={size} color={color} {...props} />;
};

export const IconFavorite = (props) => {
  return <MIcon name="favorite" size={size} color={color} {...props} />;
};

export const IconConfig = (props) => {
  return <FAIcon name="gear" size={size} color={color} {...props} />;
};

export const IconTelephone = (props) => {
  return <MIcon name="phone" size={size} color={color} {...props} />;
};

export const IconArrowLocation = (props) => {
  return <FAIcon name="location-arrow" size={size} color={color} {...props} />;
};

export const IconGroup = (props) => {
  return <MIcon name="groups" size={size} color={color} {...props} />;
};

export const IconArrowDown = (props) => {
  return <FAIcon name="caret-down" size={size} color={color} {...props} />;
};

export const IconPersons = (props) => {
  return <FIcon name="persons" size={size} color={color} {...props} />;
};

export const IconInfo = (props) => {
  return <MIcon name="info-outline" size={size} color={color} {...props} />;
};

export const IconClose = (props) => {
  return <MIcon name="close" size={size} color={color} {...props} />;
};

export const IconOpenMenu = (props) => {
  return <AnIcon name="menu-unfold" size={size} color={color} {...props} />;
};

export const IconCloseMenu = (props) => {
  return <AnIcon name="menu-fold" size={size} color={color} {...props} />;
};

