import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    username: string
    isAdmin: boolean
   }
  interface Session {
    user: User & {
        username: string
        id: number
    }
    token: {
        username: string
        id: number
    }
  }
}