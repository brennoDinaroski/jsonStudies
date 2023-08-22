import { apiConsuming, addToCartButton, jsonDataFromLocalStorage } from "./script.js"
import { getJsonData } from "./jsonDataModule.js"

document.addEventListener('DOMContentLoaded', () => {
    const productSpace = document.querySelector("[data-product-content]")

    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get('id')
    const productsFromLocalStorage = jsonDataFromLocalStorage.products
    const selectedProductToBuild = productsFromLocalStorage[productId - 1]

    appendProductPage(selectedProductToBuild, productSpace)

    function appendProductPage(item, productSpace) {
        if (item.id == productId) {
            console.log('item: ', item)
            const productContent = document.createElement('div')
            const buttonAddToCart = document.createElement('button')

            getJsonData().then((jsonData) => {
                const productSelected = jsonData.products[item.id - 1]
                const productTitle = productSelected.title

                productContent.classList.add('product-content', 'cardSelected')

                buttonAddToCart.innerHTML = 'Add to Cart'
                buttonAddToCart.setAttribute('class', 'button__addToCart')
                buttonAddToCart.setAttribute('id', 'buttonContainer')
                buttonAddToCart.setAttribute('data-id', `${item.id}`)


                productContent.innerHTML = `  
                    <div class='ProductDescription'>              
                        
                        <div class='productPageImageDiv'>
                            <img class='productPage__image' src = "${item.images[0]}">                    
                        </div>

                        <div class='productPage__information'>
                            <div class='product__id' data-product-id="${item.id}"> ID: ${item.id} </div>
                            <header data-product-title class='product__title'> 
                                <a class="productPage__title__anchor" href="./productDetails.html?id=${item.id}"> ${item.title} </a> 
                            </header>
                            <div class='productPage__brand' > ${item.brand} </div>                    
                            <div class='productPage__price' > R$ ${item.price} </div>                       
                        </div>                
                    </div>
                    <div>
                        <div class='productPage__description' > ${item.description} </div>            
                    </div>
                    `
                productSpace.appendChild(productContent)

                productContent.appendChild(buttonAddToCart)

                addToCartButton(item)
            })

        } else { return }
    }
})

//code to use to get the jsonData from API wherever needed
/* getJsonData().then((jsonData) => {
    console.log('jsonData productBuilder: ', jsonData)
}) */