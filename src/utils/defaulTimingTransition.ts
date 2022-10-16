import { MotiTransitionProp } from "moti";
import { Easing } from "react-native-reanimated";

const transition: MotiTransitionProp = {
  type: "timing",
  duration: 300,
  easing: Easing.inOut(Easing.ease),
};

export { transition };
