import { DIMENSIONS, THEME } from '../../shared/theme';
import { AppText } from '../../shared/ui/AppTexts/AppText';
import { MotiView } from 'moti';

const PopUp = ({ isError, posY = -55 }: { isError: boolean; posY?: number }) => {
	return (
		<MotiView
			from={{ translateY: -200, opacity: 0 }}
			animate={{ translateY: isError ? posY : -200, opacity: 0.9 }}
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

export default PopUp;
