import { StyleSheet, TouchableOpacity, View, LayoutChangeEvent } from 'react-native';
import { AppText } from '../AppTexts/AppText';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles, THEME } from '../../theme';
import { MotiView } from 'moti';
import { useEffect, useState } from 'react';
import { Easing } from 'react-native-reanimated';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/hooks';
import {
	setContentRating,
	setOrder,
	setStatus,
} from '../../../app/store/slices/categorySlice.slice';
import { ICategoryButton } from './CategoryButton.type';

const CategoryButton = ({
	array,
	title,
	arrowEnabled = false,
	arrowShow = true,
	resetTitleHandler,
	resetState = false,
}: ICategoryButton) => {
	const { user } = useAppSelector((state) => state.userSlice);
	const { order } = useAppSelector((state) => state.categorySlice);
	const dispatch = useAppDispatch();
	const [pressing, setPressing] = useState<boolean>(false);
	const [viewSize, setViewSize] = useState({ width: 0, height: 0 });
	const [rotate, setRotate] = useState<string>('0deg');
	const [newTitle, setNewTitle] = useState(title);
	useEffect(() => {
		if (arrowEnabled) {
			for (const key in order) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				if (order[key] === 'asc') {
					setRotate('180deg');
				} else {
					setRotate('0deg');
				}
			}
		}
	}, [order]);

	useEffect(() => {
		if (resetState) {
			setNewTitle(title);
		}
	}, [resetState]);

	const handleLayout = (event: LayoutChangeEvent) => {
		const { width, height } = event.nativeEvent.layout;
		setViewSize({ width, height });
	};

	const handlePressing = () => {
		if (!arrowShow) {
			if (resetTitleHandler) resetTitleHandler();
			dispatch(setOrder(null));
			dispatch(setContentRating(null));
			dispatch(setStatus(null));
		}
		if (arrowShow) {
			setPressing((prevState) => !prevState);
		}
	};
	const categorySelectionHandler = (item: string) => {
		setNewTitle(item);
		dispatch(setOrder(item));
		dispatch(setContentRating(item));
		dispatch(setStatus(item));
		setPressing(false);
	};

	return (
		<MotiView
			from={{ scale: 0.1 }}
			animate={{ scale: 1 }}
			style={styles.container}
			transition={{ type: 'spring', damping: 10, stiffness: 65 }}
		>
			<MotiView
				style={{ ...styles.content, backgroundColor: user.colorTheme }}
				animate={{
					height: !pressing ? 37 : viewSize.height + 35,
				}}
				transition={{
					type: 'timing',
					duration: 500,
					easing: Easing.out(Easing.poly(5)),
				}}
			>
				<TouchableOpacity
					style={{
						...styles.defaultContent,
						borderBottomWidth: pressing ? 1 : 0,
						backgroundColor: user.colorTheme,
					}}
					onPress={handlePressing}
					activeOpacity={0.7}
				>
					<View style={styles.defaultView}>
						<AppText fontSize={14} fontFamily="Poppins-Regular">
							{newTitle}
						</AppText>
						{arrowShow && (
							<Ionicons
								name="arrow-down-outline"
								size={14}
								color={THEME.TEXT_COLOR}
								style={{ transform: [{ rotate: rotate }] }}
							/>
						)}
					</View>
				</TouchableOpacity>
				{pressing && array && (
					<View onLayout={handleLayout} style={globalStyles.width}>
						{array.map((item, index) => {
							return (
								<TouchableOpacity
									style={styles.customContent}
									key={item + index.toString()}
									onPress={() => categorySelectionHandler(item)}
									activeOpacity={0.7}
								>
									<View style={{ paddingHorizontal: 10 }}>
										<AppText fontSize={14} fontFamily="Poppins-Regular">
											{item}
										</AppText>
									</View>
								</TouchableOpacity>
							);
						})}
					</View>
				)}
			</MotiView>
		</MotiView>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 15,
	},
	defaultContent: {
		width: '100%',
		paddingVertical: 8,
	},
	defaultView: {
		paddingHorizontal: 10,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
	customContent: {
		width: '100%',
		borderBottomWidth: 1,
		paddingVertical: 10,
	},
	content: {
		alignItems: 'flex-start',
		borderRadius: 15,
		overflow: 'hidden',
		width: '100%',
	},
});

export default CategoryButton;
