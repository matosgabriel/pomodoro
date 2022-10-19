import "react-native-reanimated";
import { useCallback, useEffect, useState } from "react";
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
import { TimeOption } from "../components/TimeOption";

import TomatoIcon from "../../assets/tomato-icon.png";
import SlugIcon from "../../assets/slug-icon.png";
import LightiningIcon from "../../assets/lightining-icon.png";
import PlusIcon from "../../assets/plus-icon.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Timer } from "../components/Timer";

function Home() {
  const { setColorScheme, colorScheme } = useColorScheme();

  const navigation = stackNavigation();
  const [autoSwitchIsActive, setAutoSwitchIsActive] = useState(false);
  const [darkSwitchIsActive, setDarkSwitchIsActive] = useState(false);

  useEffect(() => {
    setDarkSwitchIsActive(colorScheme === "dark");
  }, [colorScheme]);

  const [minutesCount, setMinutesCount] = useState(0);
  const [secondsCount, setSecondsCount] = useState(0);

  const [timerIsCounting, setTimerIsCounting] = useState(false);

  function convertToTwoDigit(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
  }

  // implements time counter functionability (go to zero)
  useEffect(() => {
    if (timerIsCounting) {
      let myInterval = setInterval(() => {
        if (secondsCount > 0) {
          setSecondsCount(secondsCount - 1);
        }
        if (secondsCount === 0) {
          if (minutesCount === 0) {
            clearInterval(myInterval);
            setTimerIsCounting(false);
          } else {
            setMinutesCount(minutesCount - 1);
            setSecondsCount(59);
          }
        }
      }, 1000);

      console.log(`${minutesCount}:${secondsCount}`);

      return () => {
        clearInterval(myInterval);
      };
    }
  });

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

          {/* main content */}
          <View>
            {/* timer */}
            <Timer
              minutes={convertToTwoDigit(minutesCount)}
              seconds={convertToTwoDigit(secondsCount)}
            />

            {/* time options */}
            <View className="flex-row justify-between mt-[32]">
              <TimeOption
                description="25 min"
                iconSource={TomatoIcon}
                onPress={() => {
                  setMinutesCount(25);
                  setSecondsCount(0);

                  setTimerIsCounting(true);
                }}
              />

              <TimeOption
                description="15 min"
                iconSource={SlugIcon}
                onPress={() => {
                  setMinutesCount(15);
                  setSecondsCount(0);

                  setTimerIsCounting(true);
                }}
              />

              <TimeOption
                description="5 min"
                iconSource={LightiningIcon}
                onPress={() => {
                  setMinutesCount(5);
                  setSecondsCount(0);

                  setTimerIsCounting(true);
                }}
              />

              <TimeOption description="Add" iconSource={PlusIcon} />
            </View>
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
              Read about
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
