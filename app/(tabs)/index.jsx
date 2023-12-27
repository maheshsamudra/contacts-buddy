import { Pressable, ScrollView, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { StyledText } from "../../components/StyledText";
import Container from "../../components/Container";
import { useRouter } from "expo-router";

export default function TabOneScreen() {
  const router = useRouter();
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
