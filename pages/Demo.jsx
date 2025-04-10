// import React, { useState, useEffect, useRef } from "react";
// import { 
//   faWarehouse, 
//   faHandshake, 
//   faRobot, 
//   faEarthAmericas, 
//   faBoxOpen, 
//   faTruckFast,
//   faChartLine,
//   faRecycle,
//   faShieldAlt,
//   faMapMarkedAlt,
//   faBrain,
//   faCloudSunRain
// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const CSRSpaceSharingDemo = () => {
//   const [activeTab, setActiveTab] = useState("concept");
//   const [animateItems, setAnimateItems] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const contentRef = useRef(null);
  
//   // Animation effect on mount
//   useEffect(() => {
//     setAnimateItems(true);
    
//     // Add scroll listener
//     const handleScroll = () => {
//       if (contentRef.current) {
//         const scrollPosition = window.scrollY;
//         const windowHeight = window.innerHeight;
//         const fullHeight = document.body.scrollHeight - windowHeight;
//         setScrollProgress(scrollPosition / fullHeight);
//       }
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Animation when changing tabs
//   const handleTabChange = (tab) => {
//     setAnimateItems(false);
//     setTimeout(() => {
//       setActiveTab(tab);
//       setAnimateItems(true);
//     }, 300);
//   };

//   // Generate avatar with initials
//   const generateAvatar = (name) => {
//     const initials = name
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase();
    
//     // Generate a consistent color based on the name
//     const stringToColor = (str) => {
//       let hash = 0;
//       for (let i = 0; i < str.length; i++) {
//         hash = str.charCodeAt(i) + ((hash << 5) - hash);
//       }
      
//       const hue = Math.abs(hash % 360);
//       return `hsl(${hue}, 70%, 40%)`;
//     };
    
//     return {
//       initials,
//       backgroundColor: stringToColor(name)
//     };
//   };

//   // Testimonials data
//   const testimonials = [
//     {
//       name: "Sarah Martinez",
//       role: "Warehouse Owner",
//       content: "GoodVentory transformed my half-empty warehouse into a profitable asset. The AI recommendations helped me optimize my space and find the perfect vendors.",
//       rating: 5
//     },
//     {
//       name: "David Chen",
//       role: "E-commerce Vendor",
//       content: "Finding affordable storage close to my customers was always a challenge until I found this platform. Now I have flexible storage that scales with my seasonal needs.",
//       rating: 5
//     },
//     {
//       name: "Rebecca Williams",
//       role: "Logistics Manager",
//       content: "The analytics and forecasting tools have reduced our waste by 45% and improved our delivery times dramatically. A game-changer for our supply chain.",
//       rating: 4
//     }
//   ];

//   return (
//     <div className="csr-demo-page" ref={contentRef}>
//       <style>{`
//         .csr-demo-page {
//           font-family: 'Segoe UI', 'Roboto', sans-serif;
//           max-width: 1100px;
//           margin: 0 auto;
//           padding: 40px 20px;
//           color: #333;
//         }
        
//         .progress-bar {
//           position: fixed;
//           top: 0;
//           left: 0;
//           height: 4px;
//           background: linear-gradient(90deg, #3498db, #2ecc71);
//           z-index: 1000;
//           transition: width 0.3s ease;
//         }
        
//         .hero-section {
//           position: relative;
//           background: linear-gradient(135deg, #1a2a3a 0%, #2980b9 100%);
//           border-radius: 20px;
//           padding: 80px 40px;
//           color: white;
//           text-align: center;
//           margin-bottom: 60px;
//           overflow: hidden;
//           box-shadow: 0 20px 50px rgba(0,0,0,0.2);
//         }
        
//         .hero-overlay {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
//         }
        
//         .hero-particles {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           overflow: hidden;
//         }
        
//         .particle {
//           position: absolute;
//           background: rgba(255,255,255,0.15);
//           border-radius: 50%;
//           animation: float 15s infinite linear;
//           box-shadow: 0 0 10px rgba(255,255,255,0.2);
//         }
        
//         @keyframes float {
//           0% { transform: translateY(0) rotate(0deg); opacity: 0; }
//           10% { opacity: 1; }
//           90% { opacity: 1; }
//           100% { transform: translateY(-500px) rotate(720deg); opacity: 0; }
//         }
        
//         .hero-content {
//           position: relative;
//           z-index: 1;
//         }
        
