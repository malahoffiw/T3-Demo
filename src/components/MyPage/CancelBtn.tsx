import { useEffect, useRef } from "react"
import { useRouter } from "next/router"
import styles from "../../styles"
import { trpc } from "../../utils/trpc"

type CancelBtnProps = {
    requestId?: string
}

const CancelBtn = ({ requestId }: CancelBtnProps) => {
    const btnRef = useRef<HTMLButtonElement>(null)
    const { reload } = useRouter()
    const { mutate: deleteOne, status: statusOne } =
        trpc.tourRequests.deleteTourRequest.useMutation()
    const { mutate: deleteAll, status: statusAll } =
        trpc.tourRequests.deleteAllRequests.useMutation()

    useEffect(() => {
        if (statusAll === "loading" && btnRef.current)
            btnRef.current.disabled = true
        if (statusAll === "success") reload()
        if (statusAll === "error") throw new Error("MUTATION ERROR")
    }, [reload, statusAll])

    useEffect(() => {
        if (statusOne === "loading" && btnRef.current)
            btnRef.current.disabled = true
        if (statusOne === "success") reload()
        if (statusOne === "error") throw new Error("MUTATION ERROR")
    }, [reload, statusOne])

    return (
        <button
            ref={btnRef}
            className={requestId ? styles.btnLogin : styles.btnBlack}
            onClick={() => {
                if (requestId) deleteOne(requestId)
                else deleteAll()
            }}
        >
            {requestId ? "Cancel" : "Cancel all"}
        </button>
    )
}

export default CancelBtn
