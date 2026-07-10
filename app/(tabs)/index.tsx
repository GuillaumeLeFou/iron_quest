import { AnimatedFrameSprite } from "@/components/game/AnimatedSprite";
import { SPRITE_SIZE } from "@/constants/size";
import { Colors, Radius, Spacing } from "@/constants/theme";
import { useCharacter } from "@/context/character";
import { getXpPercentage, getXpRequiredForLevel } from "@/models/progression";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const CampBackground = require("@/assets/backgrounds/camp_1.png");

const CampFireFrames = [
  require("@/assets/campfire/campfire_0001.png"),
  require("@/assets/campfire/campfire_0002.png"),
  require("@/assets/campfire/campfire_0003.png"),
];

const MasterFrames = [
  require("@/assets/master/master_0001.png"),
  require("@/assets/master/master_0002.png"),
  require("@/assets/master/master_0003.png"),
];

export default function HomeScreen() {
  const { character } = useCharacter();

  const xpPercentage = getXpPercentage(character.level, character.xp);
  const xpRequired = getXpRequiredForLevel(character.level);

  return (
    <View style={styles.container}>
      <Image source={CampBackground} style={styles.background} />

      <View style={styles.header}>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.level}>Niveau {character.level}</Text>

        <View style={styles.xpBar}>
          <View style={[styles.xpFill, { width: `${xpPercentage}%` }]} />
        </View>

        <Text style={styles.xpText}>
          {character.xp} / {xpRequired} XP
        </Text>
      </View>

      <Pressable
        style={styles.tentZone}
        onPress={() => router.push("/profile")}
      />

      <Pressable
        style={styles.questBoardZone}
        onPress={() => router.push("/quests")}
      />

      <Pressable
        style={styles.masterZone}
        onPress={() =>
          console.log("Master cliqué : ouvrir dialogue / quête principale")
        }
      >
        <AnimatedFrameSprite
          frames={MasterFrames}
          width={SPRITE_SIZE.MASTER}
          height={SPRITE_SIZE.MASTER}
          fps={3}
        />
      </Pressable>

      <View style={styles.campFire}>
        <AnimatedFrameSprite
          frames={CampFireFrames}
          width={SPRITE_SIZE.CAMPFIRE}
          height={SPRITE_SIZE.CAMPFIRE}
          fps={5}
        />
      </View>

      <Pressable
        onPress={() => router.push("/workout")}
        style={({ pressed }) => [
          styles.trainingButton,
          pressed && styles.trainingButtonPressed,
        ]}
      >
        <Text style={styles.trainingTitle}>Camp d'entraînement</Text>
        <Text style={styles.trainingSubtitle}>Commencer une séance</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  header: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    zIndex: 30,
  },

  name: {
    color: Colors.text,
    fontSize: 26,
    fontWeight: "900",
  },

  level: {
    color: Colors.primary,
    marginTop: Spacing.xs,
    fontWeight: "700",
  },

  xpBar: {
    marginTop: 10,
    height: 12,
    borderRadius: Radius.sm,
    overflow: "hidden",
    backgroundColor: "rgba(17, 19, 24, 0.65)",
  },

  xpFill: {
    height: "100%",
    backgroundColor: Colors.primary,
  },

  xpText: {
    color: Colors.text,
    marginTop: 6,
    fontWeight: "600",
  },

  tentZone: {
    position: "absolute",
    left: 18,
    bottom: 350,
    width: 180,
    height: 190,
    zIndex: 20,
  },

  questBoardZone: {
    position: "absolute",
    right: 18,
    bottom: 355,
    width: 165,
    height: 170,
    zIndex: 20,
  },

  masterZone: {
    position: "absolute",
    left: 1,
    bottom: 275,
    width: SPRITE_SIZE.MASTER,
    height: SPRITE_SIZE.MASTER,
    zIndex: 25,
  },

  campFire: {
    position: "absolute",
    left: "50%",
    bottom: 245,
    marginLeft: -(SPRITE_SIZE.CAMPFIRE / 2),
    zIndex: 22,
  },

  trainingButton: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 30,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: Radius.xl,
    paddingVertical: 16,
    paddingHorizontal: 18,
    zIndex: 40,
  },

  trainingButtonPressed: {
    opacity: 0.75,
    transform: [{ translateY: 2 }],
  },

  trainingTitle: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
  },

  trainingSubtitle: {
    color: Colors.textMuted,
    marginTop: Spacing.xs,
    textAlign: "center",
    fontWeight: "600",
  },
});
