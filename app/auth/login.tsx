import { PrimaryButton } from "@/components/ui/buttons";
import { Card } from "@/components/ui/cards";
import { FormInput, PasswordInput } from "@/components/ui/forms";
import { Page } from "@/components/ui/layout";
import { Body, Heading, Label, Title } from "@/components/ui/typography";
import { Border, Colors, Radius, Spacing } from "@/constants/theme";
import { useCharacter } from "@/context/character";
import { signIn } from "@/services/auth";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

type LoginErrors = {
  email?: string;
  password?: string;
};

export default function LoginScreen() {
  const { reloadCharacter } = useCharacter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  function validateForm() {
    const nextErrors: LoginErrors = {};

    if (!email.trim()) {
      nextErrors.email = "L’adresse e-mail est obligatoire.";
    } else if (!email.includes("@")) {
      nextErrors.email = "L’adresse e-mail n’est pas valide.";
    }

    if (!password) {
      nextErrors.password = "Le mot de passe est obligatoire.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleLogin() {
    if (!validateForm()) return;

    try {
      await signIn(email.trim(), password);
      await reloadCharacter();
      router.replace("/");
    } catch (error) {
      setErrors({ password: "Email ou mot de passe incorrect." });
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

          <Title style={styles.title}>Iron Quest</Title>

          <Body muted style={styles.subtitle}>
            Reprends ton aventure et continue de renforcer ton héros.
          </Body>
        </View>

        <Card style={styles.formCard}>
          <Heading style={styles.formTitle}>Connexion</Heading>

          <Body muted style={styles.formSubtitle}>
            Entre dans ton camp.
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
              placeholder="Ton mot de passe"
              textContentType="password"
              autoComplete="password"
              onSubmitEditing={handleLogin}
              returnKeyType="done"
            />

            <Pressable
              onPress={() => console.log("TODO : mot de passe oublié")}
              style={({ pressed }) => [
                styles.forgotPasswordButton,
                pressed && styles.linkPressed,
              ]}
            >
              <Body color={Colors.primary} style={styles.linkText}>
                Mot de passe oublié ?
              </Body>
            </Pressable>

            <PrimaryButton
              title="Entrer dans le camp"
              subtitle="Continuer l’aventure"
              onPress={handleLogin}
            />
          </View>
        </Card>

        <View style={styles.footer}>
          <Body muted>Tu n’as pas encore de héros ?</Body>

          <Pressable
            onPress={() => router.push("/auth/register")}
            style={({ pressed }) => [
              styles.registerLink,
              pressed && styles.linkPressed,
            ]}
          >
            <Label color={Colors.primary}>Commencer l’aventure</Label>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Page>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    justifyContent: "center",
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

  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: -Spacing.sm,
  },

  linkText: {
    fontSize: 14,
  },

  linkPressed: {
    opacity: 0.65,
  },

  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    marginTop: Spacing.xl,
  },

  registerLink: {
    paddingVertical: Spacing.xs,
  },
});
