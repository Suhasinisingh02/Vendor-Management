import { TrendingUp, TrendingDown } from 'lucide-react';

export default function AnalyticsCards() {
  const analytics = [
    {
      title: 'Total Sales',
      value: '$24,780',
      change: '+12.5%',
      increasing: true
    },
    {
      title: 'Average Order',
      value: '$156.40',
      change: '+8.2%',
      increasing: true
    },
    {
      title: 'Total Returns',
      value: '$1,240',
      change: '-2.4%',
      increasing: false
    },
    {
      title: 'Active Customers',
      value: '1,240',
      change: '+18.3%',
      increasing: true
    }
  ];

  return (
    <div className="analytics-grid">
      {analytics.map((item, index) => (
        <div key={index} className="analytics-card">
          <h3 className="card-title">{item.title}</h3>
          <div className="card-value">{item.value}</div>
          <div className={`card-change ${item.increasing ? 'positive' : 'negative'}`}>
            {item.increasing ? <TrendingUp /> : <TrendingDown />}
            <span>{item.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
}