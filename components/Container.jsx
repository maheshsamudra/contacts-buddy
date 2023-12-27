import React from "react";
import { View } from "./Themed";
import { ScrollView } from "react-native";

const Container = ({ children }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ marginHorizontal: 18, paddingTop: 24 }}>{children}</View>
      </ScrollView>
    </View>
  );
};

export default Container;
