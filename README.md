# Classic Ipod Clone (React)

A **classic iPod-style UI clone** built using **React**, replicating the iconic scroll wheel navigation and menu-driven interface of the original iPod.

## Project Overview
This project simulates the behavior of a classic Apple iPod using React.  
Users can rotate the wheel using the mouse to navigate menus and click the center button to select items.

## 🛠️ Technologies Used

### ⚛️ React (Class Components)
- Component-based UI architecture
- State management for menus and screen navigation
- Event handling for wheel rotation and clicks

### 🎨 CSS Modules
- Scoped styles to prevent conflicts
- Cleaner and maintainable styling
- Component-level CSS management

### 🖱️ JavaScript Mouse Events
- `onMouseMove`, `onClick`, `onMouseUp`
- Used to track wheel rotation and interactions

### 📐 Trigonometry (Math.atan2)
- Calculates mouse angle around the wheel
- Enables clockwise and counter-clockwise scrolling

---

## ✨ Features
- 🌀 Circular scroll wheel navigation
- 📋 Main menu and Music sub-menu
- 🎯 Active menu item highlighting
- 🔘 Center button to select items
- 🔙 Menu button for backward navigation
- 🧭 Dynamic screen rendering
- ♻️ Cyclic menu scrolling (wrap-around)
- 🧱 Modular React components

## 🏁 Getting Started

```bash
npm install
npm start