import { Dimensions } from "react-native";

export default function fontScale(value) {
    return value * Dimensions.get("screen").fontScale
}