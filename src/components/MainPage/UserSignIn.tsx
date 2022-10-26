import { signIn } from "next-auth/react"
import styles from "../../styles"
import { FaRegUser } from "react-icons/fa"

import React from "react"

const UserSignIn = () => {
    return (
        <button
            onClick={() => signIn()}
            className={`h-52 w-64 ${styles.blockWhite} ${styles.transformScale}`}
        >
            <FaRegUser className="h-10 w-10" />
            <p>Sign in</p>
        </button>
    )
}

export default UserSignIn
