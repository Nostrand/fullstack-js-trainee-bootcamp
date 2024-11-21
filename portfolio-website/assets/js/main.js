import { projects } from './projects.js';

// Interactivity with jQuery
$(document).ready(function() {
    // Toggle details when clicking "See More"
    $(document).on('click', '.custom-color', function() {
        // Get the project index from the button ID (e.g., Proyecto1)
        var idBoton = $(this).attr("id");
        var projectIndex = idBoton.replace("Proyecto", "") - 1;  // Extract the project index
        
        // Get the project data
        var project = projects[projectIndex];

        // Populate the modal with the selected project details
        $('#modalProjectTitle').text(project.title);
        $('#modalProjectDescription').text(project.description);
        $('#modalProjectImage').attr("src", project.image);

        // Show the modal (make it visible)
        $('#detallesProyecto').show();

        // Scroll the page to the modal position (smooth scroll to the modal)
        $('html, body').animate({
            scrollTop: $('#detallesProyecto').offset().top - 20
        }, 500); // Animation duration
    });

    // Hide details with double-click on "Close" button
    $(document).on('dblclick', '.btn-close', function() {
        $(this).closest(".detalles").hide();
    });

    // Hide the modal when the "Close" button is clicked
    $(document).on('click', '.btn-close', function() {
        $('#detallesProyecto').hide();
    });
});


// Populate projects dynamically
const container = document.getElementById('projects-container');

// Create a row element to hold the cards
const row = document.createElement('div');
row.classList.add('row', 'row-cols-1', 'row-cols-md-3', 'g-4');  // Bootstrap classes

// Loop through each project and create the HTML structure
projects.forEach((project, index) => {
    const projectElement = document.createElement('div');
    projectElement.classList.add('col');  // This will automatically place the card in the grid

    // Generate the project card HTML
    projectElement.innerHTML = `
        <div class="card h-100">
            <img src="${project.image}" class="card-img-top enlarge-on-hover" alt="${project.altText}">
            <div class="card-body">
                <h5 class="card-title">${project.title}</h5>
                <p class="truncate card-text">${project.description}</p>
            </div>
            <div class="card-footer">
                <small class="custom-color enlarge-on-hover" id="Proyecto${index + 1}">See More</small>
            </div>
        </div>
    `;

    // Append the project card to the row (not directly to the container)
    row.appendChild(projectElement);
});

// Append the row to the container (not the individual columns directly)
container.appendChild(row);