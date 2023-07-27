import { exportTest, value02 } from "./test.js";
export let apiProducts01 = 1

const searchInput = document.querySelector("[data-input]")

let apiProductsArray = []

searchInput.addEventListener("input", (e) => {
    const searchInformation = e.target.value.toLowerCase()  

    apiProductsArray.forEach(product => {        
        let isVisible = 
            product.title.toLowerCase().includes(searchInformation) 
            || product.brand.toLowerCase().includes(searchInformation)  
            
        console.log(product)        
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
                    <div class='product__id' > ID: ${item.id} </div>
                    <header class='product__title'> ${item.title} </header>
                    <div class='product__brand' > ${item.brand} </div>                    
                    <img class='product__image' src = "${item.images[0]}">                    
                    <div class='product__price' > R$ ${item.price} </div>
                    <div class='product__description' > ${item.description} </div>                                                          
                `;
                contentDiv.appendChild(dataElement)
                return {id: item.id, title: item.title, brand: item.brand, image: item.image, price: item.price, description: item.description, element: dataElement}
            });
        })
        .catch(error => console.log('ERROR Fetching data', error));
})