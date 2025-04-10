import { useState, useEffect } from 'react';
import { Search, Bell, User, Filter } from 'lucide-react';
import { auth } from '../src/config/firebase.config'; 
import { onAuthStateChanged } from 'firebase/auth';
import './Navbar.css';

export default function Navbar({ onFilterChange, currentFilter }) {
  const [userName, setUserName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        // Get display name directly from auth user object
        const displayName = user.displayName;
        const emailName = user.email ? user.email.split('@')[0] : 'User';
        
        setUserName(displayName || emailName);
        setProfilePhoto(user.photoURL || null);
      } else {
        setUserName('Guest');
        setProfilePhoto(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="search-container">
          <Search className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
        
        <div className="filter-container">
          <Filter className="filter-icon" />
          <select 
            className="filter-select"
            value={currentFilter}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="all">All Activities</option>
            <option value="orders">Orders</option>
            <option value="inventory">Inventory</option>
            <option value="payments">Payments</option>
            <option value="customers">Customers</option>
          </select>
        </div>
      </div>
      
      <div className="nav-right">
        <button className="notification-btn">
          <Bell className="bell-icon" />
        </button>
        
        <div className="profile">
          {profilePhoto ? (
            <img 
              src={profilePhoto} 
              alt="Profile" 
              className="avatar" 
              onError={() => setProfilePhoto(null)}
            />
          ) : (
            <div className="avatar">
              <User className="user-icon" />
            </div>
          )}
          {!loading && <span className="username">{userName}</span>}
        </div>
      </div>
    </nav>
  );
}