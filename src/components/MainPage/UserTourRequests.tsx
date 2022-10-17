import { useEffect, useState } from "react"
import styles from "../../styles"
import { UserTour } from "../../types"
import { trpc } from "../../utils/trpc"

const UserTourRequests = () => {
    const [userTours, setUserTours] = useState<UserTour[]>([])
    const { data: tours } = trpc.tourRequests.getUserTourRequests.useQuery()

    useEffect(() => {
        if (tours) {
            setUserTours(tours)
        }
    }, [tours])

    return (
        <section
            className={`h-52 w-64 ${styles.blockWhite} col-span-2 sm:w-full`}
        >
            <p>You requested {userTours.length} tours</p>
        </section>
    )
}

export default UserTourRequests
