export interface ResponseChapterManga {
	result: string;
	response: string;
	data: DataChapterManga[];
	limit: number;
	offset: number;
	total: number;
}

export interface DataChapterManga {
	id: string;
	type: string;
	attributes: Attributes;
	relationships: Relationship[];
}

export interface Relationship {
	id: string;
	type: string;
	related: string;
	attributes: Attributes2;
}

export interface Attributes2 {}

export interface Attributes {
	title: string;
	volume: string;
	chapter: string;
	pages: number;
	translatedLanguage: string;
	uploader: string;
	externalUrl: string;
	version: number;
	createdAt: string;
	updatedAt: string;
	publishAt: string;
	readableAt: string;
}
