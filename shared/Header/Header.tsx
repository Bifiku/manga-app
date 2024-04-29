import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { DIMENSIONS, THEME } from '../theme';
import { AppText } from '../ui/AppTexts/AppText';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { IStyleProps } from '../types/types';
import { useAppSelector } from '../../app/hooks/hooks';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import AppView from '../ui/AppView/AppView';
export const Header = ({ style }: IStyleProps) => {
	const { user } = useAppSelector((state) => state.userSlice);
	return (
		<View style={{ ...styles.default, ...style }}>
			<Link href="/profile" asChild style={styles.link}>
				<TouchableOpacity>
					<View style={styles.profileInfo}>
						<AppView style={styles.avatar} backgroundColor={user.colorTheme}>
							<Image
								style={styles.placeHolder}
								contentFit="cover"
								placeholderContentFit="cover"
								placeholder={require('../../assets/icons/avatar.svg')}
							/>
						</AppView>

						<View>
							<AppText style={styles.greeting}>Good Morning</AppText>
							<AppText style={styles.name} fontFamily="Poppins-Bold" color={user.colorTheme}>
								{user.name}
							</AppText>
						</View>
					</View>
				</TouchableOpacity>
			</Link>

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
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		padding: 5,
	},
	greeting: {
		fontSize: 12,
		color: THEME.TEXT_COLOR,
		opacity: 0.75,
	},
	name: {
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
	placeHolder: {
		width: '100%',
		height: '100%',
	},
	link: {
		alignItems: 'center',
		justifyContent: 'center',
	},
});
