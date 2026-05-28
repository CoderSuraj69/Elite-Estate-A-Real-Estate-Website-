# Elite Estate - Real Estate Website

A modern, interactive real estate website built with React, Tailwind CSS, and Vite.

## Features

- **Login/Logout** - User authentication (demo mode - any credentials work)
- **Add Property** - List new properties (protected route)
- **Notification Bell** - View and manage notifications
- **Favourites** - Save properties to your favourites list
- **Dark Mode** - Toggle between light and dark themes
- **Google Maps** - Property location display (requires API key)
- **Contact & Enquiry Forms** - Contact page and property enquiry forms

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Google Maps API Key** (optional)
   - Get a key from [Google Cloud Console](https://console.cloud.google.com/)
   - Enable "Maps JavaScript API" and "Places API"
   - Replace `YOUR_GOOGLE_MAPS_API_KEY` in `index.html` with your key
   - Without a key, a fallback with "Open in Google Maps" link is shown

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Tech Stack

- React 18
- React Router v6
- Tailwind CSS
- Vite
- Google Maps API (optional)

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React context (Auth, Theme, Favourites, Notifications)
├── data/           # Static property data
├── pages/          # Page components
└── main.jsx        # App entry point
```
