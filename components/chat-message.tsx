import { format } from "date-fns"
import { Bot } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: Date
  status: "sent" | "delivered" | "read"
  isAI?: boolean
}

interface ChatMessageProps {
  message: Message
  isOwnMessage: boolean
  isAI?: boolean
}

export function ChatMessage({ message, isOwnMessage, isAI }: ChatMessageProps) {
  return (
    <div className={cn("flex gap-3", isOwnMessage ? "flex-row-reverse" : "flex-row")}>
      {!isOwnMessage && (
        <Avatar className={cn("h-8 w-8", isAI && "bg-primary/10")}>
          {isAI ? (
            <>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
              <AvatarFallback>
                <Bot className="h-4 w-4 text-primary" />
              </AvatarFallback>
            </>
          ) : (
            <>
              <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.senderName} />
              <AvatarFallback>{message.senderName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </>
          )}
        </Avatar>
      )}
      <div className={cn("flex max-w-[75%] flex-col", isOwnMessage ? "items-end" : "items-start")}>
        {!isOwnMessage && <span className="text-xs font-medium">{isAI ? "AI Assistant" : message.senderName}</span>}
        <div
          className={cn(
            "rounded-lg px-3 py-2",
            isOwnMessage
              ? "bg-primary text-primary-foreground"
              : isAI
                ? "bg-primary/10 text-foreground border border-primary/20"
                : "bg-muted text-foreground",
          )}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>{format(message.timestamp, "h:mm a")}</span>
          {isOwnMessage && (
            <span>
              {message.status === "read" && "✓✓"}
              {message.status === "delivered" && "✓✓"}
              {message.status === "sent" && "✓"}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
