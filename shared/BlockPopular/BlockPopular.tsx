import { FlatList, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AppText } from '../ui/AppTexts/AppText';
import { THEME } from '../theme';
import { useAppSelector } from '../../app/hooks/hooks';
import { Datum, MangaList } from '../types/MangaList.type';
import { initState } from '../types/types';
import { ImageBackground } from 'expo-image';
import { AntDesign } from '@expo/vector-icons';
import { truncateText } from '../utils/utils';

export const BlockPopular = () => {
	const { data: mangaList } = useAppSelector<initState<MangaList>>((state) => state.topMangaSlice);
	const { data: statisticMangas } = useAppSelector((state) => state.getStatisticsMangaSlice);

	if (!mangaList || !statisticMangas) return null;

	const renderItem = ({ item }: { item: Datum }) => {
		const animeInfo = statisticMangas.statistics[item.id];
		const rating = animeInfo.rating.bayesian.toFixed(2) || 0;
		return (
			<TouchableOpacity>
				<View style={styles.container}>
					<View style={styles.info}>
						<View style={styles.ratingContainer}>
							<AppText style={styles.title} fontFamily="Oswald-Bold">
								{truncateText(item.attributes.title.en, 16)}
							</AppText>
							<View style={styles.rating}>
								<AntDesign name="star" size={24} color="#FFFF00" />
								<AppText style={{ fontSize: 14 }}>{rating}</AppText>
							</View>
						</View>
						<View>
							<AppText style={styles.description}>
								{truncateText(item.attributes.description.en, 50)}
							</AppText>
						</View>
					</View>
					<ImageBackground
						source={{
							uri: `https://uploads.mangadex.org/covers/${item.id}/${
								item.relationships.find((i) => i.type === 'cover_art')?.attributes.fileName ?? ''
							}`,
						}}
						style={styles.image}
					>
						<Image source={require('../../assets/images/vignette.png')} style={styles.image} />
					</ImageBackground>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<FlatList
			horizontal
			style={styles.flatList}
			showsHorizontalScrollIndicator={false}
			data={mangaList.data}
			renderItem={renderItem}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 250,
		height: 300,
		borderRadius: 16,
		marginRight: 16,
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
		overflow: 'hidden',
		position: 'relative',
		backgroundColor: THEME.SECOND_COLOR,
	},
	flatList: {
		overflow: 'visible',
	},
	info: {
		width: '100%',
		flex: 1,
		position: 'absolute',
		zIndex: 1,
		paddingVertical: 13,
		paddingHorizontal: 13,
	},
	title: {
		fontSize: 28,
	},
	ratingContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	rating: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 7,
	},
	description: {
		width: '100%',
		fontSize: 14,
		color: '#c0c0c0',
	},
	image: {
		flex: 1,
		width: '100%',
	},
});
