import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";

async function storageTheme(theme: "light" | "dark") {
  try {
    const convertedColorScheme = JSON.stringify(theme);
    await AsyncStorage.setItem("@pomodoro:theme", convertedColorScheme);
  } catch (e) {
    console.log("Error while trying to store theme");
  }
}

export { storageTheme };
