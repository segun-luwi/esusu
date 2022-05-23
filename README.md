## The node.js Esusu app

The node.js Esusu is a simple
platform that helps people save a fixed amount automatically every week and then one of the
members collects the money at the end of every month.

You can test the hosted version of `The node.js Esusu app` on <a href="https://esusu-nig.herokuapp.com/api/v1/health-check" target="_blank">Heroku</a>.

## API Documentation

[Postman Api Documentation](https://documenter.getpostman.com/view/9414699/UyxojjXs) To help you test and use the application.

## Requirements

* Node 14+
* Git

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/segun-luwi/esusu.git
cd esusu
```

```bash
npm install
create a .env file then copy the contents of .env.example file into .env and edit appropriately
```

## Steps for run project

To start the express server, run the following

```bash
npm run start
```

Open [http://localhost:5010](http://localhost:5010) and take a look around.


## Deploy to Heroku
You can also deploy this app to Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://devcenter.heroku.com/articles/deploying-nodejs)
