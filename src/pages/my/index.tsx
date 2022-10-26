import type { GetServerSideProps, NextPage } from "next"
import Image from "next/image"
import { FaRegUser } from "react-icons/fa"
import { prisma } from "../../server/db/client"
import { getServerAuthSession } from "../../server/common/get-server-auth-session"
import { House, User, UserTour, UserTourSSR } from "../../types"
import styles from "../../styles"
import Link from "next/link"

const MyPage: NextPage<{
    user: User
    requests: UserTourSSR[]
    houses: House[]
}> = ({ user, requests, houses }) => (
    <main className="container mx-auto my-32 flex flex-col items-center gap-10">
        <h1 className="text-3xl">My profile</h1>
        <div className={`${styles.blockWhite} h-52 w-2/5`}>
            {user.image ? (
                <Image src={user.image} width={56} height={56} alt="user" />
            ) : (
                <FaRegUser className="h-14 w-14" />
            )}
            <p>
                Email: <b>{user.email}</b>
            </p>
            <p>{user.name || "noname"}</p>
        </div>
        <div className={`${styles.blockWhite} h-fit w-2/5 py-10`}>
            <p>You requested {requests.length} tour(s)</p>
            <ul className="mt-6">{getRequestElements(requests, houses)}</ul>
        </div>
    </main>
)

const getRequestElements = (requests: UserTourSSR[], houses: House[]) => {
    return requests.map((el, i) => {
        return (
            <li className="flex items-center gap-7" key={el.id}>
                <Link href={`/houses/${houses[i]?.id}`}>
                    <Image
                        src={`/images/${houses[i]?.photo as string}`}
                        alt="house"
                        width={150}
                        height={100}
                        className="cursor-pointer rounded object-cover"
                    />
                </Link>
                <div className="text-center">
                    <b>{el.scheduledFor.slice(4, -37)}</b>
                    <p>at</p>
                    <b>{houses[i]?.address}</b>
                </div>
                <button className={styles.btnLogin}>Cancel</button>
            </li>
        )
    })
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx)
    if (!session || !session.user) throw new Error("SESSION NOT FOUND")

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        select: {
            name: true,
            image: true,
            email: true,
        },
    })

    const requests: UserTour[] = await prisma.tourRequests.findMany({
        where: {
            userId: session.user.id,
        },
        select: {
            id: true,
            scheduledFor: true,
            userPhone: true,
            houseId: true,
            createdAt: true,
        },
        orderBy: {
            scheduledFor: "desc",
        },
    })

    const houses: House[] = await prisma.houses.findMany({
        where: {
            id: {
                in: [...requests.map((req) => req.houseId)],
            },
        },
        select: {
            id: true,
            address: true,
            area: true,
            price: true,
            photo: true,
        },
    })

    requests.forEach((el) => {
        el.createdAt = el.createdAt.toString()
        el.scheduledFor = el.scheduledFor.toString()
    })

    return {
        props: {
            user,
            requests,
            houses,
        },
    }
}

export default MyPage
