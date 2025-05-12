"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Send, Menu, Search, Settings, LogOut, User, Users, Bell, Moon, Sun, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTheme } from "next-themes"
import { ChatMessage } from "@/components/chat-message"
import { ChatSidebar } from "@/components/chat-sidebar"
import { AIAssistant } from "@/components/ai-assistant"
import { useMobile } from "@/hooks/use-mobile"
import { MOCK_USER, MOCK_CONVERSATIONS, MOCK_MESSAGES } from "@/lib/mock-data"

const formSchema = z.object({
  message: z.string().min(1, { message: "Message cannot be empty" }),
})

export default function ChatPage() {
  const [activeConversation, setActiveConversation] = useState(MOCK_CONVERSATIONS[0])
  const [messages, setMessages] = useState(MOCK_MESSAGES)
  const [isTyping, setIsTyping] = useState(false)
  const [typingUser, setTypingUser] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const isMobile = useMobile()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  })

  // Simulate socket connection
  useEffect(() => {
    const connectSocket = async () => {
      try {
        // For demo purposes, we'll simulate a connection delay
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsConnecting(false)

        toast({
          title: "Connected to chat server",
          description: "You can now send and receive messages",
        })
      } catch (error) {
        setIsConnecting(false)
        toast({
          variant: "destructive",
          title: "Connection failed",
          description: "Could not connect to the chat server. Please try again.",
        })
      }
    }

    connectSocket()
  }, [toast])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate typing indicator
  useEffect(() => {
    if (activeConversation.id === "conv-1") {
      const typingTimeout = setTimeout(() => {
        setIsTyping(true)
        setTypingUser("Jane Smith")

        setTimeout(() => {
          setIsTyping(false)
          setTypingUser("")
        }, 3000)
      }, 5000)

      return () => clearTimeout(typingTimeout)
    }
  }, [activeConversation.id, messages])

  const handleSendMessage = (values: z.infer<typeof formSchema>) => {
    const newMessage = {
      id: `msg-${messages.length + 1}`,
      conversationId: activeConversation.id,
      senderId: MOCK_USER.id,
      senderName: MOCK_USER.name,
      senderAvatar: MOCK_USER.avatar,
      content: values.message,
      timestamp: new Date(),
      status: "sent",
    }

    setMessages([...messages, newMessage])
    form.reset()

    // Simulate received message after a delay
    if (activeConversation.id === "conv-1") {
      setTimeout(() => {
        const responseMessage = {
          id: `msg-${messages.length + 2}`,
          conversationId: activeConversation.id,
          senderId: "user-2",
          senderName: "Jane Smith",
          senderAvatar: "/placeholder.svg?height=40&width=40",
          content: "Thanks for the update! Looking forward to our meeting.",
          timestamp: new Date(),
          status: "delivered",
        }

        setMessages((prev) => [...prev, responseMessage])
      }, 3000)
    }
  }

  const handleAIMessage = (aiMessage: string) => {
    const newMessage = {
      id: `msg-ai-${messages.length + 1}`,
      conversationId: activeConversation.id,
      senderId: "ai-assistant",
      senderName: "AI Assistant",
      senderAvatar: "/placeholder.svg?height=40&width=40",
      content: aiMessage,
      timestamp: new Date(),
      status: "delivered",
      isAI: true,
    }

    setMessages((prev) => [...prev, newMessage])
  }

  const handleLogout = () => {
    router.push("/login")
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  if (isConnecting) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg font-medium">Connecting to chat server...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Mobile sidebar */}
      <ChatSidebar
        user={MOCK_USER}
        conversations={MOCK_CONVERSATIONS}
        activeConversation={activeConversation}
        setActiveConversation={setActiveConversation}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
      />

      {/* Main chat area */}
      <div className="flex flex-1 flex-col">
        {/* Chat header */}
        <header className="flex h-16 items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-3">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            )}
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={activeConversation.avatar || "/placeholder.svg"} alt={activeConversation.name} />
                <AvatarFallback>{activeConversation.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{activeConversation.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {activeConversation.type === "group" ? "Group chat" : "Direct message"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search messages</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  Contacts
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Messages area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages
              .filter((msg) => msg.conversationId === activeConversation.id)
              .map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isOwnMessage={message.senderId === MOCK_USER.id}
                  isAI={message.isAI}
                />
              ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt={typingUser} />
                  <AvatarFallback>{typingUser.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1">
                  <span>{typingUser} is typing</span>
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* AI Assistant */}
        <div className="border-t px-4 pt-3">
          <AIAssistant onMessageSent={handleAIMessage} conversationId={activeConversation.id} />
        </div>

        {/* Message input */}
        <div className="border-t p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSendMessage)} className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Type a message..." {...field} className="rounded-full" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" size="icon" className="rounded-full">
                <Send className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