//         .hero-logo {
//           width: 100px;
//           height: 100px;
//           margin: 0 auto 30px;
//           border-radius: 50%;
//           background: rgba(255,255,255,0.95);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           box-shadow: 0 10px 25px rgba(0,0,0,0.2);
//           position: relative;
//           transition: transform 0.3s ease;
//           overflow: hidden;
//         }
        
//         .hero-logo:hover {
//           transform: scale(1.05);
//         }
        
//         .hero-logo::after {
//           content: '';
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           background: radial-gradient(circle, transparent 30%, rgba(255,255,255,0.7) 100%);
//           top: 0;
//           left: 0;
//         }
        
//         .hero-logo svg {
//           font-size: 50px;
//           color: #2980b9;
//           filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
//           z-index: 1;
//         }
        
//         h1 {
//           font-size: 48px;
//           margin-bottom: 20px;
//           font-weight: 800;
//           background: linear-gradient(90deg, #ffffff, #a1d4ff);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           text-shadow: 0 5px 15px rgba(0,0,0,0.2);
//         }
        
//         .hero-subtitle {
//           font-size: 22px;
//           max-width: 800px;
//           margin: 0 auto 40px;
//           opacity: 0.95;
//           line-height: 1.6;
//           color: #e6f7ff;
//         }
        
//         .tabs {
//           display: flex;
//           justify-content: center;
//           gap: 15px;
//           margin: 40px 0 0;
//           flex-wrap: wrap;
//           position: relative;
//         }
        
//         .tab-slider {
//           position: absolute;
//           height: 100%;
//           top: 0;
//           left: 0;
//           background: white;
//           border-radius: 30px;
//           transition: all 0.3s ease;
//           z-index: -1;
//         }
        
//         .tab-btn {
//           padding: 14px 26px;
//           background: rgba(255,255,255,0.1);
//           border: none;
//           border-radius: 30px;
//           color: white;
//           font-size: 16px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           backdrop-filter: blur(5px);
//           position: relative;
//           overflow: hidden;
//         }
        
//         .tab-btn::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: rgba(255,255,255,0.1);
//           transform: translateX(-100%);
//           transition: transform 0.3s ease;
//         }
        
//         .tab-btn:hover::before {
//           transform: translateX(0);
//         }
        
//         .tab-btn:hover {
//           background: rgba(255,255,255,0.2);
//           transform: translateY(-3px);
//         }
        
//         .tab-btn.active {
//           background: white;
//           color: #2980b9;
//           box-shadow: 0 10px 20px rgba(0,0,0,0.15);
//           transform: translateY(-5px);
//         }
        
//         .tab-content {
//           background: white;
//           border-radius: 20px;
//           padding: 50px;
//           box-shadow: 0 20px 50px rgba(0,0,0,0.1);
//           min-height: 500px;
//           position: relative;
//           overflow: hidden;
//         }
        
//         .tab-content::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 8px;
//           background: linear-gradient(90deg, #3498db, #2ecc71);
//         }
        
//         .section-title {
//           font-size: 36px;
//           font-weight: 700;
//           margin-bottom: 40px;
//           text-align: center;
//           color: #2c3e50;
//           position: relative;
//           padding-bottom: 15px;
//         }
        
//         .section-title::after {
//           content: '';
//           position: absolute;
//           bottom: 0;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 80px;
//           height: 4px;
//           background: linear-gradient(90deg, #3498db, #2ecc71);
//           border-radius: 2px;
//         }
        
//         .concept-container {
//           display: flex;
//           flex-direction: column;
//           gap: 50px;
//         }
        
//         .concept-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 40px;
//           align-items: center;
//         }
        
//         .concept-image {
//           height: 350px;
//           border-radius: 20px;
//           background: linear-gradient(135deg, #f5f7fa 0%, #e5edff 100%);
//           overflow: hidden;
//           position: relative;
//           box-shadow: 0 15px 30px rgba(0,0,0,0.1);
//           transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//           opacity: 0;
//           transform: translateY(30px);
//         }
        
//         .concept-image.animate-in {
//           opacity: 1;
//           transform: translateY(0);
//         }
        
//         .concept-image::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
//         }
        
//         .concept-image svg {
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           font-size: 100px;
//           color: #3498db;
//           opacity: 0.7;
//           filter: drop-shadow(0 10px 20px rgba(52, 152, 219, 0.3));
//           transition: all 0.3s ease;
//         }
        
//         .concept-image:hover svg {
//           transform: translate(-50%, -50%) scale(1.1);
//         }
        
