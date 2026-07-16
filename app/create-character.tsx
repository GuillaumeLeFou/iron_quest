import { PrimaryButton } from "@/components/ui/buttons";
import { Card } from "@/components/ui/cards";
import { FormInput } from "@/components/ui/forms";
import { Page } from "@/components/ui/layout";
import { Body, Heading, Title } from "@/components/ui/typography";
import { Colors, Radius, Spacing } from "@/constants/theme";
import { useCharacter } from "@/context/character";
import { createCharacter } from "@/services/character";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function CreateCharacter() {
  const { reloadCharacter } = useCharacter();
  const [name, setName] = useState("");

  async function handleStartAdventure() {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const character = await createCharacter(trimmedName);

    if (character) {
      await reloadCharacter();
      router.replace("/");
    }
  }

  return (
    <Page>
      <View style={styles.header}>
        <Title>Forge ton héros</Title>

        <Body muted style={styles.subtitle}>
          Toute grande aventure commence par un nom. Choisis celui qui
          accompagnera ton héros tout au long de son voyage.
        </Body>
      </View>

      <Card style={styles.card}>
        <View style={styles.avatar}>
          <Heading>?</Heading>
        </View>

        <Heading style={styles.sectionTitle}>Ton héros</Heading>

        <FormInput
          label="Nom du héros"
          value={name}
          onChangeText={setName}
          placeholder="Entre le nom de ton héros"
          maxLength={20}
          autoCapitalize="words"
          autoCorrect={false}
        />

        <Body muted style={styles.help}>
          Tu pourras le retrouver dans toutes tes quêtes et ta progression.
        </Body>

        <PrimaryButton
          title="Commencer l'aventure"
          subtitle="Entrer dans le camp"
          onPress={handleStartAdventure}
          disabled={!name.trim()}
        />
      </Card>
    </Page>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: Spacing.xl,
  },

  subtitle: {
    marginTop: Spacing.sm,
  },

  card: {
    gap: Spacing.xl,
  },

  avatar: {
    width: 96,
    height: 96,
    alignSelf: "center",
    borderRadius: Radius.xl,
    backgroundColor: Colors.card,
    justifyContent: "center",
    alignItems: "center",
  },

  sectionTitle: {
    textAlign: "center",
  },

  help: {
    textAlign: "center",
  },
});
