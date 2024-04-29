import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { AppText } from '../../shared/ui/AppTexts/AppText';
import Wrapper from '../../shared/ui/Wrapper/Wrapper';
import { DIMENSIONS, THEME } from '../../shared/theme';
import { Image } from 'expo-image';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { Checkbox } from 'expo-checkbox';
import { useEffect, useState } from 'react';
import AppView from '../../shared/ui/AppView/AppView';
import ModalChangeColor from '../../widgets/Modals/ModalChangeColor';
import { changeName } from '../store/slices/user/user.slice';
import PopUp from '../../widgets/PopUp/PopUP';

const Index = () => {
	const { user } = useAppSelector((state) => state.userSlice);
	const dispatch = useAppDispatch();
	const [notificationValue, setNotificationValue] = useState(false);
	const [isError, setIsError] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [userName, setUserName] = useState(user.name);

	useEffect(() => {
		dispatch(changeName(userName));
	}, [dispatch, userName]);

	const isErrorHandler = () => {
		setIsError(true);
		const timer = setTimeout(() => {
			setIsError(false);
		}, 2000);

		return () => clearTimeout(timer);
	};

	return (
		<View style={styles.container}>
			<ModalChangeColor visible={modalVisible} onVisible={setModalVisible} />
			<PopUp isError={isError} />
			<Wrapper style={styles.wrapper} borderColor={user.colorTheme}>
				<TouchableOpacity onPress={isErrorHandler} disabled={isError}>
					<View style={{ ...styles.avatar, borderColor: user.colorTheme }}>
						<Image
							style={styles.placeHolder}
							contentFit="cover"
							placeholderContentFit="cover"
							placeholder={require('../../assets/icons/avatar.svg')}
						/>
						<Feather name="edit" size={18} color={THEME.TEXT_COLOR} style={styles.edit} />
					</View>
				</TouchableOpacity>
				<View>
					<AppText style={styles.text}>Your name</AppText>
					<TextInput
						value={userName}
						style={{ ...styles.name, color: user.colorTheme }}
						cursorColor={user.colorTheme}
						onChangeText={(e) => setUserName(e)}
					/>
				</View>
			</Wrapper>
			<TouchableOpacity activeOpacity={0.7} onPress={isErrorHandler} disabled={isError}>
				<Wrapper style={styles.wrapperOption} borderColor={user.colorTheme}>
					<AppText style={styles.text}>Language:</AppText>
					<Wrapper style={styles.wrapperLang} borderColor={user.colorTheme}>
						<AppText style={styles.text}>ENG</AppText>
					</Wrapper>
				</Wrapper>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.7}>
				<Wrapper style={styles.wrapperOption} borderColor={user.colorTheme}>
					<AppText style={styles.text}>Theme color:</AppText>
					<AppView
						style={styles.rectFill}
						borderColor={user.colorTheme}
						backgroundColor={user.colorTheme}
					/>
				</Wrapper>
			</TouchableOpacity>
			<TouchableOpacity onPress={isErrorHandler} activeOpacity={0.7} disabled={isError}>
				<Wrapper style={styles.wrapperOption} borderColor={user.colorTheme}>
					<AppText style={styles.text}>Notification:</AppText>
					<AppView style={styles.checked} borderColor={user.colorTheme}>
						<Checkbox value={notificationValue} color={THEME.BACKGROUND_COLOR}>
							<Entypo name="check" size={18} color={THEME.TEXT_COLOR} />
						</Checkbox>
					</AppView>
				</Wrapper>
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={0.7}>
				<Wrapper style={styles.wrapperOption} borderColor={user.colorTheme}>
					<AppText style={styles.text}>Bags and Reports:</AppText>
					<FontAwesome name="telegram" size={24} color={THEME.TEXT_COLOR} />
				</Wrapper>
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={0.7}>
				<Wrapper style={styles.wrapperOption} borderColor={user.colorTheme}>
					<AppText style={styles.text}>Contacts:</AppText>
					<FontAwesome name="telegram" size={24} color={THEME.TEXT_COLOR} />
				</Wrapper>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	avatar: {
		height: 80,
		width: 80,
		borderWidth: 1,
		borderBottomRightRadius: 16,
		borderBottomLeftRadius: 16,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 4,
		overflow: 'hidden',
		position: 'relative',
	},

	container: {
		paddingHorizontal: DIMENSIONS.padding,
		position: 'relative',
		gap: 10,
		alignItems: 'center', // Центрирование по горизонтали
	},
	checked: {
		borderWidth: 1,
		width: 23,
		height: 23,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},

	edit: {
		position: 'absolute',
		top: 0,
		right: 0,
	},
	rectFill: {
		width: 23,
		height: 23,
		borderRadius: 5,
	},
	wrapper: {
		justifyContent: 'flex-start',
		gap: 15,
		width: '100%',
	},
	wrapperLang: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 10,
	},
	wrapperOption: {
		padding: 15,
		height: 70,
		width: '100%',
	},
	placeHolder: {
		width: '100%',
		height: '100%',
	},
	name: {
		fontSize: 28,
		textDecorationLine: 'underline',
		fontFamily: 'Poppins-Bold',
	},
	text: {
		fontSize: 18,
		fontFamily: 'Poppins-Medium',
	},
});

export default Index;
