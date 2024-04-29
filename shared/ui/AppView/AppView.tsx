import { View, ViewStyle } from 'react-native';
import React from 'react';

type AppViewType = {
	children?: React.ReactNode;
	style?: ViewStyle;
	backgroundColor?: string;
	borderColor?: string;
};

const AppView = ({ children, style, borderColor, backgroundColor }: AppViewType) => {
	return <View style={{ borderColor, backgroundColor, ...style }}>{children}</View>;
};

export default AppView;
