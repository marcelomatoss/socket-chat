import { ShieldCheck, Zap, Globe, Search, Moon, Users, Lock, MessageSquare } from "lucide-react"

export function LandingFeatures() {
  const features = [
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Real-Time Messaging",
      description: "Instant message delivery with typing indicators and read receipts.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "Secure Authentication",
      description: "OAuth2 integration with two-factor authentication for enhanced security.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "High Performance",
      description: "Multi-layer caching and optimized assets for lightning-fast experience.",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Multi-Language Support",
      description: "Chat in your preferred language with built-in i18n capabilities.",
    },
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Advanced Search",
      description: "Quickly find messages and users with powerful search functionality.",
    },
    {
      icon: <Moon className="h-10 w-10 text-primary" />,
      title: "Dark Mode",
      description: "Easy on the eyes with automatic or manual dark mode switching.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Group Chats",
      description: "Create and manage group conversations with multiple participants.",
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "End-to-End Encryption",
      description: "Your conversations remain private with robust encryption.",
    },
  ]

  return (
    <section className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Powerful Features</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Everything you need for seamless communication in one platform
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 md:gap-12 lg:gap-16 mt-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background">
                {feature.icon}
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
