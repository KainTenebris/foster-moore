# Foster Moore Coding Challenge
## Data Handling - database.js
After some research I decided to use IndexedDB to store the data, as I do not have access to a server-side database, nor experience working with PHP. If the form were to be used it would require a server-side database to store data for access from multiple Browsers.

The JavaScript to handle database calls was placed into its own file since both HTML files need to call the database. 

## Input Form - index.html
I created a HTML file to receive the input, using \<form\> tags. Since there were date and image fields I used input types of date and file to avoid data validation, and a drop-down menu for the Country of Birth.

## Summary of Data - summary.html
A secondary HTML file contains a HTML table, and a small JS script which calls functions from database.js to retrieve the data stored in the Browser and display it.

## CSS - styles.css
The final file contains CSS whish aligns and resizes the HTML components, applying to both HTML files since there was some overlap.
