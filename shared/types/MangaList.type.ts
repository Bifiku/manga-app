export interface MangaList {
	result: string;
	response: string;
	data: Datum[];
	limit: number;
	offset: number;
	total: number;
}

export interface Datum {
	id: string;
	type: string;
	attributes: Attributes3;
	relationships: Relationship[];
}

export interface Attributes3 {
	availableTranslatedLanguages: string;
	title: Title;
	altTitles: Title[];
	description: Title;
	isLocked: boolean;
	links: Title;
	originalLanguage: string;
	lastVolume: string;
	lastChapter: string;
	publicationDemographic: string;
	status: string;
	year: number;
	contentRating: string;
	chapterNumbersResetOnNewVolume: boolean;
	latestUploadedChapter: string;
	tags: Tag[];
	state: string;
	version: number;
	createdAt: string;
	updatedAt: string;
}

export interface Tag {
	id: string;
	type: string;
	attributes: Attributes;
	relationships: Relationship[];
}

export interface Relationship {
	id: string;
	type: string;
	related: string;
	attributes: fileName;
}

export interface fileName {
	fileName: string;
}

export interface Attributes {
	name: Title;
	description: Title;
	group: string;
	version: number;
}

export interface Title {
	ru: string;
	en: string;
	additionalProp2: string;
	additionalProp3: string;
}
