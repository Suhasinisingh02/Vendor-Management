import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser, faChartLine, faSyncAlt, faMobileAlt, faRobot, faSearch, faShieldAlt, faBuilding, faCrown, faGlobe,  
  faUserCircle, 
  faSignOutAlt, 
  faTachometerAlt,
  faBoxes,
  faMapMarkerAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons'; 
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Homepage.css';
import heroImage from "../src/assets/images/hero.png";
import banner from "../src/assets/images/image.png";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import "./login.css";
import "./signup.css";
import { signOut } from "firebase/auth";
import { UserContext } from "../context/usercontext.jsx";
import logo from '../src/assets/images/logo.png';

// Import Chatbot related files
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import '../chatbot/chatbot.css';
import config from '../chatbot/config.jsx';
import MessageParser from '../chatbot/MessageParser.jsx';
import ActionProvider from '../chatbot/actionprovider.jsx';

// Firebase initialization
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZW94oGiV8TvDlx6JR60VBSrStfhKIAsQ",
  authDomain: "theta-csrmodel.firebaseapp.com",
  projectId: "theta-csrmodel",
  storageBucket: "theta-csrmodel.firebasestorage.app",
  messagingSenderId: "247215849223",
  appId: "1:247215849223:web:c90925a8903f737cc44fa2",
  measurementId: "G-PKTW89K34C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [user, setUser] = useState(null);
  const [chatbotVisible, setChatbotVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if the user is authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the user state when logged in
      } else {
        setUser(null); // Reset user state when logged out
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuActive(!mobileMenuActive);
    document.body.style.overflow = mobileMenuActive ? '' : 'hidden';
  };

  const closeMobileMenu = () => {
    setMobileMenuActive(false);
    document.body.style.overflow = '';
  };

  const toggleChatbot = () => {
    setChatbotVisible(!chatbotVisible);
  };

  return (
    <div className="app">
      <Header
        scrolled={scrolled}
        toggleMobileMenu={toggleMobileMenu}
        user={user}
        mobileMenuActive={mobileMenuActive}
      />
      <MobileMenu active={mobileMenuActive} closeMenu={closeMobileMenu} />
      <Overlay active={mobileMenuActive} onClick={closeMobileMenu} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />

      {/* Chatbot toggle button */}
      <button className="chatbot-toggle-btn" onClick={toggleChatbot}>
        <FontAwesomeIcon icon={faRobot} />
      </button>

      {/* Chatbot container */}
      {chatbotVisible && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>GoodVentory Assistant</h3>
            <button className="close-chatbot" onClick={toggleChatbot}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
    </div>
  );
};

