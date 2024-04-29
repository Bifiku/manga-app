import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { AppText } from '../../shared/ui/AppTexts/AppText';
import React from 'react';
import { THEME } from '../../shared/theme';
import { DataChapterManga } from '../../shared/types/getChapterManga.type';
import { Link } from 'expo-router';
import Wrapper from '../../shared/ui/Wrapper/Wrapper';
import { useAppSelector } from '../../app/hooks/hooks';
import AppView from '../../shared/ui/AppView/AppView';

const Chapter = ({ item, image }: { item: DataChapterManga; image: string | undefined }) => {
	const paramsCustom = {
		id: item.id,
		image,
		chapter: item.attributes.chapter,
		title: item.attributes.title,
	};
	const { user } = useAppSelector((state) => state.userSlice);

	return (
		<Link
			href={{
				pathname: '/chapter',
				params: paramsCustom,
			}}
			asChild
		>
			<TouchableOpacity key={item.id}>
				<Wrapper borderColor={user.colorTheme}>
					<View style={styles.chapterWrapper}>
						{image ? (
							<Image style={styles.chapterImage} source={{ uri: image }} cachePolicy="none" />
						) : (
							<Image
								style={styles.chapterImage}
								source={require('../../assets/images/cover-placeholder.jpg')}
								cachePolicy="none"
							/>
						)}
						<View style={styles.infoChapter}>
							<AppText fontFamily="Poppins-Medium">Volume: {item.attributes.volume}</AppText>
							<AppText fontFamily="Poppins-Medium">Chapter: {item.attributes.chapter}</AppText>
							<AppText fontFamily="Poppins-Bold" color={THEME.MAIN_COLOR} fontSize={18}>
								{item.attributes.title}
							</AppText>
						</View>
					</View>
					<AppView style={styles.point} borderColor={user.colorTheme} />
				</Wrapper>
			</TouchableOpacity>
		</Link>
	);
};

const styles = StyleSheet.create({
	chapterWrapper: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	chapterImage: {
		backgroundColor: THEME.MAIN_COLOR,
		width: 80,
		height: 80,
		borderRadius: 15,
		marginRight: 15,
	},
	point: {
		width: 25,
		height: 25,
		borderWidth: 2,
		borderRadius: 100,
	},
	infoChapter: {
		width: '60%',
	},
});

export default Chapter;
