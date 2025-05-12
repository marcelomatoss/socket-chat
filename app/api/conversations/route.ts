import { NextResponse } from "next/server"
import { MOCK_CONVERSATIONS } from "@/lib/mock-data"

export async function GET() {
  try {
    return NextResponse.json(MOCK_CONVERSATIONS)
  } catch (error) {
    console.error("[CONVERSATIONS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userIds, isGroup, name } = body

    if (!userIds || !userIds.length) {
      return new NextResponse("User IDs are required", { status: 400 })
    }

    // For group chats, name is required
    if (isGroup && !name) {
      return new NextResponse("Name is required for group chats", { status: 400 })
    }

    // Create a mock conversation
    const conversation = {
      id: `conv-${Date.now()}`,
      name: isGroup ? name : "New Conversation",
      type: isGroup ? "group" : "direct",
      lastMessage: "No messages yet",
      timestamp: new Date(),
      unread: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    }

    return NextResponse.json(conversation)
  } catch (error) {
    console.error("[CONVERSATIONS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
