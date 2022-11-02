# Decide on a Progressive Web Application #

## Problem ##

Our targeted users are cooks and people who like to try and iterate on their own recipes. If we are building an app to solve their needs, we are going to need to build software that can exist on their mobile devices.

What are our options for Mobile Development?
How easy are these frameworks to use?
How do each of these options contribute to or take away from the UX?

## Considered Options ##

* React Native: out of scope for the constraints of this project
* Progressive Web Application
* Native App, built with html and javascriptbut wrapped in another framework.

## Decision Outcome ##

We decided to build in the style of a progressive web app because this will be an easier initial implementation and allow us to focus on the process rather than going down unnecessary rabbit holes of figuring out new frameworks. Additionally, the only viable framework for developing for native apps using html and js is Apache Cordova. Although it is relatively easy to get set up, there are many obstacles we eed to address if we are to pick a mobile platfor like iOS or Android.

Although it seems like a better User Experience to be able to open and use a Native Application, in the intrest of time PWA will be our method of development. Additionally, we can always wrap our PWA in the future due to its nature as a vanilla html/js project with minimal dependencies.