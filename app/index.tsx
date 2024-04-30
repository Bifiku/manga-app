import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { fetchData } from './store/actions/actions';
import { Header } from '../shared/Header/Header';
import PopularManga from '../entities/PopularManga/PopularManga';
import { Sector } from '../shared/Sector/Sector';
import { BlockMangas } from '../shared/BlockMangas/BlockMangas';
import { BlockWithRandomsMangas } from '../shared/BlockWithRandomsMangas/BlockWithRandomsMangas';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Loader from '../shared/Loader/Loader';
import {
	relevance,
	updatedAt as lastUpdate,
	createdAt as newManga,
} from './store/slices/categorySlice.slice';
import { getUserData } from '../shared/lib/utils/getAndLoadUserData';
import { UserType } from './store/slices/user/user.type';
import { changeColorTheme, changeFavorites, changeName } from './store/slices/user/user.slice';
import { THEME } from '../shared/theme';
const Index = () => {
	const insets = useSafeAreaInsets();
	const [refreshing, setRefreshing] = useState(false);
	const dispatch = useAppDispatch();
	const [randomManga, setRandomManga] = useState('0');
	const { data: mangaList } = useAppSelector((state) => state.topMangaSlice);
	const { data: relevanceMangas } = useAppSelector((state) => state.relevanceMangaSlice);
	const { data: updatedAt } = useAppSelector((state) => state.updatedAtSlice);
	const { data: createdAt } = useAppSelector((state) => state.createdAtSlice);
	const { user, language } = useAppSelector((state) => state.userSlice);

	useEffect(() => {
		const userDataHandler = async () => {
			const userData: UserType = await getUserData();
			dispatch(changeColorTheme(userData.colorTheme ? userData.colorTheme : THEME.MAIN_COLOR));
			dispatch(changeName(userData.name));
			dispatch(changeFavorites(userData.favorites ? userData.favorites : []));
		};
		userDataHandler();
	}, []);

	const fetchDataAndUpdate = async () => {
		try {
			setRefreshing(true);
			await Promise.all([
				dispatch(
					fetchData({
						url: '/manga',
						slice: 'topManga',
						params: {
							includes: ['cover_art'],
							order: { rating: 'desc' },
							hasAvailableChapters: 1,
							availableTranslatedLanguage: language,
						},
					}),
				),
				dispatch(
					fetchData({
						url: '/manga',
						slice: 'relevanceManga',
						params: {
							includes: ['cover_art'],
							order: { relevance: 'desc' },
							hasAvailableChapters: 1,
							availableTranslatedLanguage: language,
						},
					}),
				),
				dispatch(
					fetchData({
						url: '/manga',
						slice: 'updatedAt',
						params: {
							includes: ['cover_art'],
							order: { updatedAt: 'desc' },
							hasAvailableChapters: 1,
							availableTranslatedLanguage: language,
						},
					}),
				),
				dispatch(
					fetchData({
						url: '/manga',
						slice: 'createdAt',
						params: {
							includes: ['cover_art'],
							order: { createdAt: 'desc' },
							hasAvailableChapters: 1,
							availableTranslatedLanguage: language,
						},
					}),
				),
			]);
		} catch (error) {
			console.error('Error fetching data:', error);
			setTimeout(fetchDataAndUpdate, 2000);
		} finally {
			setTimeout(() => {
				setRefreshing(false);
			}, 1000);
		}
	};

	useEffect(() => {
		if (mangaList) {
			const arrId = mangaList.data.map((item) => item.id);
			dispatch(
				fetchData({
					url: '/statistics/manga',
					slice: 'getStatisticsManga',
					params: {
						manga: arrId,
					},
				}),
			);
		}
	}, [dispatch, mangaList]);

	useEffect(() => {
		fetchDataAndUpdate();
	}, []);

	const handlerRandomManga = () => {
		setRandomManga(new Date().toString());
	};

	return (
		<SafeAreaProvider style={{ paddingTop: insets.top + 8 }}>
			<View style={styles.default}>
				<Header />
				{refreshing ? (
					<Loader style={styles.indicator} />
				) : (
					<ScrollView
						showsVerticalScrollIndicator={false}
						refreshControl={
							<RefreshControl
								refreshing={refreshing}
								tintColor={user.colorTheme}
								onRefresh={fetchDataAndUpdate}
							/>
						}
						nestedScrollEnabled={true}
						contentContainerStyle={{ gap: 15 }}
					>
						<Sector title="Most Popular">
							<PopularManga />
						</Sector>
						<Sector title={relevance} seeMore>
							<BlockMangas data={relevanceMangas} />
						</Sector>
						<Sector title={lastUpdate} seeMore>
							<BlockMangas data={updatedAt} />
						</Sector>
						<Sector title={newManga} seeMore>
							<BlockMangas data={createdAt} />
						</Sector>

						<Sector
							title="Random Manga"
							update
							updateFunc={() => handlerRandomManga()}
							style={{ marginBottom: 20 }}
						>
							<BlockWithRandomsMangas resRandomManga={randomManga} />
						</Sector>
					</ScrollView>
				)}
			</View>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	default: {
		flex: 1,
	},
	indicator: {
		flex: 1,
		justifyContent: 'flex-start',
		marginTop: 55,
	},
});

export default Index;
