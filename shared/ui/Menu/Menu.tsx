import { View, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { DIMENSIONS, THEME } from '../../theme';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import AppView from '../AppView/AppView';
import { useAppSelector } from '../../../app/hooks/hooks';

const widthMenu = 300;

export const Menu = () => {
	const { width } = useWindowDimensions();
	const { colorTheme } = useAppSelector((state) => state.userSlice);
	return (
		<AppView
			style={{ ...styles.default, left: width / 2 - widthMenu / 2 }}
			backgroundColor={colorTheme}
		>
			<Link href="/" asChild style={styles.link}>
				<TouchableOpacity activeOpacity={0.5}>
					<Feather name="home" size={24} color="white" />
				</TouchableOpacity>
			</Link>
			<Link href="/favorites" asChild style={styles.link}>
				<TouchableOpacity activeOpacity={0.5}>
					<MaterialIcons name="favorite-outline" size={24} color="white" />
				</TouchableOpacity>
			</Link>
			<Link href="/profile" asChild style={styles.link}>
				<TouchableOpacity activeOpacity={0.5}>
					<Feather name="user" size={24} color="white" />
				</TouchableOpacity>
			</Link>
		</AppView>
	);
};

const styles = StyleSheet.create({
	default: {
		position: 'absolute',
		bottom: DIMENSIONS.padding * 2,
		flex: 1,
		height: 65,
		width: widthMenu,
		borderRadius: 32,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		flexDirection: 'row',
		elevation: 8,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.5,
		opacity: 1,
	},
	link: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 15,
	},
});
