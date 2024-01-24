// **JAVASCRIPT TASKS**
// TASK 1: Construct API url for PoetryDB. (Endpoint to search lines of a poem isn't functioning, so instead endpoint will be a random poem).

// TASK 2: Create a function which “fetches” a random poem from the API.

// TASK 3: Create an event listener, so that when the user selects the generate poem button, the above "fetch" function is called.

// TASK 4: Create a function which checks if the random poem (from the API) contains the user’s word. If it does, the poem is displayed on the page. If it doesn’t, another random poem is generated (i.e. the fetch function is called again). Create variable to keep count of fetch function calls. Call fetch function up to ten times; after which an error message (e.g. “Sorry, we can’t find a poem right now”) is displayed.

// TASK 5: Create a function (with an event listener) which "gets" the user's word, when they enter a word and selects the save button. Within this, use an if/else statement to validate the user’s input and display an error message if the input’s blank.

// TASK 6: Create function (with an event listener) which resets the fetch function count, when the user selects the generate poem button (so that new random poems can be generated/in case on the first round, no random button is found with the user's word). UPDATE: Incorporated this into existing function (at TASK 3) to keep code DRY.

// TASK 7: Construct API url for Dictionary. (Endpoint will be user's word to return definition).

// TASK 8: Create a function which “fetches” the word's definition from the API.

// TASK 9: Create an event listener, so that when the user selects the generate definition button, the above "fetch" function is called. Add if/else statement to to validate the user’s input and display an error message if the input’s blank or includes a space (and stop the call on the "fetch" function).

// TASK 10: Create a function which displays a definition of the user's word (and call it within the above event listener).

// TASK 11: Add if/else statement to fetch function on Dictionary API, so that an error message is displayed to user if the API returns an error.

// TASK 12: Create a function which creates a new word history button, if there is not one already created for the word.

// TASK 13: Create function which saves the user's word to local storage. UPDATE: Incorporated this into existing event listener (at TASK 5) to keep code DRY.

// TASK 14: Create an event listener which retrieves the user's word name from the browser and displays a confirmation message, when the user selects the word history button.

// TASK 15: Create a bootstrap modal and add code to existing function(s) so it's triggered programmatically when required (e.g. when user doesn't enter a word).

// TASK 16: Create a function which gets the poem's title and author and displays this (along with the poem). UPDATE: Incorporated this into existing function (at TASK 2 and 4) to keep code DRY.

// **GLOBAL VARIABLES**
// Gets references for all of the HTML elements that we need.
const poemText = document.getElementById("poem-lines");
const poemInfoText = document.getElementById("poem-info");
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
const hasSpaces = "You've included a space in the word. Please delete the space."
const unsavedWord = "You haven't saved a word. Please save a word."
const noPoem = "Sorry, we can’t find a poem right now. Please try again later."
const unknownWord = "Sorry, we don't know that word."

// Keeps count of how many times Poetry API has been called (i.e. how many random poems have been generated).
let count = 0;

// Empty string to "collect" the user's word.
let userSavedWord = "";

// Empty array to "collect" text of word history buttons.
let btnsText = [];

// Empty array to "collect" poem's author and title.
let poemInfo = [];

