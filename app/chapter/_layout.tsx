import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Chapter() {
	return (
		<>
			<StatusBar style="light" />
			<Slot />
		</>
	);
}
