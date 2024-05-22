Database
=====
.. _database

Using the Database
~~~~~~~~~~~~~~~~~~
The database is a MongoDB DB. The program interacts with the database through the database builder and mangaer functions, and uses pgAdmin as a connector.
This section is used to show the structure of the database and various cases on inserting, updating and deleting data in the database.


Database ERD
~~~~~~~~~~~~~

.. image:: ERD.png

Generating a the cards
~~~~~~~~~~~~~~~~~~~~~~
The algorithm reads the database to extract the information needed on modules, lecturer and rooms, so they can be processed in generating the lectures which can then populate the lecture table in the DB, creating the timetable.

The algorithm reads the database to extract information about where each of the cards are in current time. Whether this is in Todos, in progress or finished. This is so that the correct tables can then be populated so that the cards can be created in the correct columns each time and so that they are updated accurately.
