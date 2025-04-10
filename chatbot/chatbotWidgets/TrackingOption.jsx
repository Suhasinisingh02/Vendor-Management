// import React from "react";
// import Widget from "../chatbotWidgets/widgets";

// const TrackingOptions = (props) => {
//   const options = [
//     { text: "Real-time Tracking", handler: () => props.actionProvider.handleTrackingFeature("realtime") },
//     { text: "Shipping Carriers", handler: () => props.actionProvider.handleTrackingFeature("carriers") },
//     { text: "Notifications", handler: () => props.actionProvider.handleTrackingFeature("notifications") }
//   ];

//   return <Widget title="Tracking Features:" options={options} />;
// };

// export default TrackingOptions;


import React, { useEffect, useState } from "react";
import { BarChart3, TruckIcon, BellRing, PackageCheck, RefreshCw } from "lucide-react";

const styles = {
  container: {
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#333"
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "16px",
    marginBottom: "24px"
  },
  featureCard: {
    padding: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    border: "1px solid #e0e0e0",
    backgroundColor: "#ffffff"
  },
  featureCardSelected: {
    padding: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    border: "2px solid #3b82f6",
    backgroundColor: "#f0f7ff"
  },
  featureHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px"
  },
  iconContainer: {
    padding: "8px",
    borderRadius: "50%",
    marginRight: "12px",
    backgroundColor: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  iconContainerSelected: {
    padding: "8px",
    borderRadius: "50%",
    marginRight: "12px",
    backgroundColor: "#dbeafe",
    color: "#2563eb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  featureTitle: {
    fontWeight: "500",
    color: "#333"
  },
  featureDescription: {
    fontSize: "14px",
    color: "#666"
  },
  dashboardCard: {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
  },
  dashboardHeader: {
    padding: "16px",
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#f9fafb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dashboardTitle: {
    display: "flex",
    alignItems: "center"
  },
  dashboardTitleText: {
    fontWeight: "600",
    color: "#333",
    marginLeft: "8px"
  },
  dataStatus: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    color: "#666"
  },
  dataStatusIcon: {
    marginRight: "4px"
  },
  dashboardContent: {
    padding: "16px"
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "160px"
  },
  spinner: {
    height: "32px",
    width: "32px",
    border: "3px solid rgba(0, 0, 0, 0.1)",
    borderTopColor: "#3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  },
  tableContainer: {
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  tableHeader: {
    backgroundColor: "#f9fafb",
    borderBottom: "1px solid #e5e7eb"
  },
  tableHeaderCell: {
    padding: "12px 24px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "500",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  },
  tableBody: {
    backgroundColor: "#ffffff"
  },
  tableRow: {
    borderBottom: "1px solid #e5e7eb",
  },
  tableRowHover: {
    backgroundColor: "#f9fafb"
  },
  tableCell: {
    padding: "16px 24px",
    whiteSpace: "nowrap",
    fontSize: "14px",
    color: "#333"
  },
  statusBadge: {
    padding: "2px 8px",
    display: "inline-flex",
    fontSize: "12px",
    fontWeight: "600",
    borderRadius: "9999px",
  },
  inStockBadge: {
    backgroundColor: "#d1fae5",
    color: "#065f46"
  },
  lowStockBadge: {
    backgroundColor: "#fef3c7",
    color: "#92400e"
  },
  tableFooter: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  footerText: {
    fontSize: "14px",
    color: "#6b7280"
  },
  viewAllButton: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    color: "#2563eb",
    cursor: "pointer",
    border: "none",
    background: "transparent"
  },
  viewAllIcon: {
    marginLeft: "4px"
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" }
  }
};

const TrackingOptions = (props) => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    // Simulate fetching dummy inventory data
    const timeout = setTimeout(() => {
      const dummyInventory = [
        { id: "item1", productName: "Wireless Mouse", stock: 24, status: "In stock" },
        { id: "item2", productName: "Mechanical Keyboard", stock: 15, status: "In stock" },
        { id: "item3", productName: "USB-C Hub", stock: 8, status: "Low stock" },
        { id: "item4", productName: "Bluetooth Speaker", stock: 12, status: "In stock" },
        { id: "item5", productName: "Laptop Stand", stock: 30, status: "In stock" },
        { id: "item6", productName: "Webcam 1080p", stock: 7, status: "Low stock" },
      ];
      setInventoryData(dummyInventory);
      setLoading(false);
    }, 1000); // Simulate network delay
    return () => clearTimeout(timeout);
  }, []);

  const handleFeatureSelect = (feature) => {
    setSelectedFeature(feature);
    props.actionProvider.handleTrackingFeature(feature);
  };

  const features = [
    {
      id: "realtime",
      text: "Real-time Tracking",
      icon: <RefreshCw size={20} />,
      description: "Monitor shipments with live updates",
    },
    {
      id: "carriers",
      text: "Shipping Carriers",
      icon: <TruckIcon size={20} />,
      description: "View and manage supported carriers",
    },
    {
      id: "notifications",
      text: "Notifications",
      icon: <BellRing size={20} />,
      description: "Set up alerts for shipment updates",
    },
  ];

  return (
    <div style={styles.container}>
      {/* Feature Cards */}
      <div>
        <h3 style={styles.sectionTitle}>Tracking Features</h3>
        <div style={styles.featureGrid}>
          {features.map((feature) => (
            <div 
              key={feature.id}
              style={selectedFeature === feature.id ? styles.featureCardSelected : styles.featureCard}
              onClick={() => handleFeatureSelect(feature.id)}
              onMouseOver={(e) => {
                if (selectedFeature !== feature.id) {
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = '#bfdbfe';
                }
              }}
              onMouseOut={(e) => {
                if (selectedFeature !== feature.id) {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e0e0e0';
                }
              }}
            >
              <div style={styles.featureHeader}>
                <div style={selectedFeature === feature.id ? styles.iconContainerSelected : styles.iconContainer}>
                  {feature.icon}
                </div>
                <h4 style={styles.featureTitle}>{feature.text}</h4>
              </div>
              <p style={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Dashboard */}
      <div style={styles.dashboardCard}>
        <div style={styles.dashboardHeader}>
          <div style={styles.dashboardTitle}>
            <PackageCheck size={20} color="#555" />
            <h3 style={styles.dashboardTitleText}>Inventory Overview</h3>
          </div>
          <div style={styles.dataStatus}>
            <BarChart3 style={styles.dataStatusIcon} size={16} />
            <span>Real-time data</span>
          </div>
        </div>
        
        <div style={styles.dashboardContent}>
          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={{
                ...styles.spinner,
                animation: 'spin 1s linear infinite'
              }}></div>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead style={styles.tableHeader}>
                  <tr>
                    <th style={styles.tableHeaderCell}>Product</th>
                    <th style={styles.tableHeaderCell}>Stock Level</th>
                    <th style={styles.tableHeaderCell}>Status</th>
                  </tr>
                </thead>
                <tbody style={styles.tableBody}>
                  {inventoryData.map((item) => (
                    <tr 
                      key={item.id} 
                      style={{
                        ...styles.tableRow,
                        backgroundColor: hoveredRow === item.id ? '#f9fafb' : 'transparent'
                      }}
                      onMouseEnter={() => setHoveredRow(item.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td style={styles.tableCell}>
                        <div style={{ fontWeight: "500" }}>{item.productName}</div>
                      </td>
                      <td style={styles.tableCell}>
                        <div>{item.stock} units</div>
                      </td>
                      <td style={styles.tableCell}>
                        <span style={{
                          ...styles.statusBadge,
                          ...(item.stock < 10 ? styles.lowStockBadge : styles.inStockBadge)
                        }}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div style={styles.tableFooter}>
            <span style={styles.footerText}>Showing {inventoryData.length} of {inventoryData.length} items</span>
            <button 
              style={styles.viewAllButton}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#1d4ed8';
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#2563eb';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              View all inventory
              <svg style={styles.viewAllIcon} width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingOptions;