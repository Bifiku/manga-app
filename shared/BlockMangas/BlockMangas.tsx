import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Datum } from '../types/MangaList.type';
import CardManga from '../../entities/CardManga/CardManga';
import { globalStyles } from '../theme';

export const BlockMangas = ({ data }: { data: any }) => {
	if (!data)
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<ActivityIndicator />
			</View>
		);

	const renderItem = ({ item }: { item: Datum }) => {
		return <CardManga item={item} style={globalStyles.marginRight} />;
	};

	return (
		<FlatList
			horizontal
			style={styles.flatList}
			showsHorizontalScrollIndicator={false}
			data={data.data}
			renderItem={renderItem}
		/>
	);
};

const styles = StyleSheet.create({
	flatList: {
		overflow: 'visible',
	},
});
