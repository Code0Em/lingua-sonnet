// **JAVASCRIPT TASKS**
// TASK 1: Construct API url for PoetryDB. (Endpoint to search lines of a poem isn't functioning, so instead endpoint will be a random poem).

// TASK 2: Create a function which “fetches” a random poem from the API.

// TASK 3: Create an event listener, so that when the user selects the generate poem button, the above "fetch" function is called.


// **GLOBAL VARIABLES**
// FOR TESTING PURPOSES
const testWord = "love";

// Gets references for all of the HTML elements that we need.
const poemText = document.getElementById("poem-lines");
const poemBtn = document.getElementById("generate-poem");

// **FUNCTIONS**
// TASK 2: Query URL for PoetryDB, set to return a random poem.
function getPoem() {
    // TASK 1: Gets a random poem from the Poetry API.
    const poemQueryUrl = "https://poetrydb.org/random"
    // Runs the fetch method on the API query URL.
    fetch(poemQueryUrl)
        // Waits for the data to be returned (and then runs codeblock).
        .then(function (response) {
            // Formats the returned data into a usable form, using json method.
            return response.json();
        })
        // Waits for the data to be formatted (and then runs codeblock)..
        .then(function (data) {
            // Gets the lines from the poem (as an array), and  ‘converts’ the array into JSON string.
            const lines = JSON.stringify(data[0].lines);
            // FOR TESTING PURPOSES 
            console.log(lines);
        });
};

// **EVENT LISTENERS**
// TASK 3: Listens for a click event on the poem button and calls function.
poemBtn.addEventListener("click", getPoem);



