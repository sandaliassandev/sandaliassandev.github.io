// Inicialización de librería Swiper 
var swiper=new Swiper(".mySwiper-1",{
    slidesPerView:1,
    spaceBetween:30,
    loop:true,
    pagination:{
        el:".swiper-pagination",
        clickable:true,
    },
    navigation:{
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev",

    }
});
//Segundo slider con 3 slides en desktop
var swiper=new Swiper(".mySwiper-2",{
    slidesPerView:3,
    spaceBetween:20,
    loop:true,
    loopFillGroupWithBlank:true,
    navigation:{
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev",
    },
     // Responsive
    breakpoints:{
        0:{
            slidesPerView:1,
        },
        520:{
            slidesPerView:2,
        },
        950:{
            slidesPerView:3,
        }
    }

});

// Recorre inputs con clase tabInput
let tabInputs = document.querySelectorAll(".tabInput");

tabInputs.forEach(function(input){

    input.addEventListener("change",function(){
        let id=input.ariaValueMax;
        let thisSwiper=document.getElementById("swiper"+id);
        thisSwiper.swiper.update();
    })

});



const track = document.querySelector('.carousel-track');
const cards = Array.from(track.children);
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const cardWidth = cards[0].getBoundingClientRect().width;

// Arrange the cards next to one another
cards.forEach((card, index) => {
    card.style.left = cardWidth * index + 'px';
});

const moveToCard = (track, currentCard, targetCard) => {
    track.style.transform = 'translateX(-' + targetCard.style.left + ')';
    currentCard.classList.remove('current-card');
    targetCard.classList.add('current-card');
}

// Set the initial current card
cards[0].classList.add('current-card');

prevButton.addEventListener('click', e => {
    const currentCard = track.querySelector('.current-card');
    const prevCard = currentCard.previousElementSibling;

    if (prevCard) {
        moveToCard(track, currentCard, prevCard);
    }
});

nextButton.addEventListener('click', e => {
    const currentCard = track.querySelector('.current-card');
    const nextCard = currentCard.nextElementSibling;

    if (nextCard) {
        moveToCard(track, currentCard, nextCard);
    }
});

// carrito
document.addEventListener('DOMContentLoaded', function() {
    const cartFloat = document.getElementById('cart-float');
    const cart = document.getElementById('cart');

    cartFloat.addEventListener('click', function() {
        cart.classList.toggle('show');
    });
});



//agregar productos al carrito:
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.buy-btn');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCartButton = document.getElementById('clear-cart');
    const checkoutButton = document.getElementById('checkout');
    const customerSection = document.getElementById('customer-section');
    const invoiceSection = document.getElementById('invoice-section');
    const closeButton = document.getElementById('close-button');

    // Función para agregar un producto al carrito
    function addToCart(name, price) {
        const newItem = document.createElement('li');
        newItem.innerHTML = `
            <span>${name} - $${price.toFixed(2)}</span>
            <div class="quantity-controls">
                <button class="decrement">-</button>
                <input type="number" value="1" min="1" class="quantity">
                <button class="increment">+</button>
            </div>
            <button class="remove-item">Eliminar</button>
        `;
        cartItemsList.appendChild(newItem);

        // Actualizar el total del carrito
        updateTotal();
    }

    // Actualizar el total del carrito
    function updateTotal() {
        let total = 0;
        cartItemsList.querySelectorAll('li').forEach(item => {
            const price = parseFloat(item.textContent.match(/\d+\.\d+/)[0]);
            const quantity = parseInt(item.querySelector('.quantity').value);
            total += price * quantity;
        });
        cartTotal.textContent = total.toFixed(2);
    }

    // Vaciar el carrito
    function clearCart() {
        cartItemsList.innerHTML = '';
        cartTotal.textContent = '0.00';
    }

    // Controlador de eventos para el envío del formulario
    document.getElementById('customer-details').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        // Obtener los datos del cliente del formulario
        const customerData = {
            name: document.getElementById('name').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            phone: document.getElementById('phone').value
        };

        // Obtener los detalles de los productos
        const products = [];
        cartItemsList.querySelectorAll('li').forEach(item => {
            const productName = item.querySelector('span').textContent.split(' - ')[0];
            const productPrice = parseFloat(item.querySelector('span').textContent.split(' - ')[1].slice(1));
            const quantity = parseInt(item.querySelector('.quantity').value);
            products.push({ name: productName, price: productPrice, quantity: quantity });
        });

        // Crear la factura
        const invoiceData = {
            customer: customerData,
            products: products,
            total: parseFloat(cartTotal.textContent)
        };

        // Mostrar la factura
        displayInvoice(invoiceData);
    });

    // Mostrar la factura
    function displayInvoice(invoiceData) {
        // Mostrar sección de factura
        invoiceSection.classList.remove('hidden');

        // Mostrar datos del cliente
        document.getElementById('customer-name').textContent = invoiceData.customer.name;
        document.getElementById('customer-email').textContent = invoiceData.customer.email;
        document.getElementById('customer-address').textContent = invoiceData.customer.address;
        document.getElementById('customer-phone').textContent = invoiceData.customer.phone;

        // Mostrar productos
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        invoiceData.products.forEach(product => {
            const item = document.createElement('li');
            item.textContent = `${product.name} - $${product.price.toFixed(2)} x ${product.quantity}`;
            productList.appendChild(item);
        });

        // Mostrar total
        document.getElementById('invoice-total').textContent = invoiceData.total.toFixed(2);
    }

    // Cerrar factura y formulario
    closeButton.addEventListener('click', function() {
        customerSection.classList.add('hidden');
        invoiceSection.classList.add('hidden');
    });

    // Resto del código ...

    // Escuchar los clics en los botones "Agregar al carrito"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.parentElement;
            const productName = card.querySelector('h2').textContent;
            const productPrice = parseFloat(card.querySelector('.price').textContent.slice(1));

            addToCart(productName, productPrice);
        });
    });

    // Escuchar los cambios en la cantidad de productos
    cartItemsList.addEventListener('change', function(event) {
        if (event.target.classList.contains('quantity')) {
            updateTotal();
        }
    });

    // Escuchar los clics en los botones "+" y "-"
    cartItemsList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('increment')) {
            const input = target.previousElementSibling;
            const newValue = parseInt(input.value) + 1;
            input.value = newValue.toString();
            updateTotal();
        } else if (target.classList.contains('decrement')) {
            const input = target.nextElementSibling;
            const newValue = parseInt(input.value) - 1;
            if (newValue >= 1) {
                input.value = newValue.toString();
                updateTotal();
            }
        }
    });

    // Escuchar los clics en los botones "Eliminar"
    cartItemsList.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            event.target.parentElement.remove();
            updateTotal();
        }
    });

    // Escuchar el clic en el botón "Vaciar Carrito"
    clearCartButton.addEventListener('click', function() {
        clearCart();
    });

    // Escuchar el clic en el botón "Finalizar Compra"
    checkoutButton.addEventListener('click', function() {
        customerSection.classList.remove('hidden');
        window.scrollTo({
            top: customerSection.offsetTop,
            behavior: 'smooth'
        });
    });
});








