import { Text, TextProps } from "./Themed";

export function StyledText(props) {
  return <Text {...props} style={[props.style, { fontFamily: "Regular" }]} />;
}
