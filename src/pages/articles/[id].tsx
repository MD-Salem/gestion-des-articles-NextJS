import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchArticleById } from '@/services/articleService';
import Layout from '@/components/Layout';
import { Article } from '@/types';

const ArticleDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        if (id) {
            const fetchArticle = async () => {
                try {
                    const data = await fetchArticleById(Number(id));
                    setArticle(data);
                } catch (err) {
                    setError('Failed to load article');
                } finally {
                    setLoading(false);
                }
            };
            
            fetchArticle();
        }
    }, [id]);
    
    if (loading) return (
        <Layout>
            <div className="container mt-5">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </Layout>
    );
    
    if (error) return (
        <Layout>
            <div className="container mt-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        </Layout>
    );
    
    return (
        <Layout>
            <div className="container mt-4">
                {article ? (
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <article className="card border-0 shadow-sm">
                                <div className="card-body p-md-5">
                                    <h1 className="card-title mb-4 fw-bold">{article.title}</h1>
                                    
                                    {article.author && (
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="bg-light rounded-circle p-1 me-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <small className="text-muted">Written by</small>
                                                <p className="mb-0 fw-semibold">{article.author.name}</p>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="my-4 border-top pt-4">
                                        <div className="article-content"
                                             dangerouslySetInnerHTML={{ __html: article.content }} />
                                    </div>
                                    
                                    <div className="mt-5">
                                        <button 
                                            onClick={() => router.back()} 
                                            className="btn btn-outline-secondary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left me-2" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                            </svg>
                                            Back to Articles
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                ) : (
                    <div className="alert alert-warning" role="alert">
                        No article found
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ArticleDetail;