import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""

    // Mock users data
    const users = [
      {
        id: "user-2",
        name: "Jane Smith",
        email: "jane@example.com",
        image: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "user-3",
        name: "Alex Johnson",
        email: "alex@example.com",
        image: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "user-4",
        name: "Sarah Williams",
        email: "sarah@example.com",
        image: "/placeholder.svg?height=40&width=40",
      },
    ]

    // Filter users by search query
    const filteredUsers = search
      ? users.filter(
          (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()),
        )
      : users

    return NextResponse.json(filteredUsers)
  } catch (error) {
    console.error("[USERS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
