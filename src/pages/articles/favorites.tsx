// src/pages/index.tsx
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import api from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { Article, SortDirection, SortField } from '@/types';
import { useRouter } from 'next/router';
import ArticleCard from '@/components/ArticleCard';
import { fetchFavoriteArticles, toggleFavorite } from '@/services/articleService';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const { isAuthenticated, logout, loading } = useAuth();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // 0-based index
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
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
       fetchFavoriteArticles(search, currentPage, pageSize, sortField, sortDirection)
            .then(res => {
                setArticles(res.content);
                setTotalPages(res.totalPages);
              })          .catch((e) => console.log('Error fetching articles', e));
      }
    }, [isAuthenticated, loading, currentPage, search, sortField, sortDirection]);
    
    if (loading || !isAuthenticated) return null;

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      fetchFavoriteArticles(search, currentPage, pageSize, sortField, sortDirection)
        .then(res => {
            setArticles(res.content);
            setTotalPages(res.totalPages);
          })      .catch((e) => console.log('error:',e));
  }

  const handleSort = (field: SortField) => {
    // If clicking the same field, toggle direction
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a new field, set it as the sort field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
    // Reset to first page when sorting changes
    setCurrentPage(0);
  };

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) {
      return <i className="bi bi-arrow-down-up text-muted ms-1"></i>;
    }
    return sortDirection === 'asc' 
      ? <i className="bi bi-caret-up-fill ms-1"></i> 
      : <i className="bi bi-caret-down-fill ms-1"></i>;
  };

  const handleArticleClick = (articleId: number | undefined) => {
    router.push(`/articles/${articleId}`);
  };

  const handleDelete = (articleId: number | undefined, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    api.delete(`/article/${articleId}`).then(() => {
      setArticles(articles.filter(a => a.id !== articleId));
    });
    
  };

  const handleEdit = (articleId: number | undefined, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    router.push(`/articles/edit/${articleId}`);
  };

  const handleFavoriteToggle = (articleId: number | undefined, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    toggleFavorite(articleId)
    .then(() => setArticles(articles.filter(a => a.id !== articleId)));
  };
  
  return (
    <Layout>
      <div className="container mt-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div className="me-auto">
            <h2 className="fw-bold mb-0">Favorite Articles</h2>
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

        {/* Sort Options Dropdown */}
        <div className="mb-3">
          <div className="dropdown d-inline-block">
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="sortDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              Sort by: {sortField.charAt(0).toUpperCase() + sortField.slice(1)} ({sortDirection === 'asc' ? 'A-Z' : 'Z-A'})
            </button>
            <ul className="dropdown-menu" aria-labelledby="sortDropdown">
              <li><button className="dropdown-item" onClick={() => handleSort('id')}>ID {sortField === 'id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</button></li>
              <li><button className="dropdown-item" onClick={() => handleSort('title')}>Title {sortField === 'title' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</button></li>
              <li><button className="dropdown-item" onClick={() => handleSort('content')}>Content {sortField === 'content' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</button></li>
              <li><button className="dropdown-item" onClick={() => handleSort('author')}>Author {sortField === 'author' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</button></li>
              <li><button className="dropdown-item" onClick={() => handleSort('category')}>Category {sortField === 'category' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}</button></li>
            </ul>
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
                  onDelete={(e) => handleDelete(article.id, e)}
                  onEdit={(e) => handleEdit(article.id, e)}
                  onFavoriteToggle={(e) => handleFavoriteToggle(article.id, e)}
                />
              </div>
            ))}
          </div>
        )}

        {/* List View (Updated Table) */}
        {viewMode === 'list' && (
          <div className="table-responsive mb-4">
            <table className="table table-hover">
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>
                    <span className="text-dark fw-bold">
                      # {getSortIcon('id')}
                    </span>
                  </th>
                  <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
                    <span className="text-dark fw-bold">
                      TITLE {getSortIcon('title')}
                    </span>
                  </th>
                  <th onClick={() => handleSort('content')} style={{ cursor: 'pointer' }}>
                    <span className="text-dark fw-bold">
                      CONTENT PREVIEW {getSortIcon('content')}
                    </span>
                  </th>
                  <th onClick={() => handleSort('author')} style={{ cursor: 'pointer' }}>
                    <span className="text-dark fw-bold">
                      AUTHOR {getSortIcon('author')}
                    </span>
                  </th>
                  <th onClick={() => handleSort('category')} style={{ cursor: 'pointer' }}>
                    <span className="text-dark fw-bold">
                      CATEGORY {getSortIcon('category')}
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
                      {article.category ? (
                        <span className="badge bg-secondary rounded-pill">
                          {article.category}
                        </span>
                      ) : (
                        <span className="text-muted">Uncategorized</span>
                      )}
                    </td>
                    <td>
                      <button 
                        className="btn btn-outline-danger btn-sm" 
                        onClick={(e) => handleDelete(article.id, e)}
                      >
                        <i className="bi bi-trash me-1"></i>Delete
                      </button>
                    </td>
                    <td>
                      <button 
                        className="btn btn-outline-primary btn-sm" 
                        onClick={(e) => handleEdit(article.id, e)}
                      >
                        <i className="bi bi-pencil me-1"></i>Edit
                      </button>
                    </td>
                    <td>
                      <i 
                        className={`bi fs-3 ${article.isFavorite ? 'bi-star-fill text-warning' : 'bi-star'}`}
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => handleFavoriteToggle(article.id, e)}
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
            <h3>No favorite articles found</h3>
            <p className="text-muted">Try adjusting your search or view all article</p>
            <button 
              className="btn btn-primary mt-3" 
              onClick={() => router.push('/articles')}
            >
              <i className="bi bi-list-stars me-2"></i>All Articles
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}