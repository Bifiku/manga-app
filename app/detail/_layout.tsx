import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function Detail() {
	return (
		<>
			<StatusBar style="light" />
			<Slot />
		</>
	);
}
