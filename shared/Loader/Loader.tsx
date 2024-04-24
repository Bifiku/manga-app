import { View, ActivityIndicator, ViewStyle } from 'react-native';
import { THEME } from '../theme';
import React from 'react';

const Loader = ({ style, size = 'large' }: { style?: ViewStyle; size?: 'large' | 'small' }) => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', ...style }}>
			<ActivityIndicator size={size} color={THEME.MAIN_COLOR} />
		</View>
	);
};

export default Loader;
