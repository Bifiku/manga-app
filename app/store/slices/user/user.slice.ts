import { createSlice } from '@reduxjs/toolkit';
import { UserDataType } from './user.type';
import { THEME } from '../../../../shared/theme';

const initialState: UserDataType = {
	user: {
		favorites: [],
		name: 'Ghost',
		colorTheme: THEME.MAIN_COLOR,
	},
	language: ['en'],
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addFavorites(state, { payload }: { payload: string }) {
			const checkedId = state.user.favorites.find((i: string) => i === payload);
			if (checkedId) {
				state.user.favorites = state.user.favorites.filter((i) => i !== payload);
			} else {
				state.user.favorites.push(payload);
			}
		},
		changeFavorites(state, { payload }: { payload: string[] }) {
			state.user.favorites = payload;
		},
		changeColorTheme(state, { payload }: { payload: string }) {
			state.user.colorTheme = payload;
		},
		changeName(state, { payload }: { payload: string }) {
			state.user.name = payload;
		},
	},
});
export const { changeFavorites, addFavorites, changeColorTheme, changeName } = userSlice.actions;
export default userSlice.reducer;
