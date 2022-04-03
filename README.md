## Movies API - Recruitment Task

## Techstack

- Database: `MongoDb`
- Server: `Express.JS`
- Container System: `Docker, docker-compose`
- Code Versioning: `git / github`
- CI/CD: `Github Actions`
- IDE: `Local VSCode`

## Architecture

Current app architecture exposes 2 basic `bearer token` protected, endpoints for movies. Initialy the server starts with getting the `mongoDB` connection.

- When request comes from the client for geting the movies, it queries the mongoDB for user's added movies and respond back.
- When request comes from the client for add the movie, it will first check whether the user role is `basic` and exceed the allowed limit of `5` movies per calendar month or not. Based on the decision further request send OMDB database for the serach. For successfull movie response, its stored to `movies` database along with `userId` of the requested user.
- ##### Directories Explained
  - ###### routes
    - All the routes for movies service has been defined here with `v1` versioning structure. The routes are initialized with init function in `routes/index.js` file.
  - ###### services
    - Contains the business logic to process the endpoint requests.
  - ###### models
    - Contains the model files used in the app.
  - ###### handlers
    - Each resource route ex. `/movies` provided a dedicated route handler. Here all the verbs `get`, `put`, `post`... has been defined for the resource. And each verb for the route has been given a separate service file that contain the business logic of the endpoint.
  - ###### middlewares
    - Contains the middlerware functions we need to leverage. ex. `authGate.js`
  - ###### utils
    - Contains the basic app wide util feature reated files like `axios.js`, `constants.js`, `auth.js`, `db-config.js`.

## Configuration

- sample ENV. variables for ref.
  - ##### external API
    - OMDB_API_URL=https://www.omdbapi.com
    - OMDB_API_KEY=DONT_EXPOSE_KEYS
    - NODE_ENV=development
  - ##### Database
    - MONGODB_USER=root
    - MONGODB_PASSWORD=123456
    - MONGODB_DATABASE=movies_db
    - MONGODB_LOCAL_PORT=7017
    - MONGODB_DOCKER_PORT=27017
    - APP_PORT=4000

## Documentation

- ##### API docs
  - Available at [Movies Service API Doc](https://documenter.getpostman.com/view/2956533/UVyswvSC)
- ##### Postman
  - ##### Collection:
    - `docs/postman/dev-nodejs-recruitment-task-collection.json`
  - ##### Environment variables:
    - `docs/postman/dev-nodejs-recruitment-task.postman_environment.json`

## Setup / Usage

- ##### Step1:

  - In order to prevent providing multiple env. variables at the time of starting the app, all the variables are added to .env.sample file except the sensitive OMDB_API_KEY.
  - Please rename the `.env.sample` to `.env` in order for app to receive the required env. variables.

- ##### Step2:
  - spin up the docker containers by following `docker-compose` command at the root of the directory where `Dockerfile` and `docker-compose` exists.

> Note: Mostly all the required env. variables will be referenced from .env, except the sensitive OMDB_API_KEY file available at the root along with Dockerfile and docker-compose.yml. Since the API key is sensitive, it will be sent on different medium


```
OMDB_API_KEY=<api_key> docker-compose up
```

- #### Spin down the containers
  execute following command

```
docker-compose down
```
