// Application to search for song lyrics using an API

async function getLyrics(event){
    event.preventDefault();
    // Get the artist and title values from the input fields
    const artist = document.getElementById('artist').value;
    const title = document.getElementById('title').value;

    // Craft the API URL dynamically
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

    try {
        // Fetch the data from the API using the fetch function
        // The second argument to fetch is an options object where we specify headers
        // We're setting the 'Accept' header to 'application/json' to get a JSON response
        const response = await fetch(url, {
            headers: {'Accept': 'application/json'}
        });

        if (!response.ok) {
            throw new Error('Lyrics not found');
        }

        const data = await response.json();

        // Check if the response contains the lyrics
        if (data.lyrics) {
            document.getElementById('song').innerText = data.lyrics;
        } else {
            document.getElementById('song').innerText = 'Lyrics not found';
        }
    } catch (error){
        // If something goes wrong during the fetch or parsing, catch the error
        // Log the error
        console.log('Error fetching the lyrics:', error);

        // Update container to show error message
        if (error.message === 'Lyrics not found') {
            document.getElementById('song').innerText = 'Sorry, no lyrics found for this song. Please check the artist and title spelling.';
        } else {
            document.getElementById('song').innerText = 'An error occurred. Please try again later.';
        }
    }
    }

    // Select the button with id 'buscar' and add event listener
    document.getElementById('buscar').addEventListener('click', getLyrics);