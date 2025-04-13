import { Author } from '@/types';
import api from './api';

export const fetchAuthors = async () => {
    const response = await api.get('/author');
    return response.data;
};

export const createAuthor = async (authorData: Author) => {
    const response = await api.post('/author/add', authorData);
    return response.data;
};

export const fetchAuthorById = async (id: Author["id"]) => {
    const response = await api.get(`/author/${id}`);
    return response.data;
};

export const updateAuthor = async (authorData: Author) => {
    const response = await api.put(`/author/update`, authorData);
    return response.data;
};

export const deleteAuthor = async (id: Author['id']) => {
    const response = await api.delete(`/author/${id}`);
    return response.data;
};