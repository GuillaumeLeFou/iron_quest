import { PrimaryButton } from "@/components/ui/buttons";
import { Card } from "@/components/ui/cards";
import { FormInput, PasswordInput } from "@/components/ui/forms";
import { Page } from "@/components/ui/layout";
import { Body, Heading, Label, Title } from "@/components/ui/typography";
import { Border, Colors, Radius, Spacing } from "@/constants/theme";
import { signUp } from "@/services/auth";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

type RegisterErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<RegisterErrors>({});

  function validateForm() {
    const nextErrors: RegisterErrors = {};

    if (!email.trim()) {
      nextErrors.email = "L’adresse e-mail est obligatoire.";
    } else if (!email.includes("@")) {
      nextErrors.email = "L’adresse e-mail n’est pas valide.";
    }

    if (!password) {
      nextErrors.password = "Le mot de passe est obligatoire.";
    } else if (password.length < 8) {
      nextErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Confirme ton mot de passe.";
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleRegister() {
    if (!validateForm()) return;

    try {
      await signUp(email.trim(), password);
      router.replace("/create-character");
    } catch (error) {
      setErrors({ email: "Une erreur est survenue. Réessaie." });
    }
  }

  return (
    <Page
      contentStyle={styles.pageContent}
      scrollProps={{
        keyboardShouldPersistTaps: "handled",
      }}
    >
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <View style={styles.emblem}>
            <Label color={Colors.primary} style={styles.emblemText}>
              IQ
            </Label>
          </View>

          <Title style={styles.title}>Rejoins Iron Quest</Title>

          <Body muted style={styles.subtitle}>
            Crée ton compte, façonne ton héros et commence ton aventure.
          </Body>
        </View>

        <Card style={styles.formCard}>
          <Heading style={styles.formTitle}>Inscription</Heading>

          <Body muted style={styles.formSubtitle}>
            Ton voyage commence ici.
          </Body>

          <View style={styles.form}>
            <FormInput
              label="Adresse e-mail"
              value={email}
              onChangeText={(value) => {
                setEmail(value);

                if (errors.email) {
                  setErrors((current) => ({
                    ...current,
                    email: undefined,
                  }));
                }
              }}
              error={errors.email}
              placeholder="aventurier@ironquest.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              autoComplete="email"
            />

            <PasswordInput
              label="Mot de passe"
              value={password}
              onChangeText={(value) => {
                setPassword(value);

                if (errors.password) {
                  setErrors((current) => ({
                    ...current,
                    password: undefined,
                  }));
                }
              }}
              error={errors.password}
              placeholder="8 caractères minimum"
              textContentType="newPassword"
              autoComplete="new-password"
            />

            <PasswordInput
              label="Confirmer le mot de passe"
              value={confirmPassword}
              onChangeText={(value) => {
                setConfirmPassword(value);

                if (errors.confirmPassword) {
                  setErrors((current) => ({
                    ...current,
                    confirmPassword: undefined,
                  }));
                }
              }}
              error={errors.confirmPassword}
              placeholder="Répète ton mot de passe"
              textContentType="newPassword"
              autoComplete="new-password"
              onSubmitEditing={handleRegister}
              returnKeyType="done"
            />

            <PrimaryButton
              title="Créer mon compte"
              subtitle="Forger mon héros"
              onPress={handleRegister}
            />
          </View>
        </Card>

        <View style={styles.footer}>
          <Body muted>Tu possèdes déjà un compte ?</Body>

          <Pressable
            onPress={() => router.replace("/auth/login")}
            style={({ pressed }) => [
              styles.loginLink,
              pressed && styles.linkPressed,
            ]}
          >
            <Label color={Colors.primary}>Se connecter</Label>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Page>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    paddingVertical: Spacing.xxl,
  },

  keyboardView: {
    flexGrow: 1,
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },

  emblem: {
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
    backgroundColor: Colors.primarySoft,
    borderWidth: Border.normal,
    borderColor: Colors.primary,
    borderRadius: Radius.xl,
  },

  emblemText: {
    fontSize: 24,
    lineHeight: 30,
  },

  title: {
    textAlign: "center",
  },

  subtitle: {
    maxWidth: 330,
    marginTop: Spacing.sm,
    textAlign: "center",
  },

  formCard: {
    backgroundColor: Colors.surface,
  },

  formTitle: {
    textAlign: "center",
  },

  formSubtitle: {
    marginTop: Spacing.xs,
    textAlign: "center",
  },

  form: {
    gap: Spacing.lg,
    marginTop: Spacing.xl,
  },

  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    marginTop: Spacing.xl,
  },

  loginLink: {
    paddingVertical: Spacing.xs,
  },

  linkPressed: {
    opacity: 0.65,
  },
});
