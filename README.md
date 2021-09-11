1.	Follow the steps to install docker
a.	https://www.youtube.com/watch?v=_9AWYlt86B8&t=251s
b.	Deploy mysql: 
i.	https://medium.com/containerum/how-to-deploy-mysql-in-docker-containers-ba870247eff7
c.	Add DB Navigator in intellij: 


Food-truck-api: Backend Setup
•	Install Java 16(OpenJDK)
•	Install Docker:
o	Go this link: https://docs.docker.com/desktop/windows/install/
o	Choose Hyper-V backend and Windows containers to install docker
o	For installation you can follow this tutorial as well (https://www.youtube.com/watch?v=_9AWYlt86B8&t=251s)
o	Setup Project in IntelliJ
	Import the project at the food-truck-finder parent dir (root of repository) into IntelliJ using existing sources
	Import the inner food-truck-api sub directory 
•	Go File > Project Structure > Modules > + > Import Module
•	For this, choose to import using external model with Gradle
•	IntelliJ should autodetect your Gradle project and download dependencies
	Configure Lombok
•	Install Lombok Plugin for IntelliJ (IntelliJ IDEA > Preferences > Plugins ... Search for "Lombok" by Michail Plushnikov)
•	Enable Annotation Processing in IntelliJ Compliation (IntelliJ IDEA > Preferences > Build, Execution, Deployment > Compiler > Annotation Processors > Check "Enable annotation processing")
o	Deploy MySql: https://medium.com/containerum/how-to-deploy-mysql-in-docker-containers-ba870247eff7
o	From IntelliJ, create the default food-truck-finder database on the server: File > New > Data Source > Mysql
	Configure the connection: 
	Name: FTF - Local
	Host: localhost
	Port: 3306
	User: root
	Password: password
o	Test Connection and hit OK
o	On the right-hand side of IntelliJ, click on the "Database" option
o	For the food-truck-finder database, right click and navigate to New > Database
o	Add a new database named food-truck-finder and hit OK

•	Startup the API from IntelliJ SpringBoot Run Configuration
o	Specify VM Options
 		-Dspring.profiles.active=development
Once you done that you will find this output





food-truck-frontend: Frontend Setup
•	Install VS-Code
•	Install node-js
•	In the terminal: Type this commands  
o	npm init
o	npm install --global yarn
o	Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
o	Check yarn version: yarn –version
o	Finally: yarn dev
•	Navigate to http://localhost:3000 - you should see the food truck application

