import { Colors, Radius, Spacing } from "@/constants/theme";
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

type TabIconProps = {
  icon: string;
  label: string;
  focused: boolean;
};

function TabIcon({ icon, label, focused }: TabIconProps) {
  return (
    <View style={styles.tabItem}>
      <Text
        style={[
          styles.tabIcon,
          {
            color: focused ? Colors.primary : Colors.textMuted,
          },
        ]}
      >
        {icon}
      </Text>

      <Text
        style={[
          styles.tabLabel,
          {
            color: focused ? Colors.primary : Colors.textMuted,
          },
        ]}
      >
        {label}
      </Text>

      <View
        style={[
          styles.activeIndicator,
          {
            backgroundColor: focused ? Colors.primary : "transparent",
          },
        ]}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: {
          width: "100%",
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="⛺" label="Camp" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="quests"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📜" label="Quêtes" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="achievements"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🏆" label="Exploits" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🛡️" label="Profil" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 82,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: -4,
    },
  },

  tabBarItem: {
    height: 66,
  },

  tabItem: {
    width: 80,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
  },

  tabIcon: {
    fontSize: 23,
    lineHeight: 27,
  },

  tabLabel: {
    marginTop: 2,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
    textDecorationLine: "none",
  },

  activeIndicator: {
    width: 18,
    height: 4,
    marginTop: 5,
    borderRadius: Radius.pill,
  },
});
