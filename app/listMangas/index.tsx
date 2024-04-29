import { Dimensions, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getDataManga } from '../../shared/lib/utils/utils';
import { DataChapterManga } from '../../shared/types/getChapterManga.type';
import Loader from '../../shared/Loader/Loader';
import CardManga from '../../entities/CardManga/CardManga';
import Category from '../../widgets/Category/Category';
import { DIMENSIONS } from '../../shared/theme';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { AxiosError } from 'axios';
import { setLoading } from '../store/slices/categorySlice.slice';

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
	const { order, status, contentRating, loading } = useAppSelector((state) => state.categorySlice);
	const { language } = useAppSelector((state) => state.userSlice);
	const dispatch = useAppDispatch();
	const [responseData, setResponseData] = useState<DataChapterManga[] | []>([]);
	const [upload, setUpload] = useState<UploadType>(initialUpload);
	const getDataHandler = () => {
		try {
			dispatch(setLoading(true));
			const getData = async () => {
				const response = await getDataManga({
					url: '/manga',
					params: {
						includes: ['cover_art'],
						order: order,
						contentRating: contentRating,
						status: status,
						hasAvailableChapters: 'true',
						availableTranslatedLanguage: language,
						limit: upload.limit,
						offset: upload.offset,
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
				dispatch(setLoading(false));
			}, 500);
		}
	};
	useEffect(() => {
		getDataHandler();
	}, [upload, order, contentRating, status]);

	useEffect(() => {
		setResponseData([]);
	}, [order, contentRating, status]);

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
		<View>
			<View style={styles.containerCategory}>
				<Category style={styles.category} />
			</View>
			<View style={styles.container}>
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
			</View>
		</View>
	);
};

export default Index;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	contentContainer: {
		gap: 5,
	},
	containerCategory: {
		zIndex: 999,
		padding: DIMENSIONS.padding,
		paddingBottom: 28,
	},
	item: {
		marginVertical: 8, // Отступ между карточками
		marginHorizontal: 8, // Отступы по бокам для карточки
		width: screenWidth / 2 - 24, // Ширина элемента (делаем по 2 карточки в строке)
		height: 200 * 1.2,
		alignItems: 'center', // Центрируем содержимое по горизонтали
		marginBottom: 0,
	},
	category: {
		width: '120%',
		position: 'absolute',
	},
});
