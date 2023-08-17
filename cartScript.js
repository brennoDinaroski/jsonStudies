export const dataListCart = document.querySelector('[data-list-cart]')
let cartImage = document.querySelector('.cart__image')
let closeShoppingCart = document.querySelector('.closeShopping')
let body = document.querySelector('.card')

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

export function addItensToCart(existingIds, dataListCart, additionalInfo) {    
    dataListCart.innerHTML = ''    
    console.log('additionalInfo: ', additionalInfo)  

    const idsNumber = existingIds.map(str => parseInt(str, 10))    
    
    idsNumber.forEach((item) => {
        const divElement = document.createElement('div')
        divElement.classList.add("productItemCart")
        divElement.innerHTML = `
        <div> ${item} </div>     
        <div> ${additionalInfo} </div>          
        `        
        dataListCart.appendChild(divElement)
    })
    return {        
    }
}

