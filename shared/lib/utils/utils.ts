import axios, { AxiosError } from 'axios';
import { API } from '../../api/tokens';

export function truncateText(text: string, maxLength: number) {
	if (text?.length > maxLength) {
		return text.substring(0, maxLength) + '...';
	} else {
		return text;
	}
}

export function filterMangaByLanguage(items: Array<any>) {
	return items.filter((item) => item.attributes.description.ru && item.attributes.altTitles[0].ru);
}

export function getImageUrl(item: any) {
	const checkedFilename = item.relationships.find((i: { type: string }) => i.type === 'cover_art')
		?.attributes.fileName;

	const searchUrlImage = `https://uploads.mangadex.org/covers/${item.id}/${
		item.relationships.find((i: { type: string }) => i.type === 'cover_art')?.attributes.fileName
	}`;

	if (!checkedFilename) {
		return null;
	}

	return searchUrlImage;
}

type paramsRequest = {
	url: string;
	params?: any;
};

export const getDataManga = async ({ url, params }: paramsRequest) => {
	try {
		const response = await axios.get(API + url, { params });
		return response.data;
	} catch (e) {
		if (e instanceof AxiosError) {
			console.error(e.message);
		}
	}
};
