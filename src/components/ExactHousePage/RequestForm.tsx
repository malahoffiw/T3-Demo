import { ChangeEvent, useEffect, useRef, useState } from "react"
import { ISODateString } from "next-auth"
import { useRouter } from "next/router"
import styles from "../../styles"

type RequestFormProps = {
    createRequest: (userPhone: string, scheduledFor: ISODateString) => void
    mutationStatus: "error" | "idle" | "loading" | "success"
}

const RequestForm = ({ createRequest, mutationStatus }: RequestFormProps) => {
    const [phone, setPhone] = useState<string>("")
    const [scheduledFor, setScheduledFor] =
        useState<ISODateString>("2022-11-01T09:00")
    const { reload } = useRouter()
    const btnRef = useRef<HTMLButtonElement>(null)

    const handlePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value

        if (text.length === 3 || text.length === 7) {
            if (text.length > phone.length) setPhone(`${text}-`)
            else setPhone((prevState) => prevState.slice(0, -2))
        } else {
            setPhone(text)
        }
    }

    useEffect(() => {
        if (mutationStatus === "loading" && btnRef.current)
            btnRef.current.disabled = true
        if (mutationStatus === "success") {
            setPhone("")
            setScheduledFor("2022-11-01T09:00")
            reload()
        }
        if (mutationStatus === "error") throw new Error("MUTATION ERROR")
    }, [mutationStatus, reload])

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto w-64 items-center rounded bg-white py-14 text-center text-neutral-900 sm:w-96"
        >
            <h1 className="mb-8 text-2xl font-bold sm:text-3xl">
                Request a tour
            </h1>
            <form
                className="flex flex-col items-center gap-3"
                onSubmit={(event) => {
                    event.preventDefault()
                    createRequest(phone, scheduledFor)
                }}
            >
                <label htmlFor="phone">Your phone number</label>
                <input
                    className={`${styles.input} border border-neutral-900`}
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneInput}
                    placeholder="012-345-6789"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    maxLength={12}
                    required
                />
                <label htmlFor="date">Schedule tour for</label>
                <input
                    className={`${styles.input} border border-neutral-900`}
                    type="datetime-local"
                    id="date"
                    value={scheduledFor}
                    onChange={(e) => setScheduledFor(e.target.value)}
                    min="2022-11-01T09:00"
                    max="2023-03-31T20:00"
                    required
                />
                <button ref={btnRef} className={`${styles.btnBlack} mt-6`}>
                    Send request
                </button>
            </form>
        </div>
    )
}

export default RequestForm
