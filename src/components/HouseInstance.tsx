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
                        src={`https://images.unsplash.com/${photo}`}
                        alt="house"
                        width={650}
                        height={500}
                        className="cursor-pointer rounded object-cover"
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
