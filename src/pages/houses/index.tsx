import type { NextPage } from "next"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { trpc } from "../../utils/trpc"
import HouseInstance from "../../components/HouseInstance"
import styles from "../../styles"

const Index: NextPage = () => {
    const { data: houses, isLoading } = trpc.houses.getAll.useQuery()

    if (isLoading)
        return (
            <div className={`${styles.loader} my-32`}>
                <AiOutlineLoading3Quarters className={styles.loaderLine} />
            </div>
        )

    return (
        <main className="container my-32 flex justify-center">
            <ul className="grid w-2/3 grid-cols-3 gap-10">
                {houses?.map((house) => (
                    <HouseInstance
                        key={house.id}
                        id={house.id}
                        address={house.address}
                        area={house.area}
                        photo={house.photo}
                        price={house.price}
                    />
                ))}
            </ul>
        </main>
    )
}

export default Index
