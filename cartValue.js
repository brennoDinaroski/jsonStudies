let cartTotalPriceSpace = document.querySelector('.cardCart__price')
console.log('cartTotalPriceSpace: ', cartTotalPriceSpace)
let cartTotalPrice = null

export function updateCartTotalPrice (existingItemsSelected) {

    existingItemsSelected.forEach( (item) => {
        cartTotalPrice = cartTotalPrice + item.price
    }) 
    cartTotalPriceSpace.innerHTML = `
    R$ ${cartTotalPrice}
`
}

