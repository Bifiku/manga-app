import { StyleSheet } from 'react-native';

export const THEME = {
	MAIN_COLOR: '#DA0037',
	SECOND_COLOR: '#444444',
	TEXT_COLOR: '#EDEDED',
	BACKGROUND_COLOR: '#171717',
};

export const DIMENSIONS = {
	padding: 16,
	margin: 16,
};

export const globalStyles = StyleSheet.create({
	width: { width: '100%' },
	globalPadding: { padding: DIMENSIONS.padding },
	globalMargin: { margin: DIMENSIONS.margin },
	marginRight: { marginRight: DIMENSIONS.margin },
	marginLeft: { marginLeft: DIMENSIONS.margin },
	marginTop: { marginTop: DIMENSIONS.margin },
	marginBottom: { marginBottom: DIMENSIONS.margin },
});
