import { createMangaSlice } from './dataSlice';
import { MangaList } from '../../../shared/types/MangaList.type';

const initialState = {
	data: null,
	sliceName: 'relevanceManga',
	error: null,
	loading: false,
};

const relevanceMangaSlice = createMangaSlice<MangaList>('relevanceManga', initialState);
export default relevanceMangaSlice.reducer;
