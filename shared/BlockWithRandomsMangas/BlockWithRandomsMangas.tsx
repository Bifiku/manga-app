import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { THEME } from '../theme';
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';
import { fetchData } from '../../app/store/actions/actions';
import { Link } from 'expo-router';
import Loader from '../Loader/Loader';

export const BlockWithRandomsMangas = ({ resRandomManga }: { resRandomManga: string }) => {
	const { data } = useAppSelector((state) => state.randomMangaSlice);
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		getData();
	}, [resRandomManga]);

	const getData = async () => {
		try {
			setIsLoading(true);
			await dispatch(
				fetchData({
					url: '/manga/random',
					slice: 'randomManga',
					params: {
						includes: ['cover_art', 'manga'],
					},
				}),
			);
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading || !data) {
		return (
			<View style={styles.container}>
				<Loader />
			</View>
		);
	}

	return (
		<Link push href={{ pathname: '/detail', params: { id: data.data.id } }} asChild>
			<TouchableOpacity>
				<View style={styles.container}>
					<Image
						style={styles.image}
						source={{
							uri: `https://uploads.mangadex.org/covers/${data.data.id}/${
								data.data.relationships.find((i) => i.type === 'cover_art')?.attributes.fileName ??
								''
							}`,
						}}
					/>
				</View>
			</TouchableOpacity>
		</Link>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 600,
		marginRight: 16,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
	},
	image: {
		flex: 1,
		width: '100%',
		height: '100%',
		borderRadius: 16,
		backgroundColor: THEME.SECOND_COLOR,
	},
});
