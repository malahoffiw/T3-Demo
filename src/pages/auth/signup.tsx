import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import styles from "../../styles"
import { trpc } from "../../utils/trpc"

const Signup = () => {
    const btnRef = useRef<HTMLButtonElement>(null)
    const [name, setName] = useState<string>("")
    const { push } = useRouter()
    const { mutate, status } = trpc.user.updateUserName.useMutation()

    useEffect(() => {
        if (status === "loading" && btnRef.current)
            btnRef.current.disabled = true
        if (status === "success") {
            setName("")
            push("/")
        }
        if (status === "error") throw new Error("MUTATION ERROR")
    }, [push, status])

    return (
        <div className="container mx-auto my-32 flex w-4/5 flex-col items-center gap-5 text-center">
            <h1 className="text-2xl font-bold">Sign up</h1>
            <p>Enter your nickname</p>
            <form
                className="flex flex-col gap-1"
                onSubmit={(e) => {
                    e.preventDefault()
                    mutate(name)
                }}
            >
                <input
                    className={styles.input}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Steve"
                    pattern="[A-Za-z0-9]{1,20}"
                    required
                    maxLength={20}
                />
                <small className="mb-4">
                    Latin letters and numbers are allowed
                </small>
                <button ref={btnRef} className={styles.btn} type="submit">
                    Sign up
                </button>
            </form>
        </div>
    )
}

export default Signup
