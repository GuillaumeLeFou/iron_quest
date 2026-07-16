import { AnimatedFrameSprite } from "@/components/game/AnimatedSprite";
import { SPRITE_SIZE } from "@/constants/size";
import { Border, Colors, Radius, Spacing } from "@/constants/theme";
import { useCharacter } from "@/context/character";
import { getXpPercentage, getXpRequiredForLevel } from "@/models/progression";
import { Redirect, router } from "expo-router";
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
  const { character, isLoading } = useCharacter();
  if (isLoading || !character) return <Redirect href="/auth/login" />;

  const xpPercentage = getXpPercentage(character.level, character.xp);
  const xpRequired = getXpRequiredForLevel(character.level);
  return (
    <View style={styles.container}>
      <Image source={CampBackground} style={styles.background} />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.characterInfo}>
            <Text style={styles.name}>{character.name}</Text>
            <Text style={styles.level}>Niveau {character.level}</Text>
          </View>

          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeText}>{character.level}</Text>
          </View>
        </View>

        <View style={styles.xpHeader}>
          <Text style={styles.xpLabel}>Progression</Text>

          <Text style={styles.xpText}>
            {character.xp} / {xpRequired} XP
          </Text>
        </View>

        <View style={styles.xpBar}>
          <View style={[styles.xpFill, { width: `${xpPercentage}%` }]} />
        </View>
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
    top: 58,
    left: 18,
    right: 18,
    zIndex: 30,

    paddingVertical: 6,
    paddingHorizontal: 8,

    backgroundColor: "rgba(0,0,0,0.18)",

    borderRadius: Radius.md,
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.md,
  },

  characterInfo: {
    flex: 1,
  },

  name: {
    color: Colors.text,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "800",
  },

  level: {
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "600",
  },

  levelBadge: {
    width: 44,
    height: 44,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: Colors.primarySoft,

    borderWidth: Border.thin,
    borderColor: Colors.primary,
    borderRadius: Radius.pill,
  },

  levelBadgeText: {
    color: Colors.primary,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "800",
  },

  xpHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.md,

    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },

  xpLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
  },

  xpText: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
  },

  xpBar: {
    width: "100%",
    height: 10,

    overflow: "hidden",

    backgroundColor: Colors.cardSoft,

    borderWidth: Border.thin,
    borderColor: Colors.border,
    borderRadius: Radius.pill,
  },

  xpFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
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

    minHeight: 64,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,

    backgroundColor: "rgba(26, 29, 36, 0.94)",

    borderWidth: Border.thin,
    borderColor: Colors.primary,
    borderRadius: Radius.xl,

    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 7,
    zIndex: 40,
  },

  trainingButtonPressed: {
    opacity: 0.78,
    transform: [{ translateY: 2 }],
  },

  trainingTitle: {
    color: Colors.primary,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
    textAlign: "center",
  },

  trainingSubtitle: {
    color: Colors.textMuted,
    marginTop: Spacing.xs,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
