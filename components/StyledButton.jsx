import React from "react";
import { Button, Pressable } from "react-native";
import { StyledText } from "./StyledText";

const StyledButton = ({ onPress, title, bg = "#3498db" }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{ backgroundColor: bg, borderRadius: 6 }}
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
