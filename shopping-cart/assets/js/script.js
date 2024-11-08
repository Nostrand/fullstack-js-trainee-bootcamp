// Product class with attributes name, price, and quantity to keep track of user orders
function producto(nombre, precio, cantidad = 0){
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
}

// Cart class with an array attribute to store products
function Carrito(){
    this.productos = [];
}

// Creating a cart instance
const carroCompra = new Carrito();

// Function to add products to the cart
function agregarProductos(){
    let idProducto = '';
    // Loop checking that the user has chosen a valid option
    do{
        idProducto = parseFloat(prompt('Available products: \n------------------------------ \n1. Milk $1000 \n2. Bread $2000 \n3. Cheese $1200 \n4. Jam $890 \n5. Sugar $1300 \n ------------------------------\nEnter the number of the product you want to add to the cart:'));
        if (isNaN(idProducto) || idProducto < 1 || idProducto > 5) {
            alert('Invalid product. Choose a product that is available.');
          }
    } while (idProducto < 1 || idProducto > 5);

    // Capturing the quantity of the selected product
    const unidades = parseFloat(prompt('Enter the quantity of units'));

    // Associating the selected product option with the product list + adding quantity
    const productoSeleccionado = productosDisponibles[idProducto - 1];

    // Creating a new object to add to the cart
    const nuevoProducto = {
        nombre: productoSeleccionado.nombre,
        precio: productoSeleccionado.precio,
        cantidad: unidades
    }

    // Checking if the product is already in the cart
    const productoExiste = carroCompra.productos.find(p => p.nombre === nuevoProducto.nombre)
    if (productoExiste){
        // Update quantity if already in cart
        productoExiste.cantidad += unidades;
    } else {
        // Otherwise, add the new product
        carroCompra.productos.push(nuevoProducto);
    }
    
    // Message with the quantity and name of the newly added product
    alert(`${nuevoProducto.cantidad} ${nuevoProducto.nombre}(s) added to the cart`);

    // Checking if the user wants to complete the purchase
    finalizarCompra();
}


// Function to calculate the total of the purchase
function totalCompra(){
    let total = 0;
    carroCompra.productos.forEach(producto => {
        total += producto.precio * producto.cantidad;
    });
    return total;
}


// Function to ask the user if they want to finish the purchase
function finalizarCompra(){
    // User keeps adding products until they choose n or N
    const continuar = prompt('Do you want to continue adding products? (y/n)')
    if (continuar === 'y' || continuar === 'Y'){
        agregarProductos();
    } else if (continuar === 'n' || continuar === 'N'){
        // User does not add more products, the total is calculated, move to details function
        const montoTotal = totalCompra();
        detallesCompra(montoTotal);
    }
}

// Function that shows the purchase details
function detallesCompra(montoTotal){
    let detallesProductos = '';
    let detallesProductosHTML = '';
    carroCompra.productos.forEach(producto => {
        // Calculate subtotal for each product
        let subtotal = producto.precio * producto.cantidad;

        // Format the product details in plain text (for alerts)
        detallesProductos += `• ${producto.nombre} | Quantity: ${producto.cantidad} | Subtotal: $${subtotal}\n`;

        // Format the product details in HTML (for frontend display)
        detallesProductosHTML += `<p>• ${producto.nombre} | Quantity: ${producto.cantidad} | Subtotal: $${subtotal}</p>`;
    });

    // Show details in alert
    alert(`Purchase details:\n${detallesProductos}\nTotal: $${montoTotal}`);

    // Update HTML with the cart details and total
    actualizarEstadoCarrito(detallesProductosHTML, montoTotal);
}

// Function to display cart in HTML
function actualizarEstadoCarrito(detallesProductos = '', montoTotal = 0 ) {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Display the product details or a message if the cart is empty
    if (carroCompra.productos.length > 0) {
        cartItems.innerHTML = detallesProductos;
        cartTotal.innerText = `Total: $${montoTotal}`;
    } else {
        cartItems.innerHTML = 'No items in the cart';
        cartTotal.innerText = 'Total: $0';
    }
}

// Creating product objects in the product list
const productosDisponibles = [
    new producto('Milk', 1000),
    new producto('Bread', 2000),
    new producto('Cheese', 1200),
    new producto('Jam', 890),
    new producto('Sugar', 1300)
]

// Clear the products that have been added
function limpiarCarroCompras(){
    carroCompra.productos = [];
    alert('The shopping cart has been emptied');

    actualizarEstadoCarrito();
}

// Event listener to start adding products to the cart
const iniciarScript = document.getElementById('agregar-producto');
iniciarScript.addEventListener('click', agregarProductos);

// Event listener to clear cart
const limpiarCarro = document.getElementById('limpiar-carro');
limpiarCarro.addEventListener('click', limpiarCarroCompras);