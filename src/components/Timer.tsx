import { useEffect, useState, useCallback } from "react";
import { View, Text } from "react-native";
import { useColorScheme } from "nativewind";

import { TimerSegment } from "./TimerSegment";
import { TouchableOpacity } from "react-native-gesture-handler";

interface TimerProps {
  minutes: string; // 2 digit value in string format
  seconds: string; // 2 digit value in string format
}

function Timer({ minutes, seconds }: TimerProps) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-row justify-between">
      <TimerSegment content={minutes[0]} />
      <TimerSegment content={minutes[1]} />

      <View className="items-center justify-center px-2">
        <Text
          style={{
            fontSize: 108,
            fontFamily: "Rajdhani_600SemiBold",
            color: colorScheme === "light" ? "#474342" : "#F4F4F4",
          }}
        >
          :
        </Text>
      </View>

      <TimerSegment content={seconds[0]} />
      <TimerSegment content={seconds[1]} />
    </View>
  );
}

export { Timer };
