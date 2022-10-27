import { Fragment } from "react"
import Link from "next/link"
import Image from "next/image"
import { House, UserTourSSR } from "../../types"
import CancelBtn from "./CancelBtn"

type RequestElementsProps = {
    requests: UserTourSSR[]
    houses: House[]
}

const RequestElements = ({ requests, houses }: RequestElementsProps) => {
    const housesMap = new Map<string, House>()
    houses.forEach((el) => {
        housesMap.set(el.id, el)
    })

    return (
        <div className="mt-6 grid grid-cols-1 items-center justify-items-center gap-5 2xl:grid-cols-3">
            {requests.map((el) => {
                const house = housesMap.get(el.houseId)
                if (!house) throw new Error(`HOUSE ${el.houseId} NOT FOUND`)

                return (
                    <Fragment key={el.id}>
                        <Link href={`/houses/${house.id}`}>
                            <a className="mt-8">
                                <Image
                                    src={`/images/${house.photo}`}
                                    alt="house"
                                    width={200}
                                    height={140}
                                    className="cursor-pointer rounded object-cover"
                                />
                            </a>
                        </Link>
                        <div className="text-center">
                            <b>{el.scheduledFor.slice(4, -37)}</b>
                            <p>at</p>
                            <b>{house.address}</b>
                        </div>
                        <CancelBtn requestId={el.id} />
                    </Fragment>
                )
            })}
        </div>
    )
}

export default RequestElements
