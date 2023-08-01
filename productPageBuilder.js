
document.addEventListener('DOMContentLoaded', () => {
    const productName = document.querySelector("#productName")
    const productDescription = document.querySelector("#productDescription")

    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get('id')
    console.log('productId: ', productId)

    apiConsumingProducts(productSpace)

    const productSpace = document.querySelector("[data-product-content]")
    const productContent = document.createElement('div')
    productContent.classList.add('product-content')
    productContent.innerHTML = `
    <div> Product Content </div> 
    <p> Product ID: ${productId}</p>     
    `
    productSpace.appendChild(productContent)
})

function apiConsumingProducts(contentDiv) {
    fetch('https://dummyjson.com/products', {})
        .then((response) => {
            if (!response.ok) {
                throw new Error('Newtwork response was not ok')
            }
            return response.json()
        })
        .then((jsonData) => {
            apiProductsArray = jsonData.products.map((item) =>
                createProductListItem(item, contentDiv) //Create a function to put the itens in the page and clean from the code above in 'inner.html' like de 'script.js' is
            );
        })
        .catch(error => console.log('ERROR Fetching data', error));
}
