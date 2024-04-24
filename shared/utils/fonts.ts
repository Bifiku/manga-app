import { useFonts } from "expo-font";

export const loadFonts = async () => {
  return await useFonts({
    "Oswald-Bold": require("../../assets/fonts/Oswald-Bold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
  });
};
