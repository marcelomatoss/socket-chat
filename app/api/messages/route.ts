import { NextResponse } from "next/server"
import { MOCK_MESSAGES } from "@/lib/mock-data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get("conversationId")

    if (!conversationId) {
      return new NextResponse("Conversation ID is required", { status: 400 })
    }

    // Filter messages by conversation ID
    const messages = MOCK_MESSAGES.filter((msg) => msg.conversationId === conversationId)

    return NextResponse.json({
      messages,
      nextCursor: null,
    })
  } catch (error) {
    console.error("[MESSAGES_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { content, conversationId } = body

    if (!content) {
      return new NextResponse("Content is required", { status: 400 })
    }

    if (!conversationId) {
      return new NextResponse("Conversation ID is required", { status: 400 })
    }

    // Create a mock message
    const message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: "user-1",
      senderName: "John Doe",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      content,
      timestamp: new Date(),
      status: "sent",
    }

    return NextResponse.json(message)
  } catch (error) {
    console.error("[MESSAGES_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
