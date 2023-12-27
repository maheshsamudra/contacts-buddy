import { Platform, Pressable, StyleSheet } from "react-native";

import { Feather } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";
import { Stack, Tabs, useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import Container from "../components/Container";
import { StyledText } from "../components/StyledText";

export default function ModalScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [contact, setContact] = useState({});

  const [emails, setEmails] = useState([]);

  const [phoneNumbers, setPhoneNumbers] = useState([]);

  console.log(contact);

  const toggleFavourite = async () => {
    const favourite = !contact?.favourite;
    setContact({
      ...contact,
      favourite: !contact?.favourite,
    });
  };

  return (
    <Container>
      <Stack.Screen
        options={{
          headerRight: () => (
            <>
              <Pressable
                onPress={() => {
                  router.push({
                    pathname: "add-contact",
                    params: {
                      id: params.id,
                    },
                  });
                }}
              >
                {({ pressed }) => (
                  <AntDesign name="edit" size={24} color="black" />
                )}
              </Pressable>
              <Pressable style={{ marginLeft: 16 }} onPress={toggleFavourite}>
                {({ pressed }) => (
                  <MaterialIcons
                    name={!!contact?.favourite ? "favorite" : "favorite-border"}
                    size={24}
                    color={!!contact?.favourite ? "green" : "black"}
                  />
                )}
              </Pressable>
            </>
          ),
        }}
      />
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        {contact?.firstName} {contact?.lastName}
      </Text>

      {contact?.company && (
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            marginTop: 4,
          }}
        >
          contact?.company
        </Text>
      )}

      {contact?.notes?.slice("\n").map((text) => (
        <StyledText key={text}>{text}</StyledText>
      ))}

      {phoneNumbers.map((item, idx) => (
        <View
          key={idx}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
            marginTop: idx === 0 ? 36 : 0,
          }}
        >
          <Feather name="phone" size={24} color="black" />
          <View style={{ marginLeft: 10 }}>
            <StyledText style={{ fontSize: 20 }}>{item.value}</StyledText>
            <StyledText>{item.label}</StyledText>
          </View>
        </View>
      ))}

      {emails.map((item, idx) => (
        <View
          key={idx}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
            marginTop: idx === 0 ? 36 : 0,
          }}
        >
          <Feather name="mail" size={24} color="black" />
          <View style={{ marginLeft: 10 }}>
            <StyledText style={{ fontSize: 20 }}>{item.value}</StyledText>
            <StyledText>{item.label}</StyledText>
          </View>
        </View>
      ))}
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
