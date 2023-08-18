import { addItensToCart, dataListCart, transferProducts } from './cartScript.js'

const searchInput = document.querySelector("[data-input]")
const searchButton = document.querySelector("[data-search-button]")

let apiProductsArray = []


if (searchInput != null) {
    searchInput.addEventListener("input", (valueSearched) => {
        const searchInformation = valueSearched.target.value.toLowerCase()        

        searchButton.addEventListener("click", () =>

            apiProductsArray.forEach((product) => {
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
    try {
        const response = await fetch('https://dummyjson.com/products', {});

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();

        apiProductsArray = jsonData.products.map((item) => {
            return (functionCreateProduct(item, contentDiv))            
        });

        // Now apiProductsArray is fully populated
        return apiProductsArray;
    } catch (error) {
        console.log('ERROR Fetching data', error);
        return [];
    }
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

    addToCartButton(dataElement)

    return {
        id: item.id,
        title: item.title,
        brand: item.brand,
        image: item.image,
        price: item.price,
        description: item.description,
        element: dataElement
    }
}

export function addToCartButton(dataElement) {

    productContainer.addEventListener('click', (event) => {
        const cardElement = event.target.closest('.card')

        const clickedButton = event.target.closest('.button__addToCart');

        
        if (clickedButton) {
            event.preventDefault();

            const id = clickedButton.getAttribute('data-id')
            const existingIds = JSON.parse(localStorage.getItem('SelectedIds')) || []

            const idfromAdditionalInfoItem = cardElement.querySelector('.product__id').getAttribute('data-product-id')

            let additionalInfoItem = {
                id: cardElement.querySelector('.product__id').getAttribute('data-product-id'),
                brand: cardElement.querySelector('.product__brand').textContent,
                title: cardElement.querySelector('.product__title__anchor').textContent,
                imageSrc: cardElement.querySelector('.product__image').getAttribute('src'),
                price: cardElement.querySelector('.product__price').textContent,
                description: cardElement.querySelector('.product__description').textContent

            }

            if (!existingIds.includes(id)) {
                existingIds.push(id);
                localStorage.setItem('SelectedIds', JSON.stringify(existingIds));

                const idNumber = parseInt(id)

                existingItemsSelected.push(additionalInfoItem)
                console.log('existingItemsSelected 0: ', existingItemsSelected)
                localStorage.setItem('itemsSelected', JSON.stringify(existingItemsSelected))

                addItensToCart(existingIds, dataListCart, existingItemsSelected)
            }
        }
    })
}

let existingItemsSelected = JSON.parse(localStorage.getItem('itemsSelected')) || []
let additionalInfo = []
const productContainer = document.body

const eIds = (JSON.parse(localStorage.getItem('SelectedIds')) || [])

if (eIds != undefined) {
    addItensToCart(eIds, dataListCart, existingItemsSelected)
}

