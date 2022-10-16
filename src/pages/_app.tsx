// src/pages/_app.tsx
import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"
import type { AppType } from "next/app"
import { trpc } from "../utils/trpc"
import Header from "../components/Header"
import Head from "next/head"

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <SessionProvider session={session}>
            <Head>
                <title>T3 Demo</title>
                <meta
                    name="description"
                    content="Online shop template, created with t3 stack"
                />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <Header>
                <Component {...pageProps} />
            </Header>
        </SessionProvider>
    )
}

export default trpc.withTRPC(MyApp)
