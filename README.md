# Stack Overflow Clone

A full-stack web application that replicates the core features of [Stack Overflow](https://stackoverflow.com/)—the world’s largest Q&A platform for developers. This project is built to practice building scalable, modern web apps and demonstrate a typical developer Q&A workflow.

## Features

- User authentication (sign up, login, logout)
- Post questions and answers
- Upvote and downvote questions and answers
- Comment on questions and answers
- Search and filter questions
- User profiles with activity history and customizable avatars
- Responsive design for mobile and desktop
- **Tagging System:** Questions are categorized using tags, allowing users to browse questions by specific topics.
- **Real-time Chat Room:** Enables users to communicate and collaborate in real-time.
- **Sorting of Questions:** Users can sort questions based on criteria like votes, recency, and activity.
- **Ask a Question Page:** A dedicated page with a form for users to easily post new questions.
- **View Question Details:** A comprehensive page to display individual questions, along with their answers and comments.

## ChatRoom Feature

This application includes a real-time ChatRoom feature allowing users to join chat rooms and exchange messages instantly.
- Users can create new chat rooms by providing a room name.
- Users can join existing, publicly listed chat rooms.
- Messages sent within a room are broadcast in real-time to all other members of that specific room.
- The real-time communication is implemented using Socket.IO, with the backend managing room creation, message broadcasting, and user presence within rooms.

## Tech Stack

- **Frontend:** React (bootstrapped with [Create React App](https://github.com/facebook/create-react-app))
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Other:** 
    - Socket.IO (for real-time features like chat)
    - Redux (for state management in client)
    - Mongoose (ODM for MongoDB)
    - bcryptjs (for password hashing)



## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or newer recommended)
- [npm](https://www.npmjs.com/) (This project uses npm as the package manager. `package-lock.json` files are included.)

### Installation

Clone the repository:
```bash
git clone https://github.com/Arun-kushwaha007/Stack-Overflow-Clone.git
cd Stack-Overflow-Clone
```

#### 1. Install Client Dependencies

```bash
cd client
npm install
```

#### 2. Install Server Dependencies

```bash
cd ../server
npm install
```

### Configuration

**Server-Side:**

Create a `.env` file in the `server/` directory and add the following environment variables:

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret_key
```

- `PORT`: The port on which the backend server will run (e.g., 5000).
- `MONGODB_URL`: The connection URI for your MongoDB database.
- `JWT_SECRET`: A secret key used for signing and verifying JSON Web Tokens (JWTs) for authentication.

**Client-Side:**

The client-side API base URL is currently hardcoded in `client/src/api/index.js`. 

For better configurability, especially for different environments (development, production), it is recommended to use an environment variable. You can create a `.env` file in the `client/` directory and define `REACT_APP_API_URL`:
```env
REACT_APP_API_URL=http://localhost:5000 
```
And then update `client/src/api/index.js` to use `process.env.REACT_APP_API_URL`.
(Note: This change has not been implemented in the current codebase but is a recommended practice.)

### Running the App

#### 1. Start the Backend

```bash
cd server
npm start
```

#### 2. Start the Frontend

In a new terminal tab:
```bash
cd client
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Project Structure

```
/README.md          # This project documentation

/client             # React frontend application
  /public           # Static assets (index.html, favicon.ico, manifest.json)
  /src              # Client-side source code
    /action         # Redux action creators (auth, questions, users)
    /api            # API call configurations (axios instances, interceptors)
    /Assets         # Static assets like images and SVGs used by components
    /Component      # Reusable UI components
      /Avatar       # Avatar display component
      /ChatRoom     # Components related to the real-time chat feature
      /Homemainbar  # Main content area for questions
      /Leftsidebar  # Navigation sidebar on the left
      /Navbar       # Top navigation bar
      /Rightsidebar # Informational sidebar on the right
      /VideoPlayer  # Component for video playback (if any)
    /pages          # Top-level page components
      /Askquestion  # Page for users to post new questions
      /Auth         # Authentication pages (login, signup)
      /ChatRoom     # Page for real-time chat rooms
      /Home         # Main landing page displaying questions
      /Question     # Pages related to viewing and answering questions
      /Tags         # Page for browsing questions by tags
      /Userprofile  # User profile page
      /Users        # Page for listing and managing users
    /reducers       # Redux reducers for state management (auth, questions, users)
    App.js          # Main React application component
    index.js        # Entry point for the React application
  package.json      # Client-side dependencies and scripts
  # (other client configuration files like .gitignore)

/server             # Node.js/Express backend API
  /controller       # Request handlers for API endpoints (auth, questions, users, chat)
  /middleware       # Custom middleware (e.g., authentication checks)
  /models           # Mongoose schema definitions for MongoDB (Question, User, ChatRoom, Message)
  /routes           # API route definitions (maps URLs to controller functions)
  index.js          # Main entry point for the backend server
  .env              # Environment variable configuration (example: .env.example)
  package.json      # Server-side dependencies and scripts
  # (other server configuration files like .gitignore)
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Open a pull request

---



---

## Acknowledgements

- [Stack Overflow UI/UX inspiration](https://stackoverflow.com/)
- [Create React App](https://create-react-app.dev/)


---
