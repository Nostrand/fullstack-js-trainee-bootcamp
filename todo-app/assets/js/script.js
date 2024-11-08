// Hardcoded initial task list
var tareas = [
    { tarea: "Update CV" },
    { tarea: "Buy groceries" },
    { tarea: "Pay credit card" }
]

// Toggle button for showing and hiding the form
document.getElementById('btn-toggle').addEventListener('click', function() {
    var formulario = document.getElementById('formulario');
    
    // Check current display state and toggle
    if (formulario.style.display === "none") {
        formulario.style.display = "block";
    } else {
        formulario.style.display = "none";
    }
});


// Add button functionality for adding a task and clearing the input
document.getElementById('btn-agregar').addEventListener('click', function(){
    var nuevaTarea = document.getElementById('nuevaTarea').value;
    
    // Prevent adding empty tasks and then add valid tasks to the list
    if (nuevaTarea.trim() !== "") {
        tareas.push({tarea: nuevaTarea});
        mostrarTareas(); // Refresh the task list display
        document.getElementById('nuevaTarea').value = ""; // Clear the input field
    }
})



// Display task list
function mostrarTareas(){
   var tbody =  document.getElementById("cuerpo-tabla");
    tbody.innerHTML = ''; // Clear the current list display

    // Loop through each task in the list
    for (var i = 0; i < tareas.length; i++) {
        var task = tareas[i];

        // Create a new row for each task
        var row = document.createElement('tr');

        // Create and add the cell containing the task text
        var textCell = document.createElement('td');
        textCell.textContent = task.tarea;
        row.appendChild(textCell);

        // Create and add a cell with a delete button
        var actionCell = document.createElement('td');
        var button = document.createElement('button');
        button.textContent = 'Done';
        button.classList.add('btn','btn-danger','btn-sm');

        // Add an event to the button to delete the specific task when clicked
        button.addEventListener('click', (function(task) {
            return function() {
                eliminarTarea(task.tarea);
            };
        })(task));

        // Add the button cell to the row, then add the row to the table body
        actionCell.appendChild(button);
        row.appendChild(actionCell);
        tbody.appendChild(row);
    }
   }

// Function to remove a task
function eliminarTarea(nombreTarea) {
    tareas = tareas.filter(function(task) {
        return task.tarea !== nombreTarea;
    });
    mostrarTareas(); // Refresh the task list display after deletion
}

// Initialize the task list display on page load
mostrarTareas();