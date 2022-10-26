export interface UserTour {
    id: string
    createdAt: Date | string
    userPhone: string
    scheduledFor: Date | string
    houseId: string
}

export interface UserTourSSR extends UserTour {
    createdAt: string
    scheduledFor: string
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

export interface User {
    name: string
    email: string
    image: string
}
