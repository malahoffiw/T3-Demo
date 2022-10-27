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
    <main className="container mx-auto my-32 flex w-4/5 grid-cols-2 flex-col gap-10 text-center md:grid 2xl:grid-cols-3">
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
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,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"
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
