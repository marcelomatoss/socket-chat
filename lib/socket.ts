import type { Server as NetServer } from "http"
import type { NextApiRequest } from "next"
import { Server as SocketIOServer } from "socket.io"
import type { NextApiResponseServerIO } from "@/types/socket"

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function SocketHandler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    const httpServer: NetServer = res.socket.server as any
    const io = new SocketIOServer(httpServer, {
      path: "/api/socket",
      addTrailingSlash: false,
    })

    // Socket.IO event handlers
    io.on("connection", (socket) => {
      console.log(`Socket connected: ${socket.id}`)

      // Join a conversation room
      socket.on("join-conversation", (conversationId: string) => {
        socket.join(conversationId)
        console.log(`Socket ${socket.id} joined conversation: ${conversationId}`)
      })

      // Leave a conversation room
      socket.on("leave-conversation", (conversationId: string) => {
        socket.leave(conversationId)
        console.log(`Socket ${socket.id} left conversation: ${conversationId}`)
      })

      // Handle new message
      socket.on("new-message", (message: any) => {
        // Broadcast to all clients in the conversation except the sender
        socket.to(message.conversationId).emit("new-message", message)
      })

      // Handle typing indicator
      socket.on("typing", ({ conversationId, user }: { conversationId: string; user: any }) => {
        socket.to(conversationId).emit("typing", user)
      })

      // Handle stop typing
      socket.on("stop-typing", ({ conversationId, user }: { conversationId: string; user: any }) => {
        socket.to(conversationId).emit("stop-typing", user)
      })

      // Handle disconnect
      socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`)
      })
    })

    res.socket.server.io = io
  }

  res.end()
}
