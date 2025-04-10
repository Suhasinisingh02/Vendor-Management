import { useState } from 'react';
import Navbar from '../components/Navbar';
import QuickAccess from '../components/QuickAccess';
import AnalyticsCards from '../components/AnalyticsCards';
import RecentActivity from '../components/RecentActivity';
import './SpaceManage.css';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('');
  const [filter, setFilter] = useState('all');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="dashboard">
      <Navbar onFilterChange={handleFilterChange} currentFilter={filter} />
      <main className="dashboard-content">
        <QuickAccess onTabClick={handleTabClick} activeTab={activeTab} />
        {activeTab === 'analysis' && <AnalyticsCards />}
        <RecentActivity filter={filter} />
      </main>
    </div>
  );
}