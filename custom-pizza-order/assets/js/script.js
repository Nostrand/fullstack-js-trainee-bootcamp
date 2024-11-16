// App to calculate pizza order costs + tip

// Declare initial variables
let precioPizza = 15000;
const porcentajePropina = 0.10;
let costoTotal;
let propina;

// Capture input values or elements
const ingredienteCheckboxes = document.querySelectorAll('input[name="ingrediente"]');
const propinaInput = document.getElementById('customTip');
const pizzaRadios = document.querySelectorAll('input[name="pizzaType"]');

const costoExtrasElement = document.getElementById('costoExtras');
const propinaElement = document.getElementById('propina');
const costoTotalElement = document.getElementById('costo-total');
const pizzaCostElement = document.getElementById('pizza-cost');

// Update the pizza price based on the selected pizza type
function actualizarPrecioPizza(){
    const pizzaSeleccionada = document.querySelector('input[name="pizzaType"]:checked').value;

    switch (pizzaSeleccionada) {
        case 'XL':
            precioPizza = 15000;
            break;
        case 'L':
            precioPizza = 12000;
            break;
        case 'M':
            precioPizza = 10000;
            break;
    }
}

// Function to calculate the total extra cost
function costoTotalExtras(){
    // Get the number of checked boxes
    const cajasMarcadas = document.querySelectorAll('input[name="ingrediente"]:checked');
    const numeroExtras = cajasMarcadas.length;

    // Calculate the total price of extra ingredients
    const totalExtras = numeroExtras * 800;
    return totalExtras;
}

// Function to calculate tip
function calcularPropina(subtotal){
    return subtotal * porcentajePropina;
}


// Function to update values dynamically
function actualizarValores(){

    // Update the pizza price
    actualizarPrecioPizza();

    // Calculate subtotal
    const costoExtras = costoTotalExtras();
    const subtotal = precioPizza + costoExtras;

    // Get the value of the tip entered by the user
    propina = parseFloat(propinaInput.value);

    // If it is NaN or no value was entered, assign the base tip
    propina = (isNaN(propina) || propina === "") ? calcularPropina(subtotal) : propina;

    // Total cost of the order + entered or base tip
    costoTotal = subtotal + propina;

    // Update page elements
    costoExtrasElement.textContent = `$${costoExtras}`;
    propinaElement.textContent = `$${propina}`;
    costoTotalElement.textContent = `$${costoTotal}`;
    pizzaCostElement.textContent = `$${precioPizza}`;
}


// Event listeners to update values in real time
ingredienteCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', actualizarValores);
})

pizzaRadios.forEach(radio => {
    radio.addEventListener('change', actualizarValores)
});

propinaInput.addEventListener('input', actualizarValores);

// Order submit button
const enviarPedido = document.getElementById('enviar-pedido');
enviarPedido.addEventListener('click', function(event){
    event.preventDefault();

    actualizarValores();
    alert(`El total del pedido es: $${costoTotal} incluyendo su propina de $${propina}`);
})

// Initialize values when the page loads
actualizarValores();