import { useState, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Head from 'next/head';

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const res = await api.post('/auth/login', form);
      login(res.data.token);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | My App</title>
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" 
          crossOrigin="anonymous" 
        />
      </Head>
      
      <Navbar />
      
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">Login</h2>
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input 
                      type="text"
                      id="username"
                      name="username" 
                      className="form-control" 
                      placeholder="Enter your username" 
                      value={form.username}
                      onChange={handleChange} 
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                      type="password" 
                      id="password"
                      name="password" 
                      className="form-control" 
                      placeholder="Enter your password" 
                      value={form.password}
                      onChange={handleChange} 
                      required
                    />
                  </div>
                  
                  <div className="d-grid gap-2 mt-4">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Logging in...
                        </>
                      ) : 'Login'}
                    </button>
                  </div>
                </form>
                
                <div className="mt-4 text-center">
                  <p>Don't have an account? <Link href="/register" className="text-decoration-none">Register here</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}