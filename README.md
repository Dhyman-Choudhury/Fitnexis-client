# 💪 Fitnexis – Your Ultimate Fitness Companion

Fitnexis is a full-featured MERN stack fitness tracking platform built to help users book trainers, join fitness classes, track their progress, and engage with a vibrant wellness community. With role-based dashboards, Stripe payments, and a unique UI design, Fitnexis is designed to deliver an immersive fitness experience.

---

## 🔗 Live Website

🌐 [https://fitness-web-app-e4c78.web.app]

---

## 🔑 Admin Credentials

- **Email:** admin@fitnexis.com  
- **Password:** Admin@123

---

## 🚀 Key Features

1. 🔐 **JWT-Based Secure Authentication:** Firebase authentication (email/password & social login) with secure token handling via localStorage.
2. 🧑‍💼 **Role-Based Dashboards:** Separate dashboard experiences for Admins, Trainers, and Members.
3. 💳 **Stripe Payment Integration:** Complete payment workflow for booking fitness packages.
4. 📅 **Trainer Availability & Booking:** Members can view available trainer slots and book sessions.
5. 🌟 **Featured Classes Section:** Top 6 most booked classes fetched from the database using MongoDB aggregation.
6. 🧠 **Forum & Voting System:** Share ideas and interact with community posts featuring upvote/downvote functionality.
7. 📬 **Newsletter Subscription:** Public users can subscribe without needing to log in.
8. 📊 **Admin Analytics:** Track income, transactions, and visualize newsletter subscribers vs paid members.
9. 🎨 **Fully Responsive UI:** Unique, consistent, and mobile-friendly design across devices.
10. 🧑‍🏫 **Trainer Application:** Members can apply to become trainers via a detailed form.

---

## 🧰 Tech Stack & Purpose

### Frontend

- **React.js** – Component-based UI development  
- **Tailwind CSS & DaisyUI** – Utility-first CSS and prebuilt components for styling  
- **React Router DOM** – Client-side routing  
- **React Hook Form** – Efficient form management  
- **React Toastify & SweetAlert2** – User-friendly notifications and alerts  
- **React Select** – Custom multi-select dropdowns  
- **TanStack React Query** – Data fetching and caching for GET requests  
- **Chart.js** – Visual analytics in admin dashboard  
- **Firebase Auth** – Authentication (email/password & social login)  

### Backend

- **Node.js & Express.js** – REST API server  
- **MongoDB Atlas** – NoSQL database  
- **JWT (jsonwebtoken)** – Secure authentication and authorization tokens  
- **Stripe** – Payment gateway for booking trainers  

---

## 🧑‍💻 User Roles & Capabilities

| Role    | Capabilities                                                                                  |
|---------|----------------------------------------------------------------------------------------------|
| Admin   | Manage trainers, approve/reject applications, oversee classes and newsletters, monitor balance |
| Trainer | Manage available slots, add forum posts, view booked sessions                                |
| Member  | Browse classes, book trainers, pay for sessions, submit reviews, apply to be a trainer       |

---

## 📁 Project Structure Overview

