// **JAVASCRIPT TASKS**
// TASK 1: Construct API url for PoetryDB. (Endpoint to search lines of a poem isn't functioning, so instead endpoint will be a random poem).

// TASK 2: Create a function which “fetches” a random poem from the API.

// TASK 3: Create an event listener, so that when the user selects the generate poem button, the above "fetch" function is called.

// TASK 4: Create a function which checks if the random poem (from the API) contains the user’s word. If it does, the poem is displayed on the page. If it doesn’t, another random poem is generated (i.e. the fetch function is called again). Create variable to keep count of fetch function calls. Call fetch function up to ten times; after which an error message (e.g. “Sorry, we can’t find a poem right now”) is displayed.

// TASK 5: Create a function (with an event listener) which "gets" the user's word, when they enter a word and selects the save button. Within this, use an if/else statement to validate the user’s input and display an error message if the input’s blank.

// TASK 6: Create function (with an event listener) which resets the fetch function count, when the user selects the generate poem button (so that new random poems can be generated/in case on the first round, no random button is found with the user's word). UPDATE: Incorporated this into existing function (at TASK 3) to keep code DRY.

// TASK 7: Construct API url for Dictionary. (Endpoint will be user's word to return definition).

// TASK 8: Create a function which “fetches” the word's definition from the API.

// TASK 9: Create an event listener, so that when the user selects the generate definition button, the above "fetch" function is called. Add if/else statement to to validate the user’s input and display an error message if the input’s blank (and stop the call on the "fetch" function).

// TASK 10: Create a function which displays a definition of the user's word (and call it within the above event listener).

// TASK 11: Add if/else statement to fetch function on Dictionary API, so that an error message is displayed to user if the API returns an error.

// TASK 12: Create a function which creates a new word history button, if there is not one already created for the word.

// TASK 13: Create function which saves the user's word to local storage. UPDATE: Incorporated this into existing event listener (at TASK 5) to keep code DRY.

// TASK 14: Create an event listener which retrieves the user's word name from the browser and displays a confirmation message, when the user selects the word history button.

// TASK 15: Create a bootstrap modal and add code to existing function(s) so it's triggered programmatically when required (e.g. when user doesn't enter a word).

// **GLOBAL VARIABLES**
// FOR TESTING PURPOSES
const testWord = "love";

// Gets references for all of the HTML elements that we need.
const poemText = document.getElementById("poem-lines");
const poemBtn = document.getElementById("generate-poem");
const saveBtn = document.getElementById("save-btn");
const inputText = document.getElementById("input-text");
const confirmMsg = document.getElementById("confirm-msg");
const definitionBtn = document.getElementById("generate-definition");
const definitionText = document.getElementById("definition");
const poemResults = document.getElementById("poem-result");
const loadingSpinnerP = poemResults.children[0];
const definitionResults = document.getElementById("definition-result");
const loadingSpinnerD = definitionResults.children[0];
const wordHistSection = document.getElementById("word-history");
const errorModal = new bootstrap.Modal("#error-modal");
const errorMsg = document.getElementById("error-msg");

// The text for error messages.
const missingWord = "You haven't entered a word. Please enter a word."
const noPoem = "Sorry, we can’t find a poem right now. Please try again later."
const unknownWord = "Sorry, we don't know that word."

// Keeps count of how many times Poetry API has been called (i.e. how many random poems have been generated).
let count = 0;

// An "empty" variable to "collect" the user's word.
let userSavedWord = "";

// Empty array to "collect" text of word history buttons.
let btnsText = [];

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
        // TASK 15: Displays error modal.
        errorModal.show();
        // Displays error message in modal (i.e. sets the inner HTML of the p element).
        errorMsg.innerHTML = missingWord;
        // If user's inputted a word, run this codeblock.
    } else {
        // If the random poem contains the user's word, run this codeblock.
        if (lines.includes(userSavedWord)) {
            // Sets text of p element to the poem.
            poemText.textContent = lines;
            // Adds invisible class to Bootstrap spinner (so doesn't display this).
            loadingSpinnerP.classList.add("invisible");
            // FOR TESTING PURPOSES 
            console.log("found poem");
            // If less than ten random poems have been generated (i.e. fetch function called less than ten times), run this codeblock.
        } else if (count < 9) {
            // Calls function to get a random poem from the Poetry API.
            getPoem()
            // Adds one to fetch function count.
            count++
            // Removes invisible class from Bootstrap spinner (so displays this).
            loadingSpinnerP.classList.remove("invisible");
            // FOR TESTING PURPOSES.
            console.log(count);
            // If random poem doesn't contain user's word and ten random poems have already been generated, run this codeblock.
        } else {
            // TASK 15: Displays error modal.
            errorModal.show();
            // Displays error message in modal (i.e. sets the inner HTML of the p element).
            errorMsg.innerHTML = noPoem;
            // Adds invisible class to Bootstrap spinner (so doesn't display this anymore).
            loadingSpinnerP.classList.add("invisible");
        }
    }
}

