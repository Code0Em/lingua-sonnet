# LinguaSonnet

## Contents

* [Introduction](#introduction)
* [Build](#build)
* [Design](#design)
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Acknowledgments](#acknowledgments)
* [References](#references)


## Introduction

### Project Brief

The aim of this project was to collaboratively build a web application, which meets the following criteria:

* Makes use of `Bootstrap` and (at least) two server-side APIs.
* Uses modals (rather than alerts, confirms or prompts).
* Is interactive (e.g. accepts and responds to user input).
* Makes use of client-side storage to store persistent data.
* Has a polished user interface.

### Project Description

To meet the above brief, the project team conceptualised _“LinguaSonnet”_.

LinguaSonnet is a web application which seamlessly combines word learning with poetry, allowing users to access word definitions and examples of the word in a poem.

### The Problem and Solution

_Problem: Understanding the meaning of English words and how they might be used in poetry._

LinguaSonnet provides a novel solution to word learning; a one-stop-shop for users to access word definitions and examples of how the word is used in a well known poem.

### User Story and Primary Audience

_Story: As a student learning the English language, I want to find out the meaning of English words and examples of how the word is used in “real life” (e.g. poetry), so that I can understand how to use the word in my own English speech and writing._

Further to the user story, LinguaSonnet’s primary audience is people studying and learning the English language. This may include users who are learning English as a second language or (in fact) anyone looking to expand their vocabulary of the English language.

## Build

### Phases of the Build

#### Proposal

* *Project conceptualisation:* Consider ideas to meet the project brief, agree upon these and define the project title and description.

* *User story and audience:* craft a user story and identify the primary audience.

#### Research

* *Potential APIs:* explore options for APIs and read the subsequent API documentation.

* *Design resources*: research options for images, font and other styling.

* *Front-end frameworks:* consider possible options for frameworks and review Bootstrap’s documentation.

#### Planning

* *Tasks:* identify the required tasks to build the project and the roles each project team member will take, create a [Kanban Board](https://github.com/users/Code0Em/projects/2) with GitHub Projects to help visualise this and track progress.

* *Wireframes:* create a [visual representation of the project's interface](#wireframes), and create subsequent iterations/versions of this (as required).

#### Build

* *GitHub Repo:* create a GitHub repository for the project.

* *HTML:* create the basic structure of the HTML file, including links to front-end frameworks (as required).

* *CSS:* create the CSS file, to style and layout the application.

* *JavaScript:* write pseudocode to outline the logic and flow of the program, and build Javascript to implement the functionality of the application.

### Built With

As per the project criteria, some of the application’s styling relies upon `Bootstrap`.

The application is built with `vanilla javascript`, and the `javascript` file has been commented throughout with pseudocode (breaking the project into tasks, and comments have been added to explain the functionality of the code).

The application also makes use of `local storage` to save users’ previously searched words and the following two APIs to retrieve word definitions and poems:

* [`PoetryDB`](https://github.com/thundercomb/poetrydb#readme).
* [`Free Dictionary API`](https://dictionaryapi.dev/).

## Design

### Wireframes

1. **Proposal stage**

      ![Excalidraw version](/assets/img/wireframe01.png)
      
2. **Redesigned structure**

      ![Figma version](assets/img/wireframe02.png)

3. **Mockups in Figma**

      ![version 01](assets/img/wireframe03.png)

      ![version 02](assets/img/wireframe04.png)

      ![version 03](assets/img/wireframe05.png)

### Design Resources:

 - Quill Icon from [FlatIcon](https://www.flaticon.com/free-icons/write).

 - Hero image from World Book Day ([Freepik](https://www.freepik.com/free-vector/flat-world-book-day-landing-page-template_23671548.htm)).

 - Serif Font: Solway
   Author: Mariya V. Pigoulevskaya,The Northern Block ([Google Fonts](https://fonts.google.com/specimen/Solway)).

 - Cursive Font: Rochester 
   Author: Sideshow, Principal design ([Google Fonts](https://fonts.google.com/specimen/Rochester/about)).

 - Serif Body Font: Noto Serif 
   Open Font License ([Google Fonts](https://fonts.google.com/specimen/Rochester/about)).

 - Color swatches ([Coolors](https://coolors.co/)).

 - Initial Wireframe: [Excalidraw](https://excalidraw.com/)

 - Final Wireframes: [Figma](https://www.figma.com/file/xoPXnb1ccMeaeD6PsbHd1D/Bootcamp-Project-1?type=design&node-id=0%3A1&mode=design&t=Z9o1z2tuMld0zLTy-1)

 - Fluid Jumbotron style containers and cards ([Bootstrap](https://getbootstrap.com/docs/5.0/examples/heroes/)).

 - Bootstrap cheatsheet ([Hackertheme](https://hackerthemes.com/bootstrap-cheatsheet/)).

 ## Installation

N/A

## Usage

Users navigate to the webpage via the URL ([LinguaSonnet](https://code0em.github.io/lingua-sonnet/)). When on the page, users are presented with a navigation bar, hero banner, three horizontal sections (for the “Definition”, "Poetry” and “Previously Saved Words”) and a footer. The navigation bar contains the application’s name and logo (which, if selected by the user, refreshes the page) and links to the top of the page (“Home”) and the third section (“Previously Searched Words”).

The hero banner includes imagery, text to explain the application’s use, and an input field with a save button (for the user to enter and save a word).

Until the user saves a word and generates a definition and/or poem, the Definition, Poetry and Previously Saved Words sections remain unpopulated.

If the user selects the save button without entering text in the input field or includes white spaces, an error modal is displayed. Equally, if the user selects the generate definition or poem buttons without saving a word, an error modal is displayed.

Upon entering a word and selecting the save button, a confirmation message is displayed below the save button and a button (labelled with the user’s word) is displayed in the Previously Saved Words section. (This word is also saved to the browser). The user then has the option to generate a definition and/or poem via the respective buttons.

If the user’s word is unknown to the Dictionary API (e.g. not from the English language), an error modal will be displayed. If a poem including the user’s word cannot be found from the Poetry API, an error modal is displayed.

When a definition and/or poem has been found, these are displayed in their respective sections.

When the user selects a “previously saved word” button, the word is retrieved from the browser, a confirmation message is displayed below the save button, and the user has the option to generate a definition and/or poem for this word again.

On a resolution of 1400px, the application will load and display as follows:

![Screenshot of LiguaSonnet application on initial load page](assets/img/Webpage.png)

On the same resolution where the user has successfully saved a word and generated a definition, the application will display as follows:

![Screenshot of LiguaSonnet application where user has saved word and generated definition](assets/img/linguasonnet-demo-definition.png)

## Credits

Credits have been included in the code comments of the `javascript` file and cited above (under [Design Resources](#design-resources)) and below (under [References](#references)).

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Acknowledgments

The project team conceptualised, designed and built _“LinguaSonnet”._

The team consists of [@codeswitchstudio](https://github.com/codeswitchstudio), [@Code0Em](https://github.com/Code0Em) and [@Sandesh2034](https://github.com/Sandesh2034).

## References

ChatGPT (2024) (https://chat.openai.com/chat).

Stack Overflow (2016) [*Fetch resolves even if 404?*](https://stackoverflow.com/questions/39297345/fetch-resolves-even-if-404).

Mojtaba Seyedi (2022) [*Call modal manually with vanilla JavaScript in Bootstrap 5*](https://www.youtube.com/watch?v=XUhdzIO6lgg).

