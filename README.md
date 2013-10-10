# Flangular
version: 0.0.1
Author: Frank M. Taylor

License: copyright 2013 Frank M. Taylor and Alex Klock. All rights reserved

## About the Application
An HR application which can add employees, create an org chart, add skills for those employees, and even produce a "skill tree". 

## Technical Description:
 An app running on node.js, powered by mongoDB, delivered with angular.js, built by Grunt.js, designed with Stylus and laid-out with Flexbox. 

### Node
	+ The server runs on port 8895 of your localhost
	+ The entire application is one giant API.
	+ the files for node are in root/app
### Mongo
	it creates two collections: skills and employees
### angular
	four controllers (only using three of em)
	+ controller for website functionality. just handles the navigation elements, logo. 
	+ controller for employees. add, edit, remove, and get employee information
	+ controller for name. not currently in use
### Grunt
	+ Grunt builds the Stylus into two stylesheets: one that uses flexbox and one that uses the regular layout
	+ grunt also concatenates the angular controller files into one controller
	+ grunt concatenates jquery and jqueryUI
	+ grunt watches the /public folder for changes to HTML, .styl, or JS and runs all of the afformentioned tasks
### Stylus
	+  every stylus file is organized by what it does: brand, layout, component
	+ In each folder there's an index.styl file. it's importing all of the styl files into it
	+ the master styl file is an import of the index.styls
	+ at the root of my CSS folder is a vars.styl file. this is where much of my brand information resides
	+ nib does all my CSS3 fallbacks
	+ if I do a layout in flexbox, it's labeled as such

## Getting Started
	install Node.js
	install npm (if it didn't come w/ node)
	install mongo DB
	run `node server.js` from the command line
	run `grunt` from the command line, while in the root folder

## DEVELOPMENT NOTES:

## To do:
+ Mongo
	+ Person collection
		* job title field maybe?
+ Angular
	*migrate everything into an angular app
    * add-employee.html  needs a job title field
	* add-employee.html needs to show a proper confirmation when stuff is submitted
	* need to create a tree directive
	* need live refresh on the skill-tree.html
	* need live refresh on the org-chart.html 

+ Design/UI
    *  tree pages
    	* ability to update the item
    	* expand/collapse for more details
    	* minimize button for every level

## Bugs
+ Add skills page : there's weirdness when adding a skill, and then a child skill in the same session on the "add-skill page" Stuff doesn't always get added to the parent
+tree algorithm
	+	When you add a fifth level to the fourth level, the fourth level gets hoisted up to the very top - and is treated like it's a root. 
	+ seems to happen on the skills, now, not the employees. no clue as to cause since it's virtually identical code




