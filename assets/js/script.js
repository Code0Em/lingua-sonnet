// **JAVASCRIPT TASKS**
// TASK 1: Construct API url for PoetryDB. (Endpoint to search lines of a poem isn't functioning, so instead endpoint will be a random poem).

// TASK 2: Create a function which “fetches” a random poem from the API.

// TASK 3: Create an event listener, so that when the user selects the generate poem button, the above "fetch" function is called.

// TASK 4: Create a function which checks if the random poem (from the API) contains the user’s word. If it does, the poem is displayed on the page. If it doesn’t, another random poem is generated (i.e. the fetch function is called again). Create variable to keep count of fetch function calls. Call fetch function up to ten times; after which an error message (e.g. “Sorry, we can’t find a poem right now”) is displayed.

// TASK 5: Create a function (with an event listener) which "gets" the user's word, when they enter a word and selects the save button. Within this, use an if/else statement to validate the user’s input and display an error message if the input’s blank.

// TASK 6: Create function (with an event listener) which resets the fetch function count, when the user selects the generate poem button (so that new random poems can be generated/in case on the first round, no random button is found with the user's word). UPDATE: Incorporated this into existing function to keep code DRY.

// TASK 7: Construct API url for Dictionary. (Endpoint will be user's word to return definition).

// TASK 8: Create a function which “fetches” the word's definition from the API.

// TASK 9: Create an event listener, so that when the user selects the generate definition button, the above "fetch" function is called.

// **GLOBAL VARIABLES**
// FOR TESTING PURPOSES
const testWord = "love";

// Gets references for all of the HTML elements that we need.
const poemText = document.getElementById("poem-lines");
const poemBtn = document.getElementById("generate-poem");
const saveBtn = document.getElementById("save-btn");
const errorMsg = document.getElementById("error-msg");
// !Need to add this ID to html
const definitionBtn = document.getElementById("generate-definition");

// Keeps count of how many times Poetry API has been called (i.e. how many random poems have been generated).
let count = 0;

// An "empty" variable to "collect" the user's word.
let userSavedWord = "";

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
            //console.log(lines);
        });
    };

// TASK 4: Checks if random poem contains user’s word and (if yes) displays on page or (if not) generates another random poem (up to max of ten in total).
function checkPoem(lines) {
    // Clears any previous poem or error message from p element.
    poemText.textContent = "";
    // Validates the word input by checking it's not empty (i.e. if the length of the value is zero, run this codeblock).
    if (userSavedWord.length == 0) {
        // Displays an error message (i.e. sets the text of the p element).
        poemText.textContent = "Please save a word above."
        // If user's inputted a word, run this codeblock.
    } else {
        // If the random poem contains the user's word, run this codeblock.
        if (lines.includes(userSavedWord)) {
            // Sets text of p element to the poem.
            poemText.textContent = lines;
            // FOR TESTING PURPOSES 
            console.log("found poem");
            // If less than ten random poems have been generated (i.e. fetch function called less than ten times), run this codeblock.
        } else if (count < 9) {
            // Calls function to get a random poem from the Poetry API.
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
}

// TASK 8: Query URL for Dictionary, set to return definition of user's word.
function getDefinition() {
    // TASK 7: Gets a definition from Dictionary API.
    const definitionQueryUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${userSavedWord}`;
    // Runs the fetch method on the API query URL.
    fetch(definitionQueryUrl)
        // Waits for the data to be returned (and then runs codeblock).
        .then(function (response) {
            // Formats the returned data into a usable form, using json method.
            return response.json();
        })
        // Waits for the data to be formatted (and then runs codeblock)..
        .then(function (data) {
            // Gets the definition (as an array), and  ‘converts’ the array into JSON string.
            const definition = JSON.stringify(data[0].meanings[0].definitions[0].definition);
            // FOR TESTING PURPOSES 
            console.log(definition);
        });
};

// **EVENT LISTENERS**
// TASK 5: Listens for a click event on the save button and calls function.
saveBtn.addEventListener("click", function (e) {
    // Prevents the default behaviour (i.e. reloading the page).
    e.preventDefault();
    // Gets what the user's inputted into the word input (i.e. the value of input element).
    const userWord = inputText.value;
    // Validates the word input by checking it's not empty (i.e. if the length of the value is zero, run this codeblock).
    if (userWord.length == 0) {
        // Displays error message (i.e. sets the inner HTML of the p element).
        // *! Could we make this a model instead?
        errorMsg.innerHTML = "Please enter a word."
        // If the search input isn't empty, run this codeblock:
    } else {
        // Displays confirmation message.
        errorMsg.innerHTML = `"${userWord}" has been saved, now it's time to generate a definition or a poem!`
        // FOR TESTING PURPOSES 
        userSavedWord = userWord;
        console.log(userWord);
        console.log(userSavedWord);
    }
});

// TASK 3 and 6: Listens for a click event on the poem button and calls function.
poemBtn.addEventListener("click", function (e) {
    // Prevents the default behaviour (i.e. reloading the page).
    e.preventDefault();
    // Calls function to get a random poem from the Poetry API.
    getPoem();
    // Resets count to zero (so that fetch function will be called ten times with new word).
    count = 0;
    // FOR TESTING PURPOSES.
    console.log("poem button pressed");
    // FOR TESTING PURPOSES.
    console.log("count is "+count);
});

// TASK 9: Listens for a click event on the definition button and calls function.
definitionBtn.addEventListener("click", function (e) {
    // Prevents the default behaviour (i.e. reloading the page).
    e.preventDefault();
    // Calls function to get a definition from the Dictionary API.
    getDefinition();
    // FOR TESTING PURPOSES.
    console.log("definition button pressed");
});

