Database
=====
.. _database

Using the Database
~~~~~~~~~~~~~~~~~~
The database is a MongoDB DB. The program interacts with the database through the database builder and mangaer functions, and uses pgAdmin as a connector.
This section is used to show the structure of the database and various cases on inserting, updating and deleting data in the database.


How to use the Project:
~~~~~~~~~~~~~~~~~~~~~~~~


Getting Data from the Database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Firstly, you need to navigate through the GUI. 
--> Navigate the GUI

After navigating through the GUI, the user will need to select what data they want to pull from the database.

Selecting All Data
~~~~~~~~~~~~~~~~~~

To select all data from a table in the database, the user will need to input the name of the desired table. To prevent errors, check the Database ERD for the correct spelling of the table name. This will then call the dbManager class and run the selectAll method.

This will return all the data stored in the queried table.

Selecting Specific Data
~~~~~~~~~~~~~~~~~~~~~~~~

To select specific data from a table, the user will need to specify the criteria for the data selection. This will call the appropriate method in the dbManager class to fetch the desired data based on the given criteria.


Generating all the cards
~~~~~~~~~~~~~~~~~~~~~~~~~

The algorithm reads the database to extract information about where each of the cards are in current time. Whether this is in Todos, in progress or finished. This is so that the correct tables can then be populated so that the cards can be created in the correct columns each time and so that they are updated accurately.
