import { Text, StyleSheet } from 'react-native';
import { AppTextType } from './AppText.type';
import { THEME } from '../../theme';

export const AppText = ({
	children,
	style,
	fontFamily = 'Poppins-Regular',
	fontSize = 12,
	color = THEME.TEXT_COLOR,
	...props
}: AppTextType) => {
	return (
		<Text style={{ ...styles.default, fontFamily, fontSize, color, ...style }} {...props}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	default: {
		fontSize: 12,
		color: THEME.TEXT_COLOR,
		fontFamily: 'Poppins-Regular',
	},
});
