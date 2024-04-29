import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
import { ImageBackground } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { AppText } from '../../shared/ui/AppTexts/AppText';
import { THEME } from '../../shared/theme';
import axios from 'axios';
import { API } from '../../shared/api/tokens';
import { AntDesign } from '@expo/vector-icons';
import { MangaResponseType, MangaType } from '../../shared/types/Manga.type';
import { MotiText, MotiView } from 'moti';
import { Image } from 'expo-image';
import { DataChapterManga, ResponseChapterManga } from '../../shared/types/getChapterManga.type';
import Chapter from '../../entities/Chapter/Chapter';
import Loader from '../../shared/Loader/Loader';
import { useAppSelector } from '../hooks/hooks';
import Hud from '../../widgets/HUD/HUD';
const DetailPage = () => {
	const { height, width } = useWindowDimensions();
	const { contentRating } = useAppSelector((state) => state.categorySlice);
	const { user, language } = useAppSelector((state) => state.userSlice);
	const { id, image } = useLocalSearchParams<{ id: string; image: string }>();
	const [manga, setManga] = useState<MangaType | null>(null);
	const [rating, setRating] = useState<number | null>(null);
	const [fullInfo, setFullInfo] = useState(false);
	const [chapters, setChapters] = useState<DataChapterManga[] | null>();

	useEffect(() => {
		const getManga = async (id: string) => {
			try {
				const responseManga = await axios.get<MangaResponseType>(`${API}/manga/${id}`);
				if (responseManga) {
					setManga(responseManga.data.data);
				}
			} catch (e) {
				console.log('Error Detail:', e);
				setTimeout(() => getManga(id), 2000);
			}
		};
		if (id) getManga(id);
	}, []);

	useEffect(() => {
		try {
			const getStatisticManga = async (id: string) => {
				const responseStatisticsManga = await axios.get(`${API}/statistics/manga/${id}`);
				const dataRating = responseStatisticsManga.data.statistics[id].rating.bayesian.toFixed(1);
				setRating(dataRating);
			};
			if (id) getStatisticManga(id);
		} catch (e) {
			console.log(e);
		}
	}, []);

	useEffect(() => {
		try {
			const getChaptersManga = async (id: string) => {
				const responseChapters = await axios.get<ResponseChapterManga>(`${API}/manga/${id}/feed`, {
					params: {
						translatedLanguage: language,
						order: { volume: 'asc', chapter: 'asc' },
						limit: 500,
						contentRating: contentRating,
					},
				});
				const dataChapter = responseChapters.data.data;
				setChapters(dataChapter);
			};
			if (id) getChaptersManga(id);
		} catch (e) {
			console.log(e);
		}
	}, []);

	if (!id || !manga || !rating || !chapters) return <Loader />;

	const visibleFullInfo = () => {
		setFullInfo(!fullInfo);
	};

	return (
		<>
			<Hud id={id} />
			<ScrollView contentContainerStyle={styles.container} bounces={false}>
				<View style={{ ...styles.imageContainer, height: height * 0.5 }}>
					{image ? (
						<ImageBackground style={styles.image} source={{ uri: image }}>
							{
								<Image
									style={styles.vignette}
									source={require('../../assets/images/vignette.png')}
								/>
							}
						</ImageBackground>
					) : (
						<ImageBackground
							style={styles.image}
							source={require('../../assets/images/cover-placeholder.jpg')}
						>
							{
								<Image
									style={styles.vignette}
									source={require('../../assets/images/vignette.png')}
								/>
							}
						</ImageBackground>
					)}
				</View>
				<MotiView
					animate={{
						height: fullInfo ? height * 0.7 : 160,
						translateY: fullInfo ? -30 : height * 0.25,
					}}
					style={{ ...styles.info, top: height * 0.15, width: width - 32 }}
					transition={{
						type: 'timing',
						duration: 350,
					}}
				>
					<View style={styles.titleHeader}>
						<AppText fontFamily="Oswald-Bold" style={styles.title} numberOfLines={fullInfo ? 0 : 1}>
							{manga.attributes.title.en}
						</AppText>
						<View style={styles.rating}>
							<AntDesign name="star" size={24} color="#FFFF00" />
							<AppText>{rating}</AppText>
						</View>
					</View>
					<View>
						<AppText style={styles.synopsis}>Synopsis</AppText>
						<MotiText
							numberOfLines={fullInfo ? 0 : 2}
							transition={{ type: 'timing', delay: 350 }}
							style={styles.description}
						>
							<AppText>{manga.attributes.description.en}</AppText>
						</MotiText>
					</View>
					<TouchableOpacity
						activeOpacity={0.8}
						style={{ ...styles.arrowButton, backgroundColor: user.colorTheme }}
						onPress={visibleFullInfo}
					>
						<MotiView
							from={{ transform: [{ rotate: '0deg' }] }}
							animate={{ transform: [{ rotate: fullInfo ? '180deg' : '0deg' }] }}
							transition={{ type: 'timing' }}
						>
							<AntDesign name="arrowdown" size={24} color={THEME.TEXT_COLOR} />
						</MotiView>
					</TouchableOpacity>
				</MotiView>
				<View style={styles.chapters}>
					<AppText style={styles.title} fontSize={24} fontFamily="Oswald-Bold">
						Chapters
					</AppText>
					{chapters.map((item) => (
						<Chapter item={item} image={image} key={item.id} />
					))}
				</View>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		paddingBottom: 150,
	},
	imageContainer: {
		width: '100%',
		height: '50%',
		marginBottom: 100,
	},
	image: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		overflow: 'hidden',
	},
	vignette: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
	rating: {
		flexDirection: 'row',
		gap: 8,
		alignItems: 'center',
	},
	// eslint-disable-next-line react-native/no-color-literals
	info: {
		position: 'absolute',
		padding: 16,
		alignItems: 'center',
		backgroundColor: THEME.BACKGROUND_COLOR,
		borderRadius: 24,
		shadowColor: '#000',
		shadowOffset: {
			width: 1,
			height: 4,
		},
		shadowOpacity: 0.5,
		shadowRadius: 4,
		elevation: 8,
		zIndex: 999,
	},

	titleHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	title: {
		fontSize: 24,
		maxWidth: '60%',
	},
	synopsis: {
		fontSize: 18,
		fontFamily: 'Oswald-Bold',
		color: THEME.TEXT_COLOR,
		opacity: 0.5,
		marginBottom: 4,
	},
	description: {
		textAlign: 'left',
		fontFamily: 'Poppins-Medium',
		color: THEME.TEXT_COLOR,
		opacity: 0.5,
	},
	arrowButton: {
		position: 'absolute',
		bottom: -24,
		width: 48,
		height: 48,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},

	chapters: {
		width: '100%',
		paddingHorizontal: 16,
		gap: 8,
	},
});

export default DetailPage;
