export interface randomMangaFull {
	result: string;
	response: string;
	data: randomManga;
}

export interface randomManga {
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
	property1: string;
	property2: string;
}
