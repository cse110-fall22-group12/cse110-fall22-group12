# Decide on a Diary Type of App #

## Context and Problem Statement ##

Our app is a 'local first' type of application. Meaning, we want to store our user inforamtion on the local device with the option of uploading to the internet or somewhere else. 

* What kind of applications can we build with this constraint?
* Will time be an issue with any of them?

## Considered Options ##

* Big data type app that gives you statistics on daily choices: outfits
* Calendar/diary entry where you log information with respect to the date: mood tracker
* App where you log and detail different things at your own pace: foods eaten

## Decision Outcome ##

The simplest way to make something useful out of this concept is to have some type of logging application that does not hold a concept of time. It simply has CRUD operations and the user can log these entries.