// Punctuation (to be removed from the poem for display purposes).
const punctuation = /[\[\]\,\\\`\_\']+/g;

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
        // Waits for the data to be formatted (and then runs codeblock).
        .then(function (data) {
            // Gets the lines from the poem (as an array) and ‘converts’ the array into JSON string, also removes any unwanted punctuation.
            const lines = JSON.stringify(data[0].lines).replace(punctuation, "");
            // TASK 16: Gets the poem's author, repeats the above and also removes the speechmarks.
            const author = JSON.stringify(data[0].author).replace(/\"/g, "");
            // TASK 16: Gets the poem's title (and repeats the above).
            const title = JSON.stringify(data[0].title).replace(/\"/g, "");
            // Pushes the title and author up to the array (so we can retrieve this outside of the function).
            poemInfo.push(title, author);
            // Calls function to check the poem for user's word.
            checkPoem(lines);
        });
};

// TASK 4: Checks if random poem contains user’s word and (if yes) displays on page or (if not) generates another random poem (up to max of ten in total).
function checkPoem(lines) {
    if (lines.includes(` ${userSavedWord} `)) {
        // TASK 16: Sets text of p element to the poem's title and author.
        poemInfoText.textContent = `${poemInfo[0]} by ${poemInfo[1]}`;
        // *CREDIT: Below code adapted from Chat GPT’s (2024) answer to “how do I convert a single long string of poetry verses with double commas for line-breaks into a properly formatted poem in html?”, researched by @codeswitchstudio.
        // Replaces speechmarks with line break (so poem lines are displayed on new line).
        const poemSpaced = lines.replaceAll(`"`, "<br>");
        // Sets inner HTML of p element to the poem.
        poemText.innerHTML = poemSpaced;
        // Adds invisible class to Bootstrap spinner (so doesn't display this).
        loadingSpinnerP.classList.add("invisible");
        // If less than ten random poems have been generated (i.e. fetch function called less than ten times), run this codeblock.
    } else if (count < 9) {
        // Resets the poemInfo (i.e. poem title and author) to an empty array (i.e. so that previous generated poem's title and author are removed).
        poemInfo = [];
        // Calls function to get a random poem from the Poetry API.
        getPoem();
        // Adds one to fetch function count.
        count++;
        // If random poem doesn't contain user's word and ten random poems have already been generated, run this codeblock.
    } else {
        // *CREDIT: Worked below code out thanks to Mojtaba Seyedi (2022) Call modal manually with vanilla JavaScript in Bootstrap 5 (https://www.youtube.com/watch?v=XUhdzIO6lgg).
        // TASK 15: Displays error modal.
        errorModal.show();
        // Displays error message in modal (i.e. sets the inner HTML of the p element).
        errorMsg.innerHTML = noPoem;
        // Adds invisible class to Bootstrap spinner (so doesn't display this anymore).
        loadingSpinnerP.classList.add("invisible");
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
            // If the API responds with an error (e.g. can't find a definition for the user's word), run this codeblock.
            // *CREDIT: Worked below code out thanks to Stack Overflow (2016) Fetch resolves even if 404? (https://stackoverflow.com/questions/39297345/fetch-resolves-even-if-404).
            if (!response.ok) {
                // Adds invisible class to Bootstrap spinner (so doesn't display this).
                loadingSpinnerD.classList.add("invisible");
                // TASK 15: Displays error modal.
                errorModal.show();
                // Displays error message in modal (i.e. sets the inner HTML of the p element).
                errorMsg.innerHTML = unknownWord;
            }
            // Formats the returned data into a usable form, using json method.
            return response.json();
        })
        // Waits for the data to be formatted (and then runs codeblock).
        .then(function (data) {
            // Gets the definition (as an array) and  ‘converts’ the array into JSON string, also removes speechmarks.
            const definition = JSON.stringify(data[0].meanings[0].definitions[0].definition).replace(/\"/g, "");
            // Calls function to display definition of the user's word.
            displayDefinition(definition);
        });
};

// TASK 10: Displays a definition of the user's word.
function displayDefinition(definition) {
    // Adds invisible class to Bootstrap spinner (so doesn't display this).
    loadingSpinnerD.classList.add("invisible");
    // Sets text of p element to the definition.
    definitionText.textContent = definition;
}

// TASK 12: Creates word history buttons.
function createBtn() {
    // Checks if array (i.e. the text of the word history buttons) includes user's words (i.e. if this word already has a button, run this codeblock).
    if (btnsText.includes(userSavedWord)) {
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
    }
}

