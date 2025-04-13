// src/pages/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '../context/AuthContext';
import Navbar from '@/components/Navbar';

export default function Welcome() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If already authenticated, user might want to go directly to articles
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  return (
    <>
      <Head>
        <title>Welcome to ArticleCMS</title>
        <meta name="description" content="A modern content management system for articles" />
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css" 
        />
      </Head>

      <Navbar />

      {/* Hero Section - Updated with gradient background to distinguish from navbar */}
      <div className="position-relative overflow-hidden" style={{ 
        background: 'linear-gradient(135deg, #6f42c1 0%, #007bff 100%)',
        minHeight: '85vh'
      }}>
        <div className="container py-5">
          <div className="row align-items-center g-5 py-5">
            <div className="col-lg-6 text-white">
              <span className="badge bg-warning text-dark mb-3 p-2">Content Management Simplified</span>
              <h1 className="display-3 fw-bold lh-1 mb-4">Write, Publish, and Manage with Ease</h1>
              <p className="lead mb-4 pe-lg-5">ArticleCMS provides everything you need to create stunning articles, collaborate with authors, and reach your audience.</p>
              
              <div className="d-flex gap-3 flex-wrap mb-5">
                {isAuthenticated ? (
                  <>
                    <Link href="/articles" className="btn btn-light btn-lg px-4 py-3 rounded-pill">
                      <i className="bi bi-collection me-2"></i>Browse Articles
                    </Link>
                    <Link href="/articles/create" className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill">
                      <i className="bi bi-pencil-square me-2"></i>Create Article
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="btn btn-light btn-lg px-4 py-3 rounded-pill">
                      <i className="bi bi-box-arrow-in-right me-2"></i>Login
                    </Link>
                    <Link href="/register" className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill">
                      <i className="bi bi-person-plus me-2"></i>Register
                    </Link>
                  </>
                )}
              </div>
              
              <div className="d-flex align-items-center">
                <div className="d-flex me-3">
                  <div className="avatar-group">
                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User" className="rounded-circle border border-white" style={{ marginLeft: '-10px', maxHeight: '50px', maxWidth: '50px' }} />
                    <img src="https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User" className="rounded-circle border border-white" style={{ marginLeft: '-10px', maxHeight: '50px', maxWidth: '50px' }} />
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User" className="rounded-circle border border-white" style={{ marginLeft: '-10px', maxHeight: '50px', maxWidth: '50px' }} />
                  </div>
                </div>
                <p className="small text-white m-0">Trusted by 2,500+ content creators worldwide</p>
              </div>
            </div>
            
            <div className="col-lg-6 position-relative">
              <div className="card shadow-lg rounded-4 overflow-hidden bg-white" style={{ transform: 'rotate(2deg)' }}>
                <div className="card-header bg-light py-3">
                  <div className="d-flex align-items-center">
                    <div className="me-2">
                      <span className="rounded-circle d-inline-block me-1" style={{ width: '12px', height: '12px', backgroundColor: '#ff5f57' }}></span>
                      <span className="rounded-circle d-inline-block me-1" style={{ width: '12px', height: '12px', backgroundColor: '#febc2e' }}></span>
                      <span className="rounded-circle d-inline-block" style={{ width: '12px', height: '12px', backgroundColor: '#28c840' }}></span>
                    </div>
                    <div className="small text-muted text-center w-100">article-editor.cms</div>
                  </div>
                </div>
                <div className="card-body px-4 py-5">
                  <div className="mb-4">
                    <div className="mb-3">
                      <label className="form-label small text-muted">Article Title</label>
                      <div className="h4 mb-0">Getting Started with ArticleCMS</div>
                    </div>
                    <div className="small text-muted mb-4">By Mohamed Salem • April 10, 2025</div>
                    <div className="mb-3">
                      <div className="bg-light w-100 mb-3" style={{ height: '20px', borderRadius: '4px' }}></div>
                      <div className="bg-light w-75 mb-3" style={{ height: '20px', borderRadius: '4px' }}></div>
                      <div className="bg-light w-100 mb-3" style={{ height: '20px', borderRadius: '4px' }}></div>
                      <div className="bg-light w-50" style={{ height: '20px', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                  <div className="mt-4 text-end">
                    <button className="btn btn-primary btn-sm me-2">
                      <i className="bi bi-save me-1"></i> Save
                    </button>
                    <button className="btn btn-success btn-sm">
                      <i className="bi bi-send me-1"></i> Publish
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="position-absolute" style={{ bottom: '10%', left: '-5%', zIndex: '-1' }}>
                <div className="rounded-circle bg-warning opacity-75" style={{ width: '80px', height: '80px' }}></div>
              </div>
              <div className="position-absolute" style={{ top: '5%', right: '0%', zIndex: '-1' }}>
                <div className="rounded-circle bg-info opacity-75" style={{ width: '60px', height: '60px' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="position-absolute bottom-0 left-0 w-100 overflow-hidden" style={{ transform: 'translateY(1px)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ width: '100%', height: '60px' }}>
            <path fill="#ffffff" fillOpacity="1" d="M0,32L48,53.3C96,75,192,117,288,117.3C384,117,480,75,576,69.3C672,64,768,96,864,122.7C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-5">
        <h2 className="text-center mb-2">Why Choose ArticleCMS?</h2>
        <p className="text-center text-muted mb-5">Everything you need for professional content management</p>
        
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                  <i className="bi bi-pencil-square text-primary fs-1"></i>
                </div>
                <h3 className="card-title h5">Easy Content Creation</h3>
                <p className="card-text">Create and edit articles with our intuitive interface. No technical skills required.</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                  <i className="bi bi-search text-primary fs-1"></i>
                </div>
                <h3 className="card-title h5">Powerful Search</h3>
                <p className="card-text">Find articles quickly with our advanced search functionality.</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                  <i className="bi bi-star text-primary fs-1"></i>
                </div>
                <h3 className="card-title h5">Favorites System</h3>
                <p className="card-text">Mark your favorite articles to easily access them later.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-light py-5">
        <div className="container py-4">
          <div className="row justify-content-center mb-4">
            <div className="col-md-8 text-center">
              <h2 className="mb-3">What Our Users Say</h2>
              <p className="text-muted">Trusted by content creators around the world</p>
            </div>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow">
                <div className="card-body p-4 p-md-5">
                  <div className="d-flex justify-content-between mb-4">
                    <div className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                  </div>
                  <p className="lead mb-4">"ArticleCMS has transformed how we manage our content. The interface is intuitive, and the favorite feature helps us keep track of our most important articles."</p>
                  <div className="d-flex align-items-center">
                    <img src="https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Sarah Johnson" className="rounded-circle me-3" style={{ maxHeight: '50px' }} />
                    <div>
                      <h6 className="mb-0">Sarah Johnson</h6>
                      <p className="small text-muted mb-0">Content Manager, TechDaily</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="row g-0">
                <div className="col-md-6 bg-primary text-white p-5 d-flex flex-column justify-content-center">
                  <h2 className="mb-3">Ready to Get Started?</h2>
                  <p className="mb-4">Join thousands of content creators who trust ArticleCMS for their content management needs.</p>
                  
                  {isAuthenticated ? (
                    <Link href="/articles/create" className="btn btn-light btn-lg">
                      <i className="bi bi-plus-circle me-2"></i>Create Your First Article
                    </Link>
                  ) : (
                    <Link href="/register" className="btn btn-light btn-lg">
                      <i className="bi bi-person-plus me-2"></i>Create Free Account
                    </Link>
                  )}
                </div>
                <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
                  <h3 className="h4 mb-3">Explore the features</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Unlimited articles and authors
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Advanced search capabilities
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Responsive design for all devices
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Regular updates and new features
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <h5 className="fw-bold mb-3">ArticleCMS</h5>
              <p className="small mb-3">A modern content management system for articles.</p>
              <div className="d-flex gap-2">
                <a href="#" className="btn btn-sm btn-outline-light rounded-circle">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="btn btn-sm btn-outline-light rounded-circle">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="btn btn-sm btn-outline-light rounded-circle">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
            <div className="col-md-2 mb-4 mb-md-0">
              <h6 className="fw-bold mb-3">Quick Links</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">Home</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">About</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">Features</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">Pricing</a></li>
              </ul>
            </div>
            <div className="col-md-2 mb-4 mb-md-0">
              <h6 className="fw-bold mb-3">Support</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">Help Center</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">Documentation</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">Community</a></li>
                <li className="mb-2"><a href="#" className="text-white text-decoration-none">Contact Us</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h6 className="fw-bold mb-3">Newsletter</h6>
              <p className="small mb-3">Subscribe to our newsletter for updates and tips.</p>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Your email" aria-label="Your email" />
                <button className="btn btn-primary" type="button">Subscribe</button>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="row align-items-center">
            <div className="col-md-6 small">
              © {new Date().getFullYear()} ArticleCMS. All rights reserved.
            </div>
            <div className="col-md-6 text-md-end small">
              <a href="#" className="text-white text-decoration-none me-3">Privacy Policy</a>
              <a href="#" className="text-white text-decoration-none me-3">Terms of Service</a>
              <a href="#" className="text-white text-decoration-none">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}