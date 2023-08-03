function addProductToCart(productId) {
    console.log(productId)
}

document.querySelectorAll(".button__addToCart").forEach((button) => {
    console.log('button: ', button)
    button.addEventListener("click", () => {
        const productId = button.getAttribute("")
        addProductToCart(productId)
    })
})



