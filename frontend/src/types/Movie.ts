import {Genre} from "./Genre";

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    original_title: string;
    vote_average: number;
    key: string;
    genres: Genre[]
}