//         .concept-text {
//           background: linear-gradient(135deg, #ffffff 0%, #f9f9ff 100%);
//           border-radius: 20px;
//           padding: 40px;
//           border-left: 6px solid #3498db;
//           transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//           box-shadow: 0 15px 30px rgba(0,0,0,0.08);
//           opacity: 0;
//           transform: translateY(30px);
//           position: relative;
//           overflow: hidden;
//         }
        
//         .concept-text::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 6px;
//           height: 100%;
//           background: linear-gradient(to bottom, #3498db, #2ecc71);
//         }
        

//         .concept-text.animate-in {
//           opacity: 1;
//           transform: translateY(0);
//         }
        
//         .concept-text:hover {
//           box-shadow: 0 20px 40px rgba(0,0,0,0.12);
//           transform: translateY(-5px);
//         }
        
//         .concept-title {
//           font-size: 28px;
//           font-weight: 700;
//           margin-bottom: 20px;
//           color: #2c3e50;
//           position: relative;
//           padding-bottom: 10px;
//           display: inline-block;
//         }
        
//         .concept-title::after {
//           content: '';
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           width: 50%;
//           height: 3px;
//           background: linear-gradient(90deg, #3498db, transparent);
//         }
        
//         .concept-description {
//           color: #546e7a;
//           line-height: 1.8;
//           font-size: 17px;
//         }
        
//         .goals-grid, .benefits-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
//           gap: 30px;
//         }
        
//         .goal-card, .benefit-card {
//           background: linear-gradient(135deg, #ffffff 0%, #f9f9ff 100%);
//           border-radius: 20px;
//           padding: 40px 30px;
//           transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//           box-shadow: 0 15px 30px rgba(0,0,0,0.08);
//           opacity: 0;
//           transform: translateY(30px);
//           border-top: 4px solid transparent;
//           position: relative;
//           overflow: hidden;
//         }
        
//         .goal-card::before, .benefit-card::before {
//           content: '';
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           background-image: radial-gradient(circle at 100% 100%, transparent 75%, rgba(52, 152, 219, 0.03) 100%);
//           top: 0;
//           left: 0;
//         }
        
//         .animate-in {
//           opacity: 1;
//           transform: translateY(0);
//         }
        
//         .goal-card:hover, .benefit-card:hover {
//           transform: translateY(-10px);
//           box-shadow: 0 20px 40px rgba(0,0,0,0.12);
//         }
        
//         .card-icon {
//           font-size: 32px;
//           width: 80px;
//           height: 80px;
//           background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
//           color: white;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 20px;
//           margin-bottom: 25px;
//           transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//           box-shadow: 0 10px 20px rgba(52, 152, 219, 0.3);
//           position: relative;
//           overflow: hidden;
//         }
        
//         .card-icon::after {
//           content: '';
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 70%);
//           top: 0;
//           left: 0;
//         }
        
//         .goal-card:nth-child(2) .card-icon,
//         .benefit-card:nth-child(2) .card-icon {
//           background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
//           box-shadow: 0 10px 20px rgba(231, 76, 60, 0.3);
//         }
        
//         .goal-card:nth-child(3) .card-icon,
//         .benefit-card:nth-child(3) .card-icon {
//           background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
//           box-shadow: 0 10px 20px rgba(46, 204, 113, 0.3);
//         }
        
//         .goal-card:nth-child(4) .card-icon,
//         .benefit-card:nth-child(4) .card-icon {
//           background: linear-gradient(135deg, #f1c40f 0%, #f39c12 100%);
//           box-shadow: 0 10px 20px rgba(241, 196, 15, 0.3);
//         }
        
//         .goal-card:nth-child(5) .card-icon {
//           background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
//           box-shadow: 0 10px 20px rgba(155, 89, 182, 0.3);
//         }
        
//         .goal-card:nth-child(6) .card-icon {
//           background: linear-gradient(135deg, #16a085 0%, #1abc9c 100%);
//           box-shadow: 0 10px 20px rgba(26, 188, 156, 0.3);
//         }
        
//         .card-title {
//           font-size: 22px;
//           font-weight: 700;
//           margin-bottom: 18px;
//           color: #2c3e50;
//           position: relative;
//           padding-bottom: 12px;
//           display: inline-block;
//         }
        
//         .card-title::after {
//           content: '';
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           width: 40px;
//           height: 3px;
//           background: linear-gradient(90deg, #3498db, transparent);
//         }
        
//         .goal-card:nth-child(2) .card-title::after,
//         .benefit-card:nth-child(2) .card-title::after {
//           background: linear-gradient(90deg, #e74c3c, transparent);
//         }
        
