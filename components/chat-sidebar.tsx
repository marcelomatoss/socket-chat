"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Search, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface User {
  id: string
  name: string
  email: string
  avatar: string
}

interface Conversation {
  id: string
  name: string
  type: "direct" | "group"
  lastMessage: string
  timestamp: Date
  unread: number
  avatar: string
}

interface ChatSidebarProps {
  user: User
  conversations: Conversation[]
  activeConversation: Conversation
  setActiveConversation: (conversation: Conversation) => void
  isOpen: boolean
  onClose: () => void
  isMobile: boolean
}

export function ChatSidebar({
  user,
  conversations,
  activeConversation,
  setActiveConversation,
  isOpen,
  onClose,
  isMobile,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleConversationClick = (conversation: Conversation) => {
    setActiveConversation(conversation)
    if (isMobile) {
      onClose()
    }
  }

  if (isMobile) {
    return (
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 transform bg-background transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="space-y-1 p-2">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left",
                    activeConversation.id === conversation.id ? "bg-accent" : "hover:bg-muted",
                  )}
                  onClick={() => handleConversationClick(conversation)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                      <AvatarFallback>{conversation.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {conversation.unread > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{conversation.name}</h3>
                      <span className="text-xs text-muted-foreground">{format(conversation.timestamp, "h:mm a")}</span>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">{conversation.lastMessage}</p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    )
  }

  return (
    <div className="hidden w-80 border-r md:flex md:flex-col">
      <div className="flex h-16 items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{user.name}</h2>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search conversations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left",
                activeConversation.id === conversation.id ? "bg-accent" : "hover:bg-muted",
              )}
              onClick={() => handleConversationClick(conversation)}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                  <AvatarFallback>{conversation.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                {conversation.unread > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {conversation.unread}
                  </span>
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{conversation.name}</h3>
                  <span className="text-xs text-muted-foreground">{format(conversation.timestamp, "h:mm a")}</span>
                </div>
                <p className="truncate text-sm text-muted-foreground">{conversation.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
