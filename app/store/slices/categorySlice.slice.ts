import { createSlice } from '@reduxjs/toolkit';

type ContentRatingType = 'safe' | 'suggestive' | 'erotica' | 'pornographic';
type StatusType = 'ongoing' | 'completed' | 'hiatus' | 'cancelled';
type Sort = 'asc' | 'desc';

export const relevance: string = 'Relevance';
export const createdAt: string = 'New Manga';
export const updatedAt: string = 'Last Updates';
export const rating: string = 'Rating';

export const safe: string = 'Safe';
export const suggestive: string = 'Suggestive';
export const erotica: string = 'Erotica';
export const pornographic: string = 'Pornographic';

export const ongoing: string = 'Ongoing';
export const completed: string = 'Completed';
export const hiatus: string = 'Hiatus';
export const cancelled: string = 'Cancelled';

export type OrderType =
	| { relevance: Sort }
	| { createdAt: Sort }
	| { updatedAt: Sort }
	| { rating: Sort };

export interface CategoryDataType {
	order: OrderType | null;
	contentRating: ContentRatingType[] | null;
	status: StatusType[] | null;
	year: number | null;
	loading: boolean;
}

const initialState: CategoryDataType = {
	order: { relevance: 'desc' },
	contentRating: null,
	status: null,
	year: null,
	loading: false,
};

const categorySlice = createSlice({
	name: 'categorySlice',
	initialState,
	reducers: {
		setOrder(state, { payload }) {
			switch (payload) {
				case relevance:
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					if (state.order?.relevance === 'desc') {
						return { ...state, order: { relevance: 'asc' } };
					} else {
						return { ...state, order: { relevance: 'desc' } };
					}
				case createdAt:
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					if (state.order?.createdAt === 'desc') {
						return { ...state, order: { createdAt: 'asc' } };
					} else {
						return { ...state, order: { createdAt: 'desc' } };
					}
				case updatedAt:
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					if (state.order?.updatedAt === 'desc') {
						return { ...state, order: { updatedAt: 'asc' } };
					} else {
						return { ...state, order: { updatedAt: 'desc' } };
					}
				case rating:
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					if (state.order?.rating === 'desc') {
						return { ...state, order: { rating: 'asc' } };
					} else {
						return { ...state, order: { rating: 'desc' } };
					}
				default:
					return { ...state, order: null };
			}
		},
		setContentRating(state, { payload }) {
			switch (payload) {
				case safe:
					return { ...state, contentRating: ['safe'] };
				case suggestive:
					return { ...state, contentRating: ['suggestive'] };
				case erotica:
					return { ...state, contentRating: ['erotica'] };
				case pornographic:
					return { ...state, contentRating: ['pornographic'] };
				default:
					return { ...state, contentRating: null };
			}
		},
		setStatus(state, { payload }) {
			switch (payload) {
				case ongoing:
					return { ...state, status: ['ongoing'] };
				case completed:
					return { ...state, status: ['completed'] };
				case hiatus:
					return { ...state, status: ['hiatus'] };
				case cancelled:
					return { ...state, status: ['cancelled'] };
				default:
					return { ...state, status: null };
			}
		},
		setLoading(state, { payload }) {
			state.loading = payload;
		},
	},
});

export const { setLoading, setOrder, setContentRating, setStatus } = categorySlice.actions;
export default categorySlice.reducer;
