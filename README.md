# Meal Cage Restaurant - Bistro Boss

A full-stack restaurant management system built with React, Firebase, and Stripe integration.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- Stripe account (for payment features)
- imgbb API key (for image uploads)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory and add your credentials:

```env
# Firebase Configuration
# Get these from Firebase Console: https://console.firebase.google.com/
VITE_apiKey=your_firebase_api_key_here
VITE_authDomain=your_project_id.firebaseapp.com
VITE_projectId=your_project_id_here
VITE_storageBucket=your_project_id.appspot.com
VITE_messagingSenderId=your_messaging_sender_id_here
VITE_appId=your_app_id_here

# Stripe Payment Key
# Get this from Stripe Dashboard: https://dashboard.stripe.com/apikeys
VITE_payment_key=your_stripe_publishable_key_here

# Image Upload Token (imgbb API)
# Get this from imgbb: https://api.imgbb.com/
VITE_ImageUploadToken=your_imgbb_api_key_here
```

#### How to get Firebase credentials:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Go to Project Settings > General
4. Scroll down to "Your apps" and click on the web icon (</>)
5. Copy the configuration values

#### How to get Stripe key:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your **Publishable key** from the API keys section

#### How to get imgbb API key:
1. Go to [imgbb API](https://api.imgbb.com/)
2. Sign up and get your API key

### 3. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173/` (or another port if 5173 is in use)

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## Features

- User authentication with Firebase
- Restaurant menu management
- Shopping cart functionality
- Stripe payment integration
- Admin dashboard
- User dashboard
- Image upload with imgbb
- Responsive design with Tailwind CSS and DaisyUI

## Tech Stack

- **Frontend:** React 18, React Router v6
- **Styling:** Tailwind CSS, DaisyUI
- **State Management:** TanStack Query (React Query)
- **Authentication:** Firebase Auth
- **Payment:** Stripe
- **Form Handling:** React Hook Form
- **Icons:** React Icons
- **Charts:** Recharts
- **Notifications:** SweetAlert2

## Troubleshooting

### White Screen Issue
If you see a white screen, check:
1. `.env.local` file exists and has all required values
2. Firebase credentials are correct
3. Check browser console for errors (F12)

### Port Already in Use
If port 5173 is in use, Vite will automatically try other ports (5174, 5175, etc.)

## License

This project is for educational purposes.
