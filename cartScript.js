let cartImage = document.querySelector('.cart__image')
let closeShoppingCart = document.querySelector('.closeShopping')
let body = document.querySelector('.card')

cartImage.addEventListener('click', () => {
    console.log("cartImage clicked")
    body.classList.add('active')
    body.classList.remove('deactive');
})

closeShoppingCart.addEventListener('click', () => {
    console.log("closeShoppingCart clicked");
    body.classList.add('deactive')
    body.classList.remove('active');
})



/* if (typeof Storage !== "undefined") {
    let myArray = JSON.parse(localStorage.getItem("SelectedIds")) || []
    
    const handleArrayChange = (newArray) => {
        myArray = newArray
        console.log("localStorage array: ", myArray)
    }
    
    
    window.addEventListener("storage", (event) => {
        if (event.key === "SelectedIds") {
            const newArray = JSON.parse(event.newValue)
            handleArrayChange(newArray)
        }
    })
} else {
    console.log ("localStorage is not suported in this browser")
} */