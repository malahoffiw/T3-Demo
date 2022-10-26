import Image from "next/image"
import Link from "next/link"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import { FaRegUser } from "react-icons/fa"
import styles from "../../styles"

type UserAccountProps = {
    session: Session
}

const UserAccount = ({ session }: UserAccountProps) => {
    return (
        <Link href="/my">
            <section
                className={`h-52 w-64 ${styles.blockWhite} ${styles.transformScale}`}
            >
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
                    Hello, {session.user?.name || session.user?.email}
                </p>
                <button
                    className={`${styles.btnLogin}`}
                    onClick={() => signOut()}
                >
                    Logout
                </button>
            </section>
        </Link>
    )
}

export default UserAccount
