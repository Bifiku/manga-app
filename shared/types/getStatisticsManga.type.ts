export interface StatisticMangas {
	result: string;
	statistics: {
		[animeId: string]: AnimeStatistic; // Ключ - это ID аниме, значение - объект AnimeStatistic
	};
}

export interface AnimeStatistic {
	comments: Comments;
	rating: Rating;
	follows: number;
}

export interface Rating {
	average: number;
	bayesian: number;
}

export interface Comments {
	threadId: number;
	repliesCount: number;
}
