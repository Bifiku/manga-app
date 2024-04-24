import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../actions/actions';
import { initState } from '../../../shared/types/types';

export const createMangaSlice = <T>(order: string, initialState: initState<T>) => {
	return createSlice({
		name: `${order}`,
		initialState: initialState,
		reducers: {},
		extraReducers: (builder) => {
			builder
				.addCase(fetchData.pending, (state) => {
					state.loading = true;
				})
				.addCase(fetchData.fulfilled, (state, { payload }) => {
					if (state.sliceName === payload?.slice) {
						state.data = payload.data;
						state.loading = false;
					}
				})
				.addCase(fetchData.rejected, (state, { error }) => {
					state.error = error.message as string;
					state.loading = false;
				});
		},
	});
};
