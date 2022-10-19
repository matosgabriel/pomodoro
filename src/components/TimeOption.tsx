import { Text, View, Image, ImageSourcePropType } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface TimeOptionProps {
  description: string;
  iconSource: ImageSourcePropType;
  onPress?: () => void;
}

function TimeOption({ description, iconSource, onPress }: TimeOptionProps) {
  return (
    <View className="flex-column items-center">
      <TouchableOpacity
        onPress={onPress}
        className="items-center justify-center w-[76] h-[76] rounded-full bg-[#e8e8e8] dark:bg-[#303134]"
      >
        <Image source={iconSource} />
      </TouchableOpacity>
      <Text className="text-2 font-inter text-white mt-2 text-[#191716] dark:text-[#fff]">
        {description}
      </Text>
    </View>
  );
}

export { TimeOption };
