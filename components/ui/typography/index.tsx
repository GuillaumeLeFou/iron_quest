import { Colors, Typography } from "@/constants/theme";
import { Text, TextProps } from "react-native";

type BaseTextProps = TextProps & {
  color?: string;
  muted?: boolean;
};

function BaseText({ style, color, muted = false, ...props }: BaseTextProps) {
  return (
    <Text
      {...props}
      style={[
        {
          color: color ?? (muted ? Colors.textMuted : Colors.text),
        },
        style,
      ]}
    />
  );
}

export function Title(props: BaseTextProps) {
  return <BaseText {...props} style={[Typography.title, props.style]} />;
}

export function Heading(props: BaseTextProps) {
  return <BaseText {...props} style={[Typography.heading, props.style]} />;
}

export function Body(props: BaseTextProps) {
  return <BaseText {...props} style={[Typography.body, props.style]} />;
}

export function Caption(props: BaseTextProps) {
  return <BaseText {...props} style={[Typography.caption, props.style]} />;
}

export function Label(props: BaseTextProps) {
  return <BaseText {...props} style={[Typography.bodySmall, props.style]} />;
}
