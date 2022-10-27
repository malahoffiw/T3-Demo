import { useRef } from "react"
import type { GetStaticPropsContext, NextPage } from "next"
import { useRouter } from "next/router"
import Image from "next/image"
import { ISODateString } from "next-auth"
import { signIn, useSession } from "next-auth/react"
import { trpc } from "../../utils/trpc"
import { prisma } from "../../server/db/client"
import formatPrice from "../../utils/formatPrice"
import styles from "../../styles"
import { House, Owner } from "../../types"
import RequestForm from "../../components/ExactHousePage/RequestForm"
import HouseToursRequested from "../../components/ExactHousePage/HouseToursRequested"

type HousePageProps = {
    house: House
    owner: Owner
}

const HousePage: NextPage<HousePageProps> = ({ house, owner }) => {
    const router = useRouter()
    const tourRequest = trpc.tourRequests.createTourRequest.useMutation()
    const createRequest = (userPhone: string, scheduledFor: ISODateString) => {
        tourRequest.mutate({
            userPhone,
            scheduledFor: new Date(scheduledFor),
            houseId: house.id,
        })
    }

    const formRef = useRef<HTMLFormElement>(null)
    const { data: session } = useSession()

    const openForm = () => {
        if (session) {
            formRef.current && formRef.current.classList.remove("hidden")
        } else signIn()
    }

    const closeForm = () => {
        formRef.current && formRef.current.classList.add("hidden")
    }

    return (
        <main className="container mx-auto my-32 flex w-4/5 flex-col gap-10 text-sm sm:w-[550px] sm:text-base lg:w-max lg:flex-row">
            <section className="flex  flex-col gap-10 ">
                <button
                    className={`${styles.btn}`}
                    onClick={() => router.back()}
                >
                    Back
                </button>
                <Image
                    src={`/images/${house.photo}`}
                    alt="house"
                    width={550}
                    height={350}
                    className="rounded object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,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"
                />
            </section>
            <section className="flex min-h-full flex-col justify-center gap-2">
                <span className="flex items-baseline">
                    <h1 className="text-3xl font-bold sm:text-4xl">
                        {formatPrice(house.price)}
                    </h1>
                    <h3 className="ml-4 mr-1 font-bold">{house.area}</h3>
                    <p>sqft</p>
                </span>
                <p>{house.address}</p>
                <span className="flex h-16 flex-col justify-center gap-1 border-l-2 pl-4">
                    <p>Contact agent:</p>
                    <b>
                        +1{owner.phone} - {owner.owner}
                    </b>
                </span>
                <button className={`${styles.btn} mt-10`} onClick={openForm}>
                    Request a tour
                </button>
                <HouseToursRequested id={house.id} />
            </section>
            <section
                ref={formRef}
                onClick={closeForm}
                className="fixed top-0 left-0 hidden min-h-full min-w-full bg-[#000000bb] py-40"
            >
                <RequestForm createRequest={createRequest} />
            </section>
        </main>
    )
}

export const getStaticPaths = async () => {
    const houses = await prisma.houses.findMany({ select: { id: true } })

    const paths = houses.map((house) => ({
        params: { id: house.id },
    }))

    return { paths, fallback: false }
}

export const getStaticProps = async ({
    params,
}: GetStaticPropsContext<{ id: string }>) => {
    const DAY_IN_SECONDS = 60 * 60 * 24
    const houseId = params?.id
    const house = await prisma.houses.findUnique({
        where: {
            id: houseId,
        },
        select: {
            id: true,
            address: true,
            area: true,
            price: true,
            photo: true,
        },
    })
    const owner = await prisma.houses.findUnique({
        where: {
            id: houseId,
        },
        select: {
            owner: true,
            phone: true,
        },
    })

    return {
        props: {
            house,
            owner,
        },
        revalidate: DAY_IN_SECONDS,
    }
}

export default HousePage
