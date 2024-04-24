import { createMangaSlice } from './dataSlice';
import { MangaList } from '../../../shared/types/MangaList.type';

const initialState = {
	data: null,
	sliceName: 'topManga',
	error: null,
	loading: false,
};

const topMangaSlice = createMangaSlice<MangaList>('topManga', initialState);
export default topMangaSlice.reducer;