// **EVENT LISTENERS**
// TASK 5: Listens for a click event on the save button and calls function.
saveBtn.addEventListener("click", function (e) {
    // Prevents the default behaviour (i.e. reloading the page).
    e.preventDefault();
    // Clears any definition, poem and/or confirmation message (from any previous word).
    definitionText.textContent = "";
    poemText.innerHTML = "";
    poemInfoText.textContent = "";
    confirmMsg.innerHTML = "";
    // Gets what the user's inputted into the word input (i.e. the value of input element).
    const userWord = inputText.value;
    // Validates the word input by checking it's not empty (i.e. if the length of the value is zero, run this codeblock).
    if (userWord.length == 0) {
        // TASK 15: Displays error modal.
        errorModal.show();
        // Displays error message in modal (i.e. sets the inner HTML of the p element).
        errorMsg.innerHTML = missingWord;
        // Resets the userSavedWord to an empty string (i.e. so that any previously entered word is removed).
        userSavedWord = "";
        // If the search input isn't empty, run this codeblock:
        // Validates the word input by checking that it doesn't include spaces.
    } else if (userWord.includes(" ")) {
        // TASK 15: Displays error modal.
        errorModal.show();
        // Displays error message in modal (i.e. sets the inner HTML of the p element).
        errorMsg.innerHTML = hasSpaces;
        // Resets the userSavedWord to an empty string (i.e. so that any previously entered word is removed).
        userSavedWord = "";
        // If the word doesn't include spaces, run this codeblock:
    } else {
        // Sets userSavedWord variable to the words that the user's inputted.
        userSavedWord = userWord;
        // Displays confirmation message.
        confirmMsg.innerHTML = `"${userSavedWord}" has been saved, now it's time to generate a definition or a poem!`
        // TASK 13: Saves the user's word to the browser, setting the key name and the value to the word itself.
        localStorage.setItem(`${userSavedWord}`, JSON.stringify(userSavedWord));
        // Calls function to display word history button.
        createBtn();
    }
});

// TASK 3 and 6: Listens for a click event on the poem button and calls function.
poemBtn.addEventListener("click", function (e) {
    // Prevents the default behaviour (i.e. reloading the page).
    e.preventDefault();
    // Validates the word input by checking it's not empty (i.e. if the length of the value is zero, run this codeblock).
    if (userSavedWord.length == 0) {
        // TASK 15: Displays error modal.
        errorModal.show();
        // Displays error message in modal (i.e. sets the inner HTML of the p element).
        errorMsg.innerHTML = unsavedWord;
        // If user's inputted a word, run this codeblock.
    } else {
        // Removes invisible class from Bootstrap spinner (so displays this).
        loadingSpinnerP.classList.remove("invisible");
        // Clears any previous poem from p element.
        poemText.textContent = "";
        // Clears any previous poem's title and author from p element.
        poemInfoText.textContent = "";
        // Resets the poemInfo (i.e. poem title and author) to an empty array (i.e. so that any previously poem title and author are removed).
        poemInfo = [];
        // Resets count to zero (so that fetch function will be called ten times with new word).
        count = 0;
        // Calls function to get a random poem from the Poetry API.
        getPoem();
    }
});

// TASK 9: Listens for a click event on the definition button and calls function.
definitionBtn.addEventListener("click", function (e) {
    // Prevents the default behaviour (i.e. reloading the page).
    e.preventDefault();
    // Clears any previous definition from p element.
    definitionText.textContent = "";
    // Validates the word input by checking it's not empty (i.e. if the length of the value is zero, run this codeblock).
    if (userSavedWord.length == 0) {
        // TASK 15: Displays error modal.
        errorModal.show();
        // Displays error message in modal (i.e. sets the inner HTML of the p element).
        errorMsg.innerHTML = unsavedWord;
        // If user's inputted a word, run this codeblock.
    } else {
        // Removes invisible class from Bootstrap spinner (so displays this).
        loadingSpinnerD.classList.remove("invisible");
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
        // Sets the historyWord (from the browser) as userSavedWord.
        userSavedWord = historyWord;
        // Displays confirmation message.
        confirmMsg.innerHTML = `"${userSavedWord}" has been retrieved, now it's time to generate a definition or a poem!`
        // Clears any word, definition and/or poem (i.e. from previous word).
        inputText.value = "";
        definitionText.textContent = "";
        poemText.innerHTML = "";
        poemInfoText.textContent = "";
    }
});