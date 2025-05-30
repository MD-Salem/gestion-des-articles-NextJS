import { DateTime } from "next-auth/providers/kakao";

export interface Article {
    id?: number;
    title: string;
    content: string;
    author?: {
        id: number,
        name?: string,
        numberOfArticles?: number
    }
    createdAt?: DateTime;
    isFavorite?: boolean;
    category?: string;
}

export interface Author {
    id?: number;
    name: string;
    bio?: string;
    numberOfArticles?: number;
}

export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export type SortField = 'id' | 'title' | 'content' | 'author' | 'category';
export type SortDirection = 'asc' | 'desc';