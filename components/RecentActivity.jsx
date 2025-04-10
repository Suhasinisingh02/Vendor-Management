import './RecentAct.css';
export default function RecentActivity({ filter }) {
    const allActivities = [
      {
        type: 'orders',
        description: 'New order #1234 received from John Smith',
        timestamp: '2 minutes ago'
      },
      {
        type: 'inventory',
        description: 'Stock update: 50 units added to inventory',
        timestamp: '15 minutes ago'
      },
      {
        type: 'payments',
        description: 'Payment received for order #1230',
        timestamp: '1 hour ago'
      },
      {
        type: 'customers',
        description: 'New customer registration: Sarah Wilson',
        timestamp: '2 hours ago'
      }
    ];
  
    const filteredActivities = filter === 'all' 
      ? allActivities 
      : allActivities.filter(activity => activity.type === filter);
  
    return (
      <div className="recent-activity">
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-list">
          {filteredActivities.map((activity, index) => (
            <div key={index} className="activity-item">
              <p className="activity-description">{activity.description}</p>
              <span className="activity-timestamp">{activity.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }