# Decide on Home, View, Edit View MPA Flow#

## Problem

Our progressive web application should have multiple user interfaces. Each view should direct the user through a piece of our recipe app CRUD functionality.

- What kind of pages are necessary to address user functionality?
- What kind of views can be the same?
- How to we organize the flow of these pages?
- Are we able to go back?

## Considered Options

- SPA app, where the state of primary view is just changed
- MPA with a Home, View, Edit, and Add page
- MPA with a Home, Edit and Add page
- MPA with a Home, View and Edit/Add page
- Add page flows to view after saving
- Add page flows back to home page
- Will the View/Edit/Add Pages be the same

## Decision Outcome

We decided on a multi-page application that flows from home to view to edit pages. We chose this because it highlights each CRUD functionality and splitting the app into multiple pages allows individual teams to work on the product simultaneously, with minimal merge conflicts. Additionally, the add page will be a restructured edit page, without the values of the page filled in. This way we will minimize the amount of files in our repository and hopefully the amount of work taht needs to be done.
