import React from "react";
import { ScrollView, View } from "react-native";

const Container = ({ children }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ marginHorizontal: 18, paddingTop: 24 }}>{children}</View>
      </ScrollView>
    </View>
  );
};

export default Container;
