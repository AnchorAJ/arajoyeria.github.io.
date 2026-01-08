let count = 0;

function addToCart() {
    count++;
    document.getElementById('cart-count').innerText = count;
    alert("¡Producto añadido con éxito!");
}

function toggleCart() {
    alert("Tienes " + count + " productos en tu carrito.");
}