import { Pressable, StyleSheet, View } from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";
import StyledButton from "../components/StyledButton";
import Container from "../components/Container";
import StyledInput from "../components/StyledInput";
import { useState } from "react";
import Divider from "../components/Divider";
import { StyledText } from "../components/StyledText";

export default function ModalScreen() {
  const params = useLocalSearchParams();

  const [contact, setContact] = useState({});

  const [phoneNumbers, setPhoneNumbers] = useState([{ value: "", label: "" }]);

  const [emails, setEmails] = useState([{ value: "", label: "" }]);

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
        onChange={(value) => setValue("lastName", value)}
      />
      <StyledInput
        label={"Company"}
        value={contact?.company || ""}
        onChange={(value) => setValue("company", value)}
      />

      <Divider margin={20} />

      <StyledText style={{ marginBottom: 10 }}>Phone Numbers</StyledText>

      {phoneNumbers.map((item, idx) => (
        <View
          key={idx}
          style={{
            marginTop: idx === 0 ? 0 : 16,
            position: "relative",
          }}
        >
          <StyledInput
            label={"Label"}
            value={phoneNumbers?.[idx]?.label || ""}
            onChange={(value) => {
              setPhoneNumbers(
                phoneNumbers.map((item, index) => {
                  if (index === idx) {
                    return {
                      label: value,
                      value: item.value,
                    };
                  }
                  return item;
                }),
              );
            }}
          />
          <StyledInput
            label={"Phone Number"}
            value={phoneNumbers?.[idx]?.value || ""}
            onChange={(value) => {
              setPhoneNumbers(
                phoneNumbers.map((item, index) => {
                  if (index === idx) {
                    return {
                      label: item.label,
                      value: value,
                    };
                  }
                  return item;
                }),
              );
            }}
          />
          {idx > 0 && (
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Pressable
                onPress={() => {
                  setPhoneNumbers(
                    phoneNumbers.filter((item, index) => index !== idx),
                  );
                }}
              >
                <StyledText
                  style={{ color: "red", textDecorationLine: "underline" }}
                >
                  Remove
                </StyledText>
              </Pressable>
            </View>
          )}
        </View>
      ))}

      <Pressable
        onPress={() => {
          setPhoneNumbers([...phoneNumbers, { label: "", value: "" }]);
        }}
      >
        <StyledText style={{ textDecorationLine: "underline" }}>
          Add Another
        </StyledText>
      </Pressable>

      <Divider margin={20} />

      <StyledText style={{ marginBottom: 10 }}>Email Addresses</StyledText>

      {emails.map((item, idx) => (
        <View key={idx} style={{ marginTop: idx === 0 ? 0 : 16 }}>
          <StyledInput
            label={"Label"}
            value={emails?.[idx]?.label || ""}
            onChange={(value) => {
              setEmails(
                emails.map((item, index) => {
                  if (index === idx) {
                    return {
                      label: value,
                      value: item.value,
                    };
                  }
                  return item;
                }),
              );
            }}
          />
          <StyledInput
            label={"Email Address"}
            value={emails?.[idx]?.value || ""}
            onChange={(value) => {
              setEmails(
                emails.map((item, index) => {
                  if (index === idx) {
                    return {
                      label: item.label,
                      value: value,
                    };
                  }
                  return item;
                }),
              );
            }}
          />
          {idx > 0 && (
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Pressable
                onPress={() => {
                  setEmails(emails.filter((item, index) => index !== idx));
                }}
              >
                <StyledText
                  style={{ color: "red", textDecorationLine: "underline" }}
                >
                  Remove
                </StyledText>
              </Pressable>
            </View>
          )}
        </View>
      ))}

      <Pressable
        onPress={() => {
          setEmails([...emails, { label: "", value: "" }]);
        }}
      >
        <StyledText style={{ textDecorationLine: "underline" }}>
          Add Another
        </StyledText>
      </Pressable>

      <StyledInput
        label={"Notes"}
        value={contact?.notes || ""}
        onChange={(value) => setValue("notes", value)}
        style={{ marginTop: 24, marginBottom: 36 }}
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
