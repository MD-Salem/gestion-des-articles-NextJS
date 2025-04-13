// components/Navbar.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const toggle = (): void => setIsOpen(!isOpen);

  const isActive = (path: string): string => {
    return router.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link href="/" legacyBehavior>
          <a className="navbar-brand fw-bold">
            <i className="bi bi-layers-half me-2"></i>
            ArticleCMS
          </a>
        </Link>
        
        {isAuthenticated ? (
          <>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggle}
          aria-controls="navbarNav" 
          aria-expanded={isOpen ? true : false} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" legacyBehavior>
                <a className={`nav-link ${isActive('/')}`}>
                  <i className="bi bi-house-door me-1"></i> Home
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/authors" legacyBehavior>
                <a className={`nav-link ${isActive('/authors')}`}>
                  <i className="bi bi-people me-1"></i> Authors
                </a>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <i className="bi bi-file-text me-1"></i> Articles
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/articles/create" legacyBehavior>
                    <a className="dropdown-item">
                      <i className="bi bi-plus-circle me-2"></i>Create New
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/articles" legacyBehavior>
                    <a className="dropdown-item">
                      <i className="bi bi-list-stars me-2"></i>All Articles
                    </a>
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link href="/articles/favorites" legacyBehavior>
                    <a className="dropdown-item">
                      <i className="bi bi-star me-2"></i>Favorites
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link href="/contact" legacyBehavior>
                <a className={`nav-link ${isActive('/contact')}`}>
                  <i className="bi bi-envelope me-1"></i> Contact
                </a>
              </Link>
            </li>
          </ul>
          <div className="ms-lg-2 mt-3 mt-lg-0 d-flex">
            
                <div className="btn-group">
                  <button type="button" className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-person-circle me-1"></i> My Account
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link href="/profile" legacyBehavior>
                        <a className="dropdown-item">
                          <i className="bi bi-person me-2"></i>Profile
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard" legacyBehavior>
                        <a className="dropdown-item">
                          <i className="bi bi-speedometer2 me-2"></i>Dashboard
                        </a>
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button 
                        className="dropdown-item text-danger" 
                        onClick={() => {
                          logout();
                          router.push('/login');
                        }}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                </div>
            </div>
        </div>

              </>
              ) : (
              <>
              <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
                <div className="ms-auto mt-3 mt-lg-0 d-flex">
                  <Link href="/login" legacyBehavior>
                    <a className="btn btn-outline-light me-2">
                      <i className="bi bi-box-arrow-in-right me-1"></i> Login
                    </a>
                  </Link>
                  <Link href="/register" legacyBehavior>
                    <a className="btn btn-light">
                      <i className="bi bi-person-plus me-1"></i> Register
                    </a>
                  </Link>
                </div>
              </div>
              </>
            )}
          </div>
    </nav>
  );
};

export default Navbar;