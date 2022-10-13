const formatPrice = (price: string) => {
    return `$${price.slice(0, price.length - 3)},${price.slice(
        price.length - 3
    )}`
}

export default formatPrice
