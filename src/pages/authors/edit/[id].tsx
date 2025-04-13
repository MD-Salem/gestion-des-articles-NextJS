import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Author } from '@/types';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { fetchAuthorById, updateAuthor } from '@/services/authorService';

const EditAuthorPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [author, setAuthor] = useState<Author | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (id) {
            // Fetch author data by ID
            fetchAuthorById(Number(id))
                .then((data) => {
                    setAuthor(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (author) {
            setAuthor({ ...author, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (author) {
            try {
                setSaving(true);
                updateAuthor(author)
                    .then(() => {
                        console.log('Author updated successfully');
                    })

                router.push('/authors');
            } catch (err: any) {
                setError(err.message);
            } finally {
                setSaving(false);
            }
        }
    };

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
                    Error: {error}
                </div>
            </div>
        </Layout>
    );

    return (
        <Layout>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <div className="card shadow-sm">
                            <div className="card-body p-4">
                                <h1 className="card-title h3 mb-4 text-center">Edit Author</h1>
                                
                                {error && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        {error}
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setError(null)}></button>
                                    </div>
                                )}
                                
                                {author && (
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                value={author.name || ''}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="bio" className="form-label">Biography</label>
                                            <textarea
                                                className="form-control"
                                                id="bio"
                                                name="bio"
                                                value={author.bio || ''}
                                                onChange={handleInputChange}
                                                rows={4}
                                            />
                                        </div>
                                        
                                        <div className="d-grid gap-2 mt-4">
                                            <button 
                                                type="submit" 
                                                className="btn btn-primary"
                                                disabled={saving}
                                            >
                                                {saving ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Saving...
                                                    </>
                                                ) : (
                                                    'Save Changes'
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default EditAuthorPage;