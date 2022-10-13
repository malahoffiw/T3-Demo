import type { NextPage } from "next"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { trpc } from "../../utils/trpc"
import formatPrice from "../../utils/formatPrice"
import styles from "../../styles"

const HousePage: NextPage = () => {
    const router = useRouter()
    const id = router.query.id as string
    const { data: house, isLoading: isLoadingAll } =
        trpc.houses.getExact.useQuery(id)
    const { data: owner, isLoading: isLoadingInfo } =
        trpc.houses.getOwnerInfo.useQuery(id)

    if (isLoadingAll || isLoadingInfo)
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
        <main className="container my-32 flex justify-center gap-10">
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
                <button className={`${styles.btn} mt-10`}>
                    Request a tour
                </button>
            </section>
        </main>
    )
}

export default HousePage