//         .goal-card:nth-child(3) .card-title::after,
//         .benefit-card:nth-child(3) .card-title::after {
//           background: linear-gradient(90deg, #27ae60, transparent);
//         }
        
//         .goal-card:nth-child(4) .card-title::after,
//         .benefit-card:nth-child(4) .card-title::after {
//           background: linear-gradient(90deg, #f1c40f, transparent);
//         }
        
//         .goal-card:nth-child(5) .card-title::after {
//           background: linear-gradient(90deg, #9b59b6, transparent);
//         }
        
//         .goal-card:nth-child(6) .card-title::after {
//           background: linear-gradient(90deg, #16a085, transparent);
//         }
        
//         .card-description {
//           color: #546e7a;
//           line-height: 1.7;
//           font-size: 16px;
//         }
        
//         .goal-card:hover .card-icon, .benefit-card:hover .card-icon {
//           transform: scale(1.1) rotate(5deg);
//         }
        
//         .process-steps {
//           counter-reset: step-counter;
//         }
        
//         .process-step {
//           display: flex;
//           margin-bottom: 50px;
//           padding-left: 100px;
//           position: relative;
//           transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//           opacity: 0;
//           transform: translateY(30px);
//         }
        
//         .process-step.animate-in {
//           opacity: 1;
//           transform: translateY(0);
//         }
        
//         .process-step:last-child {
//           margin-bottom: 0;
//         }
        
//         .process-step:before {
//           counter-increment: step-counter;
//           content: counter(step-counter);
//           position: absolute;
//           left: 0;
//           top: 0;
//           width: 80px;
//           height: 80px;
//           background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
//           color: white;
//           font-size: 28px;
//           font-weight: bold;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 50%;
//           box-shadow: 0 10px 20px rgba(52, 152, 219, 0.3);
//           z-index: 2;
//         }
        
//         .process-step:after {
//           content: '';
//           position: absolute;
//           top: 80px;
//           left: 40px;
//           width: 2px;
//           height: calc(100% - 40px);
//           background: linear-gradient(to bottom, #3498db, transparent);
//           z-index: 1;
//         }
        
//         .process-step:last-child:after {
//           display: none;
//         }
        
//         .step-content {
//           flex: 1;
//           background: linear-gradient(135deg, #ffffff 0%, #f9f9ff 100%);
//           border-radius: 20px;
//           padding: 35px;
//           box-shadow: 0 15px 30px rgba(0,0,0,0.08);
//           position: relative;
//           overflow: hidden;
//           transition: all 0.3s ease;
//         }
        
//         .step-content:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 20px 40px rgba(0,0,0,0.12);
//         }
        
//         .step-content::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background-image: radial-gradient(circle at 100% 100%, transparent 75%, rgba(52, 152, 219, 0.03) 100%);
//         }
        
//         .step-title {
//           font-size: 24px;
//           font-weight: 700;
//           margin-bottom: 15px;
//           color: #2c3e50;
//           position: relative;
//           padding-bottom: 12px;
//           display: inline-block;
//         }
        
//         .step-title::after {
//           content: '';
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           width: 40px;
//           height: 3px;
//           background: linear-gradient(90deg, #3498db, transparent);
//         }
        
//         .step-description {
//           color: #546e7a;
//           line-height: 1.7;
//           font-size: 16px;
//         }
        
//         .testimonials-section {
//           margin-top: 80px;
//         }
        
//         .testimonials-container {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//           gap: 30px;
//         }
        
//         .testimonial-card {
//           background: linear-gradient(135deg, #ffffff 0%, #f9f9ff 100%);
//           border-radius: 20px;
//           padding: 30px;
//           box-shadow: 0 15px 30px rgba(0,0,0,0.08);
//           position: relative;
//           transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//           opacity: 0;
//           transform: translateY(30px);
//           border-top: 4px solid #3498db;
//         }
        
//         .testimonial-card.animate-in {
//           opacity: 1;
//           transform: translateY(0);
//         }
        
//         .testimonial-card:hover {
//           transform: translateY(-10px);
//           box-shadow: 0 20px 40px rgba(0,0,0,0.12);
//         }
        
//         .testimonial-header {
//           display: flex;
//           align-items: center;
//           margin-bottom: 20px;
//         }
        
//         .testimonial-avatar {
//           width: 60px;
//           height: 60px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 20px;
//           font-weight: 600;
//           color: white;
//           margin-right: 15px;
//           box-shadow: 0 5px 15px rgba(0,0,0,0.1);
//         }
        
//         .testimonial-info h4 {
//           margin: 0 0 5px;
//           font-size: 18px;
//           color: #2c3e50;
//         }
        
