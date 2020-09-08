# Food Truck Finder

## Local Environment Setup
### food-truck-api: Backend Setup
* Install Java 14 (OpenJDK) if needed
    * Run `brew cask install java`
    * Consider using jenv: [https://www.jenv.be/](https://www.jenv.be/)
      * Install jenv if needed
      * Run `jenv add /Library/Java/JavaVirtualMachines/openjdk-14.0.2.jdk/Contents/Home`
* Install Docker Desktop for Mac from [DockerHub](https://docs.docker.com/docker-for-mac/install/)
    * Increase Memory for Docker Engine to at least 4.00 GB so SQL Server container has sufficient resources (Docker Desktop > Preferences > Resources > Memory, "Apply & Restart")
* Setup Project in IntelliJ
    * Import the project at the food-truck-finder parent dir (root of repository) into IntelliJ using existing sources
    * Import the inner food-truck-api sub directory
        * Go File > Project Structure > Modules > + > Import Module
        * For this, choose to import using external model with Gradle
        * IntelliJ should autodetect your Gradle project and download dependencies
    * Configure Lombok
        * Install Lombok Plugin for IntelliJ (IntelliJ IDEA > Preferences > Plugins ... Search for "Lombok" by Michail Plushnikov)
        * Enable Annotation Processing in IntelliJ Compliation (IntelliJ IDEA > Preferences > Build, Execution, Deployment > Compiler > Annotation Processors > Check "Enable annotation processing")
* Deploy MySql: `docker-compose -f ./docker/local.docker-compose.yml up -d`
    * If you need to stop the containers (`docker-compose -f ./docker/local.docker-compose.yml stop` or ctrl+C), you can 
    restart the containers with: `docker-compose -f ./docker/local.docker-compose.yml start`   
* From IntelliJ, create the default `food-truck-finder` database on the server: File > New > Data Source > Mysql  
    * Configure the connection:
      * Name: FTF - Local
      * Host: localhost
      * Port: 3306
      * User: root
      * Password: password
    * Test Connection and hit OK
    * On the right-hand side of IntelliJ, click on the "Database" option
    * For the food-truck-finder database, right click and navigate to New > Database
    * Add a new database named food-truck-finder and hit OK

* Startup the API from IntelliJ SpringBoot Run Configuration
    * Specify VM Options
	```
	-Dspring.profiles.active=development
	```
    ```
    GET localhost:8080/ping
    pong!
    ```
 
### food-truck-frontend: Frontend Setup
**Local Development Instructions (Mac):**
1. Install Homebrew if you don't already have it: https://brew.sh/
2. Run Homebrew to install Node: `brew install node`
3. Run Homebrew to install Yarn: `brew install yarn`
4. Navigate to the food-truck-frontend directory
5. Install frontend dependencies: `yarn install` 
6. Run the frontend dev server: `yarn dev` 
7. Navigate to http://localhost:3000 - you should see the food truck application

**Local Development Instructions (Windows):**

## Common Errors
**Issue**: `docker-compose up` fails with
`ERROR: Couldn't connect to Docker daemon. You might need to start Docker for Mac.`  
**Solution**: Ensure Docker Desktop for Mac is running locally (Spotlight Search Cmd+Space > Docker)

## Liquibase
* Changes are split up by domain and within each domain, are split between schema and data operations.
    * Example directory layout:  
    ```  
	 src/main/resources/db  
	 +-- changelog  
	 +-- db.changelog-0.0.1.yaml  
	 |   +-- db.changelog-master.yaml  
	 +-- orders  
	 |   +-- schema  
	 |   +-- data  
	 +-- campaigns  
	 |   +-- schema  
	 |   +-- data  
	 +-- ...  
	 |   +-- schema  
	 |   +-- data  
	```
  
* The changelog directory contains the master changelog and each commit/feature changelog.

* Determine the appropriate domain for the required DB changes, then split out between DDL (CREATE, ALTER, DROP, 
TRUNCATE, GRANT, REVOKE) and DML (SELECT, INSERT, UPDATE,  DELETE, MERGE) into schema and data directories, respectively. 
Each DDL changeset will need an appropriate rollback command since all DDL commands have implicit commits. DML changes 
do not need a rollback command as they will commit only at the end of completing the changes, and will not partial 
commit if a failure occurs part-way through.

* Create a changelog specific to the table that is being altered and increment the version as appropriate 
(i.e. schema/country-0.0.1.yaml is the first changeset to establish the country table, schema/country-0.0.2.yaml is a 
changeset to add a column to the country table).

* Create an overarching changelog for all of the changes associated with the commit/feature. i.e. changelog-0.0.1.yaml 
includes all the changes for setting up the country and country_subdivision tables associated with user story 56. 
Include a top-line comment on this change log and include the story number and title of the story for easy reference. 
Add the versioned changelog into the master changelog file.

* Changeset IDs: If you are creating a table or the first to insert data into a table, start the id with the ticket 
number and add a brief description of the action and table being affected (i.e. 56-create-country-schema). Each 
changeset id needs to be a unique identifier since that id is the primary key of the changelog table.

* Define the desired context(s) for the changes. For the project, the available environments are development & ci. Comma-separated contexts indicate "OR" -- for instance `context: "development, ci"` will apply 
the changes to development or ci, depending on the defined spring profile. Read more on Liquibase contexts 
[here](https://docs.liquibase.com/concepts/advanced/contexts.html). 