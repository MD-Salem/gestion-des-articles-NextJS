import React, { useEffect, useState } from 'react';
import { fetchAuthors } from '@/services/authorService';
import AuthorCard from '@/components/AuthorCard';
import { Author } from '@/types';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const AuthorsPage = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const { isAuthenticated, logout, loading } = useAuth();
    const router = useRouter();
    
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        }
        
        if (!loading && isAuthenticated) {        
            const loadAuthors = async () => {
                const data = await fetchAuthors();
                setAuthors(data);
            };
            loadAuthors();
        }
    }, [isAuthenticated, loading, router]);
    
    if (loading || !isAuthenticated) return null;

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                    <div className="me-auto">
                        <h2 className="fw-bold mb-0">Authors</h2>
                        <p className="text-muted">Showing {authors.length} authors</p>
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
                    </div>
                    
                    <div>
                        <button className="btn btn-primary" onClick={() => router.push('/authors/create')}>
                            <i className="bi bi-plus-circle me-2"></i>Add Author
                        </button>
                    </div>
                </div>
                
                {/* Grid View */}
                {viewMode === 'grid' && (
                    <div className="row g-4 mb-4">
                        {authors.map((author: Author) => (
                            <div className="col-12 col-md-6 col-lg-4" key={author.id}>
                                <AuthorCard author={author} />
                            </div>
                        ))}
                    </div>
                )}
                
                {/* List View */}
                {viewMode === 'list' && (
                    <div>
                        {authors.map((author: Author) => (
                            <AuthorCard key={author.id} author={author} />
                        ))}
                    </div>
                )}
                
                {authors.length === 0 && (
                    <div className="text-center py-5">
                        <div className="mb-3">
                            <i className="bi bi-person-x text-muted" style={{ fontSize: '4rem' }}></i>
                        </div>
                        <h3>No authors found</h3>
                        <p className="text-muted">Create a new author to get started</p>
                        <button 
                            className="btn btn-primary mt-3" 
                            onClick={() => router.push('/authors/create')}
                        >
                            <i className="bi bi-plus-circle me-2"></i>Add Author
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default AuthorsPage;