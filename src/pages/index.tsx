import type { NextPage } from "next"
import Link from "next/link"
import Head from "next/head"
import Image from "next/image"
import { signIn, signOut, useSession } from "next-auth/react"
import { FaRegUser } from "react-icons/fa"
import { BsFillHouseFill } from "react-icons/bs"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import styles from "../styles"
import UserTourRequests from "../components/UserTourRequests"

const Home: NextPage = () => {
    const { data: session, status } = useSession()

    if (status === "loading")
        return (
            <main className={`${styles.loader} my-32`}>
                <AiOutlineLoading3Quarters className={styles.loaderLine} />
            </main>
        )

    return (
        <>
            <Head>
                <title>Shop</title>
                <meta
                    name="description"
                    content="Online shop template, created with t3 stack"
                />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <main className="container mx-auto my-32 flex justify-center gap-12">
                <Link href="/houses">
                    <section className={`h-52 w-64 ${styles.blockWhite}`}>
                        <BsFillHouseFill className="h-10 w-10" />
                        Houses catalog
                    </section>
                </Link>

                {session ? (
                    <>
                        <section className={`h-52 w-64 ${styles.blockWhite}`}>
                            {session.user?.image ? (
                                <Image
                                    src={session.user.image}
                                    alt="user"
                                    width={50}
                                    height={50}
                                />
                            ) : (
                                <FaRegUser className="h-10 w-10" />
                            )}
                            <p className="text-center">
                                Hello, {session.user?.name || "username"}
                            </p>
                            <button
                                className={`${styles.btnLog}`}
                                onClick={() => signOut()}
                            >
                                Logout
                            </button>
                        </section>
                        <UserTourRequests />
                    </>
                ) : (
                    <button
                        onClick={() => signIn()}
                        className={`h-52 w-64 ${styles.blockWhite}`}
                    >
                        <FaRegUser className="h-10 w-10" />
                        <p>Sign in</p>
                    </button>
                )}
            </main>
        </>
    )
}

export default Home
