import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Pressable } from 'expo-router/build/views/Pressable';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../../shared/theme';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const Hud = () => {
	const route = useRouter();

	return (
		<SafeAreaView style={styles.icons}>
			<TouchableOpacity onPress={route.back} style={styles.icon}>
				<Ionicons name="arrow-back-outline" size={24} color={THEME.TEXT_COLOR} />
			</TouchableOpacity>
			<View style={styles.groupIcons}>
				<TouchableOpacity style={styles.icon}>
					<MaterialIcons name="favorite-outline" size={24} color={THEME.TEXT_COLOR} />
				</TouchableOpacity>
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
