# TODO-List
To-Do List Web App
This is a simple To-Do List web application built using HTML, Bootstrap, and JavaScript.

Table of Contents
  Introduction
  Features
  Usage
  Dependencies
  How to Run
  Contributing
  License
  
Introduction
  This web application allows users to create and manage their to-do lists. It provides a user-friendly interface with options to add new tasks, clear the   entire list, and delete individual tasks.

Features
  Add new to-do items with a title and description.
  Clear all to-do items from the list.
  Delete individual to-do items.
  Usage
  Enter the title and description of the to-do item in the designated input fields.
  Click the "Add Todo" button to add the to-do item to the list.
  To clear all items, click the "Clear All" button.
  Individual to-do items can be deleted using the "Delete" button next to each item in the list.
  
  To-Do List JavaScript Functions
    This JavaScript file (todo.js) contains functions to manage and update a To-Do List web application.
    
    Functions
    getandupdate()
    This function retrieves the values of the title and description from the HTML input fields. It then updates the local storage with the new to-do item. If no items are present in the local storage, a new array is created and the item is added. Otherwise, the new item is appended to the existing array.
    
    update()
    This function updates the To-Do List displayed on the web page by fetching the data from the local storage. It populates the HTML table with the stored to-do items, including the title, description, and a "Delete" button for each item.
    
    Event Listener
    An event listener is added to the "Add Todo" button, triggering the getandupdate() function when the button is clicked. Additionally, the update() function is called initially to display any existing to-do items.
    
    deleted(itemIndex)
    This function is responsible for deleting a specific to-do item. It takes the index of the item to be deleted, removes it from the local storage array, and then calls the update() function to refresh the displayed list.
    
    clearAll()
    This function prompts the user to confirm before clearing all to-do items from the local storage. If confirmed, it clears the local storage and calls the update() function to reflect the changes on the web page.
    
    Usage
    Include the todo.js file in your HTML document.
    Ensure that the HTML file contains elements with IDs "title," "description," "add" (for the "Add Todo" button), and "tablebody" (for the table body).
    The functions are automatically triggered when the "Add Todo" button is clicked, an item is deleted, or the "Clear All" button is clicked.
    Feel free to integrate these functions into your To-Do List web application.

Dependencies
  Bootstrap v4.4.1
  jQuery v3.4.1
  Popper.js v1.16.0  
  
How to Run
  Clone this repository to your local machine.
  Open the HTML file (index.html) in a web browser.

Contributing
If you would like to contribute to the development of this project, please follow these steps:
  Fork the repository.
  Create a new branch for your feature or bug fix.
  Make your changes and submit a pull request.
