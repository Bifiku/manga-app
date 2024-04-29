import { createSlice } from '@reduxjs/toolkit';
import { UserType } from './user.type';
import { THEME } from '../../../../shared/theme';

const initialState: UserType = {
	favorites: [],
	name: 'Ghost',
	colorTheme: THEME.MAIN_COLOR,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		changeFavorites(state, { payload }: { payload: string }) {
			const checkedId = state.favorites.find((i: string) => i === payload);
			if (checkedId) {
				state.favorites = state.favorites.filter((i) => i !== payload);
			} else {
				state.favorites.push(payload);
			}
		},
		changeColorTheme(state, { payload }: { payload: string }) {
			state.colorTheme = payload;
		},
		changeName(state, { payload }: { payload: string }) {
			state.name = payload;
		},
	},
});
export const { changeFavorites, changeColorTheme, changeName } = userSlice.actions;
export default userSlice.reducer;
