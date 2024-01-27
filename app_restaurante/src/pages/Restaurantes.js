import { View, Text } from "native-base";
import React from "react";
import { Background } from "../components/background/Background";

export const Restaurante = () => {
  return (
    <View>
      <Background opacity={0.2} />
      <Text>Estou na pagina do restaurante</Text>
    </View>
  );
};