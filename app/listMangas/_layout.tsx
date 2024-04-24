import { Slot } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderList from '../../widgets/headers/HeaderList';
import { StatusBar } from 'expo-status-bar';
export default function listMangas() {
	return (
		<SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
			<StatusBar style="light" />
			<HeaderList />
			<Slot />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
