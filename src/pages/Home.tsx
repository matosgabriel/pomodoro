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
          backgroundColor: colorScheme === "light" ? "#fff" : "#202124",
        }}
      >
        {/* content */}
        <View className="flex items-centers justify-between w-[90%] h-[90%] m-auto">
          <View className="w-[100%] justify-between flex-row">
            <Switch
              onPress={() => setAutoSwitchIsActive((current) => !current)}
              size={72}
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
              size={72}
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

          <View className="row h-128">
            <TextInput
              className="h-[128] text-7xl w-[72] text-center leading-[78] bg-cyan-500"
              value="2"
            />
          </View>

          <TouchableHighlight
            className="px-4 py-3 bg-cyan-400 rounded items-center"
            underlayColor="#333"
            onPress={() => navigation.navigate("Customize", {})}
          >
            <Text className="font-bold text-white">Customize</Text>
          </TouchableHighlight>
        </View>
      </MotiView>
    </SafeAreaView>
  );
}

export { Home };
