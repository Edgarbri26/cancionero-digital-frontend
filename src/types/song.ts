import type { Category } from "./category";

export type Song = {
    id:         number;
    title:      string;
    artist:     string;
    content:    string;
    key:        string;
    url_song:   null;
    categoryId: number;
    category:   Category;
}

