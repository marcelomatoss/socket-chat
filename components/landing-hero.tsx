import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LandingHero() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Connect in Real-Time with SocketChat
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              A secure, scalable, and feature-rich chat platform for teams and individuals. Experience seamless
              communication with advanced features.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
