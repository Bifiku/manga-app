import { createMangaSlice } from './dataSlice';
import { randomMangaFull } from '../../../shared/types/randomManga.type';

const initialState = {
	data: null,
	sliceName: 'randomManga',
	error: null,
	loading: false,
};

const randomMangaSlice = createMangaSlice<randomMangaFull>('randomManga', initialState);
export default randomMangaSlice.reducer;
