import { createSlice } from '@reduxjs/toolkit';
import { DataChapterManga } from '../../../shared/types/getChapterManga.type';

const initialState: { data: DataChapterManga | null } = {
	data: null,
};

const chapterStateSlice = createSlice({
	name: 'chapterStateSlice',
	initialState,
	reducers: {
		setData(state, { payload }) {
			state.data = payload;
		},
	},
});

export const { setData } = chapterStateSlice.actions;
export default chapterStateSlice.reducer;
