import { StyleSheet, TextInput } from 'react-native';
import { AppInputProps } from './AppInput.props';

export const AppInput = ({ placeholder, style, ...props }: AppInputProps) => {
	return <TextInput style={{ ...styles.default, ...style }} placeholder={placeholder} {...props} />;
};

const styles = StyleSheet.create({
	default: {
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: '#ff3c3c',
		borderStyle: 'solid',
		borderWidth: 2,
		padding: 10,
		borderRadius: 25,
		fontSize: 18,
	},
});