//         .testimonial-role {
//           color: #7f8c8d;
//           font-size: 14px;
//         }
        
//         .testimonial-stars {
//           display: flex;
//           margin-top: 5px;
//         }
        
//         .star {
//           color: #f1c40f;
//           margin-right: 2px;
//         }
        
//         .testimonial-content {
//           color: #546e7a;
//           line-height: 1.7;
//           font-style: italic;
//           position: relative;
//           padding-left: 20px;
//           border-left: 3px solid #3498db;
//         }
        
//         .testimonial-quote {
//           position: absolute;
//           top: -15px;
//           left: -10px;
//           font-size: 60px;
//           color: rgba(52, 152, 219, 0.1);
//           font-family: Georgia, serif;
//         }
//         .cta-section {
//   margin-top: 80px;
//   text-align: center;
//   background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
//   border-radius: 20px;
//   padding: 60px 40px;
//   box-shadow: 0 20px 50px rgba(0,0,0,0.15);
//   position: relative;
//   overflow: hidden;
// }

// .cta-section::before {
//   content: '';
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
// }

// .cta-title {
//   font-size: 36px;
//   font-weight: 800;
//   color: white;
//   margin-bottom: 25px;
//   text-shadow: 0 2px 10px rgba(0,0,0,0.2);
// }

// .cta-description {
//   color: rgba(255,255,255,0.9);
//   font-size: 18px;
//   max-width: 700px;
//   margin: 0 auto 40px;
//   line-height: 1.7;
// }

// .cta-buttons {
//   display: flex;
//   justify-content: center;
//   gap: 20px;
//   flex-wrap: wrap;
// }

// .cta-btn {
//   padding: 14px 30px;
//   border-radius: 30px;
//   font-size: 16px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   border: none;
//   box-shadow: 0 10px 20px rgba(0,0,0,0.15);
//   position: relative;
//   overflow: hidden;
// }

// .cta-btn::before {
//   content: '';
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(255,255,255,0.1);
//   transform: translateX(-100%);
//   transition: transform 0.3s ease;
// }

// .cta-btn:hover::before {
//   transform: translateX(0);
// }

// .cta-btn-primary {
//   background: white;
//   color: #2980b9;
// }

// .cta-btn-primary:hover {
//   transform: translateY(-5px);
//   box-shadow: 0 15px 25px rgba(0,0,0,0.2);
// }

// .cta-btn-secondary {
//   background: transparent;
//   color: white;
//   border: 2px solid white;
// }

// .cta-btn-secondary:hover {
//   background: rgba(255,255,255,0.1);
//   transform: translateY(-5px);
//   box-shadow: 0 15px 25px rgba(0,0,0,0.2);
// }

// .footer {
//   margin-top: 80px;
//   text-align: center;
//   color: #7f8c8d;
//   padding: 30px 0;
//   font-size: 14px;
// }

// .footer-links {
//   display: flex;
//   justify-content: center;
//   gap: 20px;
//   margin-bottom: 20px;
// }

// .footer-link {
//   color: #3498db;
//   text-decoration: none;
//   transition: color 0.3s ease;
// }

// .footer-link:hover {
//   color: #2980b9;
// }

// .copyright {
//   opacity: 0.7;
// }

// @media (max-width: 992px) {
//   .concept-grid {
//     grid-template-columns: 1fr;
//   }
  
//   .process-step {
//     padding-left: 70px;
//   }
  
//   .process-step:before {
//     width: 60px;
//     height: 60px;
//     font-size: 22px;
//   }
  
//   .process-step:after {
//     top: 60px;
//     left: 30px;
//   }
  
//   .hero-section {
//     padding: 60px 30px;
//   }
  
//   h1 {
//     font-size: 36px;
//   }
  
//   .hero-subtitle {
//     font-size: 18px;
//   }
  
//   .tab-content {
//     padding: 30px;
//   }
  
//   .section-title {
//     font-size: 28px;
//   }
// }

// @media (max-width: 768px) {
//   .tab-btn {
//     padding: 12px 20px;
//     font-size: 14px;
//   }
  
//   .concept-image {
//     height: 280px;
//   }
  
//   .concept-image svg {
//     font-size: 80px;
//   }
  
//   .concept-text {
//     padding: 30px;
//   }
  
//   .concept-title {
//     font-size: 24px;
//   }
  
//   .concept-description {
//     font-size: 16px;
//   }
  
//   .goals-grid, .benefits-grid {
//     grid-template-columns: 1fr;
//   }
  
//   .process-step {
//     padding-left: 60px;
//   }
  
