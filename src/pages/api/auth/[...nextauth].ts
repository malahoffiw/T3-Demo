import NextAuth, { type NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "../../../server/db/client"
import { env } from "../../../env/server.mjs"

export const authOptions: NextAuthOptions = {
    pages: {
        // todo
        // signIn: "/auth/signin",
        verifyRequest: "/auth/verify",
        // newUser: "/auth/signup",
    },
    // Include user.id on session
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                session.user.id = user.id
            }
            return session
        },
    },

    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            server: {
                host: env.EMAIL_SERVER_HOST,
                port: env.EMAIL_SERVER_PORT,
                secure: true,
                auth: {
                    user: env.EMAIL_SERVER_USER,
                    pass: env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: env.EMAIL_FROM,
        }),
        GithubProvider({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        }),
        // ...add more providers here
    ],
}

export default NextAuth(authOptions)
