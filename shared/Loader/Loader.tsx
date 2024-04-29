import { View, ActivityIndicator, ViewStyle } from 'react-native';
import React from 'react';
import { useAppSelector } from '../../app/hooks/hooks';

const Loader = ({ style, size = 'large' }: { style?: ViewStyle; size?: 'large' | 'small' }) => {
	const { colorTheme } = useAppSelector((state) => state.userSlice);

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', ...style }}>
			<ActivityIndicator size={size} color={colorTheme} />
		</View>
	);
};

export default Loader;
