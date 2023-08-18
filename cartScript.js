export const dataListCart = document.querySelector('[data-list-cart]')
let cartImage = document.querySelector('.cart__image')
let closeShoppingCart = document.querySelector('.cardCart__closeShopping')
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

    console.log('existingItemsSelected: ', existingItemsSelected)

    existingItemsSelected.forEach((item) => {

        let id = item.id
        let brand = item.brand
        let title = item.title
        let price = item.price
        console.log('price typeof: ', typeof(price))
        let image = item.imageSrc
        const divElement = document.createElement('tr')
        divElement.classList.add("productItemCart")
        divElement.innerHTML = `        
            <tr>
                <td > <img class= 'productItemCart__image' src='${image}'> </td>
                <td class= 'productItemCart__brandAndTitle'>                           
                    <div class= 'productItemCart__brand'> ${brand} </div>              
                    <div class= 'productItemCart__title'> ${title} </div>              
                </td>
                <td class= 'productItemCart__price'> ${price} </td> 
            <tr>        
        `        
        dataListCart.appendChild(divElement)
    })
    return {        
    }
}