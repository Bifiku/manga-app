import { createMangaSlice } from './dataSlice';
import { MangaList } from '../../../shared/types/MangaList.type';

const initialState = {
	data: null,
	sliceName: 'updatedAt',
	error: null,
	loading: false,
};

const updatedAtSlice = createMangaSlice<MangaList>('updatedAt', initialState);
export default updatedAtSlice.reducer;
