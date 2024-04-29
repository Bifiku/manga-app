import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../widgets/headers/Header';

export default function Detail() {
	return (
		<SafeAreaView style={{ paddingTop: 8 }}>
			<StatusBar style="light" />
			<Header title="Profile" />
			<Slot />
		</SafeAreaView>
	);
}
