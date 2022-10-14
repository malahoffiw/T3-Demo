import { useRef } from "react"
import type { NextPage } from "next"
import { ISODateString } from "next-auth"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { trpc } from "../../utils/trpc"
import formatPrice from "../../utils/formatPrice"
import styles from "../../styles"
import RequestForm from "../../components/RequestForm"

const HousePage: NextPage = () => {
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)
    const tourRequest = trpc.tourRequests.createTourRequest.useMutation()
    const id = router.query.id as string
    const { data: house, isLoading: isLoadingAll } =
        trpc.houses.getExact.useQuery(id)
    const { data: owner, isLoading: isLoadingInfo } =
        trpc.houses.getOwnerInfo.useQuery(id)
    const { data: tours, isLoading: isLoadingTours } =
        trpc.tourRequests.getHouseTourRequests.useQuery(id)

    const createRequest = (userPhone: string, scheduledFor: ISODateString) => {
        tourRequest.mutate({
            userPhone,
            scheduledFor: new Date(scheduledFor),
            houseId: id,
        })
    }

    const openForm = () => {
        formRef.current && formRef.current.classList.remove("hidden")
    }
    const closeForm = () => {
        formRef.current && formRef.current.classList.add("hidden")
    }

    if (isLoadingAll || isLoadingInfo || isLoadingTours)
        return (
            <div className={`${styles.loader} my-32`}>
                <AiOutlineLoading3Quarters className={styles.loaderLine} />
            </div>
        )

    if (!house || !owner) {
        return (
            <p className="my-32 text-center text-xl font-bold">
                Error: ! No data fetched !
            </p>
        )
    }

    return (
        <main className="container mx-auto my-32 flex justify-center gap-10">
            <section className="flex flex-col gap-10">
                <Link href="/houses">
                    <button className={`${styles.btn}`}>Back to catalog</button>
                </Link>
                <Image
                    src={`https://images.unsplash.com/${house.photo}`}
                    alt="house"
                    width={550}
                    height={350}
                    className="cursor-pointer rounded object-cover"
                />
            </section>
            <section className="flex min-h-full flex-col justify-center gap-2">
                <span className="flex items-baseline">
                    <h1 className="text-4xl font-bold">
                        {formatPrice(house.price)}
                    </h1>
                    <h3 className="ml-4 mr-1 font-bold">{house.area}</h3>
                    <p>sqft</p>
                </span>
                <p>{house.address}</p>
                <span className="flex h-10 items-center gap-1 border-l-2 pl-4">
                    <p>Contact agent:</p>
                    <b>+1{owner.phone}</b>
                    <p>- {owner.owner}</p>
                </span>
                <button className={`${styles.btn} mt-10`} onClick={openForm}>
                    Request a tour
                </button>
                {tours && tours.length > 0 ? (
                    <p className="mt-4 border-t pt-2">
                        Tours requested for this house:{" "}
                        <b className="text-lg">{tours.length}</b>
                    </p>
                ) : (
                    <p>No tours requested</p>
                )}
            </section>
            <section
                ref={formRef}
                onClick={closeForm}
                className="absolute top-0 left-0 hidden min-h-screen min-w-full bg-[#000000bb] py-40"
            >
                <RequestForm createRequest={createRequest} />
            </section>
        </main>
    )
}

export default HousePage
