import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    if (!name || !email || !password) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // In a real app, we would create a user in the database
    // For development, just return a mock user
    return NextResponse.json({
      id: "new-user-id",
      name,
      email,
    })
  } catch (error) {
    console.error("[REGISTER_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
