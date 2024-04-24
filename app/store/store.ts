import { configureStore } from '@reduxjs/toolkit';
import topMangaSlice from './slices/topMangaSlice';
import getStatisticsMangaSlice from './slices/getStatisticsMangaSlice';
import relevanceMangaSlice from './slices/relevanceMangaSlice';
import updatedAtSlice from './slices/updatedAtSlice';
import createdAtSlice from './slices/createdAtSlice';
import randomMangaSlice from './slices/randomMangaSlice';
import chapterStateSlice from './slices/chapterState.slice';
import categorySlice from './slices/categorySlice.slice';

// Создаем хранилище
export const store = configureStore({
	reducer: {
		topMangaSlice,
		getStatisticsMangaSlice,
		relevanceMangaSlice,
		updatedAtSlice,
		createdAtSlice,
		randomMangaSlice,
		chapterStateSlice,
		categorySlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
