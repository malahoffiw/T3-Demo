export interface UserTour {
    id: string
    createdAt: Date
    userPhone: string
    scheduledFor: Date
    houseId: string
}

export interface House {
    id: string
    address: string
    area: string
    price: string
    photo: string
}

export interface Owner {
    owner: string
    phone: string
}
