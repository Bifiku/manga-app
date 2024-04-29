import { View, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import { THEME } from '../../theme';

type WrapperType = {
	children: React.ReactNode;
	style?: ViewStyle;
	borderColor?: string;
};

const Wrapper = ({ children, style, borderColor = THEME.MAIN_COLOR }: WrapperType) => {
	return <View style={{ ...styles.chapter, borderColor, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
	chapter: {
		flexDirection: 'row',
		padding: 8,
		borderRadius: 24,
		borderColor: THEME.MAIN_COLOR,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});

export default Wrapper;
