import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { DIMENSIONS, THEME } from '../theme';
import { AppText } from '../ui/AppTexts/AppText';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { IStyleProps } from '../types/types';
import { useAppSelector } from '../../app/hooks/hooks';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import AppView from '../ui/AppView/AppView';
import { useState } from 'react';
import PopUp from '../../widgets/PopUp/PopUP';
export const Header = ({ style }: IStyleProps) => {
	const { user } = useAppSelector((state) => state.userSlice);
	const [isError, setIsError] = useState(false);
	const [isSearch, setIsSearch] = useState(false);

	const isErrorHandler = () => {
		setIsError(true);
		const timer = setTimeout(() => {
			setIsError(false);
		}, 2000);

		return () => clearTimeout(timer);
	};

	return (
		<View style={{ ...styles.default, ...style }}>
			<PopUp isError={isError} posY={0} />
			{isSearch && (
				<View style={styles.formInput}>
					<TextInput
						placeholder="Search..."
						placeholderTextColor={THEME.SECOND_COLOR}
						selectionColor={user.colorTheme}
						style={styles.textInput}
					/>
					<TouchableOpacity onPress={() => setIsSearch(false)}>
						<AppView style={styles.buttonSearch} backgroundColor={user.colorTheme}>
							<AppText fontSize={16}>Search</AppText>
						</AppView>
					</TouchableOpacity>
				</View>
			)}

			{!isSearch && (
				<>
					<Link href="/profile" asChild style={styles.link}>
						<TouchableOpacity>
							<View style={styles.profileInfo}>
								<AppView style={styles.avatar} backgroundColor={user.colorTheme}>
									<Image
										style={styles.placeHolder}
										contentFit="cover"
										placeholderContentFit="cover"
										placeholder={require('../../assets/icons/avatar.svg')}
									/>
								</AppView>

								<View>
									<AppText style={styles.greeting}>Good Morning</AppText>
									<AppText style={styles.name} fontFamily="Poppins-Bold" color={user.colorTheme}>
										{user.name}
									</AppText>
								</View>
							</View>
						</TouchableOpacity>
					</Link>
					<View style={styles.icons}>
						<TouchableOpacity onPress={() => setIsSearch(true)}>
							<AntDesign name="search1" size={24} style={styles.icon} />
						</TouchableOpacity>
						<TouchableOpacity onPress={isErrorHandler} disabled={isError}>
							<Ionicons name="notifications-outline" size={24} style={styles.icon} />
						</TouchableOpacity>
					</View>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	default: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: DIMENSIONS.padding,
		height: 50,
		marginBottom: 10,
	},
	textInput: {
		flex: 1,
		backgroundColor: THEME.TEXT_COLOR,
		borderBottomLeftRadius: 15,
		borderTopLeftRadius: 15,
		borderBottomRightRadius: 3,
		borderTopRightRadius: 3,
		fontSize: 16,
		borderWidth: 0,
		height: '100%',
		paddingHorizontal: 15,
	},
	buttonSearch: {
		justifyContent: 'center',
		paddingHorizontal: 15,
		borderBottomRightRadius: 15,
		borderTopRightRadius: 15,
		borderBottomLeftRadius: 3,
		borderTopLeftRadius: 3,
		height: '100%',
	},
	formInput: {
		gap: 5,
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		paddingVertical: 5,
	},
	profileInfo: {
		flexDirection: 'row',
		gap: 10,
	},
	avatar: {
		borderRadius: 100,
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		padding: 5,
	},
	greeting: {
		fontSize: 12,
		color: THEME.TEXT_COLOR,
		opacity: 0.75,
	},
	name: {
		fontSize: 16,
	},
	icons: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 16,
	},
	icon: {
		color: THEME.TEXT_COLOR,
		opacity: 0.75,
	},
	placeHolder: {
		width: '100%',
		height: '100%',
	},
	link: {
		alignItems: 'center',
		justifyContent: 'center',
	},
});
