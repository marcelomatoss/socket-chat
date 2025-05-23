// Mock data for development when no real database is available
export const MOCK_USER = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "/placeholder.svg?height=40&width=40",
}

export const MOCK_CONVERSATIONS = [
  {
    id: "conv-1",
    name: "Team Alpha",
    type: "group",
    lastMessage: "Let's discuss the new project",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    unread: 3,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "conv-2",
    name: "Jane Smith",
    type: "direct",
    lastMessage: "Can you send me the report?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "conv-3",
    name: "Marketing Team",
    type: "group",
    lastMessage: "Campaign stats are looking good!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "conv-4",
    name: "Alex Johnson",
    type: "direct",
    lastMessage: "Thanks for your help",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export const MOCK_MESSAGES = [
  {
    id: "msg-1",
    conversationId: "conv-1",
    senderId: "user-2",
    senderName: "Jane Smith",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "Hey team, how's the new project coming along?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    status: "read",
  },
  {
    id: "msg-2",
    conversationId: "conv-1",
    senderId: "user-3",
    senderName: "Alex Johnson",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "We're making good progress. The design phase is almost complete.",
    timestamp: new Date(Date.now() - 1000 * 60 * 55),
    status: "read",
  },
  {
    id: "msg-3",
    conversationId: "conv-1",
    senderId: "user-1",
    senderName: "John Doe",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "Great! I've been working on the backend architecture. Should be ready for integration by next week.",
    timestamp: new Date(Date.now() - 1000 * 60 * 50),
    status: "read",
  },
  {
    id: "msg-4",
    conversationId: "conv-1",
    senderId: "user-4",
    senderName: "Sarah Williams",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "I've prepared some documentation for the API endpoints. I'll share it with everyone later today.",
    timestamp: new Date(Date.now() - 1000 * 60 * 40),
    status: "read",
  },
  {
    id: "msg-5",
    conversationId: "conv-1",
    senderId: "user-2",
    senderName: "Jane Smith",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "Perfect! Let's schedule a meeting to discuss integration details.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: "read",
  },
  {
    id: "msg-6",
    conversationId: "conv-1",
    senderId: "user-3",
    senderName: "Alex Johnson",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "How about tomorrow at 2 PM?",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    status: "read",
  },
  {
    id: "msg-7",
    conversationId: "conv-1",
    senderId: "user-1",
    senderName: "John Doe",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "Works for me!",
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    status: "read",
  },
  {
    id: "msg-8",
    conversationId: "conv-1",
    senderId: "user-4",
    senderName: "Sarah Williams",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "I'll be there too. Should we invite the client as well?",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    status: "read",
  },
  {
    id: "msg-9",
    conversationId: "conv-1",
    senderId: "user-2",
    senderName: "Jane Smith",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "Let's have an internal meeting first, then schedule one with the client later in the week.",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    status: "read",
  },
  {
    id: "msg-10",
    conversationId: "conv-1",
    senderId: "user-3",
    senderName: "Alex Johnson",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "Sounds like a plan. I'll send out calendar invites shortly.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: "delivered",
  },
]
