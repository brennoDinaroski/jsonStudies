export const dataListCart = document.querySelector('[data-list-cart]')
let cartImage = document.querySelector('.cart__image')
let closeShoppingCart = document.querySelector('.closeShopping')
let body = document.querySelector('.cardCart')
let cartQuantity = document.querySelector('[data-cart-quantity]')

cartImage.addEventListener('click', () => {    
    body.classList.add('active')
    body.classList.remove('deactive');
})

closeShoppingCart.addEventListener('click', () => {    
    body.classList.add('deactive')
    body.classList.remove('active');
})

const productsObjects = []

export function transferProducts(item){
    productsObjects.push(item)    
}

export function addItensToCart(existingIds, dataListCart, existingItemsSelected) {    
    dataListCart.innerHTML = ''    

    const idsNumber = existingIds.map(str => parseInt(str, 10))

    existingItemsSelected.forEach((item) => {

        let id = item.id
        let brand = item.brand
        let title = item.title
        let price = item.price
        const divElement = document.createElement('div')
        divElement.classList.add("productItemCart")
        divElement.innerHTML = `
        <div> ${id} </div>              
        <div> ${brand} </div>              
        <div> ${title} </div>              
        <div> ${price} </div> 
        `        
        dataListCart.appendChild(divElement)
    })
    return {        
    }
}

