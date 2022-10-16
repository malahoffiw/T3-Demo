import styles from "../../styles"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { trpc } from "../../utils/trpc"

const HouseToursRequested = ({ id }: { id: string }) => {
    const { data: tours, isLoading: isLoadingTours } =
        trpc.tourRequests.getHouseTourRequests.useQuery(id)

    if (isLoadingTours)
        return (
            <div className={`${styles.loader} mx-auto mt-4`}>
                <AiOutlineLoading3Quarters
                    className={`${styles.loaderLine} text-white`}
                />
            </div>
        )

    if (tours && tours.length > 0)
        return (
            <p className="mt-4 border-t pt-2">
                Tours requested for this house:{" "}
                <b className="text-lg">{tours.length}</b>
            </p>
        )

    return <p className="mt-4 border-t pt-2">No tours requested</p>
}

export default HouseToursRequested
