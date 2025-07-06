# Todo Task Manager - MERN Stack Application

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring real-time updates, user authentication, and mobile-responsive design.

## 🚀 Features

### Frontend (React)
- **Modern UI/UX**: Built with React 19, Tailwind CSS, and responsive design
- **Authentication**: Login, signup, and Google OAuth integration
- **Real-time Updates**: Socket.IO integration for live task updates
- **Mobile Responsive**: Optimized for all device sizes
- **Task Management**: Create, edit, delete, and organize tasks
- **Dashboard**: Analytics, task filtering, and user preferences
- **Toast Notifications**: User feedback with react-toastify

### Backend (Node.js/Express)
- **RESTful API**: Complete CRUD operations for tasks and users
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Google OAuth**: Passport.js integration for social login
- **Real-time Communication**: Socket.IO for live updates
- **Security**: Helmet, CORS, rate limiting, and input validation
- **Database**: MongoDB with Mongoose ODM

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - Object Data Modeling
- **Socket.IO** - Real-time bidirectional communication
- **Passport.js** - Authentication middleware
- **JWT** - JSON Web Tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Todo-task-manager/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── layout/        # Layout components
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   └── server.js        # Main server file
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kishorek78/To-Do-Application.git
   cd To-Do-Application
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install
   
   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in the server directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/todo-task-manager
   JWT_SECRET=your-super-secret-jwt-key-here
   CLIENT_URL=http://localhost:5173
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
   SESSION_SECRET=your-session-secret-key
   ```

4. **Start the application**
   ```bash
   # Start backend server (from server directory)
   npm run dev
   
   # Start frontend (from client directory)
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/me` - Get current user

### Tasks
- `GET /api/tasks` - Get all tasks for user
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/:id` - Get specific task

## 🔧 Development

### Available Scripts

**Backend (server/)**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

**Frontend (client/)**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Vercel Deployment (Recommended)

This application is configured for easy deployment on Vercel:

1. **Fork or use this repository**
   - Go to https://github.com/Kishorek78/To-Do-Application
   - Fork the repository or use it directly

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

3. **Environment Variables**
   Set up these environment variables in Vercel dashboard:
   ```env
   MONGO_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-super-secret-jwt-key-here
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Deploy" and Vercel will build and deploy your application
   - Your app will be available at `https://your-app-name.vercel.app`

### Alternative Deployment Options

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to platforms like Netlify, or GitHub Pages

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Rate limiting
- Security headers with Helmet
- Session management

## 📱 Mobile Optimization

- Responsive design with Tailwind CSS
- Touch-friendly interface elements
- Mobile navigation menus
- Optimized layouts for small screens
- Progressive Web App features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.
