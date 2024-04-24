export interface RecentMangas {
  data: RecentManga[];
  pagination: Pagination;
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
}

export interface RecentManga {
  mal_id: string;
  entry: Entry[];
  content: string;
  user: User;
}

export interface User {
  url: string;
  username: string;
}

export interface Entry {
  mal_id: number;
  url: string;
  images: Images;
  title: string;
}

export interface Images {
  jpg: Jpg;
  webp: Jpg;
}

export interface Jpg {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}
