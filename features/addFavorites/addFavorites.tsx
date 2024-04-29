import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../../shared/theme';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';
import { changeFavorites } from '../../app/store/slices/user/user.slice';

const AddFavorites = ({ id }: { id?: string }) => {
	const { favorites } = useAppSelector((state) => state.userSlice);
	const [isFavorite, setIsFavorite] = useState(false);
	const dispatch = useAppDispatch();
	const addFavoriteHandler = () => {
		if (id) dispatch(changeFavorites(id));
	};

	useEffect(() => {
		const checkedId = favorites.find((i: string) => i === id);
		checkedId ? setIsFavorite(true) : setIsFavorite(false);
	}, [favorites]);

	return (
		<TouchableOpacity style={styles.icon} onPress={() => addFavoriteHandler()}>
			{isFavorite ? (
				<MaterialIcons name="favorite" size={24} color={THEME.MAIN_COLOR} />
			) : (
				<MaterialIcons name="favorite-outline" size={24} color={THEME.TEXT_COLOR} />
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	icon: {
		padding: 10,
	},
});

export default AddFavorites;
