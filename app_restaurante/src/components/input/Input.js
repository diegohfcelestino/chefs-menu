import React from 'react';
import { Input as NativeBaseInput } from 'native-base';

export function Input({ ...rest }) {
  return (
    <NativeBaseInput
      bg="white"
      h={10}
      px={4}
      borderWidth={0}
      rounded="xl"
      fontSize="md"
      color="black"
      mb={6}
      placeholderTextColor="gray.300"
      _focus={{
        bg: 'white',
        borderWidth: 1,
        borderColor: 'orange.700'
      }}
      {...rest}
    />
  );
}
