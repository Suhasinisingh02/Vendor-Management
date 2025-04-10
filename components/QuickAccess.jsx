import { useNavigate } from 'react-router-dom';
import {
  Package,
  BoxesIcon,
  LineChart,
  Truck,
  CreditCard,
  FileText
} from 'lucide-react';
import './quickAccess.css';

export default function QuickAccess({ onTabClick, activeTab }) {
  const navigate = useNavigate();

  const tabs = [
    { id: 'products', icon: Package, label: 'Products', path: '/products' },
    { id: 'stock', icon: BoxesIcon, label: 'Stock', path: '/stock' },
    { id: 'analysis', icon: LineChart, label: 'Analysis', path: '/analysis' },
    { id: 'deliveries', icon: Truck, label: 'Deliveries', path: '/deliveries' },
    { id: 'billing', icon: CreditCard, label: 'Billing', path: '/billing' },
    { id: 'invoices', icon: FileText, label: 'Invoices', path: '/invoices' }
  ];

  return (
    <div className="quick-access">
      {tabs.map(({ id, icon: Icon, label, path }) => (
        <div
          key={id}
          className={`tab ${activeTab === id ? 'active' : ''}`}
          onClick={() => {
            onTabClick(id); // Optional: highlight tab
            navigate(path); // Navigate to the specific page
          }}
        >
          <Icon className="tab-icon" />
          <span className="tab-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
