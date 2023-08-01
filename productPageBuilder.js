
export function handleCardClick(event) {
    /* event.preventDefault(); */
    const clickedCard = event.currentTarget;        
    console.log('page product: ', clickedCard)       
    return {card: clickedCard}
}

/* async function receiveCard(){
    console.log('before')
    const card = await handleCardClick()
    console.log('after', card)
} */




/* function createProductContent(clickedCard) { */
document.addEventListener('DOMContentLoaded', () => {  
    /* receiveCard() */
    const productSpace = document.querySelector("[data-product-content]")    
    console.log(productSpace)
    
    const productContent = document.createElement('div')
    productContent.classList.add('product-content')
    productContent.innerHTML = `
    <div> Product Content </div>      
    `
    productSpace.appendChild(productContent)    
})