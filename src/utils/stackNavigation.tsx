import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";

function stackNavigation() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return navigation;
}

export { stackNavigation };
