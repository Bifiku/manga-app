import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import HUD from '../../widgets/HUD/HUD';

export default function Detail() {
	return (
		<>
			<StatusBar style="light" />
			<HUD />
			<Slot />
		</>
	);
}
