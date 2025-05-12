# SocketChat - Real-Time Chat Application

SocketChat is a comprehensive real-time chat application built with modern web technologies. It provides a secure, scalable, and feature-rich platform for real-time communication.

![SocketChat Screenshot](https://via.placeholder.com/800x450.png?text=SocketChat+Screenshot)

## Features

### Core Features
- 🔐 **Secure Authentication**: OAuth2 integration with GitHub and Google, email/password authentication
- 💬 **Real-time Messaging**: Instant message delivery with WebSockets
- 👥 **Group Chats**: Create and manage group conversations
- 🔍 **Advanced Search**: Search through messages and users
- 📱 **Responsive Design**: Mobile-first approach for all devices
- 🌐 **Multi-language Support**: i18n integration for global users
- 🤖 **AI Assistant**: Integrated AI assistant to help with common tasks

### Technical Features
- 🔒 **Security**: Protection against SQL injections, XSS, and CSRF attacks
- 🚀 **Performance**: Multi-layer caching and optimized assets
- 🌙 **Dark Mode**: Toggle between light and dark themes
- ⌨️ **Typing Indicators**: Real-time typing notifications
- ✅ **Read Receipts**: Know when messages are delivered and read
- 📜 **Message History**: Paginated conversation history

## Quick Start with Docker

The easiest way to run SocketChat is using Docker Compose, which sets up all required services automatically.

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running the Application

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/socket-chat.git
   cd socket-chat
   \`\`\`

2. Start the application with Docker Compose:
   \`\`\`bash
   docker-compose up -d
   \`\`\`

3. Access the application at [http://localhost:3000](http://localhost:3000)

4. Use the following demo credentials to log in:
   - Email: john@example.com
   - Password: password123

5. To stop the application:
   \`\`\`bash
   docker-compose down
   \`\`\`

## Development Setup

If you prefer to run the application without Docker for development:

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/socket-chat.git
   cd socket-chat
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Access the application at [http://localhost:3000](http://localhost:3000)

## Demo Mode

The application runs in demo mode by default, which:
- Uses mock data instead of a real database
- Provides pre-filled login credentials
- Simulates real-time communication
- Includes a mock AI assistant

This allows you to explore all features without setting up external services.

## Project Structure

\`\`\`
socket-chat/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── chat/             # Chat interface
│   └── ...
├── components/           # React components
├── lib/                  # Utility functions
├── prisma/               # Database schema
├── public/               # Static assets
├── docker-compose.yml    # Docker Compose configuration
├── Dockerfile            # Docker configuration
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies
└── README.md             # Project documentation
\`\`\`

## Features Overview

### Authentication

The application supports multiple authentication methods:
- Email/password authentication
- OAuth2 with GitHub and Google (simulated in demo mode)

### Chat Interface

The chat interface includes:
- Real-time messaging (simulated in demo mode)
- Group and direct conversations
- Typing indicators
- Read receipts
- Message history

### AI Assistant

The AI assistant can:
- Generate responses based on conversation context
- Provide helpful information
- Answer questions

In demo mode, the AI assistant uses pre-defined responses.

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Next.js API Routes
- **Database**: PostgreSQL (simulated in demo mode)
- **Caching**: Redis (simulated in demo mode)
- **Real-time**: WebSockets (simulated in demo mode)
- **Containerization**: Docker, Docker Compose

## License

This project is licensed under the MIT License.
