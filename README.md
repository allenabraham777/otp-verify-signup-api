## Tech Stacks

Backend: NodeJS
Database: MongoDB
Caching: Redis
Container: Docker

Mailing Service: Send grid
Hosting: Linode

## Setting Up

Clone this repo into the system where you want to host it.

The entire app is dockerized, so there isn't any installation required in your system except docker, you can follow this [guide](https://docs.docker.com/engine/install/) to install docker. Due to few local development limitations I had to host the database in mongodb cloud, you can visit [mongodb.com](https://mongodb.com) for more details, or you can follow this [guide](https://docs.atlas.mongodb.com/tutorial/create-new-cluster/) to create a db and connect it to this application.

For the mailing service I use SendGrid (as 100 emails are free every month), so you require the api key inorder to send mails. You can follow this [guide](https://docs.sendgrid.com/for-developers/sending-email/api-getting-started) to setup your SendGrid account.

Create a new ```.env``` file and add the following details

```
DB_USERNAME=YOUR_DATABASE_USER
DB_PASSWORD=YOUR_DATABASE_PASSWORD
DB_DATABASE=NAME_OF_THE_DATABASE

REDIS_URL=redis://app_redis

SENDGRID_API_KEY=YOUR_SEND_GRID_API_KEY
FROM_EMAIL=EMAIL_CONFIGURED_IN_SENDGRID

TOKEN_SECRET=SOME_RANDOM_STRING
```

## Running the app

As the db is hosted online it will be up for full time. Now inorder to run the application, in the system you need to run the following command in the repo directory.

```docker-compose up --detach```

This will start the application in the background

### That's it the app is ready to use.
