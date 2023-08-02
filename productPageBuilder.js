import { apiConsuming } from "./script.js"

document.addEventListener('DOMContentLoaded', () => {
    const productSpace = document.querySelector("[data-product-content]")   
    
    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get('id')
    console.log('productId: ', productId)

    apiConsuming(productSpace, appendProductPage)    

    function appendProductPage(item, productSpace) {        
        if(item.id == productId) {
            const productContent = document.createElement('div')
            productContent.classList.add('product-content')
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
                    <button class='productPage__buyButton' > BUY </button>                 
                </div>                
            </div>
            <div>
                <div class='productPage__description' > ${item.description} </div>            
            </div>
                `
            productSpace.appendChild(productContent)
        } else {return }
    }
})

