import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { AppText } from '../../shared/ui/AppTexts/AppText';
import { getImageUrl, truncateText } from '../../shared/lib/utils/utils';
import React, { useEffect, useState } from 'react';
import { THEME } from '../../shared/theme';
import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Asset } from 'expo-asset';
import Loader from '../../shared/Loader/Loader';

const CardManga = ({ item, style }: { item: any; style?: ViewStyle }) => {
	const [image, setImage] = React.useState<string | null>(null);
	const imageUrl = getImageUrl(item);
	const blurhash = 'LGFFaXYk^6#M@-5c,1J5@[or[Q6.';
	const [showLoader, setShowLoader] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowLoader(false);
		}, 5000);

		return () => clearTimeout(timer); // Очистка таймера при размонтировании
	}, []);
	useEffect(() => {
		const loadImage = async () => {
			try {
				// Загружаем изображение по URI
				if (imageUrl) {
					const uri = await Asset.fromURI(imageUrl).downloadAsync();
					setImage(uri.localUri); // Устанавливаем локальный путь к изображению
				}
			} catch (error) {
				console.error('Error loading image:', error);
			}
		};

		loadImage();
	}, [imageUrl]);

	const loadingImage = () => {
		if (image) {
			return (
				<Image
					source={{
						uri: image,
					}}
					style={styles.image}
					placeholder={blurhash}
				/>
			);
		} else {
			return showLoader ? (
				<Loader />
			) : (
				<Image
					source={require('../../assets/images/cover-placeholder.jpg')}
					style={styles.image}
					placeholder={blurhash}
				/>
			);
		}
	};

	return (
		<Link push href={{ pathname: '/detail', params: { id: item.id, image } }} asChild>
			<TouchableOpacity style={{ gap: 7 }}>
				<View style={{ ...styles.container, ...style }}>{loadingImage()}</View>
				<View style={styles.blockTitle}>
					<AppText fontFamily="Poppins-Medium">
						{truncateText(item.attributes.title.en, 20)}
					</AppText>
				</View>
			</TouchableOpacity>
		</Link>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 140,
		height: 200,
		borderRadius: 16,
		overflow: 'hidden',
		position: 'relative',
		backgroundColor: THEME.SECOND_COLOR,
	},
	blockTitle: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		flex: 1,
		width: '100%',
	},
});

export default CardManga;
