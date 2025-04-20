import { Article, Author } from '@/types';
import { ar } from 'date-fns/locale';
import React, { useState } from 'react';

interface ArticleFormProps {
  // initialTitle?: string;
  // initialContent?: string;
  article: Article;
  onSubmit: (article: Article) => void;
  authors: Author[];

}

const ArticleForm: React.FC<ArticleFormProps> = ({ article , onSubmit, authors }) => {
  const [title, setTitle] = useState(article.title || '');
  const [content, setContent] = useState(article.content || '');
  const [loading, setLoading] = useState(false);
  const [authorId, setAuthorId] = useState<number | null>(article.author?.id || null);
  const [category, setCategory] = useState(article.category || '')



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({id: article.id, title, content, author: {id: authorId || 0}, category});
  };

  return (
    <div className="card shadow">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">
          <i className="bi bi-file-earmark-text me-2"></i>
          {article.id ? 'Edit Article' : 'Create New Article'}
        </h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <input type="number" hidden defaultValue={article.id}/>
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-bold">
              <i className="bi bi-type-h1 me-1"></i> Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter article title"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Author</label>
            <select
              className="form-select"
              value={authorId || ''}
              onChange={(e) => setAuthorId(Number(e.target.value))}
              required
            >
              <option value="" disabled>Select an author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          
          <div className="mb-3">
            <label htmlFor="category" className="form-label fw-bold">
              <i className="bi bi-tag me-1"></i> Category
            </label>
            <select
              className="form-select"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Technology" >Technology</option>
              <option value="Science">Science</option>
              <option value="Health">Health</option>
              <option value="Business">Business</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Sports">Sports</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="content" className="form-label fw-bold">
              <i className="bi bi-body-text me-1"></i> Content
            </label>
            <textarea
              className="form-control"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              placeholder="Write your article content here..."
              required
            />
          </div>
          
          <div className="d-flex justify-content-end gap-2">
            <button 
              type="button" 
              className="btn btn-outline-secondary"
              onClick={() => window.history.back()}
            >
              <i className="bi bi-x-circle me-1"></i> Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-1"></i> 
                  {article.id ? 'Update Article' : 'Create Article'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleForm;