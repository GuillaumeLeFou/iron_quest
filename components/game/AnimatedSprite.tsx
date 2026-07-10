import { useEffect, useState } from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

type Props = {
  frames: ImageSourcePropType[];
  width: number;
  height: number;
  fps?: number;
};

export function AnimatedFrameSprite({ frames, width, height, fps = 5 }: Props) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [frames.length, fps]);

  return (
    <View style={{ width, height }}>
      <Image source={frames[frame]} style={styles.image} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});
