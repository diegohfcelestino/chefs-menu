import React from "react";
import { Button as NaiveBaseButton, Text } from "native-base";
import theme from "../../assets/theme";
export const Button = ({ title, variant = 'solid', ...rest }) => {
  return (
    <NaiveBaseButton
      w="full"
      h={12}
      bg={variant === "outline" ? "transparent" : theme.orange}
      borderWidth={variant === "outline" ? 2 : 0}
      borderColor={theme.orange}
      rounded="xl"
      _pressed={{
        bg: variant === "outline" ? theme.overlayColor : theme.overlayColor
      }}
      {...rest}
    >
      <Text
        color={variant === "outline" ? theme.orange : theme.lightColor}
        fontWeight="bold"
        fontSize="md"
      >
        {title}
      </Text>
    </NaiveBaseButton>
  );
};