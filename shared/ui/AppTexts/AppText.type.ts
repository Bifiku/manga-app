import { TextProps } from 'react-native';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type fontFamily = 'Oswald-Bold' | 'Poppins-Regular' | 'Poppins-Bold' | 'Poppins-Medium';

export interface AppTextType extends TextProps {
	style?: TextStyle;
	fontFamily?: fontFamily;
	fontSize?: number;
	color?: string;
}
