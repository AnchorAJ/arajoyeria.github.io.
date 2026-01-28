let cart = JSON.parse(localStorage.getItem('araSpiritCart')) || [];

const todasLasJoyas = [
    // --- PÁGINA 1 (8 Productos) ---
    { id: 1, name: "Aretes Glitzy Green", price: 5.0, img: "img/Arete.jpg" },
    { id: 2, name: "Pulsera White Crystal", price: 16.0, img: "img/Pulsera.jpg" },
    { id: 3, name: "Collar Acelia", price: 8.0, img: "img/Collar.webp" },
    { id: 4, name: "Aretes Aura", price: 10.0, img: "img/Aura.jpg" },
    { id: 5, name: "Earcuff Amada", price: 7.0, img: "img/Amada.jpg" },
    { id: 6, name: "Pinzas para cabello Love", price: 5.0, img: "img/Pinzas.jpg" },
    { id: 7, name: "Pulseras Spirit", price: 10.0, img: "img/Spirit.jpg" },
    { id: 8, name: "Aretes Marie", price: 7.0, img: "img/Marie.jpg" },

    // --- PÁGINA 2 (8 Productos) ---
    { id: 10, name: "Cadena Balloon dog", price: 12.0, img: "img/Dog.jpg" },
    { id: 11, name: "Aretes glitzy rainbow", price: 5.0, img: "img/Rainbow.jpg" },
    { id: 12, name: "Pulsera de cadena Locked", price: 10.5, img: "img/Locked.jpg" },
    { id: 13, name: "Aretes glitzy red", price: 5.0, img: "img/Red.jpg" },
    { id: 14, name: "Aretes glitzy blue", price: 5.0, img: "img/Blue.jpg" },
    { id: 15, name: "Aretes Estrella", price: 5.0, img: "img/Estrella.jpg" },
    { id: 16, name: "Cadena Golden Eye", price: 12.5, img: "img/Eye.jpg" },
        { id: 9, name: "Aretes Espiral ", price: 9.0, img: "img/Espiral.jpg" },

];

function cambiarPagina(num) {
    const grid = document.getElementById('grid-catalogo');
    if (!grid) return;
    grid.innerHTML = "";
    const inicio = (num - 1) * 9;
    const fin = inicio + 9;
    const joyasPagina = todasLasJoyas.slice(inicio, fin);

    joyasPagina.forEach(joya => {
        grid.innerHTML += `
            <div class="product-card visible">
                <div class="img-container"><img src="${joya.img}" class="product-img"></div>
                <h3>${joya.name}</h3>
                <p>$${joya.price.toFixed(2)}</p>
                <div class="quantity-selector">
                    <input type="number" id="qty-${joya.id}" value="1" min="1" class="qty-input">
                </div>
                <button onclick="prepareAddToCart(${joya.id})">Añadir al Carrito</button>
            </div>
        `;
    });
    document.querySelectorAll('.btn-page').forEach((btn, i) => btn.classList.toggle('active', (i + 1) === num));
}

function prepareAddToCart(id) {
    const joya = todasLasJoyas.find(j => j.id === id);
    const qty = parseInt(document.getElementById(`qty-${id}`).value);
    addToCart(joya.name, joya.price, qty);
}

function addToCart(name, price, qty = 1) {
    const index = cart.findIndex(item => item.name === name);
    if (index > -1) { cart[index].qty += qty; } 
    else { cart.push({ name, price, qty }); }
    saveAndUpdate();
    alert(`¡Añadido: ${name} (x${qty})!`);
}

function updateQuantity(index, newQty) {
    if (newQty <= 0) removeFromCart(index);
    else { cart[index].qty = parseInt(newQty); saveAndUpdate(); }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveAndUpdate();
}

function saveAndUpdate() {
    localStorage.setItem('araSpiritCart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const countElement = document.getElementById('cart-count');
    const totalElement = document.getElementById('cart-total-amount');
    let total = 0; let itemsCount = 0;

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; margin-top:20px;">Tu carrito está vacío.</p>';
    } else {
        container.innerHTML = cart.map((item, index) => {
            const subtotal = item.price * item.qty;
            total += subtotal; itemsCount += item.qty;
            return `
                <div class="cart-item">
                    <div><strong>${item.name}</strong><br><small>$${item.price.toFixed(2)}</small></div>
                    <div class="item-controls">
                        <input type="number" value="${item.qty}" min="1" onchange="updateQuantity(${index}, this.value)" class="cart-qty">
                        <button class="btn-remove" onclick="removeFromCart(${index})">×</button>
                    </div>
                </div>
            `;
        }).join('');
    }
    if(countElement) countElement.innerText = itemsCount;
    if(totalElement) totalElement.innerText = "$" + total.toFixed(2);
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
    document.getElementById('cart-overlay').classList.toggle('active');
}

function sendOrderWhatsApp() {
    if (cart.length === 0) return alert("Carrito vacío");
    let totalTotal = 0;
    let message = "¡Hola Ara Spirit! ✨ Mi pedido es:%0A%0A";
    cart.forEach(item => {
        const subtotal = item.price * item.qty;
        totalTotal += subtotal;
        message += `• ${item.name} (x${item.qty}) - $${subtotal.toFixed(2)}%0A`;
    });
    message += `%0A*TOTAL: $${totalTotal.toFixed(2)}*`;
    window.open(`https://wa.me/593969280196?text=${message}`, '_blank');
}

window.onload = () => {
    updateCartUI();
    if(document.getElementById('grid-catalogo')) cambiarPagina(1);
};

const messages = ["✨ Bienvenidos a Ara Spirit", "🚚 Envíos gratis sobre $30", "💎 Joyería con Amor"];
let currentMsg = 0;
setInterval(() => {
    currentMsg = (currentMsg + 1) % messages.length;
    const el = document.getElementById('announcement');
    if(el) el.innerText = messages[currentMsg];

}, 4000);