//   .process-step:before {
//     width: 50px;
//     height: 50px;
//     font-size: 20px;
//   }
  
//   .process-step:after {
//     top: 50px;
//     left: 25px;
//   }
  
//   .cta-title {
//     font-size: 28px;
//   }
  
//   .cta-description {
//     font-size: 16px;
//   }
// }

// @media (max-width: 576px) {
//   .hero-section {
//     padding: 40px 20px;
//   }
  
//   h1 {
//     font-size: 28px;
//   }
  
//   .hero-subtitle {
//     font-size: 16px;
//   }
  
//   .tab-content {
//     padding: 20px;
//   }
  
//   .card-icon {
//     width: 60px;
//     height: 60px;
//     font-size: 24px;
//   }
  
//   .card-title {
//     font-size: 20px;
//   }
  
//   .cta-section {
//     padding: 40px 20px;
//   }
// }

// .delay-100 {
//   transition-delay: 0.1s;
// }

// .delay-200 {
//   transition-delay: 0.2s;
// }

// .delay-300 {
//   transition-delay: 0.3s;
// }

// .delay-400 {
//   transition-delay: 0.4s;
// }

// .delay-500 {
//   transition-delay: 0.5s;
// }
// `}</style>

// // Add particles for hero section animation
// {[...Array(15)].map((_, index) => (
//   <div 
//     key={index}
//     className="particle"
//     style={{
//       width: `${Math.random() * 20 + 10}px`,
//       height: `${Math.random() * 20 + 10}px`,
//       left: `${Math.random() * 100}%`,
//       bottom: `-100px`,
//       animationDelay: `${Math.random() * 15}s`,
//       animationDuration: `${Math.random() * 10 + 10}s`
//     }}
//   />
// ))}

// <div className="progress-bar" style={{ width: `${scrollProgress * 100}%` }}></div>

// <header className="hero-section">
//   <div className="hero-overlay"></div>
//   <div className="hero-particles"></div>
//   <div className="hero-content">
//     <div className="hero-logo">
//       <FontAwesomeIcon icon={faWarehouse} />
//     </div>
//     <h1>GoodVentory</h1>
//     <p className="hero-subtitle">
//       An AI-powered collaborative spatial resource sharing platform optimizing warehousing efficiency through predictive analytics and sustainable logistics.
//     </p>
    
//     <div className="tabs">
//       <button 
//         className={`tab-btn ${activeTab === "concept" ? "active" : ""}`}
//         onClick={() => handleTabChange("concept")}
//       >
//         Concept
//       </button>
//       <button 
//         className={`tab-btn ${activeTab === "goals" ? "active" : ""}`}
//         onClick={() => handleTabChange("goals")}
//       >
//         Goals
//       </button>
//       <button 
//         className={`tab-btn ${activeTab === "process" ? "active" : ""}`}
//         onClick={() => handleTabChange("process")}
//       >
//         Process
//       </button>
//       <button 
//         className={`tab-btn ${activeTab === "benefits" ? "active" : ""}`}
//         onClick={() => handleTabChange("benefits")}
//       >
//         Benefits
//       </button>
//     </div>
//   </div>
// </header>

// <main className="tab-content">
//   {activeTab === "concept" && (
//     <div className="concept-container">
//       <h2 className="section-title">Our Concept</h2>
      
//       <div className="concept-grid">
//         <div className={`concept-image ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.1s" }}>
//           <FontAwesomeIcon icon={faWarehouse} />
//         </div>
//         <div className={`concept-text ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.3s" }}>
//           <h3 className="concept-title">Space Optimization</h3>
//           <p className="concept-description">
//             GoodVentory transforms underutilized warehouse space into valuable assets through our intelligent matching algorithm. We connect businesses with excess capacity to those needing temporary storage, creating a dynamic ecosystem that reduces waste and maximizes efficiency.
//           </p>
//         </div>
//       </div>
      
//       <div className="concept-grid">
//         <div className={`concept-text ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.1s" }}>
//           <h3 className="concept-title">AI-Powered Matching</h3>
//           <p className="concept-description">
//             Our proprietary AI engine analyzes multiple factors including location, capacity, timing, and special requirements to create optimal matches between warehouse owners and businesses seeking storage. The system continuously learns and improves through each transaction.
//           </p>
//         </div>
//         <div className={`concept-image ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.3s" }}>
//           <FontAwesomeIcon icon={faBrain} />
//         </div>
//       </div>
      
