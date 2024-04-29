import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { THEME } from '../../shared/theme';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AddFavorites from '../../features/addFavorites/addFavorites';

const Hud = ({ id }: { id?: string }) => {
	const route = useRouter();

	return (
		<SafeAreaView style={styles.icons}>
			<TouchableOpacity onPress={route.back} style={styles.icon}>
				<Ionicons name="arrow-back-outline" size={24} color={THEME.TEXT_COLOR} />
			</TouchableOpacity>
			<View style={styles.groupIcons}>
				<AddFavorites id={id} />
				<TouchableOpacity style={styles.icon}>
					<Feather name="share-2" size={24} color={THEME.TEXT_COLOR} />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	icons: {
		position: 'absolute',
		paddingTop: 8,
		paddingHorizontal: 6,
		width: '100%',
		justifyContent: 'space-between',
		flexDirection: 'row',
		zIndex: 999,
		alignItems: 'center',
	},
	icon: {
		padding: 10,
	},
	groupIcons: {
		flexDirection: 'row',
		gap: 6,
		alignItems: 'center',
	},
});

export default Hud;
