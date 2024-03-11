document.addEventListener("DOMContentLoaded", function () {
    // Hämta produkterna från webblagring (localStorage) på varukorg-sidan
    if (window.location.pathname.includes("varukorg.html")) {
        let storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        displayCart(storedCartItems);
    }
});

let shoppingCart = [];
let cartNotification = document.getElementById("cartNotification");

function addToCart(productName, productPrice) {
    let product = {
        name: productName,
        price: productPrice
    };

    shoppingCart.push(product);

    // Uppdatera varukorgen och notisen
    updateCartNotification();

    // Spara produkterna i webblagring (localStorage)
    localStorage.setItem('cartItems', JSON.stringify(shoppingCart));

    // Lägg till en produkt i varukorgen och uppdatera sidan
    if (window.location.pathname.includes("varukorg.html")) {
        displayCart(shoppingCart);
    }
}

function updateCartNotification() {
    cartNotification.textContent = shoppingCart.length;
}

function displayCart(cartItems) {
    let cartItemsList = document.getElementById("cartItems");
    cartItemsList.innerHTML = "";

    for (let i = 0; i < cartItems.length; i++) {
        let listItem = document.createElement("li");
        listItem.textContent = cartItems[i].name + " - $" + cartItems[i].price;

        // Lägg till en ta bort-knapp för varje produkt
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Ta bort";
        removeBtn.onclick = createRemoveHandler(i);

        listItem.appendChild(removeBtn);
        cartItemsList.appendChild(listItem);
    }
}

function showProductDetails(productName, productPrice) {
    // Här fyller du på med din egen information om produkten
    let productDescription = "En fantastisk produkt med unika egenskaper.";

    // Visa eller stäng ner produktdetaljerna baserat på befintligt tillstånd
    let detailsContainer = document.querySelector('.details-container');
    
    if (detailsContainer.dataset.productName === productName) {
        // Stäng ner detaljerna om samma produktknapptext klickas igen
        detailsContainer.innerHTML = '';
        detailsContainer.dataset.productName = ''; // Återställ produktnamnet
    } else {
        // Skapa en paragraf för att hålla detaljerna
        let detailsParagraph = document.createElement('p');
        
        // Lägg till detaljer i paragrafen
        detailsParagraph.textContent = 'Produktnamn: ' + productName + '\nPris: $' + productPrice.toFixed(2) + '\nBeskrivning: ' + productDescription;

        // Rensa tidigare detaljer
        detailsContainer.innerHTML = '';

        // Lägg till paragrafen i detaljcontainer
        detailsContainer.appendChild(detailsParagraph);

        // Spara produktnamnet i dataset för att veta vilken produkt som visas
        detailsContainer.dataset.productName = productName;
    }
}

function createRemoveHandler(index) {
    return function (event) {
        event.stopPropagation(); // Förhindra att klicket bubblar upp till övre element

        shoppingCart.splice(index, 1); // Ta bort produkten från varukorgen
        displayCart(); // Uppdatera varukorgen efter borttagning
        updateCartNotification(); // Uppdatera notisen med antalet produkter i varukorgen

        // Uppdatera även webblagringen (localStorage)
        localStorage.setItem('cartItems', JSON.stringify(shoppingCart));
    };
}

