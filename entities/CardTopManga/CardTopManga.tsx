import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppText } from '../../shared/ui/AppTexts/AppText';
import { getImageUrl, truncateText } from '../../shared/utils/utils';
import { AntDesign } from '@expo/vector-icons';
import { ImageBackground } from 'expo-image';
import { THEME } from '../../shared/theme';
import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import { Asset } from 'expo-asset';

const CardTopManga = ({ item, rating }: { item: any; rating: string }) => {
	const [image, setImage] = React.useState<string | null>(null);
	const imageUrl = getImageUrl(item);

	useEffect(() => {
		const loadImage = async () => {
			try {
				// Загружаем изображение по URI
				const uri = await Asset.fromURI(imageUrl).downloadAsync();
				setImage(uri.localUri); // Устанавливаем локальный путь к изображению
			} catch (error) {
				console.error('Error loading image:', error);
			}
		};

		loadImage();
	}, [imageUrl]);

	if (!image) return null;

	return (
		<Link push href={{ pathname: '/detail', params: { id: item.id, image } }} asChild>
			<TouchableOpacity>
				<View style={styles.container}>
					<View style={styles.info}>
						<View style={styles.ratingContainer}>
							<AppText style={styles.title} fontFamily="Oswald-Bold">
								{truncateText(item.attributes.title.en, 10)}
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
							uri: image,
						}}
						style={styles.image}
					>
						<Image source={require('../../assets/images/vignette.png')} style={styles.image} />
					</ImageBackground>
				</View>
			</TouchableOpacity>
		</Link>
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
		objectFit: 'cover',
	},
});

export default CardTopManga;
