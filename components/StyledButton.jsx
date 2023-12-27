import React from "react";
import { Button, Pressable } from "react-native";
import { StyledText } from "./StyledText";

const StyledButton = ({ onPress, title }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{ backgroundColor: "#3498db", borderRadius: 6 }}
    >
      <StyledText
        style={{ color: "white", paddingVertical: 6, paddingHorizontal: 12 }}
      >
        {title}
      </StyledText>
    </Pressable>
  );
};

export default StyledButton;
