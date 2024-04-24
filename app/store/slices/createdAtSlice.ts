import { createMangaSlice } from './dataSlice';
import { MangaList } from '../../../shared/types/MangaList.type';

const initialState = {
	data: null,
	sliceName: 'createdAt',
	error: null,
	loading: false,
};

const createdAtSlice = createMangaSlice<MangaList>('createdAt', initialState);
export default createdAtSlice.reducer;
