This is a React + Spring Boot app for Supra Coder RAP program.  The app is writen in Java and JavaScript.

## React
#### First-time setup
1. Install `docker`
1. install `yarn`
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn
```
1. cd to `client` directory.  Install node.js `https://nodejs.org/en/download/`
1. Open a terminal, and `yarn install` all the dependencies

#### Run Client
1. cd to `client` directory, and `yarn start` to start the web app
Note. Please make sure nodejs 18 is installed.

## MySQL Database
1. The database is running in a MySQL docker container.  
1. Make sure MySQL docker container is running by checking `docker ps`.
1. If MySQL is not running, run the following command
- `docker run -p 3306:3306 --name dingo -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=dingo_db -e MYSQL_USER=wc -e MYSQL_PASSWORD=password -d mysql:8`

## Sping Boot 
#### First-time setup
1. Install `maven`
2. Make sure MySQL docker container is running.
   
#### Run Sping Boot Server
1. cd to `backend` directory and `mvn spring-boot:run`

## Tests
#### Run Jest Tests
1. cd to `client` directory, and `yarn test` to run jest tests

#### Run Integration Tests 
1. cd to `client` directory, and `yarn cypress` to run the integration tests

#### Run Java Unit Tests
1. cd to `backend` directory, and `mvn test` to run unit tests

