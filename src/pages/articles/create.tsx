// pages/articles/create.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import ArticleForm from '@/components/ArticleForm';
import api from '@/services/api';
import { Article, Author } from '@/types';
import Layout from '@/components/Layout';

export default function CreateArticle() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authors, setAuthors] = useState<Author[] | null>(null);

  const handleSubmit = async (article: Article) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/article/add', article);
      console.log('Article created:', response.data);
      
      // Show success message (you could implement a toast notification here)
      router.push('/articles');
    } catch (e: any) {
      console.error('Error:', e);
      setError(e.response?.data?.message || 'Failed to create article. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
    else{
        api.get('/author').then((res) => {
            setAuthors(res.data);
        }).catch((e) => {
            console.error('Error fetching authors:', e);
            setError('Failed to load authors. Please try again.');
        }
        );
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const emptyArticle: Article = {
    title: '',
    content: '',
    // category: ''
  };

  return (
    <Layout>
      <div className="container py-4">
        <div className="row mb-4">
          <div className="col">
            <h2 className="mb-0">
              <i className="bi bi-plus-circle me-2"></i>
              Create New Article
            </h2>
            <p className="text-muted">Share your knowledge with the world</p>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        <div className="row">
          <div className="col-lg-8">
            <ArticleForm article={emptyArticle} onSubmit={handleSubmit} authors={authors || []} />
          </div>
          <div className="col-lg-4">
            <div className="card shadow">
              <div className="card-header bg-light">
                <h5 className="mb-0">Tips for Great Articles</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <i className="bi bi-lightbulb text-warning me-2"></i>
                    Choose a clear, descriptive title
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-body-text text-primary me-2"></i>
                    Structure your content with headings
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-card-image text-success me-2"></i>
                    Include relevant images when needed
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-link-45deg text-info me-2"></i>
                    Add references and citations
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-tags text-danger me-2"></i>
                    Select the right category for discovery
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}