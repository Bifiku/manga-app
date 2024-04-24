import { View, StyleSheet } from 'react-native';
import { DIMENSIONS, THEME } from '../theme';
import { SvgUri } from 'react-native-svg';
import { AppText } from '../ui/AppTexts/AppText';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { IStyleProps } from '../types/types';
export const Header = ({ style }: IStyleProps) => {
	return (
		<View style={{ ...styles.default, ...style }}>
			<View style={styles.profileInfo}>
				<View style={styles.avatar}>
					<SvgUri uri="https://res.cloudinary.com/dzdicfypl/image/upload/v1706831542/avatars/user.svg" />
				</View>
				<View>
					<AppText style={styles.greeting}>Good Morning</AppText>
					<AppText style={styles.name} fontFamily="Poppins-Bold">
						Гость
					</AppText>
				</View>
			</View>
			<View style={styles.icons}>
				<AntDesign name="search1" size={24} style={styles.icon} />
				<Ionicons name="notifications-outline" size={24} style={styles.icon} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	default: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: DIMENSIONS.padding,
		marginBottom: 24,
	},
	profileInfo: {
		flex: 1,
		flexDirection: 'row',
		gap: 10,
	},
	avatar: {
		borderRadius: 100,
		backgroundColor: THEME.MAIN_COLOR,
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},
	greeting: {
		fontSize: 12,
		color: THEME.TEXT_COLOR,
		opacity: 0.75,
	},
	name: {
		color: THEME.MAIN_COLOR,
		fontSize: 16,
	},
	icons: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 16,
	},
	icon: {
		color: THEME.TEXT_COLOR,
		opacity: 0.75,
	},
});
