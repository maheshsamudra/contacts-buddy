import { Pressable, StyleSheet, View } from "react-native";

import { useCallback, useEffect, useState } from "react";
import openDatabase from "../../db/openDatabase";
import { useFocusEffect, useRouter } from "expo-router";
import Container from "../../components/Container";
import { StyledText } from "../../components/StyledText";

export default function Favourites() {
  const [contacts, setContacts] = useState([]);

  const router = useRouter();

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
          "select * from contacts where favourite = 1 order by firstName asc",
          [],
          (trans, { rows: { _array: data } }) => {
            setContacts(data);
          },
          (e, error) => {
            console.log("error occurred:", error);
          },
        );
      });
    }, [db]),
  );

  return (
    <Container>
      {contacts.length === 0 && (
        <StyledText>No favourite contacts yet.</StyledText>
      )}
      {contacts?.map((item) => (
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
