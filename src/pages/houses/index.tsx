import type { GetStaticProps, NextPage } from "next"
import { prisma } from "../../server/db/client"
import HouseInstance from "../../components/HousesPage/HouseInstance"
import { House } from "../../types"

const HousesPage: NextPage<{ data: House[] }> = ({ data: houses }) => {
    // const { data: houses, isLoading } = trpc.houses.getAll.useQuery()

    // if (isLoading)
    //     return (
    //         <div className={`${styles.loader} my-32`}>
    //             <AiOutlineLoading3Quarters
    //                 className={`${styles.loaderLine} text-white`}
    //             />
    //         </div>
    //     )

    return (
        <main className="container mx-auto my-32 flex justify-center">
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

export const getStaticProps: GetStaticProps = async () => {
    const DAY_IN_SECONDS = 60 * 60 * 24
    const data = await prisma.houses.findMany({
        select: {
            id: true,
            address: true,
            area: true,
            price: true,
            photo: true,
        },
    })

    return {
        props: {
            data,
        },
        revalidate: DAY_IN_SECONDS,
    }
}

export default HousesPage
