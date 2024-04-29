import React, { useEffect, useState, useRef } from 'react';
import { FlatList, StyleSheet, Dimensions, View } from 'react-native';
import axios, { AxiosError } from 'axios';
import { API } from '../../shared/api/tokens';
import Loader from '../../shared/Loader/Loader';
import { useRouter } from 'expo-router';
import { ImageZoom } from '@likashefqet/react-native-image-zoom';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppText } from '../../shared/ui/AppTexts/AppText';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../../shared/theme';
import { Pressable } from 'expo-router/build/views/Pressable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Index = () => {
	// const { data } = useAppSelector((state) => state.chapterStateSlice);
	const [urls, setUrls] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [zoomed, setZoomed] = useState(false);
	const imageZoomRef = useRef(null);
	const router = useRouter();
	const { params } = useRoute();
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	const { id, chapter, title }: { id: string; chapter: string; title: string } = params;

	useEffect(() => {
		const getImageChapter = async () => {
			try {
				setLoading(true);
				const response = await axios.get(`${API}/at-home/server/${id}`);
				const host = response.data.baseUrl;
				const chapterHash = response.data.chapter.hash;
				const dataSaver = response.data.chapter.dataSaver;
				const arrayUrls = dataSaver.map(
					(item: string) => `${host}/data-saver/${chapterHash}/${item}`,
				);
				setUrls(arrayUrls);
			} catch (error) {
				if (error instanceof AxiosError) {
					console.error('Error fetching images:', error.response);
				}
			} finally {
				setLoading(false);
			}
		};

		getImageChapter();
	}, []);

	if (loading) return <Loader />;

	const renderItem = ({ item, index }: { item: string; index: number }) => {
		return (
			<View style={styles.wrapper}>
				<ImageZoom
					ref={imageZoomRef}
					uri={item}
					doubleTapScale={2}
					style={styles.image}
					isDoubleTapEnabled={true}
					minPanPointers={zoomed ? 1 : 2}
					onDoubleTap={() => {
						setZoomed((prevState) => (prevState === false ? !prevState : !prevState));
					}}
					isPinchEnabled={false}
				/>
				<AppText fontSize={24}>{index}</AppText>
			</View>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.icons}>
				<Pressable onPress={router.back} style={styles.icon}>
					<Ionicons name="arrow-back-outline" size={24} color={THEME.TEXT_COLOR} />
				</Pressable>
				<View style={{ alignItems: 'flex-end' }}>
					<AppText fontSize={16}>Chapter: {chapter}</AppText>
					<AppText fontSize={16}>{title ? title : 'There`s no title'}</AppText>
				</View>
			</View>
			<GestureHandlerRootView style={styles.container}>
				<FlatList
					data={urls}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					scrollEnabled={!zoomed}
					renderItem={renderItem}
					viewabilityConfig={{
						itemVisiblePercentThreshold: 100,
						waitForInteraction: true,
						minimumViewTime: 1000,
					}}
					keyExtractor={(item, index) => `${item}-${index}`}
				/>
			</GestureHandlerRootView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width,
		height: height, // Subtract the height of the navigation bar or other elements that may occupy space at the top of the screen
	},
	icons: {
		paddingTop: 8,
		paddingLeft: 6,
		paddingRight: 16,
		width: '100%',
		justifyContent: 'space-between',
		flexDirection: 'row',
		zIndex: 999,
		alignItems: 'center',
	},
	icon: {
		padding: 10,
	},
	wrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
	},
});

export default Index;
