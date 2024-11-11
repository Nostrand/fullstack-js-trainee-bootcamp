// Select form and results list
const form = document.getElementById('form-ejercicio');
const routineList = document.getElementById('routine-list');

// Generator function - produces weekly exercise routines
function* generadorEjercicio(semanas, dias){
    const ejercicios = ['Squats', 'Bench', 'Deadlift', 'Press'];

    const totalDias = semanas * 7; // Total de días basado en el número de semanas

    for (let dia = 1; dia <= totalDias; dia++) {
        if (dia % dias === 0) { // To include only multiples of the number chosen by the user
            yield `Day ${dia}: ${ejercicios[(dia / dias - 1) % ejercicios.length]}`;
        }
    }
}

// Event listener to handle form submission and display routines
form.addEventListener('submit', function(event){
    event.preventDefault();

    // Clear previous results
    routineList.innerHTML = '';

    // Capture user input
    const semanas = parseInt(document.getElementById('semanas').value);
    const dias = parseInt(document.getElementById('dias').value);

    // Validate the inputs
    if (isNaN(semanas) || semanas <= 0 || isNaN(dias) || dias <= 0) {
        // Show an error message if inputs are invalid
        alert("Please enter valid values for both weeks and days.");
        return;
    }

    // Generate routines and add to list
    const generator = generadorEjercicio(semanas, dias);
    for (const rutina of generator){
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = rutina;
        routineList.appendChild(listItem);
    }

    // Show the modal
    const myModal = new bootstrap.Modal(document.getElementById('routineModal'));
    myModal.show();
});