import { addToCartClickListener } from "./cartScript.js"

const searchInput = document.querySelector("[data-input]")
const searchButton = document.querySelector("[data-search-button]")

let apiProductsArray = []
let addToCartButton = []

if (searchInput != null) {
    searchInput.addEventListener("input", (valueSearched) => {
        const searchInformation = valueSearched.target.value.toLowerCase()

        searchButton.addEventListener("click", () =>

            apiProductsArray.forEach(product => {
                let isVisible =
                    product.title.toLowerCase().includes(searchInformation)
                    || product.brand.toLowerCase().includes(searchInformation)

                product.element.classList.toggle("hide", !isVisible)
            })
        )

    })
} else { }



document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.querySelector('.content');

    apiConsuming(contentDiv, createProductListItem)
})

export async function apiConsuming(contentDiv, functionCreateProduct) {
    await fetch('https://dummyjson.com/products', {})
        .then((response) => {
            if (!response.ok) {
                throw new Error('Newtwork response was not ok')
            }
            return response.json()
        })
        .then((jsonData) => {
            apiProductsArray = jsonData.products.map((item) =>
                functionCreateProduct(item, contentDiv)
            );
        })
        .catch(error => console.log('ERROR Fetching data', error));
    return apiProductsArray;
}

function createProductListItem(item, contentDiv) {
    const dataElement = document.createElement('div')
    const link = document.createElement('a')
    const buttonAddToCart = document.createElement('button')

    buttonAddToCart.innerHTML = 'Add to Cart'
    buttonAddToCart.setAttribute('class', 'button__addToCart')
    buttonAddToCart.setAttribute('id', 'buttonContainer')
    buttonAddToCart.setAttribute('data-id', `${item.id}`)

    link.href = `./productDetails.html?id=${item.id}`
    link.textContent = item.title

    dataElement.appendChild(link)
    dataElement.classList.add("card")
    dataElement.innerHTML = ` 
            <div class='product__id' data-product-id="${item.id}"> ID: ${item.id} </div>
            <header data-product-title class='product__title'> 
                <a class="product__title__anchor" href="./productDetails.html?id=${item.id}"> 
                    ${item.title} 
                </a> 
            </header>
            <div class='product__brand' > ${item.brand} </div>                    
            <img class='product__image' src = "${item.images[0]}">                    
            <div class='product__price' > R$ ${item.price} </div>
            <div class='product__description' > ${item.description} </div>            
        `;

    contentDiv.appendChild(dataElement)

    dataElement.appendChild(buttonAddToCart)

    dataElement.addEventListener('click', (event) => {
        const clickedButton = event.target.closest('.button__addToCart');
        
        if (clickedButton) {
            event.preventDefault();
            const id = clickedButton.getAttribute('data-id');
            const existingIds = JSON.parse(localStorage.getItem('SelectedIds')) || [];
            existingIds.push(id);
            localStorage.setItem('SelectedIds', JSON.stringify(existingIds));
            console.log('button clicked: ', id);
        }
    })

return {
    id: item.id,
    title: item.title,
    brand: item.brand,
    image: item.image,
    price: item.price,
    description: item.description,
    element: dataElement
}
};

