// **JAVASCRIPT TASKS**
// TASK 1: Construct API url for PoetryDB. (Endpoint to search lines of a poem isn't functioning, so instead endpoint will be a random poem).

// TASK 2: Create a function which “fetches” a random poem from the API.

// TASK 3: Create an event listener, so that when the user selects the generate poem button, the above "fetch" function is called.

// TASK 4: Create a function which checks if the random poem (from the API) contains the user’s word. If it does, the poem is displayed on the page. If it doesn’t, another random poem is generated (i.e. the fetch function is called again). Create variable to keep count of fetch function calls. Call fetch function up to ten times; after which an error message (e.g. “Sorry, we can’t find a poem right now”) is displayed.


// **GLOBAL VARIABLES**
// FOR TESTING PURPOSES
const testWord = "blarr";

// Gets references for all of the HTML elements that we need.
const poemText = document.getElementById("poem-lines");
const poemBtn = document.getElementById("generate-poem");

// Keeps count of how many times Poetry API has been called (i.e. how many random poems have been generated).
let count = 0;

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
            // Calls function to check the poem for user's word.
            checkPoem(lines);
            // FOR TESTING PURPOSES 
            console.log(lines);
        });
};

// TASK 4: Checks if random poem contains user’s word and (if yes) displays on page or (if not) generates another random poem (up to max of ten in total).
function checkPoem(lines) {
    // If the random poem contains the user's word, run this codeblock.
    if (lines.includes(testWord)) {
        // Sets text of p element to the poem.
        poemText.textContent = lines;
        // If less than ten random poems have been generated (i.e. fetch function called less than ten times), run this codeblock.
    } else if (count < 9){
        // Gets a random poem from the Poetry API.
        getPoem()
        // Adds one to fetch function count.
        count++
        // FOR TESTING PURPOSES.
        console.log(count);
        // If random poem doesn't contain user's word and ten random poems have already been generated, run this codeblock.
        } else {
            // Sets text of p element to an error message.
            poemText.textContent = `Sorry, we can’t find a poem right now. Please try again later.`
        }
    }


// **EVENT LISTENERS**
// TASK 3: Listens for a click event on the poem button and calls function.
poemBtn.addEventListener("click", getPoem);



