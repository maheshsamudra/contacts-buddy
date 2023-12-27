import { Platform, Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { Stack, Tabs, useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

export default function ModalScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const [contact, setContact] = useState({});

  console.log(contact);

  return (
    <View style={styles.container}>
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
              <Pressable
                style={{ marginLeft: 16 }}
                onPress={() => {
                  setContact({
                    ...contact,
                    favourite: !contact?.favourite,
                  });
                }}
              >
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
      <Text style={styles.title}>Modal</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/modal.tsx" />
    </View>
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
