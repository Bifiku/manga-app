import { Slot } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderList from '../../widgets/headers/Header';
import { StatusBar } from 'expo-status-bar';
export default function listMangas() {
	return (
		<SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
			<StatusBar style="light" />
			<HeaderList title="Manga list" />
			<Slot />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
