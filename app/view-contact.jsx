import { Alert, Platform, Pressable, Share, StyleSheet } from "react-native";

import { Feather } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";
import {
  Stack,
  Tabs,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import Container from "../components/Container";
import { StyledText } from "../components/StyledText";
import openDatabase from "../db/openDatabase";
import * as Clipboard from "expo-clipboard";

export default function ModalScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [contact, setContact] = useState({});

  const [emails, setEmails] = useState([]);

  const [phoneNumbers, setPhoneNumbers] = useState([]);

  const [db, setDB] = useState(null);

  useEffect(() => {
    if (!db) {
      openDatabase().then((db) => setDB(db));
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!db) return;

      db.transaction((tx) => {
        tx.executeSql(
          "select * from contacts where id = ?",
          [params.id],
          (trans, { rows: { _array: data } }) => {
            setContact(data?.[0] || {});
          },
          (e, error) => {
            console.log("error occurred:", error);
          },
        );
      });

      db.transaction((tx) => {
        tx.executeSql(
          "select * from phoneNumbers where contactId = ?",
          [params.id],
          (trans, { rows: { _array: data } }) => {
            setPhoneNumbers(data || []);
          },
          (e, error) => {
            console.log("error occurred:", error);
          },
        );
      });

      db.transaction((tx) => {
        tx.executeSql(
          "select * from emails where contactId = ?",
          [params.id],
          (trans, { rows: { _array: data } }) => {
            setEmails(data || []);
          },
          (e, error) => {
            console.log("error occurred:", error);
          },
        );
      });
    }, [db, params.id]),
  );

  const share = async () => {
    let message = `Contact: ${contact?.firstName} ${contact?.lastName}`;
    if (contact?.company) {
      message += `\nCompany: ${contact.company}`;
    }
    for (let i = 0; i < phoneNumbers?.length; i++) {
      message += `\n${phoneNumbers?.[i].label}: ${phoneNumbers?.[i].value}`;
    }
    for (let i = 0; i < emails?.length; i++) {
      message += `\n${emails?.[i].label}: ${emails?.[i].value}`;
    }
    try {
      await Share.share({
        message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavourite = async () => {
    if (!db) return;
    const favourite = contact?.favourite ? 0 : 1;

    db.transaction((tx) => {
      tx.executeSql("update contacts set favourite = ? where id = ?", [
        favourite,
        params.id,
      ]);
    });

    db.transaction((tx) => {
      tx.executeSql(
        "select * from contacts where id = ?",
        [params.id],
        (trans, { rows: { _array: data } }) => {
          setContact(data?.[0] || {});
        },
        (e, error) => {
          console.log("error occurred:", error);
        },
      );
    });
  };

  const handleDelete = () => {
    Alert.alert("Delete this contact?", "This cannot be undone.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          db.transaction((tx) => {
            tx.executeSql(
              "delete from phoneNumbers where contactId = ?",
              [params.id],
              () => {
                db.transaction((tx) => {
                  tx.executeSql(
                    "delete from emails where contactId = ?",
                    [params.id],
                    () => {
                      db.transaction((tx) => {
                        tx.executeSql(
                          "delete from contacts where id = ?",
                          [params.id],
                          () => {
                            router.replace("/");
                          },
                          (e, error) => {
                            console.log("error");
                            Alert.alert(
                              "Error Occurred.",
                              "Please try again.",
                              [
                                {
                                  text: "OK",
                                  style: "cancel",
                                },
                              ],
                            );
                          },
                        );
                      });
                    },
                    (e, error) => {
                      console.log("error");
                      Alert.alert("Error Occurred.", "Please try again.", [
                        {
                          text: "OK",
                          style: "cancel",
                        },
                      ]);
                    },
                  );
                });
              },
              (e, error) => {
                console.log("error", error);
                Alert.alert("Error Occurred.", "Please try again.", [
                  {
                    text: "OK",
                    style: "cancel",
                  },
                ]);
              },
            );
          });
        },
      },
    ]);
  };

  return (
    <Container>
      <Stack.Screen
        options={{
          headerRight: () => (
            <>
              <Pressable style={{ marginRight: 32 }} onPress={handleDelete}>
                {({ pressed }) => (
                  <AntDesign name="delete" size={24} color="#e74c3c" />
                )}
              </Pressable>

              <Pressable style={{ marginRight: 16 }} onPress={share}>
                {({ pressed }) => (
                  <Feather name="share-2" size={24} color="black" />
                )}
              </Pressable>

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
                    color={!!contact?.favourite ? "#1abc9c" : "black"}
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
          {contact?.company}
        </Text>
      )}

      {contact?.notes?.split("\n").map((text, idx) => (
        <StyledText
          key={idx}
          style={{
            textAlign: "center",
            fontSize: 14,
            marginTop: idx === 0 ? 12 : 0,
            color: "#555",
          }}
        >
          {text}
        </StyledText>
      ))}

      {phoneNumbers.map((item, idx) => (
        <Pressable
          onPress={() => {
            Clipboard.setStringAsync(item.value);
          }}
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
        </Pressable>
      ))}

      {emails.map((item, idx) => (
        <Pressable
          onPress={() => {
            Clipboard.setStringAsync(item.value);
          }}
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
        </Pressable>
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
