
export function handleCardClick(event) {
    /* event.preventDefault(); */
    const clickedCard = event.currentTarget;    
    const anchorDiv = clickedCard.querySelector('.product__title__anchor')
    const productContent = document.querySelector("[data-product-content]")

    productContent.innerHTML = 'oi'
    return ({card: clickedCard, anchor: anchorDiv, product: productContent})        
}

