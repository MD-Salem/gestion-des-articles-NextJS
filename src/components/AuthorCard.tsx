import React from 'react';
import { Author } from '@/types';
import { useRouter } from 'next/router';
import { deleteAuthor } from '@/services/authorService';

interface AuthorCardProps {
    author: Author;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
    const router = useRouter();
    
    const handleViewArticles = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push(`/articles/author/${author.id}`);
    };
    
    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/authors/edit/${author.id}`);
    };
    
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        deleteAuthor(author.id).then(() => router.reload());
    };
    
    return (
        <div className="card h-100 shadow-sm">
            <div className="card-body">
                <h4 className="card-title fw-bold">{author.name}</h4>
                <p className="card-text">
                    <span className="badge bg-primary">
                        <i className="bi bi-book me-1"></i>
                        {author.numberOfArticles} Articles
                    </span>
                </p>
            </div>
            <div className="card-footer bg-transparent">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <button 
                            className="btn btn-outline-danger btn-sm me-2"
                            onClick={handleDelete}
                        >
                            <i className="bi bi-trash me-1"></i>Delete
                        </button>
                        <button 
                            className="btn btn-outline-primary btn-sm"
                            onClick={handleEdit}
                        >
                            <i className="bi bi-pencil me-1"></i>Edit
                        </button>
                    </div>
                    <a 
                        href="#" 
                        className="fw-bold text-decoration-none"
                        onClick={handleViewArticles}
                    >
                        View Articles <i className="bi bi-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AuthorCard;