import "react-native-gesture-handler";
import "react-native-reanimated";
import { useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Home } from "./src/pages/Home";
import { Customize } from "./src/pages/Customize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";

import {
  useFonts,
  Rajdhani_400Regular,
  Rajdhani_600SemiBold,
  Rajdhani_700Bold,
} from "@expo-google-fonts/rajdhani";

import { Inter_400Regular } from "@expo-google-fonts/inter";

export type RootStackParamList = {
  Home: {};
  Customize: {};
};

const Stack = createStackNavigator();

export default function App() {
  const { setColorScheme, colorScheme } = useColorScheme();

  // Getting stored theme from AsyncStorage
  const handleGetTheme = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@pomodoro:theme");

      if (jsonValue != null) {
        const storedTheme = await JSON.parse(jsonValue);
        setColorScheme(storedTheme);
      }
    } catch (e) {
      console.log("Error while trying to rescue the stored theme");
    }
  }, []);

  useEffect(() => {
    handleGetTheme();
  });

  let [fontsLoaded] = useFonts({
    Rajdhani_400Regular,
    Rajdhani_600SemiBold,
    Rajdhani_700Bold,
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Customize" component={Customize} />
      </Stack.Navigator>
      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        backgroundColor={colorScheme === "light" ? "#fff" : "#202124"}
      />
    </NavigationContainer>
  );
}
