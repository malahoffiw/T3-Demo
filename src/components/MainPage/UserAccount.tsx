import Image from "next/image"
import { FaRegUser } from "react-icons/fa"
import { signOut } from "next-auth/react"
import styles from "../../styles"
import { Session } from "next-auth"

type UserAccountProps = {
    session: Session
}

const UserAccount = ({ session }: UserAccountProps) => {
    return (
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
            <button className={`${styles.btnLog}`} onClick={() => signOut()}>
                Logout
            </button>
        </section>
    )
}

export default UserAccount
