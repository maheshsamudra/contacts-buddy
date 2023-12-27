import { StyleSheet } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";
import StyledButton from "../components/StyledButton";
import Container from "../components/Container";
import StyledInput from "../components/StyledInput";
import { useState } from "react";

export default function ModalScreen() {
  const params = useLocalSearchParams();

  const [contact, setContact] = useState({});

  const handleSave = () => {
    console.log("save");
  };

  const setValue = (key, value) => {
    setContact({
      ...contact,
      [key]: value,
    });
  };

  return (
    <Container>
      <Stack.Screen
        options={{
          title: params?.id ? "Update Contact" : "Add Contact",
          headerRight: () => (
            <>
              <StyledButton onPress={handleSave} title={"Save"} />
            </>
          ),
        }}
      />
      <StyledInput
        label={"First Name"}
        value={contact?.firstName || ""}
        onChange={(value) => setValue("firstName", value)}
      />
      <StyledInput
        label={"Last Name"}
        value={contact?.lastName || ""}
        onChange={(value) => setValue("firstName", value)}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
