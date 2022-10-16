import { MotiView } from "@motify/components";
import { useMemo } from "react";
import { Pressable, View } from "react-native";
import { Easing } from "react-native-reanimated";
import { MotiTransitionProp } from "moti";
import { Ionicons } from "@expo/vector-icons";

interface SwitchProps {
  size: number;
  onPress: () => void;
  isActive?: boolean;
  activeIcon?: React.ReactNode;
  inactiveIcon?: React.ReactNode;
  activeColor?: string;
  inactiveColor?: string;
}

const transition: MotiTransitionProp = {
  type: "timing",
  duration: 300,
  easing: Easing.inOut(Easing.ease),
};

function Switch({
  size,
  onPress,
  activeIcon,
  inactiveIcon,
  activeColor,
  inactiveColor,
  isActive = false,
}: SwitchProps) {
  const trackWidth = useMemo(() => {
    return size * 1;
  }, [size]);

  const trackHeight = useMemo(() => {
    return size * 0.4444;
  }, [size]);

  return (
    <Pressable onPress={onPress}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {/* track */}
        <MotiView
          transition={transition}
          from={{
            backgroundColor: isActive ? inactiveColor : activeColor,
          }}
          animate={{
            backgroundColor: isActive ? activeColor : inactiveColor,
          }}
          style={{
            position: "relative",
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight / 2,
            backgroundColor: activeColor,
          }}
        />

        {/* button */}
        <MotiView
          transition={transition}
          animate={{
            translateX: isActive ? trackWidth / 4 : -trackWidth / 4,
            backgroundColor: isActive ? activeColor : inactiveColor,
          }}
          style={{
            width: trackHeight,
            height: trackHeight,
            borderRadius: size / 2,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            backgroundColor: "red",
          }}
        >
          {/* button indicator */}
          <MotiView
            style={{ position: "absolute" }}
            transition={transition}
            animate={{ opacity: isActive ? 0 : 1 }}
          >
            {/* <Ionicons name="pause" color="#fff" /> */}
            {activeIcon || <Ionicons name="close" size={16} />}
          </MotiView>

          <MotiView
            style={{ position: "absolute" }}
            transition={transition}
            animate={{ opacity: isActive ? 1 : 0 }}
          >
            {/* <Ionicons name="play" color="#fff" /> */}
            {inactiveIcon || (
              <Ionicons name="checkmark" size={14} color="#fff" />
            )}
          </MotiView>
          <MotiView />
        </MotiView>
      </View>
    </Pressable>
  );
}

export { Switch };
