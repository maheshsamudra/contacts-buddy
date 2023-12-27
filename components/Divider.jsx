import React from "react";
import { View } from "./Themed";

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
