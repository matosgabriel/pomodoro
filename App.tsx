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

export type RootStackParamList = {
  Home: {};
  Customize: {};
};

const Stack = createStackNavigator();

export default function App() {
  const { setColorScheme, colorScheme } = useColorScheme();

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
