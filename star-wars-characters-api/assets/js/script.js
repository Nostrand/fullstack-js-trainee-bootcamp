// Aplicación para traer datos de personajes de Star Wars y mostrarlos al pasar mouse por sobre rango de números

// Esperar que el DOM cargue antes de correr script
// (Esto sólo por si acaso, ya que mi <script> está incluido al final del html, desconozco si ayuda algo)
document.addEventListener('DOMContentLoaded', () => {
    // Create an object to hold information on number ranges, display IDs, and fetch flags
    const rangeData = {
        ranges: [
            { start: 1, end: 5, displayId: 'range-1-cards' },
            { start: 6, end: 10, displayId: 'range-2-cards' },
            { start: 11, end: 15, displayId: 'range-3-cards' }
        ],
        // Fetch flags to prevent multiple fetches when hovering repeatedly
        fetchFlags: {
            1: false,
            2: false,
            3: false
        }
    };

    // Add mouseenter event to each range
    rangeData.ranges.forEach((range, index) => {
        const rangeNumberElement = document.querySelectorAll('.range-number')[index];

        if (rangeNumberElement) {
            rangeNumberElement.addEventListener('mouseenter', () => {
                // Only fetch if not already fetching
                if (!rangeData.fetchFlags[index + 1]) {
                    rangeData.fetchFlags[index + 1] = true; // Set flag to true
                    fetchCharacters(range.start, range.end, range.displayId).finally(() => {
                        rangeData.fetchFlags[index + 1] = false; // Reset flag after fetching
                    });
                }
            });
        } else {
            console.warn(`Range number for ${range.start}-${range.end} not found.`); // Debugging log
        }
    });
});


// Function to fetch character data
async function fetchCharacters(start, end, displayId) {
    const displayArea = document.getElementById(displayId);
    displayArea.innerHTML = ''; // Clear the display area

    // Iterate over the range of numbers and fetch each character
    for (let i = start; i <= end; i++) {
        try {
            // Request to the Star Wars API
            const response = await fetch(`https://swapi.dev/api/people/${i}/`);
            if (!response.ok) {
                throw new Error(`Failed to fetch character ${i}`);
            }
            const data = await response.json(); // Parse response to JSON

            // Create new  element card for character
            const characterCard = createCharacterCard(data);
            displayArea.appendChild(characterCard);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }
}

// Función para crear un card element para cada personaje
function createCharacterCard(character) {
    const card = document.createElement('div');
    card.className = 'card';

    // Create wrapper div for circle and title
    const header = document.createElement('div');
    header.className = 'd-flex align-items-center';

    // Create info-circle
    const infoCircle = document.createElement('span');
    infoCircle.className = 'info-circle';
    header.appendChild(infoCircle);

    // Create character name element
    const name = document.createElement('h5');
    name.className = 'card-title ms-2';
    name.textContent = character.name;
    header.appendChild(name);

    // Append header (circle + name) to card
    card.appendChild(header);

    // Height data
    const height = document.createElement('p');
    height.className = 'card-text';
    height.textContent = `Height: ${character.height} cm.`;
    card.appendChild(height);

    // Weight data
    const mass = document.createElement('p');
    mass.className = 'card-text';
    mass.textContent = `Weight: ${character.mass} kg.`;
    card.appendChild(mass);


    const species = document.createElement('p');
    species.className = 'card-text';
    card.appendChild(species);
    
    // If character has a species URL, fetch it
    if (character.species.length > 0) {
        fetch(character.species[0])
            .then(response => response.json())
            .then(speciesData => {
                species.textContent = `Species: ${speciesData.name}`;
            })
            .catch(error => {
                console.error('Error fetching species:', error);
                species.textContent = `Species: Unknown`;
            });
    } else {
        // If no specific species indicated, tag  as Human
        species.textContent = `Species: Human`;
    }

    return card;
}