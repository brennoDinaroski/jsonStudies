import { handleCardClick } from './productPageBuilder.js'
export let apiProducts01 = 1

const searchInput = document.querySelector("[data-input]")

let dataProductTitle = []
let apiProductsArray = []


searchInput.addEventListener("input", (e) => {
    const searchInformation = e.target.value.toLowerCase()  

    apiProductsArray.forEach(product => {        
        let isVisible = 
            product.title.toLowerCase().includes(searchInformation) 
            || product.brand.toLowerCase().includes(searchInformation)  
            
        product.element.classList.toggle("hide", !isVisible)
    })
    
})

document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.querySelector('.content'); 

    fetch('https://dummyjson.com/products', {}) 
        .then((response) => { 
            if (!response.ok) { 
                throw new Error('Newtwork response was not ok')
            }
            return response.json() 
        })
        .then((jsonData) => { 
            
            const apiData = jsonData                       
            const apiProducts = apiData.products            

            apiProductsArray = jsonData.products.map((item) => { 
                const dataElement = document.createElement('div')
                dataElement.classList.add("card")                          
                dataElement.innerHTML = ` 
                    <div class='product__id' data-product-id="${item.id}"> ID: ${item.id} </div>
                    <header data-product-title class='product__title'> 
                        <a class="product__title__anchor" href="./productDetails.html"> ${item.title} </a> 
                    </header>
                    <div class='product__brand' > ${item.brand} </div>                    
                    <img class='product__image' src = "${item.images[0]}">                    
                    <div class='product__price' > R$ ${item.price} </div>
                    <div class='product__description' > ${item.description} </div>                                                          
                `;
                contentDiv.appendChild(dataElement)                           
                
                dataElement.addEventListener('click', handleCardClick)
                
                
                dataProductTitle = dataElement.querySelector("[data-product-title]")                

                return {id: item.id, title: item.title, brand: item.brand, image: item.image, price: item.price, description: item.description, element: dataElement}
            });
        })
        .catch(error => console.log('ERROR Fetching data', error));       
})
