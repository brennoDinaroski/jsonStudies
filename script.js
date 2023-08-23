import { addItensToCart, dataListCart, transferProducts, updateCartItems } from './cartScript.js'
import { setJsonData, getJsonData } from './jsonDataModule.js'

const searchInput = document.querySelector("[data-input]")
const searchButton = document.querySelector("[data-search-button]")
export let existingItemsSelected = JSON.parse(localStorage.getItem('itemsSelected')) || []
/* export const jsonDataFromLocalStorage = JSON.parse(localStorage.getItem('jsonData')) || []
const productsFromLocalStorage = jsonDataFromLocalStorage.products
console.log('productsFromLocalStorage: ', productsFromLocalStorage) */

let additionalInfo = []
const productContainer = document.body

const eIds = (JSON.parse(localStorage.getItem('SelectedIds')) || [])

if (eIds != undefined) {
    addItensToCart(eIds, dataListCart, existingItemsSelected)
}


let apiProductsArray = []

if (searchInput != null) {
    searchInput.addEventListener("input", (valueSearched) => {
        const searchInformation = valueSearched.target.value.toLowerCase()

        // to activate the 'search' button
        /* searchButton.addEventListener("click", () => */
        apiProductsArray.forEach((product) => {
            let isVisible =
                product.title.toLowerCase().includes(searchInformation)
                || product.brand.toLowerCase().includes(searchInformation)
            product.element.classList.toggle("hide", !isVisible)
        })
        /* ) */
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
        
        localStorage.setItem('jsonData', JSON.stringify(jsonData));

        setJsonData(jsonData)

        apiProductsArray = jsonData.products.map((item) => {
            return (functionCreateProduct(item, contentDiv))
        });

        // Now apiProductsArray is fully populated
        return apiProductsArray, jsonData;

    } catch (error) {
        console.log('ERROR Fetching data', error);
        return [];
    }
}

async function createProductListItem(item, contentDiv) {
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
    dataElement.classList.add("card", "cardSelected")
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

    /* addToCartButton(dataElement) */
    
    /* selectedCard() */

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

productContainer.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.button__addToCart');
    const clickedTitle = event.target.closest('.product__title__anchor')
    
    if (clickedButton){
        selectedCard(event)
    }
    if (clickedTitle){
        
    }
})

function selectedCard (event) {
    let fromLocalStorage = getJsonData()
    console.log('fromLocalStorage: ', fromLocalStorage)
    let productsFromLocalStorage = fromLocalStorage.products
    console.log('productsFromLocalStorage: ', productsFromLocalStorage)

    /* productContainer.addEventListener('click', (event) => { */
        
        const cardElement = event.target.closest('.cardSelected')
        const cardElementId = parseInt(cardElement.querySelector('[data-id]').getAttribute('data-id'))
        const cardArrayPosition = cardElementId - 1
        
        console.log('cardElementId: ', cardElementId)
        console.log('productsFromLocalStorage: ', productsFromLocalStorage[cardArrayPosition])
        
        const selectedProductToBuild = productsFromLocalStorage[cardArrayPosition]
        console.log('selectedProductToBuild: ', selectedProductToBuild)

        addToCartButtonFromMainPage(selectedProductToBuild, cardElementId, event )
    /* }) */
}

function addToCartButtonFromMainPage(item, cardElementId, event) {
    console.log('addToCartButtonFromMainPage being executed')
    console.log('BEFORE "if" being executed: ',(item.id), ' ', (cardElementId + 1 ) )

    /* productContainer.addEventListener('click', (event) => {   */

       /*  if ((item.id) === (cardElementId + 1)) { */
            console.log('if being executed: ', (item.id), ' ', cardElementId)

            const clickedButton = event.target.closest('.button__addToCart');

            /* if (clickedButton) { */
                event.preventDefault();

                const id = clickedButton.getAttribute('data-id')
                const existingIds = JSON.parse(localStorage.getItem('SelectedIds')) || []

                let additionalInfoItem = {
                    id: item.id,
                    brand: item.brand,
                    title: item.title,
                    imageSrc: item.images[0],
                    price: item.price,
                    description: item.description
                }

                if (!existingIds.includes(id)) {
                    existingIds.push(id);
                    localStorage.setItem('SelectedIds', JSON.stringify(existingIds));

                    const idNumber = parseInt(id)

                    existingItemsSelected.push(additionalInfoItem)
                    updateCartItems()
                    localStorage.setItem('itemsSelected', JSON.stringify(existingItemsSelected))

                    addItensToCart(existingIds, dataListCart, existingItemsSelected)
                }
            /* } */
        /* } */
    /* }) */
}


export function addToCartButton(item) {

    productContainer.addEventListener('click', (event) => {
        console.log('selectedProductToBuild into function addToCartButton: ', item)

        const cardElement = event.target.closest('.cardSelected')
        const cardElementId = parseInt(cardElement.querySelector('[data-id]').getAttribute('data-id'))

        console.log('item on addToCartButton: ', item)
        console.log('cardElementId selected: ', typeof (cardElementId), ' ', cardElementId )

        if (item.id == cardElementId) {

            const clickedButton = event.target.closest('.button__addToCart');

            if (clickedButton) {
                event.preventDefault();

                const id = clickedButton.getAttribute('data-id')
                const existingIds = JSON.parse(localStorage.getItem('SelectedIds')) || []

                let additionalInfoItem = {
                    id: item.id,
                    brand: item.brand,
                    title: item.title,
                    imageSrc: item.images[0],
                    price: item.price,
                    description: item.description
                }

                if (!existingIds.includes(id)) {
                    existingIds.push(id);
                    localStorage.setItem('SelectedIds', JSON.stringify(existingIds));

                    const idNumber = parseInt(id)

                    existingItemsSelected.push(additionalInfoItem)
                    updateCartItems()
                    localStorage.setItem('itemsSelected', JSON.stringify(existingItemsSelected))

                    addItensToCart(existingIds, dataListCart, existingItemsSelected)
                }
            }
        }
    })
}



