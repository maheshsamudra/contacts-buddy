import React from "react";
import { TextInput, View } from "react-native";
import { StyledText } from "./StyledText";

const StyledInput = ({
  value,
  onChange = () => null,
  numberOfLines = 1,
  multiline = false,
  label = "",
  style = {},
  placeholder = "",
  autoCapitalize = "sentences",
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
          style={{
            padding: 10,
            textAlignVertical: multiline ? "top" : "center",
          }}
          autoCapitalize={autoCapitalize}
        />
      </View>
    </View>
  );
};

export default StyledInput;
