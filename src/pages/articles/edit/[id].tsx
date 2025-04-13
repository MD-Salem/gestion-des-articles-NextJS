// pages/articles/edit/[id].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ArticleForm from '@/components/ArticleForm';
import { fetchArticleById, updateArticle } from '@/services/articleService';
import { Article, Author } from '@/types';
import axios from 'axios';
import Layout from '@/components/Layout';
import { fetchAuthors } from '@/services/authorService';

const EditArticle = () => {
    const router = useRouter();
    const { id } = router.query;
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
      const [authors, setAuthors] = useState<Author[] | null>(null);
    

    useEffect(() => {
        if (id) {
            const fetchArticle = async () => {
                try {
                    const data = await fetchArticleById(Number(id));
                    setArticle(data);
                } catch (err) {
                    if (axios.isAxiosError(err)) {
                        const message = err.response?.data?.message || err.message || 'Something went wrong';
                        setError(message);
                    } else {
                        setError('An unexpected error occurred');
                    }
                } finally {
                    setLoading(false);
                }
            };
            fetchArticle();
        }
        (async () => {
            try {
            setAuthors(await fetchAuthors());
            }
            catch (err) {
                if (axios.isAxiosError(err)) {
                    const message = err.response?.data?.message || err.message || 'Something went wrong';
                    setError(message);
                } else {
                    setError('An unexpected error occurred');
                }
            }
        })();
        
    }, [id]);

    const handleUpdate = async (updatedArticle: Article) => {
        try {
            await updateArticle(updatedArticle);
            router.push(`/articles/${id}`);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message || err.message || 'Something went wrong';
                setError(message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <Layout>
            <div className="container py-4">
                <div className="row mb-4">
                    <div className="col">
                        <h2 className="mb-0">
                            <i className="bi bi-pencil-square me-2"></i>
                            Edit Article
                        </h2>
                        <p className="text-muted">Update your article details</p>
                    </div>
                </div>

                {error && (
                    <div className="alert alert-danger mb-4" role="alert">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="d-flex justify-content-center my-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : !article ? (
                    <div className="alert alert-warning">
                        <i className="bi bi-search me-2"></i>
                        Article not found. The article may have been deleted or you may not have permission to edit it.
                        <div className="mt-3">
                            <button 
                                className="btn btn-outline-primary"
                                onClick={() => router.push('/')}
                            >
                                <i className="bi bi-arrow-left me-2"></i>
                                Return to Home
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-lg-8">
                            <ArticleForm article={article} onSubmit={handleUpdate} authors={authors || []} />
                        </div>
                        <div className="col-lg-4">
                            <div className="card shadow">
                                <div className="card-header bg-light">
                                    <h5 className="mb-0">Article Information</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between">
                                            <span><i className="bi bi-hash me-2"></i>ID:</span>
                                            <span className="badge bg-secondary">{article.id}</span>
                                        </li>
                                        {article.createdAt && (
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span><i className="bi bi-calendar-plus me-2"></i>Created:</span>
                                                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                                            </li>
                                        )}
                                        {article.author && (
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span><i className="bi bi-person me-2"></i>Author:</span>
                                                <span>{article.author.name}</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <div className="d-grid">
                                        <button 
                                            className="btn btn-outline-danger"
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
                                                    // Add delete functionality
                                                    router.push('/');
                                                }
                                            }}
                                        >
                                            <i className="bi bi-trash me-2"></i>
                                            Delete Article
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default EditArticle;