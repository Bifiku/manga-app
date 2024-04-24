import { TextInputProps } from "react-native";

export interface AppInputProps extends Partial<TextInputProps> {
  placeholder: string;
  style?: {};
  secureTextEntry?: boolean;
}
