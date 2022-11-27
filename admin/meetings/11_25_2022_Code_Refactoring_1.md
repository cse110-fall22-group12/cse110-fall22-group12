# Refactory Meeting 1 Note #
**Date: 11.25.2022**\
**Time: 11:00 am - 12:00 pm**\
**Meeting Format: Zoom**

The goal of the meeting is to revise and standardize our code as a group, and we also want to find ways to optimize our code. 

## Attendance
- [x] Zheyuan Wang
- [x] Ruoxuan Li
- [x] John Chou
- [x] Elliot Lee
- [x] Deze Lyu
- [x] Jimmy Cho
- [x] Lucas Lee
- [x] Yunyi She
- [ ] Kristy Chan
- [x] Sebastian Pamudji

## Completed Tasks
* Set up Noshroom Development rules
  * Global Rules:
    * Use 2 spaces for indentation.
    * Use uncapitalized words for the name of files, class names, identifiers, and add dashes for spaces (avoid having too many words for a name if possible, one or two at best).
    * For all the identifiers and class names, add the name of your page before it and connect them with a dash.
      * Example: “home-title-label”, “view-edit-button”, “global-icon”, etc.
  * HTML Rules:
    * Use double quotes.
    * Use correct indentation.
    * Put the link to the google font before including other CSS files.
    * Follow the foundation code for creating the top bar, stage elements, and alert box.
    * Delete all the instruction documentations that guide developers to use the foundation code.
    * Only write documentations if the following HTML code is very hard to understand and also remember to put an empty line before the comment.
    * Minimize id’s and classes as much as possible
    * Use descriptive tags.
    * Remove all the testing code before committing the final version.
  * CSS Rules:
    * Use double quotes.
    * Write documentation using /* */ before every CSS block and add an empty line before it.
    * Write documentation using /* */ at the end of a line to explain it if the line is very confusing.
    * Try to use less identifiers and class names in the CSS files, which requires a redesign of the HTML code.
  * JavaScript Rules:
    * Use snake_case for variable names.
    * Use single quotes.
    * Use /** */ to document a function before it.
    * Use only @param and @return when the function has parameters or a return value.
    * Use the format: @param {type}	name		description
    * Indent the name and description so that they are horizontally aligned.
    * Use // to do inline documentations inside functions. 
    * Use // to document a block if it is doing something different than the code above.
    * The // documentation begins with an uncapitalized word and ends with a period or a colon.
    * Use /* global */ to specify the functions you are using in other files.
    * Add an empty line between every two functions.
    * Add an empty line before // inline documentations.
    * Document every function in the following way:
    * Add 1 empty line at the end of a file.
    * Declare the variable of the element before performing operations (adding event listeners) to it.
    * If a line is too long and Prettier breaks it into multiple lines with terrible indentations, then try to break it using variables.
    * One function per job. Split it when necessary.
  * Commit Message Rules:
    * Start a capitalized verb in the present tense and end with a period.
    * Describe the changes compared to the previous version.
    * Also mention the files you have edit (or at least describe the properties of the files).
    * Examples:
      * Good: Fix the bug in the edit.html so the home button directs back to the home page.
      * Good: Update readme.md to fix a grammar issue.
      * Bad: fix the bug!!!
      * Bad: I hate this!

## Tasks to be completed
* Team members should follow the new rules from now on and change the existing code according to the new rules. 
  
## Project Timeline
* Week 9: Refactoring code

## Decisions
* We have a set of development rules for HTML, CSS and Javascript