const Header = ({ scrolled, toggleMobileMenu, user, mobileMenuActive }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const auth = getAuth();
  const isSignup = location.pathname === "/signup";
  // Get userData from context or use the user prop directly if context is not working
  const { userData } = useContext(UserContext) || {};
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // For testing purposes: if userData from context is null but user prop exists, use that
  const effectiveUser = userData || user;

  const handleDirectNav = (route) => {
    navigate(route);
  };
  
  const toggleDropdown = (e) => {
    if (e) e.stopPropagation(); // Prevent event bubbling
    setDropdownOpen(!dropdownOpen);
    console.log("Dropdown toggled:", !dropdownOpen); // Debug log
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
      setDropdownOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.user-dropdown-container')) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define breakpoint for mobile menu
  const isMobile = windowWidth <= 768;

  // Debug log to check user data
  useEffect(() => {
    console.log("Current user data:", effectiveUser);
  }, [effectiveUser]);

  return (
    <header id="header" className={scrolled ? "scrolled" : ""}>
      <div className="container">
        <nav>
          <Link to="/" className="logo">
            <img
              src={logo}
              alt="GoodVentory Logo"
              className="logo-icon"
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = "/default-logo.png";
              }}
            />

            <span className="logo-name">GoodVentory</span>
          </Link>

          {/* Desktop navigation links */}
          {!isMobile && (
            <div className="nav-links">
              <Link to="/features" className="nav-link">
                Features
              </Link>
              <Link to="/how-it-works" className="nav-link">
                How It Works
              </Link>
              <Link to="/pricing" className="nav-link">
                Pricing
              </Link>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </div>
          )}

          <div className="auth-section">
            {effectiveUser ? (
              <div className="user-dropdown-container auth-element">
                <div className="user-avatar" onClick={toggleDropdown}>
                  {effectiveUser.photoURL ? (
                    <img
                      src={effectiveUser.photoURL}
                      alt="User"
                      className="avatar-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "../assets/images/logo.png";
                      }}
                    />
                  ) : (
                    <div className="avatar-placeholder">
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{ fontSize: "18px" }}
                      />
                    </div>
                  )}
                </div>

                {dropdownOpen && (
                  <div className="user-dropdown active">
                    {" "}
                    {/* Added active class for visibility */}
                    <div className="user-info">
                      <div className="user-name">
                        {effectiveUser.displayName || effectiveUser.email}
                      </div>
                      {effectiveUser.displayName && (
                        <div className="user-email">{effectiveUser.email}</div>
                      )}
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link
                      to="/dashboard"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FontAwesomeIcon
                        icon={faTachometerAlt}
                        className="dropdown-icon"
                      />
                      Dashboard
                    </Link>
                    <Link
                      to="/inventory"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FontAwesomeIcon
                        icon={faBoxes}
                        className="dropdown-icon"
                      />
                      Inventory
                    </Link>
                    <Link
                      to="/tracking"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="dropdown-icon"
                      />
                      Tracking
                    </Link>
                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        className="dropdown-icon"
                      />
                      Profile
                    </Link>
                    <div className="dropdown-divider"></div>
                    <div
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="dropdown-icon"
                      />
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-toggle auth-element">
                <div
                  className="auth-toggle-indicator"
                  style={{
                    left: isSignup ? "0" : "50%",
                  }}
                >
                  {isSignup ? "Sign Up" : "Log in"}
                </div>
                <div
                  className="auth-toggle-option"
                  style={{
                    color: isSignup ? "transparent" : "#333",
                  }}
                  onClick={() => handleDirectNav("/signup")}
                >
                  Sign Up
                </div>
                <div
                  className="auth-toggle-option"
                  style={{
                    color: isSignup ? "#333" : "transparent",
                  }}
                  onClick={() => handleDirectNav("/login")}
                >
                  Log In
                </div>
              </div>
            )}
            {/* Mobile menu hamburger button */}
            <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
              <FontAwesomeIcon icon={mobileMenuActive ? faTimes : faBars} />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

// Mobile Menu Component
const MobileMenu = ({ active, closeMenu }) => {
  const [screenSize, setScreenSize] = useState('');
  
  useEffect(() => {
    // Function to update screen size
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 375) {
        setScreenSize('xs');
      } else if (width >= 375 && width < 480) {
        setScreenSize('sm');
      } else {
        setScreenSize('md');
      }
    };
    
    // Set initial size
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`mobile-menu ${active ? 'active' : ''}`}>
      <div className="mobile-menu-content">
        <div className={`mobile-menu-header ${screenSize === 'xs' ? 'small-padding' : ''}`}>
          <div className="mobile-logo">
            <img
              src="/src/assets/images/logo.png"
              alt="GoodVentory Logo"
              className="mobile-logo-icon"
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = '/default-logo.png';
              }}
            />
            <span className={`mobile-logo-name ${screenSize === 'xs' ? 'small-text' : ''}`}>GoodVentory</span>
          </div>
          <button 
            className="close-menu-btn"
            onClick={closeMenu}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <div className={`mobile-nav-links ${screenSize === 'xs' ? 'small-spacing' : ''}`}>
          <Link to="/features" className="mobile-nav-link" onClick={closeMenu}>
            <FontAwesomeIcon icon={faChartLine} className="mobile-nav-icon" />
            <span>Features</span>
          </Link>
          <Link to="/how-it-works" className="mobile-nav-link" onClick={closeMenu}>
            <FontAwesomeIcon icon={faSyncAlt} className="mobile-nav-icon" />
            <span>How It Works</span>
          </Link>
          <Link to="/pricing" className="mobile-nav-link" onClick={closeMenu}>
            <FontAwesomeIcon icon={faCrown} className="mobile-nav-icon" />
            <span>Pricing</span>
          </Link>
          <Link to="/contact" className="mobile-nav-link" onClick={closeMenu}>
            <FontAwesomeIcon icon={faBuilding} className="mobile-nav-icon" />
            <span>Contact</span>
          </Link>
        </div>
        
        <div className={`mobile-auth-section ${screenSize === 'xs' ? 'small-padding' : ''}`}>
          <Link to="/login" className="mobile-auth-button login" onClick={closeMenu}>Log In</Link>
          <Link to="/signup" className="mobile-auth-button signup" onClick={closeMenu}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

