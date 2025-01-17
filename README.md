This is a React + Spring Boot app for Supra Coder RAP program


## First-time Setup

### React Client
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
1. `yarn start` to start the web app
2. Make sure nodejs 18 is installed.
-  May need `export NODE_OPTIONS=--openssl-legacy-provider` in ~/.bashrc/~/.zshrc file


### Run Client
1. cd to `client` directory, and `yarn start` to start the web app

### Run MySQL docker container

### Spring-boot Server
#### First-time setup
1. Make sure MySQL docker container is running by checking `docker ps`.
1. If MySQL is not running,
- `docker run -p 3306:3306 --name dingo -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=dingo_db -e MYSQL_USER=wc -e MYSQL_PASSWORD=password -d mysql:8`

#### Run Backend
1. cd to `Backend` directory and run `mvn spring-boot:run`

