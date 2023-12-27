import React from "react";
import { TextInput } from "react-native";
import { View } from "./Themed";
import { StyledText } from "./StyledText";

const StyledInput = ({
  value,
  onChange = () => null,
  numberOfLines = 1,
  multiline = false,
  label = "",
}) => {
  return (
    <>
      {label && <StyledText>{label}</StyledText>}
      <View
        style={{
          backgroundColor: value,
          borderColor: "#000000",
          borderWidth: 1,
        }}
      >
        <TextInput
          editable
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={40}
          onChangeText={(text) => onChange(text)}
          value={value}
          style={{ padding: 10 }}
        />
      </View>
    </>
  );
};

export default StyledInput;
