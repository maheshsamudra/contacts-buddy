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
  style = {},
  placeholder = "",
}) => {
  return (
    <View style={{ marginBottom: 10, ...style }}>
      {label && <StyledText>{label}</StyledText>}
      <View
        style={{
          backgroundColor: value,
          borderColor: "#888",
          borderWidth: 1,
          borderRadius: 6,
        }}
      >
        <TextInput
          editable
          multiline={multiline}
          numberOfLines={numberOfLines}
          placeholder={placeholder}
          maxLength={40}
          onChangeText={(text) => onChange(text)}
          value={value}
          style={{ padding: 10 }}
        />
      </View>
    </View>
  );
};

export default StyledInput;