// Overlay Component for when mobile menu is active
const Overlay = ({ active, onClick }) => {
  return (
    <div 
      className={`overlay ${active ? 'active' : ''}`} 
      onClick={onClick}
    ></div>
  );
};

// Page Component
const HomePage = () => {
  const navigate = useNavigate(); // Add this line to get the navigate function

  useEffect(() => {
    // Fade in elements when they enter the viewport
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          fadeInObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
      fadeInObserver.observe(element);
    });
    
    return () => {
      fadeElements.forEach(element => {
        fadeInObserver.unobserve(element);
      });
    };
  }, []);

  return (
    <>
     
      {/* Management Section */}
      <section className="management-section">
        <div className="container">
          <h2 className="section-title">Management Solutions</h2>
          <div className="management-grid">
            {/* Inventory Management Card */}
            <div className="management-card inventory-card" onClick={() => navigate('/space-management')}>
              <div className="card-icon">
                <FontAwesomeIcon icon={faBoxes} />
              </div>
              <h3>Inventory Management</h3>
              <p>Track and optimize your stock levels with real-time analytics</p>
              <button className="management-btn">
                Explore Features
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
            
            {/* Space Management Card */}
            <div className="management-card space-card" onClick={() => navigate('/inventory')}>
              <div className="card-icon">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <h3>Space Management</h3>
              <p>Maximize storage efficiency with 3D visualization</p>
              <button className="management-btn">
                Explore Features
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturesSection />
      
      <HowItWorksSection />
      
      <DashboardPreviewSection />
      
      <PricingSection />
      
      <CTASection />
    </>
  );
};

const FeaturesPage = () => (
  <div className="page-wrapper">
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>All Features</h2>
          <p>Discover the complete set of features that make GoodVentory Pro the ultimate warehouse management solution.</p>
        </div>
        
        <div className="features-grid">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  </div>
);

const HowItWorksPage = () => (
  <div className="page-wrapper">
    <section className="section section-blue">
      <div className="container">
        <div className="section-header">
          <h2>Implementation Process</h2>
          <p>Our step-by-step approach ensures a smooth transition to GoodVentory Pro with minimal disruption to your operations.</p>
        </div>
        
        <div className="workflow">
          <div className="workflow-steps">
            {workflowSteps.map((step, index) => (
              <WorkflowStep key={index} number={index + 1} {...step} />
            ))}
          </div>
        </div>
        
        <div className="additional-info">
          <h3>Implementation Timeline</h3>
          <p>Most implementations are completed within 4-6 weeks, depending on the complexity of your operations.</p>
          
          <h3>Data Migration</h3>
          <p>We support migration from all major inventory systems with zero downtime during the transition.</p>
        </div>
      </div>
    </section>
  </div>
);

