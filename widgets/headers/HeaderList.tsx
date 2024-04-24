import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { THEME } from '../../shared/theme';
import { AppText } from '../../shared/ui/AppTexts/AppText';
import { useRouter } from 'expo-router';
import { useAppSelector } from '../../app/hooks/hooks';
import Loader from '../../shared/Loader/Loader';

const HeaderList = () => {
	const { loading } = useAppSelector((state) => state.categorySlice);
	const router = useRouter();

	return (
		<View style={styles.icons}>
			<TouchableOpacity onPress={router.back}>
				<Ionicons
					name="arrow-back-outline"
					size={24}
					color={THEME.TEXT_COLOR}
					style={styles.icon}
				/>
			</TouchableOpacity>
			<View style={{ position: 'relative' }}>
				<AppText fontSize={24} fontFamily="Oswald-Bold" style={styles.title}>
					Manga List
				</AppText>
				{loading && (
					<Loader size="small" style={{ flex: 0, position: 'absolute', right: -30, top: 10 }} />
				)}
			</View>
			<TouchableOpacity onPress={router.back}>
				<AntDesign name="search1" size={24} style={styles.icon} />
			</TouchableOpacity>
		</View>
	);
};

export default HeaderList;

const styles = StyleSheet.create({
	icons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	icon: {
		color: THEME.TEXT_COLOR,
		opacity: 0.75,
		padding: 16,
	},
	title: {
		color: THEME.TEXT_COLOR,
		textTransform: 'uppercase',
	},
});
