import React from "react";
import Widget from "../chatbotWidgets/widgets";

const AccountOptions = (props) => {
  const accountOptions = [
    {
      id: "password",
      title: "🔐 Password Reset",
      description: "Reset your account password securely in just a few steps.",
    },
    {
      id: "settings",
      title: "⚙️ Account Settings",
      description: "Manage your personal info, preferences, and security options.",
    },
    {
      id: "support",
      title: "🛠️ Contact Support",
      description: "Get help from our support team for any account-related issues.",
    },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h3 style={{ marginBottom: "1rem" }}>👤 Account Assistance</h3>
      {accountOptions.map((option) => (
        <div
          key={option.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "1rem",
            marginBottom: "1rem",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          <h4 style={{ margin: "0 0 0.4rem 0", color: "#333" }}>{option.title}</h4>
          <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "0.6rem" }}>
            {option.description}
          </p>
          <button
            onClick={() => props.actionProvider.handleAccountFeature(option.id)}
            style={{
              padding: "0.4rem 0.8rem",
              backgroundColor: "#00ACC1",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Manage {option.title.split(" ")[1]}
          </button>
        </div>
      ))}
    </div>
  );
};

export default AccountOptions;
