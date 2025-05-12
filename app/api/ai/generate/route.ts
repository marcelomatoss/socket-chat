import { NextResponse } from "next/server"

// Mock AI generation function
async function mockGenerateText(prompt: string) {
  // List of possible AI responses
  const responses = [
    "I'm here to help! What would you like to discuss today?",
    "That's an interesting point. Let me add some thoughts on this topic.",
    "Based on the conversation, I think we should consider exploring this further.",
    "I can help with that! Here's what I suggest we do next.",
    "Let me summarize what's been discussed so far and add my perspective.",
    "Great question! Here's what I know about this subject.",
    "I've analyzed the conversation and have some insights to share.",
    "I think we're making good progress on this discussion.",
    "Have you considered approaching this problem from a different angle?",
    "Let me provide some additional context that might be helpful here.",
  ]

  // Return a random response
  return responses[Math.floor(Math.random() * responses.length)]
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { conversationId, prompt } = body

    if (!conversationId) {
      return new NextResponse("Conversation ID is required", { status: 400 })
    }

    // In development, use mock AI generation
    const aiResponse = await mockGenerateText(prompt || "")

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      message: {
        id: `ai-msg-${Date.now()}`,
        conversationId,
        senderId: "ai-assistant",
        senderName: "AI Assistant",
        senderAvatar: "/placeholder.svg?height=40&width=40",
        content: aiResponse,
        timestamp: new Date(),
        status: "delivered",
        isAI: true,
      },
      aiResponse,
    })
  } catch (error) {
    console.error("[AI_GENERATE_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
