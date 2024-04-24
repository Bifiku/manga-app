export interface MangaResponseType {
	result: string;
	response: string;
	data: MangaType;
}

export interface MangaType {
	id: string;
	type: string;
	attributes: Attributes3;
	relationships: Relationship[];
}

export interface Attributes3 {
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
	availableTranslatedLanguages: any[];
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
	attributes: Attributes2;
}

export interface Attributes2 {}

export interface Attributes {
	name: Title;
	description: Title;
	group: string;
	version: number;
}

export interface Title {
	ru: string | number;
	en: string;
	property2: string;
}
