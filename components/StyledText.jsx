import { Text } from "react-native";

export function StyledText(props) {
  return <Text {...props} style={[{ fontFamily: "Regular" }, props.style]} />;
}
