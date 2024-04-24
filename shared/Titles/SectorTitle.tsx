import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '../ui/AppTexts/AppText';
import { THEME } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';
import { useEffect } from 'react';
import {
	createdAt,
	rating,
	relevance,
	setOrder,
	updatedAt,
} from '../../app/store/slices/categorySlice.slice';

export const SectorTitle = ({
	title = '',
	seeMore,
	update,
	updateFunc,
}: {
	title?: string;
	seeMore: boolean;
	update?: boolean;
	updateFunc?: () => void;
}) => {
	const dispatch = useAppDispatch();

	const updateOrderHandler = (title: string) => {
		switch (title) {
			case createdAt:
				dispatch(setOrder(createdAt));
				break;
			case updatedAt:
				dispatch(setOrder(updatedAt));
				break;
			case rating:
				dispatch(setOrder(rating));
				break;
			default:
				dispatch(setOrder(relevance));
		}
	};
	return (
		<View style={styles.blockTitles}>
			{title && (
				<AppText style={styles.text} fontFamily="Oswald-Bold">
					{title}
				</AppText>
			)}
			{seeMore && (
				<Link
					push
					href={{ pathname: '/listMangas' }}
					asChild
					onPress={() => updateOrderHandler(title)}
				>
					<TouchableOpacity>
						<AppText style={styles.seeMore} fontFamily="Poppins-Medium">
							See more
						</AppText>
					</TouchableOpacity>
				</Link>
			)}
			{update && updateFunc && (
				<TouchableOpacity onPress={() => updateFunc()}>
					<Ionicons name="refresh" size={24} style={{ color: THEME.MAIN_COLOR, top: -5 }} />
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	seeMore: {
		lineHeight: 18,
		fontSize: 12,
		color: THEME.MAIN_COLOR,
	},
	blockTitles: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	text: {
		lineHeight: 36,
		fontSize: 24,
	},
});
