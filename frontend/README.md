# Video Chat App – Frontend

A React-based frontend for a real-time video chat and messaging app, inspired by WhatsApp. Built with:

- ⚛️ React + React Router
- 🎯 TanStack Query (React Query) for data fetching & caching
- 🔥 React Hot Toast for notifications
- 🌐 WebSocket (for real-time chat/video signaling)
- 🎥 WebRTC (for peer-to-peer video calls)
- 🎨 TailwindCSS for styling

## Features

- 🔑 Authentication (Signup / Login)
- 💬 Real-time chat with friends
- 📞 Video & voice calls (WebRTC)
- 🔔 Notifications (toast + in-app)
- 🧭 Onboarding flow
- 👫 Friends list & management

## Project Structure

frontend/
│── public/                 # Static assets (images, icons, etc.)
│── src/
│   ├── components/         # Reusable UI components
│   ├── constant/           # Constants (API endpoints, config)
│   ├── hooks/              # Custom hooks (React Query, auth, etc.)
│   ├── lib/                # Utilities & helper functions
│   ├── pages/              # Pages for routing (Home, Chat, Call, etc.)
│   ├── store/              # Global state management
│   ├── App.jsx             # Main app with routes
│   ├── main.jsx            # Entry point (ReactDOM + Providers)
│   ├── index.css           # Tailwind & global styles
│── index.html              # Root HTML
│── package.json            # Dependencies & scripts
│── vite.config.js          # Vite configuration
│── README.md               # Project documentation

## Installation & Setup

```bash
Clone the repository:

git clone <https://github.com/rajscriptsGH/Talksy/frontend.git>
cd frontend

Install dependencies:

npm install

Create an .env file in root:

VITE_API_URL=<http://localhost:3000/api>

Start development server:

npm run dev

Build for production:

npm run build
```

🔌 API Integration

This frontend communicates with a backend server (Node.js + Express + WebSocket).
Update src/services/api.js with your backend URL:

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default api;

⚡ Real-Time Communication

WebSockets for messaging & signaling

WebRTC for peer-to-peer video & audio streams

Example: when a user clicks "Call", the frontend:

Sends a WebSocket signal to the backend

Backend relays offer/answer/ICE candidates

WebRTC establishes a direct peer connection

📦 Core Dependencies
"dependencies": {
  "@tanstack/react-query": "^5.x",
  "axios": "^1.x",
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-hot-toast": "^2.x",
  "react-router-dom": "^6.x",
  "tailwindcss": "^3.x"
}

🖼️ Screenshots (Optional)

Add some UI screenshots here

🤝 Contribution

Fork the repo

Create a feature branch (git checkout -b feature-name)

Commit changes (git commit -m "Added feature X")

Push branch (git push origin feature-name)

Create a Pull Request

📜 License

This project is licensed under the MIT License.
