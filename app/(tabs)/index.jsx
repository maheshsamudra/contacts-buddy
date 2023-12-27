import { Pressable, ScrollView, StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import { StyledText } from "../../components/StyledText";
import Container from "../../components/Container";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import openDatabase from "../../db/openDatabase";

const HomePage = () => {
  const router = useRouter();

  const [contacts, setContacts] = useState([]);

  const [db, setDB] = useState(null);

  useEffect(() => {
    if (!db) {
      openDatabase().then((db) => setDB(db));
    }
  }, []);

  useEffect(() => {
    if (!db) return;

    db.transaction((tx) => {
      tx.executeSql(
        "select * from contacts order by firstName asc",
        [],
        (trans, { rows: { _array: data } }) => {
          setContacts(data);
        },
        (e, error) => {
          console.log("error occurred:", error);
        },
      );
    });
  }, [db]);

  return (
    <Container>
      {contacts.map((item) => (
        <View
          key={item.id}
          style={{
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
          }}
        >
          <Pressable
            onPress={() =>
              router.push({
                pathname: "view-contact",
                params: {
                  id: item.id,
                },
              })
            }
          >
            <StyledText>
              {item.firstName} {item.lastName}
            </StyledText>
          </Pressable>
        </View>
      ))}
    </Container>
  );
};

export default HomePage;
