import { Article } from '@/types';
import api from './api';

export const fetchArticles = async (currentPage: number, pageSize: number, sort: string, dir: string) => {
    const response = await api.get('/article', {
        params: {
          page: currentPage,
          size: pageSize,
          sortBy: sort,
          direction: dir
        }
      });
    return response.data;
};

export const fetchArticleById = async (id: Article['id']) => {
    const response = await api.get(`/article/${id}`);
    return response.data;
};

export const createArticle = async (articleData: Article) => {
    const response = await api.post('/article', articleData);
    return response.data;
};

export const updateArticle = async (articleData: Article) => {
    const response = await api.put(`/article/update`, articleData);
    return response.data;
};

export const deleteArticle = async (id: Article['id']) => {
    const response = await api.delete(`/article/${id}`);
    return response.data;
};

export const searchArticles = async (title: string, currentPage: number, pageSize: number, sort: string, dir: string) => {
    const response = await api.post('/article/search', null, {
        params: {
            title,
            page: currentPage,
            size: pageSize,
            sortBy: sort,
            direction: dir
        }
    });
    return response.data;
}

export const toggleFavorite = async (id: Article['id']) => {
    try {
        await api.put(`/article/${id}`);
    } catch (err) {
        console.error('Failed to toggle favorite');
    }
}

export const fetchAuthorArticles = async (id: number , currentPage: number, pageSize: number, sort: string, dir: string) => {
    const response = await api.get(`/article/author/${id}`, {
        params: {
          page: currentPage,
          size: pageSize,
          sortBy: sort,
          direction: dir
        }
      });
    return response.data;
};

export const searchAuthorArticles = async (id: number , title: string, currentPage: number, pageSize: number, sort: string, dir: string) => {
    const response = await api.post(`/article/author/${id}`,null, {
        params: {
          title,
          page: currentPage,
          size: pageSize,
          sortBy: sort,
          direction: dir
        }
      });
    return response.data;
}

export const fetchFavoriteArticles = async (title: string, currentPage: number, pageSize: number, sort: string, dir: string) => {
    const response = await  api.get('/article/favorites', {
        params: {
          title,
          page: currentPage,
          size: pageSize,
          sortBy: sort,
          direction: dir
        }
        });

    return response.data
}