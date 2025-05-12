"use client"

import { useState } from "react"
import { Bot, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AIAssistantProps {
  onMessageSent: (message: string) => void
  conversationId: string
}

export function AIAssistant({ onMessageSent, conversationId }: AIAssistantProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleAskAI = async () => {
    setIsGenerating(true)

    try {
      // Call the mock AI endpoint
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate AI response")
      }

      const data = await response.json()

      // Send the AI response to the chat
      onMessageSent(data.aiResponse)

      toast({
        title: "AI Assistant activated",
        description: "The AI has responded to your conversation",
      })
    } catch (error) {
      console.error("Error generating AI response:", error)
      toast({
        variant: "destructive",
        title: "AI generation failed",
        description: "Could not generate an AI response. Please try again.",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex items-center gap-2 mb-4">
      <Avatar className="h-8 w-8 bg-primary/10">
        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
        <AvatarFallback>
          <Bot className="h-4 w-4 text-primary" />
        </AvatarFallback>
      </Avatar>
      <Button variant="outline" size="sm" onClick={handleAskAI} disabled={isGenerating} className="text-xs">
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
            AI is thinking...
          </>
        ) : (
          <>
            <Bot className="mr-2 h-3 w-3" />
            Ask AI Assistant
          </>
        )}
      </Button>
    </div>
  )
}
