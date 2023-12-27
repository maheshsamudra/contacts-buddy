import { Pressable, ScrollView, StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import { StyledText } from "../../components/StyledText";
import Container from "../../components/Container";
import { useRouter } from "expo-router";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import openDatabase from "../../db/openDatabase";

export default function TabOneScreen() {
  const router = useRouter();

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
        "create table if not exists contacts (id integer primary key, firstName TEXT, lastName TEXT, company TEXT, notes TEXT)",
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "select * from contacts",
        [],
        (trans, result) => {
          console.log(result);
        },
        (e, error) => {
          console.log("error");
          console.log("error occurred:", error);
        },
      );
    });
  }, [db]);

  return (
    <Container>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
        <View key={item} style={{ marginVertical: 22 }}>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "view-contact",
                params: {
                  id: "id",
                },
              })
            }
          >
            <StyledText>Name</StyledText>
          </Pressable>
        </View>
      ))}
    </Container>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
