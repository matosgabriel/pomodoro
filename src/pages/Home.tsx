import "react-native-reanimated";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { stackNavigation } from "../utils/stackNavigation";

import { SafeAreaView } from "react-native-safe-area-context";
import { Switch } from "../components/Switch";
import { Ionicons } from "@expo/vector-icons";

import { useColorScheme } from "nativewind";
import { storageTheme } from "../utils/storageTheme";
import { MotiView, MotiText } from "@motify/components";

import { transition } from "../utils/defaulTimingTransition";
import { TimerSegment } from "../components/TimerSegment";

function Home() {
  const { setColorScheme, colorScheme } = useColorScheme();

  const navigation = stackNavigation();
  const [autoSwitchIsActive, setAutoSwitchIsActive] = useState(false);
  const [darkSwitchIsActive, setDarkSwitchIsActive] = useState(
    () => colorScheme === "dark"
  );

  useEffect(() => {
    setDarkSwitchIsActive(colorScheme === "dark");
  }, [colorScheme]);

  return (
    <SafeAreaView className="flex flex-1">
      <MotiView
        style={{
          display: "flex",
          flex: 1,
        }}
        transition={transition}
        animate={{
          backgroundColor: colorScheme === "light" ? "#fff" : "#202124",
        }}
      >
        {/* content */}
        <View className="flex flex-1 items-centers justify-between w-[90%] py-5 m-auto">
          {/* header */}
          <View className="w-[100%] h-[96] justify-between flex-row items-center">
            <Switch
              onPress={() => setAutoSwitchIsActive((current) => !current)}
              size={76}
              isActive={autoSwitchIsActive}
              activeColor={"#6372E0"}
              inactiveColor={colorScheme === "light" ? "#E8E8E8" : "#303134"}
              inactiveIcon={<Ionicons name="play" color="#fff" size={12} />}
              activeIcon={<Ionicons name="pause" color="#fff" size={12} />}
            />

            <Switch
              onPress={() => {
                setDarkSwitchIsActive((current) => {
                  setColorScheme(current === true ? "light" : "dark");
                  storageTheme(current === true ? "light" : "dark");
                  return !current;
                });
              }}
              size={76}
              isActive={darkSwitchIsActive}
              activeColor={"#303134"}
              inactiveColor={"#e8e8e8"}
              inactiveIcon={
                <Ionicons name="moon-sharp" color="#fff" size={12} />
              }
              activeIcon={
                <Ionicons name="sunny-outline" color="#fff" size={16} />
              }
            />
          </View>

          {/* timer */}
          <View className="flex-row justify-between">
            <TimerSegment content="1" />
            <TimerSegment content="2" />

            <View className="items-center justify-center px-2">
              <Text
                style={{
                  fontSize: 82,
                  fontFamily: "Rajdhani_700Bold",
                  color: colorScheme === "light" ? "#474342" : "#F4F4F4",
                }}
              >
                :
              </Text>
            </View>

            <TimerSegment content="5" />
            <TimerSegment content="0" />
          </View>

          {/* footer */}
          <View className="items-center h-[96]">
            <MotiText
              style={{
                fontSize: 16,
                color: colorScheme === "dark" ? "#F4F4F4" : "#191716",
                fontFamily: "Inter_400Regular",
              }}
              from={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 600,
                loop: true,
                type: "timing",
                duration: 800,
              }}
            >
              Swipe up to Information
            </MotiText>

            <MotiView
              from={{
                translateY: 20,
              }}
              animate={{
                translateY: 0,
              }}
              transition={{
                delay: 600,
                loop: true,
                type: "timing",
                duration: 800,
              }}
            >
              <Ionicons
                name="chevron-up"
                size={16}
                color={colorScheme === "dark" ? "#F4F4F4" : "#191716"}
                style={{ marginTop: 24 }}
              />
            </MotiView>
          </View>
        </View>
      </MotiView>
    </SafeAreaView>
  );
}

export { Home };
