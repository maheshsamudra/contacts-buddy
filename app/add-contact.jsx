import { Alert, Pressable, StyleSheet, View } from "react-native";

import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import StyledButton from "../components/StyledButton";
import Container from "../components/Container";
import StyledInput from "../components/StyledInput";
import { useCallback, useEffect, useState } from "react";
import Divider from "../components/Divider";
import { StyledText } from "../components/StyledText";
import openDatabase from "../db/openDatabase";

export default function ModalScreen() {
  const params = useLocalSearchParams();

  const [db, setDB] = useState(null);

  const [contact, setContact] = useState({});

  const [phoneNumbers, setPhoneNumbers] = useState([{ value: "", label: "" }]);

  const [emails, setEmails] = useState([{ value: "", label: "" }]);

  const router = useRouter();

  const handleUpdate = async () => {
    if (!contact?.firstName) {
      Alert.alert(
        "Incomplete Contact",
        "First name is required to create a contact.",
        [{ text: "OK" }],
      );
      return;
    }

    await db.transaction(async (tx) => {
      // Deleting the existing phone numbers and email addresses are commented out to prevent the DB lock
      // await tx.executeSql("delete from phoneNumbers where contactId = ?", [
      //   params.id,
      // ]);
      //
      // await tx.executeSql("delete from emails where contactId = ?", [
      //   params.id,
      // ]);

      await tx.executeSql(
        "update contacts set firstName = ?, lastName = ?, company = ?, notes = ? where id = ?",
        [
          contact.firstName,
          contact.lastName,
          contact.company,
          contact.notes,
          params.id,
        ],
        () => {
          router.replace("/");
        },
      );
    });

    // Updating the new email addresses and phone numbers are commented out to prevent the DB lock.
    //   setNewContactId(params.id);

    // router.replace("/");
  };

  const [newContactId, setNewContactId] = useState(null);

  const handleSave = () => {
    if (!contact?.firstName) {
      Alert.alert(
        "Incomplete Contact",
        "First name is required to create a contact.",
        [{ text: "OK" }],
      );
      return;
    }

    // create new contact
    db.transaction((tx) => {
      tx.executeSql(
        "insert into contacts (firstName, lastName, company, notes) values(?,?,?,?)",
        [contact.firstName, contact.lastName, contact.company, contact.notes],
        (trans, result) => {
          setNewContactId(result.insertId);
        },
        (e, error) => {
          console.log("error occurred:", error);
        },
      );
    });

    // insert the emails and phone numbers
  };

  useEffect(() => {
    if (!newContactId) return;

    const saveItems = async () => {
      return new Promise(async (resolve) => {
        // insert the phone numbers
        const filteredPhoneNumbers = phoneNumbers.filter(
          (item) => !!item.label && !!item.value,
        );
        const filteredEmails = emails.filter(
          (item) => !!item.label && !!item.value,
        );
        await db.transaction(async (tx) => {
          for (let i = 0; i < filteredPhoneNumbers?.length; i++) {
            await tx.executeSql(
              "insert into phoneNumbers (contactId, label, value) values(?,?,?)",
              [
                newContactId,
                filteredPhoneNumbers[i].label,
                filteredPhoneNumbers[i].value,
              ],
              () => null,
              (_, error) => console.log(error),
            );
          }

          for (let i = 0; i < filteredEmails?.length; i++) {
            await tx.executeSql(
              "insert into emails (contactId, label, value) values(?,?,?)",
              [newContactId, filteredEmails[i].label, filteredEmails[i].value],
            );
          }
        });
        resolve();
      });
    };

    saveItems().then(() => {
      router.replace("/");
    });
  }, [newContactId]);

  const setValue = (key, value) => {
    setContact({
      ...contact,
      [key]: value,
    });
  };

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
            if (data && data?.length > 0) {
              setPhoneNumbers(data);
            } else {
              setPhoneNumbers([{ label: "", value: "" }]);
            }
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
            if (data && data?.length > 0) {
              setEmails(data);
            } else {
              setEmails([{ label: "", value: "" }]);
            }
          },
          (e, error) => {
            console.log("error occurred:", error);
          },
        );
      });
    }, [db, params.id]),
  );

  return (
    <Container>
      <Stack.Screen
        options={{
          title: params?.id ? "Update Contact" : "Add Contact",
          headerRight: () => (
            <>
              <StyledButton
                onPress={params.id ? handleUpdate : handleSave}
                title={params.id ? "Update" : "Save"}
              />
            </>
          ),
        }}
      />
      <StyledInput
        label={"First Name"}
        value={contact?.firstName || ""}
        onChange={(value) => setValue("firstName", value)}
        autoCapitalize={"words"}
      />
      <StyledInput
        label={"Last Name"}
        value={contact?.lastName || ""}
        onChange={(value) => setValue("lastName", value)}
        autoCapitalize={"words"}
      />
      <StyledInput
        label={"Company"}
        value={contact?.company || ""}
        onChange={(value) => setValue("company", value)}
        autoCapitalize={"words"}
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
                  style={{ color: "#e74c3c", textDecorationLine: "underline" }}
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
            autoCapitalize={"none"}
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
                  style={{ color: "#e74c3c", textDecorationLine: "underline" }}
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
        style={{ marginTop: 24, marginBottom: 100 }}
        multiline={true}
        numberOfLines={4}
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
