import React from "react";
import Widget from "../chatbotWidgets/widgets";

const HelpOptions = (props) => {
  const helpResources = [
    {
      id: "guide",
      title: "📘 User Guide",
      description: "Step-by-step guide to get started and use all features effectively.",
    },
    {
      id: "faqs",
      title: "❓ FAQs",
      description: "Answers to the most common questions and issues.",
    },
    {
      id: "contact",
      title: "📞 Contact Us",
      description: "Need personal support? Reach out to our team directly.",
    },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h3 style={{ marginBottom: "1rem" }}>🆘 Help & Support</h3>
      {helpResources.map((resource) => (
        <div
          key={resource.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "1rem",
            marginBottom: "1rem",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          <h4 style={{ margin: 0, color: "#333" }}>{resource.title}</h4>
          <p style={{ fontSize: "0.9rem", color: "#666", margin: "0.5rem 0" }}>
            {resource.description}
          </p>
          <button
            onClick={() => props.actionProvider.handleHelpFeature(resource.id)}
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
            Open {resource.title.split(" ")[1]}
          </button>
        </div>
      ))}
    </div>
  );
};

export default HelpOptions;
