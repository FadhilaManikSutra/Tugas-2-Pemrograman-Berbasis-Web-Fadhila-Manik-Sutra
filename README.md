# SITTA UT - Vue.js Learning Material Management System
A simple Vue.js-based web application developed for the Universitas Terbuka practical assignment.  
This project simulates the ordering, stock management, and delivery tracking process of learning materials (Bahan Ajar) in the SITTA UT system.

---

## 📌 Features

### 1. Learning Material Stock Management
- Display learning material stock data
- Filter stock by:
  - UT Regional Office (UPBJJ)
  - Course Category
- Dependent filter options
- Search by course title
- Sort data by:
  - Title
  - Stock
  - Price
- Stock status indicators:
  - Safe
  - Low Stock
  - Empty
- Add new stock data
- Simple form validation
- Dynamic UI rendering using Vue.js directives

### 2. Delivery Order (DO) Tracking
- Create new delivery orders
- Automatic DO number generation
- Package selection with detail preview
- Automatic total price calculation
- Delivery timeline visualization
- Tracking delivery information display

---

## 🛠 Technologies Used

- HTML5
- CSS3
- JavaScript
- Vue.js 2

---

## 📂 Project Structure

```plaintext
Tugas-2-Pemrograman-Berbasis-Web/
├── index.html
├── stok.html
├── tracking.html
├── css/
│   └── style.css
└── js/
    ├── dummy-data.js
    ├── stok-app.js
    └── tracking-app.js
