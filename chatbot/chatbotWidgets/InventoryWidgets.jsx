import React, { useState } from "react";
import { Package, QrCode, BarChart } from "lucide-react";

const styles = {
  container: {
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif"
  },
  optionsContainer: {
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #e0e0e0",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    backgroundColor: "#ffffff",
    marginBottom: "16px"
  },
  header: {
    padding: "12px 16px",
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#f5f7f9",
    display: "flex",
    alignItems: "center"
  },
  headerTitle: {
    fontWeight: "600",
    fontSize: "15px",
    color: "#333",
    margin: 0
  },
  optionsList: {
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  optionButton: {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "left",
    width: "100%"
  },
  optionIcon: {
    marginRight: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px",
    borderRadius: "6px",
    backgroundColor: "#f0f7ff"
  },
  optionContent: {
    flex: 1
  },
  optionTitle: {
    fontWeight: "500",
    fontSize: "14px",
    color: "#333",
    marginBottom: "4px"
  },
  optionDescription: {
    fontSize: "13px",
    color: "#666",
    marginBottom: 0
  },
  selectedIcon: {
    color: "#2c7be5",
    backgroundColor: "#e1efff"
  },
  selectedButton: {
    borderColor: "#2c7be5",
    backgroundColor: "#f5f9ff"
  },
  detailsContainer: {
    marginTop: "12px",
    padding: "16px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #e0e0e0"
  },
  detailsHeading: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#444"
  },
  detailsList: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px"
  },
  detailsItem: {
    fontSize: "13px",
    color: "#555",
    display: "flex",
    alignItems: "center"
  },
  detailsDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#2c7be5",
    marginRight: "8px",
    flexShrink: 0
  }
};

const InventoryOptions = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {
      id: "stock",
      icon: <Package size={18} />,
      title: "Stock Management",
      description: "Track and manage your inventory levels",
      details: [
        "Set minimum stock alerts",
        "Track inventory across locations",
        "Batch inventory management",
        "Automatic stock calculations"
      ]
    },
    {
      id: "barcode",
      icon: <QrCode size={18} />,
      title: "Barcode Scanning",
      description: "Scan and process inventory quickly",
      details: [
        "Mobile device scanning",
        "Multiple barcode formats",
        "Batch receiving",
        "Quick inventory counts"
      ]
    },
    {
      id: "reports",
      icon: <BarChart size={18} />,
      title: "Inventory Reports",
      description: "Analyze your inventory performance",
      details: [
        "Stock level reports",
        "Inventory turnover metrics",
        "Export reports (PDF/CSV)",
        "Custom report builder"
      ]
    }
  ];

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    props.actionProvider.handleInventoryFeature(optionId);
  };

  return (
    <div style={styles.container}>
      <div style={styles.optionsContainer}>
        <div style={styles.header}>
          <h3 style={styles.headerTitle}>Inventory Support Options</h3>
        </div>
        <div style={styles.optionsList}>
          {options.map((option) => (
            <button
              key={option.id}
              style={{
                ...styles.optionButton,
                ...(selectedOption === option.id ? styles.selectedButton : {})
              }}
              onClick={() => handleOptionSelect(option.id)}
              onMouseOver={(e) => {
                if (selectedOption !== option.id) {
                  e.currentTarget.style.backgroundColor = "#f9fafc";
                  e.currentTarget.style.borderColor = "#d0d5dd";
                }
              }}
              onMouseOut={(e) => {
                if (selectedOption !== option.id) {
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.borderColor = "#e0e0e0";
                }
              }}
            >
              <div 
                style={{
                  ...styles.optionIcon,
                  ...(selectedOption === option.id ? styles.selectedIcon : {})
                }}
              >
                {option.icon}
              </div>
              <div style={styles.optionContent}>
                <div style={styles.optionTitle}>{option.title}</div>
                <p style={styles.optionDescription}>{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedOption && (
        <div style={styles.detailsContainer}>
          <h4 style={styles.detailsHeading}>
            {options.find(opt => opt.id === selectedOption)?.title} Features:
          </h4>
          <ul style={styles.detailsList}>
            {options.find(opt => opt.id === selectedOption)?.details.map((detail, index) => (
              <li key={index} style={styles.detailsItem}>
                <span style={styles.detailsDot}></span>
                {detail}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InventoryOptions;