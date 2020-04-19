## HACKERBAY TEST 1

It's a Simple Stateless Microservice in Node JS, with three major functionalities:

* Authentication
* JSON patching
* Image Thumbnail Generation

```
test1/
  config/
    config.js
    winston.js
  docs/
    definitions.yaml
    options.js
  test/
    login.js
    patch.js
    thumb.js
  tmp/
    image.jpg
    image-50x50p.jpg
  src/
    api/
      controllers/
        login.js
        thumb.js
      middleware/
        auth.js
      routes/
        login.js
        patch.js
        thumb.js
      utils/
        downloadImage.js
  app.js
  .babelrc
  .dockerignore
  .eslintrc.js
  .gitignore
  Dockerfile
  package-lock.json
  package.json
  README.md
```
Structure of the Project.


## Available Scripts

In the project directory, you must run:

### `npm install`

Install project dependencies to start the project.

### `npm start`

Runs the server in the development mode.<br>
Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs) to view the Swagger UI api description. You can interact with this one.

### `npm test`

Run the Unit test for the project.