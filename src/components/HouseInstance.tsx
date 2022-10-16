import Image from "next/image"
import Link from "next/link"
import formatPrice from "../utils/formatPrice"

type HouseInstanceProps = {
    id: string
    address: string
    area: string
    photo: string
    price: string
}

const HouseInstance = ({
    address,
    area,
    photo,
    price,
    id,
}: HouseInstanceProps) => {
    return (
        <li>
            <Link href={`/houses/${id}`}>
                <div className="transition-transform hover:scale-105">
                    <Image
                        src={`/images/${photo}`}
                        alt="house"
                        width={650}
                        height={500}
                        className="cursor-pointer rounded object-cover"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,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"
                    />
                </div>
            </Link>
            <h3 className="text-xl font-bold">{formatPrice(price)}</h3>
            <p className="text-sm">{area} sqft</p>
            <p className="text-sm">{address}</p>
        </li>
    )
}

export default HouseInstance
