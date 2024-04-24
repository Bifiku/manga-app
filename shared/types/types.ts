import { ViewStyle } from 'react-native';
import { PopularManga } from '../BlockPopular/BlockPopular.type';

export interface IStyleProps {
	style?: ViewStyle;
}

export type RootStackParamList = {
	Home: undefined;
	MangaDetail: { mangaId: number };
};

export interface initState<T> {
	data: T | null;
	error: string | null;
	loading: boolean;
	sliceName: string;
}
