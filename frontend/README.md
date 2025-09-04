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

## Real-Time Communication

- WebSockets for messaging & signaling

- WebRTC for peer-to-peer video & audio streams

Example: when a user clicks "Call", the frontend:

**1**.Sends a WebSocket signal to the backend

**2**.Backend relays offer/answer/ICE candidates

**3**.WebRTC establishes a direct peer connection

## Core Dependencies

```json
"dependencies": {
  "@tanstack/react-query": "^5.x",
  "axios": "^1.x",
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-hot-toast": "^2.x",
  "react-router-dom": "^6.x",
  "tailwindcss": "^3.x"
}
```

## Screenshots

Comming soon...

## 🤝 Contribution

1.Fork the repo

2.Create a feature branch (git checkout -b feature-name)

3.Commit changes (git commit -m "Added feature X")

4.Push branch (git push origin feature-name)

5.Create a Pull Request

## License

This project is licensed under the MIT License.
