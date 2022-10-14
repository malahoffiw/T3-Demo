import styles from "../../styles"
import Link from "next/link"

const Verify = () => {
    return (
        <div className="container mx-auto my-32 flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold">Check your Email</h1>
            <p>A sign in link has been sent to your email address.</p>
            <p className="mb-8 font-bold text-red-600">
                The sent link can be used only once!
            </p>
            <Link href="/">
                <button className={styles.btn}>Return</button>
            </Link>
        </div>
    )
}

export default Verify
