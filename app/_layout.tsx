import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { SplashScreen, Stack, usePathname, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { THEME } from '../shared/theme';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Menu } from '../shared/ui/Menu/Menu';

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
	const [fontsLoaded, fontError] = useFonts({
		'Oswald-Bold': require('../assets/fonts/Oswald-Bold.ttf'),
		'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
		'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
		'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
	});
	const pathname = usePathname();

	useEffect(() => {
		const loadFonts = async () => {
			if (fontsLoaded) {
				await SplashScreen.hideAsync();
			}
		};
		loadFonts();
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded) {
		return <ActivityIndicator style={styles.activity} size="large" color={THEME.MAIN_COLOR} />;
	}

	return (
		<Provider store={store}>
			<StatusBar style="light" />
			<SafeAreaProvider>
				<Stack
					screenOptions={{
						headerShown: false,
						headerStyle: {
							backgroundColor: THEME.BACKGROUND_COLOR,
						},
						contentStyle: { backgroundColor: THEME.BACKGROUND_COLOR },
					}}
				>
					<Stack.Screen name="index" />
					<Stack.Screen name="detail" />
					<Stack.Screen name="chapter" />
					<Stack.Screen name="listMangas" />
				</Stack>
			</SafeAreaProvider>
			{pathname !== '/chapter' && <Menu />}
		</Provider>
	);
}

const styles = StyleSheet.create({
	activity: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: THEME.BACKGROUND_COLOR,
	},
});
