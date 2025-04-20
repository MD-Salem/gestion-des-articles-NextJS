import { Article } from '@/types';
import React from 'react';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
  onDelete: (e: React.MouseEvent) => void;
  onEdit: (e: React.MouseEvent) => void;
  onFavoriteToggle: (e: React.MouseEvent) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  onClick, 
  onDelete, 
  onEdit, 
  onFavoriteToggle 
}) => {
  return (
    <div className="card h-100 shadow-sm">
      {/* Favorite star in top right corner */}
      <div 
        className="position-absolute top-0 end-0 m-2"
        onClick={onFavoriteToggle}
        style={{ zIndex: 10 }}
      >
        <i 
          className={`bi fs-3 ${article.isFavorite ? 'bi-star-fill text-warning' : 'bi-star'}`}
          style={{ cursor: 'pointer' }}
        ></i>
      </div>

      <div className="card-body">
        {/* Category badge - shown at the top of the card */}
        
        
        <h5 className="card-title fw-bold">{article.title}</h5>
        <div className="mb-2 mt-3 h6 d-flex justify-content-between align-items-center">
          <span className="card-subtitle text-muted d-flex align-items-center">
            <i className="bi bi-person me-1"></i>
            {article.author?.name || 'Unknown'}
          </span>
          
          {article.category && (
            <span className="badge bg-secondary text-white d-flex align-items-center">
              <i className="bi bi-tag me-1"></i>
              {article.category}
            </span>
          )}
        </div>

        <p className="card-text">
          {article.content.length > 150
            ? `${article.content.substring(0, 150)}...`
            : article.content}
        </p>
      </div>
      <div className="card-footer bg-transparent">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <button 
              className="btn btn-outline-danger btn-sm me-2"
              onClick={onDelete}
            >
              <i className="bi bi-trash me-1"></i>Delete
            </button>
            <button 
              className="btn btn-outline-primary btn-sm"
              onClick={onEdit}
            >
              <i className="bi bi-pencil me-1"></i>Edit
            </button>
          </div>
          <a 
            href="#" 
            className="fw-bold text-decoration-none"
            onClick={(e) => {
              e.preventDefault();
              onClick();
            }}
          >
            Read More <i className="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;