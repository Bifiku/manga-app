import { StyleSheet } from 'react-native';
import { DIMENSIONS, THEME } from '../../shared/theme';
import { AppText } from '../../shared/ui/AppTexts/AppText';
import { MotiView } from 'moti';

const PopUp = ({ isError }: { isError: boolean }) => {
	return (
		<MotiView
			from={{ translateY: -200, opacity: 0 }}
			animate={{ translateY: isError ? -55 : -200, opacity: 0.9 }}
			exit={{ translateY: -200, opacity: 0 }}
			style={{
				position: 'absolute',
				backgroundColor: THEME.SECOND_COLOR,
				zIndex: 999,
				alignItems: 'center',
				width: '100%',
				padding: DIMENSIONS.padding,
				borderRadius: 15,
			}}
		>
			<AppText fontSize={14}>This function will be available soon</AppText>
		</MotiView>
	);
};

const styles = StyleSheet.create({
	default: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default PopUp;
