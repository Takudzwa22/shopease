# ShopEase - E-Commerce Web Application

ShopEase is a full-stack e-commerce platform built with modern web technologies including Next.js, Tailwind CSS, MongoDB, and PayPal sandbox integration. It enables users to browse products, manage a shopping cart, place orders, and simulate payments securely.

---

## 🚀 Features

- ⚙️ Full CRUD operations for product and order management
- 🛍️ Browse, search, and add products to a cart
- 📦 Checkout with shipping form and order summary
- 💳 Simulated PayPal payments using the sandbox environment
- 📜 Order history tracking (admin or user-based)
- 🎨 Responsive and accessible design using Tailwind CSS

---

## 🧑‍💻 Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js (via API routes), Express-like structure
- **Database**: MongoDB (via Mongoose or MongoDB SDK)
- **Authentication**: (Optional future improvement)
- **Payment**: PayPal Sandbox Integration

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/shopease.git
cd shopease

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

---

## 📦 Production Build

```bash
# Build the app
pnpm build

# Start the production server
pnpm start
```

---

## 🐳 Docker Setup (Optional)

```bash
# Build Docker image
docker build -t shopease .

# Run the container
docker run -p 3000:3000 shopease
```

---

## 🧪 Testing the Payment

This project integrates **PayPal sandbox** for safe and simulated payment processing. You must configure sandbox credentials in `.env` and link them with your developer PayPal account.

---

## 📂 Project Structure

```
├── app
│   ├── page.tsx              # Landing page
│   ├── products/             # Product list, detail, and add pages
│   ├── orders/               # Orders overview
│   └── checkout/             # Checkout flow
├── components/               # UI components
├── lib/                      # API handlers and utility types
├── public/                   # Static files
├── styles/                   # Global CSS via Tailwind
├── .env                      # Environment variables
└── Dockerfile                # Container setup (optional)
```

---

## 📌 TODOs & Improvements

- Add user authentication (JWT or NextAuth)
- Implement order management dashboard for admins
- Use Stripe or another payment provider for expanded support
- Add product ratings and reviews

---

## 📜 License

This project is for educational purposes as part of the B204 Web Development module at Gisma University.

---

## 🔗 Live Demo

*(https://easeshops.vercel.app/)*

---

## Author

- Your Name – Takudzwa22


