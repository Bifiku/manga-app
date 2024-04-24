export type ChapterType = {
	chapter: string;
	id: string;
	count: number;
	others: string[];
};

export type VolumeType = {
	volume: string;
	count: number;
	chapters: ChapterType[];
};

export type ServerResponseType = {
	result: string;
	volumes: Record<string, VolumeType>;
};
