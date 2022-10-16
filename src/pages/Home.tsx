import "react-native-reanimated";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
import { stackNavigation } from "../utils/stackNavigation";

import { SafeAreaView } from "react-native-safe-area-context";
import { Switch } from "../components/Switch";
import { Ionicons } from "@expo/vector-icons";

import { useColorScheme } from "nativewind";
import { storageTheme } from "../utils/storageTheme";
import { MotiView } from "@motify/components";

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
        <View className="flex flex-1 items-centers justify-between w-[90%] py-10 m-auto">
          <View className="w-[100%] justify-between flex-row">
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

          <View className="flex-row justify-between">
            <TimerSegment />
            <TimerSegment />

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

            <TimerSegment />
            <TimerSegment />
          </View>

          <View className="items-center">
            <Text className="text-base text-[#191716] dark:text-[#F4F4F4]">
              Swipe up to Information
            </Text>
            <Ionicons
              name="chevron-up"
              size={16}
              color={colorScheme === "dark" ? "#F4F4F4" : "#191716"}
              style={{ marginTop: 24 }}
            />
          </View>
        </View>
      </MotiView>
    </SafeAreaView>
  );
}

export { Home };
