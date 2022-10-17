import React from "react";
import { View, Text } from "react-native";
import { useColorScheme } from "nativewind";

interface TimerSegmentProps {
  content: string;
}

function TimerSegment({ content }: TimerSegmentProps) {
  const { colorScheme } = useColorScheme();
  return (
    <View className="rounded-xl w-[78] items-center justify-center border-2 border-[#696564]">
      <Text
        style={{
          fontSize: 108,
          marginBottom: -10,
          fontFamily: "Rajdhani_600SemiBold",
          color: colorScheme === "light" ? "#474342" : "#F4F4F4",
        }}
      >
        {content[0]}
      </Text>
    </View>
  );
}

export { TimerSegment };
