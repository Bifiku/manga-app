import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../../shared/api/tokens';

interface fetchDataType {
	slice: string;
	url: string;
	params?: any;
}

export const fetchData = createAsyncThunk(
	'data/fetchData',
	async ({ slice, url, params }: fetchDataType) => {
		try {
			const response = await axios.get(API + url, { params });
			return { data: response.data, slice };
		} catch (e) {
			console.log('Error: ', e);
		}
	},
);