//       <div className="concept-grid">
//         <div className={`concept-image ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.1s" }}>
//           <FontAwesomeIcon icon={faChartLine} />
//         </div>
//         <div className={`concept-text ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.3s" }}>
//           <h3 className="concept-title">Predictive Analytics</h3>
//           <p className="concept-description">
//             GoodVentory leverages advanced data analytics to forecast storage needs and capacity fluctuations, allowing businesses to plan ahead. Our predictive models help optimize inventory management, reduce costs, and improve overall supply chain efficiency.
//           </p>
//         </div>
//       </div>
      
//       <div className="testimonials-section">
//         <h2 className="section-title">What Our Users Say</h2>
        
//         <div className="testimonials-container">
//           {testimonials.map((testimonial, index) => {
//             const avatar = generateAvatar(testimonial.name);
            
//             return (
//               <div 
//                 key={index} 
//                 className={`testimonial-card ${animateItems ? "animate-in" : ""}`}
//                 style={{ transitionDelay: `${0.1 * (index + 1)}s` }}
//               >
//                 <div className="testimonial-header">
//                   <div 
//                     className="testimonial-avatar"
//                     style={{ backgroundColor: avatar.backgroundColor }}
//                   >
//                     {avatar.initials}
//                   </div>
//                   <div className="testimonial-info">
//                     <h4>{testimonial.name}</h4>
//                     <div className="testimonial-role">{testimonial.role}</div>
//                     <div className="testimonial-stars">
//                       {[...Array(5)].map((_, i) => (
//                         <span key={i} className="star">
//                           ★
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="testimonial-content">
//                   <span className="testimonial-quote">"</span>
//                   {testimonial.content}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   )}
  
//   {activeTab === "goals" && (
//     <div>
//       <h2 className="section-title">Our Goals</h2>
      
//       <div className="goals-grid">
//         <div className={`goal-card ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.1s" }}>
//           <div className="card-icon">
//             <FontAwesomeIcon icon={faBoxOpen} />
//           </div>
//           <h3 className="card-title">Reduce Empty Space</h3>
//           <p className="card-description">
//             Transform warehouses with unused capacity into profit centers by connecting them with businesses in need of temporary or seasonal storage solutions.
//           </p>
//         </div>
        
//         <div className={`goal-card ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.2s" }}>
//           <div className="card-icon">
//             <FontAwesomeIcon icon={faTruckFast} />
//           </div>
//           <h3 className="card-title">Optimize Logistics</h3>
//           <p className="card-description">
//             Create a more efficient supply chain by strategically positioning inventory closer to end customers, reducing transportation costs and delivery times.
//           </p>
//         </div>
        
//         <div className={`goal-card ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.3s" }}>
//           <div className="card-icon">
//             <FontAwesomeIcon icon={faHandshake} />
//           </div>
//           <h3 className="card-title">Foster Collaboration</h3>
//           <p className="card-description">
//             Build a collaborative ecosystem where businesses can form strategic partnerships beyond mere space sharing, creating synergies within industries.
//           </p>
//         </div>
        
//         <div className={`goal-card ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.4s" }}>
//           <div className="card-icon">
//             <FontAwesomeIcon icon={faEarthAmericas} />
//           </div>
//           <h3 className="card-title">Reduce Carbon Footprint</h3>
//           <p className="card-description">
//             Decrease the environmental impact of logistics by optimizing warehouse utilization and reducing the need for new construction and excessive transportation.
//           </p>
//         </div>
        
//         <div className={`goal-card ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.5s" }}>
//           <div className="card-icon">
//             <FontAwesomeIcon icon={faRobot} />
//           </div>
//           <h3 className="card-title">Advance AI Solutions</h3>
//           <p className="card-description">
//             Develop and refine AI algorithms that continually improve matching efficiency, space utilization, and predictive analytics for the logistics industry.
//           </p>
//         </div>
        
//         <div className={`goal-card ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.6s" }}>
//           <div className="card-icon">
//             <FontAwesomeIcon icon={faRecycle} />
//           </div>
//           <h3 className="card-title">Promote Circular Economy</h3>
//           <p className="card-description">
//             Support sustainable business practices by making better use of existing resources and infrastructure instead of creating redundant storage facilities.
//           </p>
//         </div>
//       </div>
//     </div>
//   )}
  
//   {activeTab === "process" && (
//     <div>
//       <h2 className="section-title">How It Works</h2>
      
//       <div className="process-steps">
//         <div className={`process-step ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.1s" }}>
//           <div className="step-content">
//             <h3 className="step-title">Registration & Profiling</h3>
//             <p className="step-description">
//               Warehouse owners and businesses seeking storage sign up and create detailed profiles. Our system collects critical information about space specifications, special features, availability timelines, and storage requirements.
//             </p>
//           </div>
//         </div>
        
