import { useState, ChangeEvent, FormEvent } from 'react';
import api from '../services/api';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [success, setSuccess] = useState('');
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
    setSuccess('');

    // Validation
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      await api.post('/auth/register', {
        username: form.username,
        password: form.password
      });
      setSuccess('Registration successful! You can now log in.');
      
      // Redirect to login page after successful registration (optional)
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Register | My App</title>
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
                <h2 className="text-center mb-4">Register</h2>
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="alert alert-success" role="alert">
                    {success}
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
                      placeholder="Choose a username" 
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
                      placeholder="Create a password" 
                      value={form.password}
                      onChange={handleChange} 
                      required
                    />
                    <div className="form-text">Password must be at least 6 characters long.</div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input 
                      type="password" 
                      id="confirmPassword"
                      name="confirmPassword" 
                      className="form-control" 
                      placeholder="Confirm your password" 
                      value={form.confirmPassword}
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
                          Creating Account...
                        </>
                      ) : 'Register'}
                    </button>
                  </div>
                </form>
                
                <div className="mt-4 text-center">
                  <p>Already have an account? <Link href="/login" className="text-decoration-none">Login here</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}