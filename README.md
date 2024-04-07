# End-to-End Testing

This project uses Jest and Supertest for end-to-end testing of the API. The tests simulate real user interactions with the API and check that it behaves as expected.

To run the end-to-end tests, use the following command:

```sh
npm run test:e2e
```

This will start Jest and run all test files in the e2e directory. Each test file corresponds to a different part of the API.

# Install the project

To install the project, run the following command:

```sh
npm install
```

After that is necessary to create the .env file with the following content:

```sh
PORT = 3000
DATABASE_URL= postgres://<use>:<pass>@localhost:5432/my_store
API_KEY= 12345
JWT_SECRET='secret123456'
SMTP_EMAIL=your@email.com
SMTP_PASSWORD=password-email
```

In this case we are using docker to create the postgres database, so you need to have docker installed on your machine.

Then you can connect to the database and create the database with the following command:

```sh
docker-compose exec postgres bash
psql -h localhost -d my_store -U <user>
\d+
SELECT * FROM users;
DELETE FROM users WHERE id=<id>;
```


# Migrations

```sh
npm run migrations:run
```

# Run in dev mode

```sh
npm run dev
```

# Run in prod mode

```sh
npm run start
```
