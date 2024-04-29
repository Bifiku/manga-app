import { Dimensions, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getDataManga } from '../../shared/lib/utils/utils';
import { DataChapterManga } from '../../shared/types/getChapterManga.type';
import Loader from '../../shared/Loader/Loader';
import CardManga from '../../entities/CardManga/CardManga';
import { THEME } from '../../shared/theme';
import { useAppSelector } from '../hooks/hooks';
import { AxiosError } from 'axios';
import { AppText } from '../../shared/ui/AppTexts/AppText';
import { UserType } from '../store/slices/user/user.type';
import { getUserData } from '../../shared/lib/utils/getAndLoadUserData';

type UploadType = {
	limit: number;
	offset: number;
};

const screenWidth = Dimensions.get('window').width;
const initialUpload = {
	limit: 20,
	offset: 0,
};

const Index = () => {
	const { user } = useAppSelector((state) => state.userSlice);
	const [responseData, setResponseData] = useState<DataChapterManga[] | []>([]);
	const [upload, setUpload] = useState<UploadType>(initialUpload);
	const [loading, setLoading] = useState(false);

	const getDataHandler = () => {
		if (user.favorites.length === 0) return null;
		try {
			setLoading(true);
			const getData = async () => {
				// const userData: UserType = await getUserData();
				const response = await getDataManga({
					url: '/manga',
					params: {
						includes: ['cover_art'],
						availableTranslatedLanguage: ['ru'],
						limit: upload.limit,
						offset: upload.offset,
						ids: user.favorites,
						contentRating: ['safe', 'suggestive', 'erotica', 'pornographic'],
					},
				});
				if (responseData) {
					setResponseData((prevState) => [...prevState, ...response.data]);
				} else {
					setResponseData(response.data);
				}
			};
			getData();
		} catch (e) {
			if (e instanceof AxiosError) {
				console.error('Error listMangas: ', e.message);
			}
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 500);
		}
	};
	useEffect(() => {
		getDataHandler();
	}, [upload, user.favorites]);

	useEffect(() => {
		setResponseData([]);
	}, [user.favorites]);

	const mangaUpload = () => {
		setUpload((prevState) => ({
			limit: initialUpload.limit,
			offset: prevState.offset + initialUpload.limit,
		}));
	};
	if (!responseData) return <Loader />;

	const renderItem = ({ item }: { item: DataChapterManga }) => {
		return <CardManga item={item} style={styles.item} />;
	};
	return (
		<View style={styles.container}>
			{user.favorites.length === 0 ? (
				<AppText color={THEME.TEXT_COLOR}>Your favourites list is empty</AppText>
			) : (
				<FlatList
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.contentContainer}
					refreshControl={
						<RefreshControl
							style={{ display: 'none', opacity: 0 }}
							refreshing={loading}
							onRefresh={getDataHandler}
						/>
					}
					data={responseData}
					renderItem={renderItem}
					numColumns={2}
					onEndReached={mangaUpload}
					onEndReachedThreshold={0.5}
					keyExtractor={(item, index) => `${item.id.toString()}/${index.toString()}`}
				/>
			)}
		</View>
	);
};

export default Index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	contentContainer: {
		gap: 5,
		paddingBottom: 100,
	},
	item: {
		marginVertical: 8, // Отступ между карточками
		marginHorizontal: 8, // Отступы по бокам для карточки
		width: screenWidth / 2 - 24, // Ширина элемента (делаем по 2 карточки в строке)
		height: 200 * 1.2,
		alignItems: 'center', // Центрируем содержимое по горизонтали
		marginBottom: 0,
	},
});
