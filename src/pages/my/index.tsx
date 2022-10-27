import type { GetServerSideProps, NextPage } from "next"
import Image from "next/image"
import { signOut } from "next-auth/react"
import { FaRegUser } from "react-icons/fa"
import { prisma } from "../../server/db/client"
import { getServerAuthSession } from "../../server/common/get-server-auth-session"
import { House, User, UserTour, UserTourSSR } from "../../types"
import styles from "../../styles"
import RequestElements from "../../components/MyPage/RequestElements"
import CancelBtn from "../../components/MyPage/CancelBtn"

const MyPage: NextPage<{
    user: User
    requests: UserTourSSR[]
    houses: House[]
}> = ({ user, requests, houses }) => (
    <main className="container mx-auto my-32 flex w-4/5 grid-cols-2 grid-rows-[100px_1fr] flex-col gap-10 text-center md:grid 2xl:grid-cols-3">
        <div>
            <h1 className="mb-8 text-3xl">My profile</h1>
            <div className={`${styles.blockWhite} h-96 w-full`}>
                {user.image ? (
                    <Image
                        className="rounded"
                        src={user.image}
                        width={128}
                        height={128}
                        alt="user"
                    />
                ) : (
                    <FaRegUser className="h-32 w-32" />
                )}
                <b>{user.email}</b>
                <p>{user.name || "noname"}</p>
                <button
                    className={`${styles.btnLogin} mt-3`}
                    onClick={() => signOut()}
                >
                    Logout
                </button>
            </div>
        </div>
        <div className="2xl:col-span-2">
            <h1 className="mb-8 text-3xl">My requests</h1>
            <div className={`${styles.blockWhite} h-fit w-full py-10`}>
                <p>
                    You requested <b>{requests.length}</b> tour(s)
                </p>
                {requests.length > 1 && <CancelBtn />}
                <RequestElements requests={requests} houses={houses} />
            </div>
        </div>
    </main>
)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx)
    if (!session || !session.user)
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }

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
