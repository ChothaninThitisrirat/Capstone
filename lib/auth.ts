import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { prismadb } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt',
      maxAge: 30 * 24 * 60 * 60, 
      updateAge: 30 * 24 * 60 * 60
    },
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email"},
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
              return null
            }
            
            const user = await prismadb.user.findUnique({           
                where: { email: credentials.email }         
            })
            if (!user) {
                throw new Error('Invalid email')
            }
            const matchpassword = await compare(credentials.password, user.password)

            if ( user && matchpassword ) {
              return {
                id: `${user.id}`,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin
              }
            } else {
              throw new Error('Invalid password')
            }
            
          }
        })
      ], 
      callbacks: {
        jwt: ({ token, user }) => {
          if (user) {
            return {
              username: user.username,
              id: user.id,
              isAdmin: user.isAdmin,
              ...token
            }
          }
          return token
        },
        session: ({ session, token }) => {
          return {
            ...session,
            user: {
              ...session.user,
              id: token.id,
              username: token.username,
              isAdmin: token.isAdmin
            }
          }
        },
        
      }

}