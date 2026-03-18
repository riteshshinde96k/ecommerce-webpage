# ⚡ ProSport | Premium Sports Ecommerce

ProSport is a modern, fully-functional, responsive sports ecommerce web application. It features a sleek, dark-themed UI with glassmorphism effects, dynamic filtering, and a seamless shopping experience.

## ✨ Project Input & Goal
**Input:** A task to create a sports e-commerce webpage with a navigation bar, internal routing, UI icons for "Add to Cart", "Shop", "History", etc., using modern web technologies and Tailwind CSS.
**Goal:** Build a complete frontend application with a premium look, interactive components, responsive design, and mock product data.

## 💻 Output & Features Built
The final output is a responsive React application featuring multiple pages and functional components:
- **Home Page:** Cinematic hero banner, feature highlights, and featured/trending product grids.
- **Shop Page:** Comprehensive product catalog with search, category filtering, sorting (price, rating, name), and adjustable grid layouts.
- **Product Detail Page:** Deep dive into product features with quantity selection, stock status, and related products.
- **Shopping Cart:** Functional cart management (add/remove items, update quantity) with automatic subtotal, shipping, and tax calculation.
- **Order History:** Tracking past purchases with expandable order details.
- **Global Components:** 
  - Responsive Navbar with scroll effects and mobile menu.
  - Complete Footer with newsletter subscription.
  - Toast Notifications for user actions (e.g., adding to cart).
- **State Management:** A custom `CartContext` utilizing `useReducer` and `localStorage` to persist cart data and order history across page reloads.

## 🛠️ Technology Stack
- **Framework:** React 19 + Vite (for lightning-fast development and build times).
- **Styling:** Tailwind CSS v4 (configured with custom theme tokens, animations, and glassmorphism utilities) and regular CSS for advanced animations.
- **Routing:** React Router DOM (for seamless client-side navigation without page reloads).
- **Icons:** Lucide React (for crisp, scalable SVG icons like Shopping Cart, User, Menu, etc.).
- **Typography:** Google Fonts (Inter).
- **Assets:** Custom generated high-quality sports product images (Hero Banner, Running Shoes, Basketball, Fitness Tracker, etc.).
