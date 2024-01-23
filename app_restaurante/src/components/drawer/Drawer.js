import React from "react";
import { View } from "native-base";
import MenuDrawer from 'react-native-side-drawer';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const Drawer = (props) => {

  return (
    <View flex={1} justifyContent="center" alignItems="center" zIndex={0}>
      <MenuDrawer
        open={props.open}
        position={'right'}
        drawerContent={props.drawerContent}
        drawerPercentage={RFValue(30)}
        animationTime={300}
        overlay={true}
        opacity={0.2}
      >
        {props.children}
      </MenuDrawer>
    </View>
  );
};

export { Drawer };