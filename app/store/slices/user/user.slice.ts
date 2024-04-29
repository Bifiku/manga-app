import { createSlice } from '@reduxjs/toolkit';
import { UserDataType } from './user.type';
import { THEME } from '../../../../shared/theme';

const initialState: UserDataType = {
	user: {
		favorites: [],
		name: 'Ghost',
		colorTheme: THEME.MAIN_COLOR,
	},
	language: ['eng'],
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		changeFavorites(state, { payload }: { payload: string }) {
			const checkedId = state.user.favorites.find((i: string) => i === payload);
			if (checkedId) {
				state.user.favorites = state.user.favorites.filter((i) => i !== payload);
			} else {
				state.user.favorites.push(payload);
			}
		},
		changeColorTheme(state, { payload }: { payload: string }) {
			state.user.colorTheme = payload;
		},
		changeName(state, { payload }: { payload: string }) {
			state.user.name = payload;
		},
	},
});
export const { changeFavorites, changeColorTheme, changeName } = userSlice.actions;
export default userSlice.reducer;
