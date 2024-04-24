import { createMangaSlice } from './dataSlice';
import { AnimeStatistic, StatisticMangas } from '../../../shared/types/getStatisticsManga.type';
import { initState } from '../../../shared/types/types';

const initialState: initState<StatisticMangas> = {
	data: null,
	sliceName: 'getStatisticsManga',
	error: null,
	loading: false,
};

const getStatisticsMangaSlice = createMangaSlice<StatisticMangas>(
	'getStatisticsManga',
	initialState,
);
export default getStatisticsMangaSlice.reducer;
