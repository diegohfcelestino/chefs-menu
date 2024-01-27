import React from "react";
import { Image as ImageNativeBase } from 'native-base';
import theme from "../../assets/theme";


export function Image({ size, ...rest }) {
  return (
    <ImageNativeBase
      w={size}
      h={size}
      borderWidth={2}
      borderColor={theme.grayLight}
      {...rest}
    />
  );
}
