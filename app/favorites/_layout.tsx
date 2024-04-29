import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Header from '../../widgets/headers/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

export default function Favorites() {
	return (
		<SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
			<StatusBar style="light" />
			<Header title="Favorites" />
			<Slot />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
