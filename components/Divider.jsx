import React from "react";
import { View } from "react-native";

const Divider = ({ margin = 10 }) => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        marginVertical: margin,
      }}
    ></View>
  );
};

export default Divider;