//         <div className={`process-step ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.2s" }}>
//           <div className="step-content">
//             <h3 className="step-title">AI Matching Algorithm</h3>
//             <p className="step-description">
//               Our sophisticated AI analyzes all available data to suggest optimal matches between warehouse space providers and seekers. The algorithm considers location, capacity, timing, special requirements, and historical performance.
//             </p>
//           </div>
//         </div>
        
//         <div className={`process-step ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.3s" }}>
//           <div className="step-content">
//             <h3 className="step-title">Negotiation & Agreement</h3>
//             <p className="step-description">
//               Matched parties connect through our secure platform to discuss details and finalize terms. Our standardized contracts and transparent pricing model streamline the process while ensuring protection for all parties.
//             </p>
//           </div>
//         </div>
        
//         <div className={`process-step ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.4s" }}>
//           <div className="step-content">
//             <h3 className="step-title">Integration & Operations</h3>
//             <p className="step-description">
//               Our platform integrates with existing warehouse management and inventory systems to ensure smooth operations. Real-time monitoring and communication tools help maintain transparency throughout the partnership.
//             </p>
//           </div>
//         </div>
        
//         <div className={`process-step ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.5s" }}>
//           <div className="step-content">
//             <h3 className="step-title">Analytics & Optimization</h3>
//             <p className="step-description">
//               Continuous data collection allows our AI to provide insights and recommendations for improving efficiency. Both providers and users receive periodic reports with actionable intelligence to optimize their operations.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )}
  
//   {activeTab === "benefits" && (
//     <div>
//       <h2 className="section-title">Key Benefits</h2>
      
//       <div className="benefits-grid">
//         <div className={`benefit-card ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.1s" }}>
//           <div className="card-icon">
//             <FontAwesomeIcon icon={faChartLine} />
//           </div>
//           <h3 className="card-title">Increased Revenue</h3>
//           <p className="card-description">
//             Warehouse owners can generate additional income from underutilized space that would otherwise remain empty and nonproductive.
//           </p>
//         </div>
        
//         <div className={`benefit-card ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.2s" }}>
//           <div className="card-icon">
//             <FontAwesomeIcon icon={faMapMarkedAlt} />
//           </div>
//           <h3 className="card-title">Strategic Positioning</h3>
//           <p className="card-description">
//             Businesses can position inventory closer to customers without long-term commitments, improving delivery times and customer satisfaction.
//           </p>
//         </div>
        
//         <div className={`benefit-card ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.3s" }}>
//           <div className="card-icon">
//             <FontAwesomeIcon icon={faCloudSunRain} />
//           </div>
//           <h3 className="card-title">Seasonal Flexibility</h3>
//           <p className="card-description">
//             Adapt quickly to seasonal demands without the overhead of maintaining year-round capacity that goes unused during slow periods.
//           </p>
//         </div>
        
//         <div className={`benefit-card ${animateItems ? "animate-in" : ""}`} style={{ transitionDelay: "0.4s" }}>
//           <div className="card-icon">
//             <FontAwesomeIcon icon={faShieldAlt} />
//           </div>
//           <h3 className="card-title">Risk Mitigation</h3>
//           <p className="card-description">
//             Diversify storage locations to reduce risk from regional disruptions while our verification system ensures security and reliability.
//           </p>
//         </div>
//       </div>
      
//       <div className="cta-section">
//         <h2 className="cta-title">Ready to Optimize Your Storage?</h2>
//         <p className="cta-description">
//           Join our growing network of warehouse partners and businesses revolutionizing the way we think about storage and logistics. Start turning empty space into opportunity today.
//         </p>
//         <div className="cta-buttons">
//           <button className="cta-btn cta-btn-primary">Get Started</button>
//           <button className="cta-btn cta-btn-secondary">Learn More</button>
//         </div>
//       </div>
//     </div>
//   )}
// </main>
// <footer className="footer">
//   <div className="footer-links">
//     <a href="#" className="footer-link">About</a>
//     <a href="#" className="footer-link">Features</a>
//     <a href="#" className="footer-link">Pricing</a>
//     <a href="#" className="footer-link">Support</a>
//     <a href="#" className="footer-link">Contact</a>
//   </div>
//   <div className="copyright">
//     &copy; {new Date().getFullYear()} GoodVentory. All rights reserved.
//   </div>
// </footer>

// export default CSRSpaceSharingDemo;