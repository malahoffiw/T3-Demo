import type { NextPage } from "next"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { BsFillHouseFill } from "react-icons/bs"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import styles from "../styles"
import UserTourRequests from "../components/MainPage/UserTourRequests"
import UserSignIn from "../components/MainPage/UserSignIn"
import UserAccount from "../components/MainPage/UserAccount"

const Home: NextPage = () => {
    const { data: session, status } = useSession()

    return (
        <main className="container mx-auto my-32 flex flex-col items-center gap-12 sm:grid sm:w-[560px] sm:grid-cols-2">
            <Link href="/houses">
                <section className={`h-52 w-64 ${styles.blockWhite}`}>
                    <BsFillHouseFill className="h-10 w-10" />
                    Houses catalog
                </section>
            </Link>

            {status === "loading" && (
                <section className={`h-52 w-64 ${styles.blockWhite}`}>
                    <div className={styles.loader}>
                        <AiOutlineLoading3Quarters
                            className={`${styles.loaderLine} text-neutral-900`}
                        />
                    </div>
                </section>
            )}
            {status === "unauthenticated" && <UserSignIn />}
            {status === "authenticated" && (
                <>
                    <UserAccount session={session} />
                    <UserTourRequests />
                </>
            )}
        </main>
    )
}

export default Home
