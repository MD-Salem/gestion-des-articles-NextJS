import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createAuthor } from '@/services/authorService';
import Layout from '@/components/Layout';

const CreateAuthor = () => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await createAuthor({ name, bio });
            router.push('/authors');
        } catch (err) {
            setError('Failed to create author. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <div className="card shadow-sm">
                            <div className="card-body p-4">
                                <h1 className="card-title h3 mb-4 text-center">Create New Author</h1>
                                
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}
                                
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Author Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter author's full name"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="bio" className="form-label">Biography (Optional)</label>
                                        <textarea
                                            className="form-control"
                                            id="bio"
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            placeholder="Brief author biography"
                                            rows={4}
                                        />
                                    </div>
                                    
                                    <div className="d-grid gap-2 mt-4">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Creating...
                                                </>
                                            ) : (
                                                'Create Author'
                                            )}
                                        </button>
                                        
                                        <button 
                                            type="button" 
                                            className="btn btn-outline-secondary"
                                            onClick={() => router.push('/authors')}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateAuthor;