import { Pressable, ScrollView, StyleSheet } from "react-native";

import { View } from "../../components/Themed";
import { StyledText } from "../../components/StyledText";
import Container from "../../components/Container";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import openDatabase from "../../db/openDatabase";
import StyledInput from "../../components/StyledInput";

const HomePage = (props) => {
  const router = useRouter();

  const [contacts, setContacts] = useState([]);

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
    }, [db]),
  );

  const [searchString, setSearchString] = useState("");

  return (
    <Container>
      {contacts.length > 0 ? (
        <StyledInput
          placeholder={"Type here to search"}
          value={searchString}
          onChange={setSearchString}
        />
      ) : (
        <>
          <StyledText
            style={{ fontSize: 18, marginBottom: 8, textAlign: "center" }}
          >
            Welcome to Contacts Buddy.
          </StyledText>
          <StyledText style={{ textAlign: "center" }}>
            Tap on the "Add" icon on the top right corner to get started!
          </StyledText>
        </>
      )}
      {contacts
        ?.filter((c) => {
          if (!searchString) return true;
          const str = searchString?.toLowerCase();
          return (
            c?.firstName?.toLowerCase().indexOf(str) > -1 ||
            c?.lastName?.toLowerCase().indexOf(str) > -1
          );
        })
        ?.map((item) => (
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
