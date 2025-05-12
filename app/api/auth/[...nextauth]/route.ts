import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

// Create a mock PrismaClient for development
const mockPrismaClient = {
  user: {
    findUnique: async () => ({
      id: "user-1",
      name: "John Doe",
      email: "john@example.com",
      hashedPassword: "$2a$12$K6vXNjmqmITKGwGGnUF5wuFJJgUB/F2Vpa9RdFAQQGZMhvNPGEi.y", // hashed 'password123'
      image: "/placeholder.svg?height=40&width=40",
    }),
  },
}

// Use real Prisma in production, mock in development
const prisma = process.env.NODE_ENV === "production" ? new PrismaClient() : (mockPrismaClient as any)

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "mock-github-id",
      clientSecret: process.env.GITHUB_SECRET || "mock-github-secret",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-google-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-google-secret",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        // In development, always return a mock user
        if (process.env.NODE_ENV !== "production") {
          return {
            id: "user-1",
            name: "John Doe",
            email: "john@example.com",
            image: "/placeholder.svg?height=40&width=40",
          }
        }

        // In production, this would validate credentials against the database
        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
