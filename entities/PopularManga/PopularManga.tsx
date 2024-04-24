import { StyleSheet, FlatList } from 'react-native';
import { useAppSelector } from '../../app/hooks/hooks';
import { initState } from '../../shared/types/types';
import { Datum, MangaList } from '../../shared/types/MangaList.type';
import CardTopManga from '../CardTopManga/CardTopManga';
import { useEffect, useState } from 'react';
import { filterMangaByLanguage } from '../../shared/utils/utils';

const PopularManga = () => {
	const { data: mangaPopular } = useAppSelector<initState<MangaList>>(
		(state) => state.topMangaSlice,
	);
	const { data: statisticMangas } = useAppSelector((state) => state.getStatisticsMangaSlice);
	const [mangaLanguage, setMangaLanguage] = useState<Datum[] | null>(null);
	useEffect(() => {
		if (mangaPopular) {
			const mangaSorted = filterMangaByLanguage(mangaPopular.data);
			setMangaLanguage(mangaSorted);
		}
	}, []);

	if (!mangaPopular || !statisticMangas || !mangaLanguage) return null;

	const renderItem = ({ item }: { item: Datum }) => {
		const animeInfo = statisticMangas.statistics[item.id];
		const rating = animeInfo.rating.bayesian.toFixed(2) || '0';
		return <CardTopManga item={item} rating={rating} />;
	};

	return (
		<FlatList
			horizontal
			style={styles.flatList}
			showsHorizontalScrollIndicator={false}
			data={mangaPopular.data}
			renderItem={renderItem}
		/>
	);
};

const styles = StyleSheet.create({
	flatList: {
		overflow: 'visible',
	},
});

export default PopularManga;