const PricingPage = () => (
  <div className="page-wrapper">
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>Pricing Plans</h2>
          <p>Choose the plan that fits your business needs and scale as you grow.</p>
        </div>
        
        <div className="features-grid">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} featured={index === 1} />
          ))}
        </div>
        
        <div className="enterprise-contact">
          <h3>Need a custom solution?</h3>
          <p>Our enterprise plans are tailored to your specific requirements with dedicated support and custom features.</p>
          <Link to="/contact" className="btn btn-secondary">Contact Sales</Link>
        </div>
      </div>
    </section>
  </div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      company: '',
      message: ''
    });
  };

  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Contact Us</h2>
            <p>Have questions or ready to get started? Reach out to our team for more information.</p>
          </div>
          
          <div className="contact-content">
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <p><strong>Email:</strong> info@GoodVentorypro.com</p>
              <p><strong>Phone:</strong> +1 (800) 123-4567</p>
              <p><strong>Address:</strong> 123 Warehouse Lane, Suite 500, San Francisco, CA 94107</p>
              
              <div className="contact-hours">
                <h4>Support Hours</h4>
                <p>Monday - Friday: 8AM - 6PM PST</p>
                <p>Saturday: 9AM - 2PM PST</p>
              </div>
            </div>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

const DemoPage = () => {
  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    company: '',
    employees: '',
    currentSystem: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDemoForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Demo request submitted:', demoForm);
    alert('Thank you for your demo request! We will contact you shortly to schedule your session.');
    setDemoForm({
      name: '',
      email: '',
      company: '',
      employees: '',
      currentSystem: ''
    });
  };

  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Schedule a Demo</h2>
            <p>See GoodVentory Pro in action with a personalized demo tailored to your business needs.</p>
          </div>
          
          <div className="demo-content">
            <div className="demo-info">
              <h3>What to Expect</h3>
              <ul>
                <li>30-minute personalized walkthrough of the platform</li>
                <li>See features that match your specific use cases</li>
                <li>Q&A with our product experts</li>
                <li>No obligation or sales pressure</li>
              </ul>
              
              <div className="demo-video">
                <h4>Quick Preview</h4>
                <div className="video-placeholder">
                  <p>Video preview of GoodVentory Pro</p>
                </div>
              </div>
            </div>
            
            <form className="demo-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="demo-name">Name</label>
                <input 
                  type="text" 
                  id="demo-name" 
                  name="name" 
                  value={demoForm.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="demo-email">Email</label>
                <input 
                  type="email" 
                  id="demo-email" 
                  name="email" 
                  value={demoForm.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="demo-company">Company</label>
                <input 
                  type="text" 
                  id="demo-company" 
                  name="company" 
                  value={demoForm.company}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="demo-employees">Number of Employees</label>
                <select 
                  id="demo-employees" 
                  name="employees" 
                  value={demoForm.employees}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="500+">500+</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="demo-current-system">Current Inventory System</label>
                <input 
                  type="text" 
                  id="demo-current-system" 
                  name="currentSystem" 
                  value={demoForm.currentSystem}
                  onChange={handleChange}
                  placeholder="None, Excel, Other software..."
                />
              </div>
              
              <div className="form-group">
                <label>
                  <input type="checkbox" required /> I agree to receive emails about GoodVentory Pro
                </label>
              </div>
              
              <button type="submit" className="btn btn-primary">Request Demo</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

// Section Components
const FeaturesSection = () => (
  <section id="features" className="section">
    <div className="container">
      <div className="section-header">
        <h2>Powerful Features</h2>
        <p>GoodVentory Pro comes packed with enterprise-grade features designed to streamline your warehouse operations.</p>
      </div>
      
      <div className="features-grid">
        {featuresData.slice(0, 6).map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
      
      <div className="view-all-features">
        <Link to="/features" className="btn btn-secondary">View All Features</Link>
      </div>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section id="how-it-works" className="section section-blue">
    <div className="container">
      <div className="section-header">
        <h2>How It Works</h2>
        <p>Getting started with GoodVentory Pro is simple. Our streamlined implementation process ensures you're up and running quickly.</p>
      </div>
      
      <div className="workflow">
        <div className="workflow-steps">
          {workflowSteps.map((step, index) => (
            <WorkflowStep key={index} number={index + 1} {...step} />
          ))}
        </div>
      </div>
      
      <div className="learn-more">
        <Link to="/how-it-works" className="btn btn-white">Learn More About Implementation</Link>
      </div>
    </div>
  </section>
);

const DashboardPreviewSection = () => (
  <section className="dashboard-preview">
    <div className="container">
      <div className="section-header">
        <h2>Powerful Dashboard</h2>
        <p>Get a comprehensive view of your inventory operations with our intuitive and customizable dashboard.</p>
      </div>
      
      <div className="dashboard-wrapper fade-in">
        <img src={banner} alt="GoodVentory Pro Dashboard" className="dashboard-image" />
      </div>
    </div>
  </section>
);

const PricingSection = () => (
  <section id="pricing" className="section">
    <div className="container">
      <div className="section-header">
        <h2>Flexible Pricing</h2>
        <p>Choose the plan that fits your business needs and scale as you grow.</p>
      </div>
      
      <div className="features-grid">
        {pricingPlans.map((plan, index) => (
          <PricingCard key={index} {...plan} featured={index === 1} />
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="cta-section" id="demo">
    <div className="container">
      <div className="cta-content">
        <h2>Ready to Transform Your Inventory Management?</h2>
        <p>Join 500+ businesses that have revolutionized their warehouse operations with GoodVentory Pro.</p>
        
        <div className="cta-buttons">
          <Link to="/demo" className="btn btn-white">Schedule a Demo</Link>
          <Link to="/pricing" className="btn btn-outline">View Pricing</Link>
        </div>
      </div>
    </div>
  </section>
);

// Card Components
const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card fade-in">
    <div className="feature-icon">
      {icon === '📊' && <FontAwesomeIcon icon={faChartLine} />}
      {icon === '🔄' && <FontAwesomeIcon icon={faSyncAlt} />}
      {icon === '📱' && <FontAwesomeIcon icon={faMobileAlt} />}
      {icon === '🛡️' && <FontAwesomeIcon icon={faShieldAlt} />}
      {icon === '🤖' && <FontAwesomeIcon icon={faRobot} />}
      {icon === '🔍' && <FontAwesomeIcon icon={faSearch} />}
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const WorkflowStep = ({ number, title, description }) => (
  <div className="workflow-step fade-in">
    <div className="step-number">{number}</div>
    <div className="step-title">{title}</div>
    <div className="step-description">{description}</div>
  </div>
);

const PricingCard = ({ icon, title, description, price, featured }) => (
  <div className={`feature-card fade-in ${featured ? 'featured' : ''}`}>
    <div className="feature-icon">
      {icon === '🏢' && <FontAwesomeIcon icon={faBuilding} />}
      {icon === '👑' && <FontAwesomeIcon icon={faCrown} />}
      {icon === '🌐' && <FontAwesomeIcon icon={faGlobe} />}
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
    <p className="price"><strong>{price}</strong></p>
    <Link to="/contact" className={`btn ${featured ? 'btn-secondary' : 'btn-primary'}`}>Get Started</Link>
  </div>
);

// Footer Component
const Footer = () => (
  <footer id="contact">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-column">
          <div className="footer-brand">
            <div className="footer-brand-logo">GoodVentory</div>
            <div className="footer-description">
              Enterprise-grade warehouse management system that helps businesses optimize their inventory operations.
            </div>
          </div>
          
          <div className="social-links">
            <a href="#" className="social-link"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#" className="social-link"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#" className="social-link"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href="#" className="social-link"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>
        </div>
        
        <div className="footer-column">
          <h3 className="footer-header">Product</h3>
          <ul className="footer-links">
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/demo">Demo</Link></li>
            <li><Link to="/">Integrations</Link></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3 className="footer-header">Resources</h3>
          <ul className="footer-links">
            <li><Link to="/">Documentation</Link></li>
            <li><Link to="/">Blog</Link></li>
            <li><Link to="/">Guides</Link></li>
            <li><Link to="/contact">Support</Link></li>
            <li><Link to="/">Webinars</Link></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3 className="footer-header">Company</h3>
          <ul className="footer-links">
            <li><Link to="/">About Us</Link></li>
            <li><Link to="/">Careers</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="copyright">
        &copy; {new Date().getFullYear()} GoodVentory. All rights reserved.
      </div>
    </div>
  </footer>
);

// Data
const featuresData = [
  {
    icon: '📊',
    title: 'Real-time Analytics',
    description: 'Monitor inventory levels, track product movement, and analyze trends with powerful dashboards and reports.'
  },
  {
    icon: '🔄',
    title: 'Multi-channel Integration',
    description: 'Seamlessly integrate with your e-commerce platforms, POS systems, and accounting software for unified operations.'
  },
  {
    icon: '📱',
    title: 'Mobile Access',
    description: 'Access your inventory data anywhere, anytime with our mobile apps for iOS and Android devices.'
  },
  {
    icon: '🛡️',
    title: 'Advanced Security',
    description: 'Enterprise-grade security measures to keep your inventory data protected with role-based access controls.'
  },
  {
    icon: '🤖',
    title: 'Automation Tools',
    description: 'Automate repetitive tasks like reordering, stock alerts, and routine inventory management processes.'
  },
  {
    icon: '🔍',
    title: 'Demand Forecasting',
    description: 'AI-powered algorithms predict future inventory needs based on historical data and market trends.'
  },
  {
    icon: '📦',
    title: 'Barcode Scanning',
    description: 'Efficiently track inventory with built-in barcode scanning capabilities for quick item identification.'
  },
  {
    icon: '📝',
    title: 'Custom Reporting',
    description: 'Generate custom reports tailored to your specific business needs and KPIs.'
  },
  {
    icon: '🌍',
    title: 'Multi-location Support',
    description: 'Manage inventory across multiple warehouses and locations from a single platform.'
  },
  {
    icon: '🔄',
    title: 'Batch Tracking',
    description: 'Track inventory by batch or lot numbers for better traceability and recall management.'
  },
  {
    icon: '📅',
    title: 'Expiration Management',
    description: 'Automatically track and alert for expiring products to minimize waste and losses.'
  },
  {
    icon: '🤝',
    title: 'Vendor Management',
    description: 'Manage vendor relationships, track performance, and streamline procurement processes.'
  }
];

const workflowSteps = [
  {
    title: 'Consultation',
    description: 'We analyze your current workflow and identify improvement opportunities.'
  },
  {
    title: 'Setup & Configuration',
    description: 'Our team configures the system to match your specific requirements.'
  },
  {
    title: 'Data Migration',
    description: 'We seamlessly transfer your existing inventory data to GoodVentory Pro.'
  },
  {
    title: 'Training',
    description: 'Your team receives comprehensive training on using the platform effectively.'
  },
  {
    title: 'Go Live & Support',
    description: 'We provide ongoing support as you launch and beyond.'
  }
];

const pricingPlans = [
  {
    icon: '🏢',
    title: 'Standard',
    description: 'Perfect for small warehouses with basic inventory management needs.',
    price: '$299/month'
  },
  {
    icon: '👑',
    title: 'Professional',
    description: 'Advanced features for medium-sized operations with multiple channels.',
    price: '$599/month'
  },
  {
    icon: '🌐',
    title: 'Enterprise',
    description: 'Custom solutions for large warehouses with complex inventory requirements.',
    price: 'Contact us'
  }
];


export default App;