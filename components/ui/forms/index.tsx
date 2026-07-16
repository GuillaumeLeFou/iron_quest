import { Body, Caption, Label } from "@/components/ui/typography";
import { Border, Colors, Radius, Spacing } from "@/constants/theme";
import { ReactNode, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

type FormInputProps = TextInputProps & {
  label: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  rightElement?: ReactNode;
};

export function FormInput({
  label,
  error,
  containerStyle,
  rightElement,
  style,
  ...inputProps
}: FormInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Label style={styles.label}>{label}</Label>

      <View
        style={[
          styles.inputContainer,
          error ? styles.inputContainerError : null,
        ]}
      >
        <TextInput
          {...inputProps}
          style={[styles.input, style]}
          placeholderTextColor={Colors.textDisabled}
          selectionColor={Colors.primary}
        />

        {rightElement}
      </View>

      {error ? (
        <Caption color={Colors.danger} style={styles.error}>
          {error}
        </Caption>
      ) : null}
    </View>
  );
}

type PasswordInputProps = Omit<
  FormInputProps,
  "secureTextEntry" | "rightElement"
>;

export function PasswordInput(props: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <FormInput
      {...props}
      secureTextEntry={!isVisible}
      autoCapitalize="none"
      autoCorrect={false}
      rightElement={
        <Pressable
          onPress={() => setIsVisible((current) => !current)}
          hitSlop={8}
          style={({ pressed }) => [
            styles.visibilityButton,
            pressed && styles.visibilityButtonPressed,
          ]}
        >
          <Body
            color={isVisible ? Colors.primary : Colors.textMuted}
            style={styles.visibilityText}
          >
            {isVisible ? "Masquer" : "Voir"}
          </Body>
        </Pressable>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  label: {
    marginBottom: Spacing.sm,
  },

  inputContainer: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderWidth: Border.thin,
    borderColor: Colors.border,
    borderRadius: Radius.md,
  },

  inputContainerError: {
    borderColor: Colors.danger,
  },

  input: {
    flex: 1,
    minHeight: 52,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    color: Colors.text,
    fontSize: 16,
  },

  visibilityButton: {
    alignSelf: "stretch",
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
  },

  visibilityButtonPressed: {
    opacity: 0.65,
  },

  visibilityText: {
    fontSize: 13,
  },

  error: {
    marginTop: Spacing.xs,
  },
});
