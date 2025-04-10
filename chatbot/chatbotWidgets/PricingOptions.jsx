import React from "react";
import Widget from "../chatbotWidgets/widgets";

const PricingOptions = (props) => {
  const pricingPlans = [
    {
      id: "standard",
      title: "🟢 Basic Plan",
      price: "$299/mo",
      features: ["✔️ 5 Projects", "✔️ Community Support", "✔️ 1 GB Storage"],
    },
    {
      id: "professional",
      title: "🔵 Professional Plan",
      price: "$599/mo",
      features: [
        "✔️ 50 Projects",
        "✔️ Priority Support",
        "✔️ 50 GB Storage",
        "✔️ Analytics Dashboard",
      ],
    },
    {
      id: "enterprise",
      title: "🟣 Enterprise Plan",
      price: "Custom Pricing",
      features: [
        "✔️ Unlimited Projects",
        "✔️ Dedicated Manager",
        "✔️ Unlimited Storage",
        "✔️ Advanced Integrations",
      ],
    },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h3 style={{ marginBottom: "1rem" }}>💰 Choose Your Pricing Plan</h3>
      {pricingPlans.map((plan) => (
        <div
          key={plan.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "1rem",
            marginBottom: "1rem",
            background: "#f9f9f9",
            boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
          }}
        >
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>{plan.title}</h4>
          <p style={{ margin: "0.3rem 0", fontWeight: "bold" }}>{plan.price}</p>
          <ul style={{ paddingLeft: "1.2rem", margin: "0.5rem 0" }}>
            {plan.features.map((feature, index) => (
              <li key={index} style={{ fontSize: "0.9rem", marginBottom: "0.2rem" }}>
                {feature}
              </li>
            ))}
          </ul>
          <button
            onClick={() => props.actionProvider.handlePricingFeature(plan.id)}
            style={{
              marginTop: "0.5rem",
              padding: "0.4rem 1rem",
              background: "#00ACC1",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Choose {plan.title.split(" ")[1]}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PricingOptions;
