# Memory Lane - Frontend (React)

## Description

**Memory Lane** is a nostalgic digital time capsule application that allows users to preserve precious memories, photos, and messages to be unlocked on special future dates. This repository contains the **Frontend (React)** application.

The frontend is built with React and provides a beautiful, vintage-styled user interface for creating, managing, and viewing time capsules. Users can upload images, add text memories, include background music, and invite loved ones to share in their journey.

**⚠️ IMPORTANT: This is the FRONTEND repository (React application).**

A repository with the backend code (Express API) can be found here: [Memory Lane Backend](https://github.com/KaterynaSoloviova/memory-lane-server)

## Features

- ✨ **Create Time Capsules**: Build digital time capsules with custom unlock dates
- 🖼️ **Media Upload**: Upload images, videos, and audio files via Cloudinary
- 🎨 **Vintage Styling**: Beautiful retro aesthetic with customizable themes
- 👥 **Participant Management**: Invite friends and family to join your capsule
- 🎵 **Background Music**: Add custom audio to enhance the experience
- 💬 **Comments System**: Share thoughts and memories on public capsules
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🔒 **Privacy Controls**: Choose between public and private capsules

## Tech Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS + Custom vintage styles
- **State Management**: React Context API
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **File Upload**: Cloudinary API
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## Prerequisites

Before running this application, you'll need:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)
- **Cloudinary Account** (for media uploads)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone git@github.com:KaterynaSoloviova/memory-lane-client.git
cd memory-lane-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
# Backend API URL
VITE_BASE_URL=http://localhost:5005

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

#### Getting Cloudinary Credentials:

1. **Sign up** at [Cloudinary](https://cloudinary.com/)
2. **Create a new account** or sign in to existing account
3. **Get your Cloud Name** from the dashboard
4. **Create an Upload Preset**:
   - Go to Settings → Upload
   - Scroll to Upload presets
   - Click "Add upload preset"
   - Set signing mode to "Unsigned"
   - Save the preset name

### 4. Run the Application

#### Development Mode
```bash
npm run dev
```
The application will start at `http://localhost:5173`

#### Production Build
```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CommentSection.jsx
│   ├── Countdown.jsx
│   ├── Header.jsx
│   ├── ImageUpload.jsx
│   ├── PrivateRoute.jsx
│   ├── SlideShow.jsx
│   ├── TiptapEditor.jsx
│   └── VintageLoader.jsx
├── contexts/           # React context providers
│   └── AuthContext.jsx
├── pages/              # Application pages
│   ├── About.jsx
│   ├── CreateCapsule.jsx
│   ├── HomePage.jsx
│   ├── LogIn.jsx
│   ├── MyCapsules.jsx
│   ├── PublicCapsulesPage.jsx
│   ├── SignUp.jsx
│   └── ViewCapsulePage.jsx
├── utils/              # Utility functions and styles
│   ├── cloudinaryUpload.js
│   ├── styles.js
│   ├── validators.js
│   └── vintageStyles.jsx
├── config/             # Configuration files
│   └── config.js
├── assets/             # Static assets
└── App.jsx             # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Endpoints

The frontend communicates with the backend API. Make sure the backend is running and accessible at the URL specified in your environment variables.

## Demo

**Live Frontend Demo**: [Memory Lane on Netlify](https://memory-lane-web.netlify.app/)

**Live Backend API**: [Memory Lane API on Render](https://memory-lane-app-mz1n.onrender.com)

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/KaterynaSoloviova/memory-lane-client/issues) page
2. Create a new issue with detailed description
3. Contact the development team

---

**Made with ❤️ by Kateryna Soloviova**
