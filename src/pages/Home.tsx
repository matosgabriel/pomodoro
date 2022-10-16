import "react-native-reanimated";
import { useCallback, useState } from "react";
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
  const navigation = stackNavigation();
  const [autoSwitchIsActive, setAutoSwitchIsActive] = useState(false);
  const [darkSwitchIsActive, setDarkSwitchIsActive] = useState(false);

  const { setColorScheme, colorScheme } = useColorScheme();

  // bg-white dark:bg-[#202124]

  return (
    <SafeAreaView className="flex flex-1 ">
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

          <View>
            <Text className="mt-6">Nome</Text>
            <View className="flex bg-white max-w rounded focus-within:border-1 ring-cyan-600">
              <TextInput
                className="max-w bg-gray-300 px-4 py-2 rounded"
                placeholder="John Doe"
              />
            </View>
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
