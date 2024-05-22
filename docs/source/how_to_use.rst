=======================
How to use the Project
=======================

This page is to provide the user a clesr guide on how to use the Teamwork App as intended and to ensure they don't run into any issues.

## Getting Started with Create React App

This project was bootstrapped with `Create React App <https://github.com/facebook/create-react-app>`_.

### Available Scripts

In the project directory, you can run:

- **npm start**: Runs the app in the development mode.
- **npm test**: Launches the test runner in the interactive watch mode.

See the `Create React App documentation <https://facebook.github.io/create-react-app/docs/getting-started>`_ for more information.

.. _how_to_use:

How to use the Project:
=======================

Getting Data from the Database
===============================

Firstly, you need to navigate through the GUI. 
--> Navigate the GUI

After navigating through the GUI, the user will need to select what data they want to pull from the database.

Selecting All Data
==================

To select all data from a table in the database, the user will need to input the name of the desired table. To prevent errors, check the Database ERD for the correct spelling of the table name. This will then call the dbManager class and run the selectAll method.

This will return all the data stored in the queried table.

Selecting Specific Data
========================

To select specific data from a table, the user will need to specify the criteria for the data selection. This will call the appropriate method in the dbManager class to fetch the desired data based on the given criteria.
