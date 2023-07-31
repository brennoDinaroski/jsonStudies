
export function handleCardClick(event) {
    /* event.preventDefault(); */
    const clickedCard = event.currentTarget;        
    console.log('page product: ', clickedCard)       
    return {card: clickedCard}
}


/* function createProductContent(clickedCard) { */
document.addEventListener('DOMContentLoaded', () => {  
    const productSpace = document.querySelector("[data-product-content]")    
    console.log(productSpace)
    
    const productContent = document.createElement('div')
    productContent.classList.add('product-content')
    productContent.innerHTML = `
    <div> Product Content </div>      
    `
    productSpace.appendChild(productContent)    
})

/* document.addEventListener('DOMContentLoaded', () => {     
    dataElement.addEventListener('click', handleCardClick)
}) */