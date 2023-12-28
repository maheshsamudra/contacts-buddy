import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,
        headerTitleStyle: {
          fontFamily: "SemiBold",
        },
        tabBarStyle: {
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Contacts",
          tabBarLabelStyle: { fontFamily: "SemiBold", fontSize: 14 },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="contacts-outline"
              size={18}
              color={color}
            />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {
                router.push({
                  pathname: "add-contact",
                });
              }}
            >
              {({ pressed }) => (
                <AntDesign
                  name="adduser"
                  size={18}
                  color={Colors.text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "Favourites",
          tabBarLabelStyle: { fontFamily: "SemiBold", fontSize: 14 },
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite-border" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
