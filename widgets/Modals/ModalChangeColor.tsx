import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import ColorPicker, { Panel3, Preview, Swatches } from 'reanimated-color-picker';
import { AppText } from '../../shared/ui/AppTexts/AppText';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';
import { changeColorTheme } from '../../app/store/slices/user/user.slice';
import { DIMENSIONS, THEME } from '../../shared/theme';
import { AntDesign } from '@expo/vector-icons';

interface IModalChangeColor {
	visible: boolean;
	onVisible: (b: boolean) => void;
}

const ModalChangeColor = ({ visible, onVisible }: IModalChangeColor) => {
	const { colorTheme } = useAppSelector((state) => state.userSlice);
	const [color, setColor] = useState<string>(colorTheme);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(changeColorTheme(color));
	}, [dispatch, color]);

	const resetAndClose = () => {
		setColor(THEME.MAIN_COLOR);
		onVisible(false);
	};
	return (
		<Modal
			animationType="slide"
			visible={visible}
			onRequestClose={() => {
				onVisible(!visible);
			}}
			presentationStyle="pageSheet"
		>
			<AntDesign
				name="closecircleo"
				size={24}
				color={THEME.TEXT_COLOR}
				style={{
					backgroundColor: THEME.BACKGROUND_COLOR,
					padding: DIMENSIONS.padding,
					textAlign: 'right',
				}}
				onPress={() => onVisible(false)}
			/>
			<View style={styles.centeredView}>
				<ColorPicker style={styles.colorPicker} onComplete={(e) => setColor(e.hex)}>
					<Preview />
					<Panel3 />
					<Swatches />
				</ColorPicker>
				<View style={styles.buttons}>
					<TouchableOpacity
						onPress={() => resetAndClose()}
						style={{ ...styles.button, borderColor: colorTheme }}
					>
						<AppText fontSize={18}>Reset</AppText>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => onVisible(false)}
						style={{ ...styles.button, borderColor: colorTheme }}
					>
						<AppText fontSize={18}>Save</AppText>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		width: '45%',
		borderWidth: 1,
		padding: 10,
		borderRadius: 15,
	},
	buttons: {
		width: '100%',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	centeredView: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: DIMENSIONS.padding,
		backgroundColor: THEME.BACKGROUND_COLOR,
	},
	colorPicker: {
		width: '100%',
		marginBottom: DIMENSIONS.margin,
	},
});

export default ModalChangeColor;
