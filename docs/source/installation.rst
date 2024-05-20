Installation
============

To set up the Teamwork App project, follow the steps below:

Cloning the repository using Git
---------------------------------

Clone the project repository from GitHub by following the steps outlined in the `GitHub Website <https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository>`_.

Python Link and Documentation
------------------------------

Download Python from the `official website <https://www.python.org/downloads/>`_ and refer to the `Python Documentation <https://docs.python.org/3/>`_ for any assistance.

The Python libraries used:
~~~~~~~~~~~~~~~~~~~~~~~~~~

- `PyMongo <https://pymongo.readthedocs.io/en/stable/>`_: Python driver for MongoDB.

Installation Guide For Python Libraries
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To install all required libraries for the Teamwork App, run the following command in your terminal:

.. code-block:: console

    pip install -r requirements.txt

- PyMongo

.. code-block:: console

    pip install pymongo

MongoDB Installation
~~~~~~~~~~~~~~~~~~~~

Download MongoDB from the `official website <https://www.mongodb.com/try/download/community>`_.

Once downloaded, follow these steps:

1. Install MongoDB on your machine.
2. Follow the setup instructions provided during the installation process.

Final setup
~~~~~~~~~~~

After installing dependencies and setting up MongoDB, complete the following steps:

1. Navigate to the ``Config.py`` file.
2. Enter the following information:
   - host: The hostname or IP address where MongoDB is running.
   - port: The port number MongoDB is listening on.
   - dbname: The name of the MongoDB database.

3. Save the changes in the file.

After making these changes, you can run the main algorithm code by executing ``algorithm_with_db functionality.py`` within a Python-compatible IDE. Run the example GUI (without backend functionality) from ``main.py``.
