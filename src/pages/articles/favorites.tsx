// src/pages/index.tsx
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import api from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { Article } from '@/types';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import ArticleCard from '@/components/ArticleCard';
import { toggleFavorite } from '@/services/articleService';
import Link from 'next/link';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const { isAuthenticated, logout, loading } = useAuth();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // 0-based index
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const pageSize = 6;
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    };
  

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push('/login');
      }
    
      if (!loading && isAuthenticated) {
        api.get('/article/favorites', {
            params: {
              title: search,
              page: currentPage,
              size: pageSize,
              sortBy: 'id',
              sortDirection: 'asc'
            }
            })
            .then(res => {
                setArticles(res.data.content);
                setTotalPages(res.data.totalPages);
              })          .catch(() => logout());
      }
    }, [isAuthenticated, loading, currentPage, search]);
    
    if (loading || !isAuthenticated) return null;

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    api.post('/article/search',null, { params: { 'title': search, page: currentPage,
        size: pageSize,
        sortBy: 'id',
        sortDirection: 'asc' } })
        .then(res => {
            setArticles(res.data.content);
            setTotalPages(res.data.totalPages);
          })      .catch((e) => console.log('error:',e));
  }

  const handleArticleClick = (articleId: number | undefined) => {
    router.push(`/articles/${articleId}`);
  };

  
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div className="me-auto">
            <h2 className="fw-bold mb-0">Articles</h2>
            <p className="text-muted">Showing {articles.length} of {totalPages * pageSize} articles</p>
          </div>
          
          <div className="d-flex mb-3 mb-md-0 me-md-3">
            <div className="btn-group me-2" role="group" aria-label="View mode">
              <button 
                type="button" 
                className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewMode('grid')}
              >
                <i className="bi bi-grid-3x3-gap-fill"></i>
              </button>
              <button 
                type="button" 
                className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setViewMode('list')}
              >
                <i className="bi bi-list-ul"></i>
              </button>
            </div>

            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search articles..." 
                aria-label="Search" 
                value={search}
                onChange={handleChange}
              />
              <button className="btn btn-outline-primary" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>
          </div>
          
          <div>
            <button className="btn btn-primary" onClick={() => router.push('/articles/create')}>
              <i className="bi bi-plus-circle me-2"></i>Add Article
            </button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="row g-4 mb-4">
            {articles.map((article: Article) => (
              <div className="col-12 col-md-6 col-lg-4" key={article.id}>
                <ArticleCard 
                  article={article} 
                  onClick={() => handleArticleClick(article.id)} 
                />
              </div>
            ))}
          </div>
        )}

        {/* List View (Original Table) */}
        {viewMode === 'list' && (
          <div className="table-responsive mb-4">
            <table className="table table-hover">
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th>#</th>
                  <th>
                    <span className="text-dark fw-bold">
                      TITLE
                      <i className="bi bi-caret-down-fill ms-1"></i>
                    </span>
                  </th>
                  <th>
                    <span className="text-dark fw-bold">
                      CONTENT PREVIEW
                      <i className="bi bi-caret-up-fill ms-1"></i>
                    </span>
                  </th>
                  <th>
                    <span className="text-dark fw-bold">
                      Author
                      <i className="bi bi-caret-up-fill ms-1"></i>
                    </span>
                  </th>
                  <th colSpan={3} style={{ textAlign: 'center' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article: Article) => (
                  <tr key={article.id}>
                    <td>{article.id}</td>
                    <td>
                      <Link 
                        href={`/articles/${article.id}`} 
                        className="fw-bold text-decoration-none"
                      >
                        {article.title}
                      </Link>
                    </td>
                    <td>
                      {article.content.length > 100 
                        ? `${article.content.substring(0, 100)}...` 
                        : article.content}
                    </td>
                    <td>{article.author?.name || 'Unknown'}</td>
                    <td>
                      <button 
                        className="btn btn-outline-danger btn-sm" 
                        onClick={() => {
                          api.delete(`/article/${article.id}`);
                          router.reload();
                        }}
                      >
                        <i className="bi bi-trash me-1"></i>Delete
                      </button>
                    </td>
                    <td>
                      <button 
                        className="btn btn-outline-primary btn-sm" 
                        onClick={() => router.push(`/articles/edit/${article.id}`)}
                      >
                        <i className="bi bi-pencil me-1"></i>Edit
                      </button>
                    </td>
                    <td>
                      <i 
                        className={`bi fs-3 ${article.isFavorite ? 'bi-star-fill text-warning' : 'bi-star'}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleFavorite(article.id).then(() => router.reload())}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination - Works for both views */}
        <nav className="mt-3">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                <i className="bi bi-chevron-left"></i> Previous
              </button>
            </li>
            
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => setCurrentPage(i)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            
            <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next <i className="bi bi-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>

        {articles.length === 0 && (
          <div className="text-center py-5">
            <div className="mb-3">
              <i className="bi bi-journal-x text-muted" style={{ fontSize: '4rem' }}></i>
            </div>
            <h3>No articles found</h3>
            <p className="text-muted">Try adjusting your search or create a new article</p>
            <button 
              className="btn btn-primary mt-3" 
              onClick={() => router.push('/articles/create')}
            >
              <i className="bi bi-plus-circle me-2"></i>Add Article
            </button>
          </div>
        )}
      </div>
    </>
  );
}