// TASK 8: Query URL for Dictionary, set to return definition of user's word.
function getDefinition() {
    // TASK 7: Gets a definition from Dictionary API.
    const definitionQueryUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${userSavedWord}`
    // Runs the fetch method on the API query URL.
    fetch(definitionQueryUrl)
        // Waits for the data to be returned (and then runs codeblock).
        .then(function (response) {
            // If the API responds with an error (e.g. can't find a definition for the user's word), run this codeblock.
            // *CREDIT: Worked below code out thanks to Stack Overflow (2016) Fetch resolves even if 404? (https://stackoverflow.com/questions/39297345/fetch-resolves-even-if-404).
            if (!response.ok) {
                // Adds invisible class to Bootstrap spinner (so doesn't display this).
                loadingSpinnerD.classList.add("invisible");
                // TASK 15: Displays error modal.
                errorModal.show();
                // Displays error message in modal (i.e. sets the inner HTML of the p element).
                errorMsg.innerHTML = unknownWord;
                // FOR TESTING PURPOSES 
                console.log("dictionary API error");
                console.log(unknownWord);
            }
            // Formats the returned data into a usable form, using json method.
            return response.json();
        })
        // Waits for the data to be formatted (and then runs codeblock)..
        .then(function (data) {
            // Gets the definition (as an array), and  ‘converts’ the array into JSON string.
            const definition = JSON.stringify(data[0].meanings[0].definitions[0].definition);
            // Calls function to display definition of the user's word.
            displayDefinition(definition);
            // FOR TESTING PURPOSES 
            console.log(definition);
        });
};

// TASK 10: Displays a definition of the user's word.
function displayDefinition(definition) {
    // Adds invisible class to Bootstrap spinner (so doesn't display this).
    loadingSpinnerD.classList.add("invisible");
    // Sets text of p element to the definition.
    definitionText.textContent = definition;
    // FOR TESTING PURPOSES 
    console.log("found definition");
}

// TASK 12: Creates word history buttons.
function createBtn() {
    // Checks if array (i.e. the text of the word history buttons) includes user's words (i.e. if this word already has a button, run this codeblock).
    if (btnsText.includes(userSavedWord)) {
        // TESTING
        console.log("already got this button");
        // Gets us out of the function (i.e. returns nothing).
        return
    } else {
        // Creates a new button.
        const newBtn = document.createElement("button");
        // Sets the text of the button to the user's word.
        newBtn.textContent = userSavedWord;
        // Adds classes to button (for Bootstrap styling and for event listener).
        newBtn.classList.add("btn", "hist-btn", "word-history");
        // Appends button to section element.
        wordHistSection.append(newBtn);
        // Pushes the button's text up to array (so we can check it/when it's searched again).
        btnsText.push(newBtn.textContent);
        // TESTING
        console.log(btnsText);
    }
}

// **EVENT LISTENERS**
// TASK 5: Listens for a click event on the save button and calls function.
saveBtn.addEventListener("click", function (e) {
    // Prevents the default behaviour (i.e. reloading the page).
    e.preventDefault();
    // Gets what the user's inputted into the word input (i.e. the value of input element).
    const userWord = inputText.value;
    // Validates the word input by checking it's not empty (i.e. if the length of the value is zero, run this codeblock).
    if (userWord.length == 0) {
        // Adds invisible class to Bootstrap spinner (so doesn't display this).
        loadingSpinnerD.classList.add("invisible");
        // TASK 15: Displays error modal.
        errorModal.show();
        // Displays error message in modal (i.e. sets the inner HTML of the p element).
        errorMsg.innerHTML = missingWord;
        // Resets the userSavedWord to the new (empty) userWord (i.e. so that any previously entered word is removed).
        userSavedWord = userWord;
        // If the search input isn't empty, run this codeblock:
    } else {
        // Sets userSavedWord variable to the words that the user's inputted.
        userSavedWord = userWord;
        // Displays confirmation message.
        confirmMsg.innerHTML = `"${userSavedWord}" has been saved, now it's time to generate a definition or a poem!`
        // TASK 13: Saves the user's word to the browser, setting the key name and the value to the word itself.
        localStorage.setItem(`${userSavedWord}`, JSON.stringify(userSavedWord));
        // Calls function to display word history button.
        createBtn();
        // FOR TESTING PURPOSES 
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
    console.log("count is " + count);
});

// TASK 9: Listens for a click event on the definition button and calls function.
definitionBtn.addEventListener("click", function (e) {
    // Prevents the default behaviour (i.e. reloading the page).
    e.preventDefault();
    // Clears any previous definition or error message from p element.
    definitionText.textContent = "";
    // Removes invisible class from Bootstrap spinner (so displays this).
    loadingSpinnerD.classList.remove("invisible");
    // FOR TESTING PURPOSES.
    console.log("definition button pressed");
    // Validates the word input by checking it's not empty (i.e. if the length of the value is zero, run this codeblock).
    if (userSavedWord.length == 0) {
        // Adds invisible class to Bootstrap spinner (so doesn't display this).
        loadingSpinnerD.classList.add("invisible");
        // TASK 15: Displays error modal.
        errorModal.show();
        // Displays error message in modal (i.e. sets the inner HTML of the p element).
        errorMsg.innerHTML = missingWord;
        // If user's inputted a word, run this codeblock.
    } else {
        // Calls function to get a definition from the Dictionary API.
        getDefinition();
    }
});

// TASK 14: Listens for a click event on a word history button (using event delegation) and calls function.
wordHistSection.addEventListener("click", function (e) {
    // Checks if the element that's been clicked on has class of word-history (i.e. if it's a word history button, run this codeblock).
    if (e.target.matches(".word-history")) {
        // Declares clickedWord variable and sets this equal to text of the button (so that this can be passed as key name).
        const clickedWord = e.target.textContent;
        // Gets the word from the browser.
        const historyWord = JSON.parse(localStorage.getItem(`${clickedWord}`));
        // Sets the historyWord (from the browser) as userSavedWord
        userSavedWord = historyWord;
        // TESTING
        console.log(userSavedWord);
        // Displays confirmation message.
        confirmMsg.innerHTML = `"${userSavedWord}" has been retrieved, now it's time to generate a definition or a poem!`
        // Clears any word, definition and/or poem (i.e. from previous word).
        inputText.value = "";
        definitionText.textContent = "";
        poemText.textContent = "";
    }
});