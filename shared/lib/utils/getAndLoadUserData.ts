import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '../../../app/store/slices/user/user.type';

export const getUserData = async () => {
	try {
		const jsonValue = await AsyncStorage.getItem('user');
		return jsonValue !== null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		console.log('Error getUserData AsyncStorage: ' + e);
	}
};

export const setUserData = async (value: UserType) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem('user', jsonValue);
	} catch (e) {
		console.log('Error setUserData AsyncStorage: ' + e);
	}
};
