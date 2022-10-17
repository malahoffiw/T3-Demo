import type { GetStaticProps, NextPage } from "next"
import { prisma } from "../../server/db/client"
import HouseInstance from "../../components/HousesPage/HouseInstance"
import { House } from "../../types"

const HousesPage: NextPage<{ data: House[] }> = ({ data: houses }) => (
    <main className="container mx-auto my-32 flex justify-center">
        <ul className="flex w-3/4 flex-col gap-10 md:grid md:grid-cols-2 xl:grid-cols-3">
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
