# Molehill

Web application built with React, Redux, Redux-observable, Styled-components and Typescript.
The server is also written with Typescript and uses type-orm, type-graphql and a PostgreSQL database with PostGIS.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

First you need to download and install the PostgreSQL DBMS

* [PostgreSQL](https://www.postgresql.org/download/)

Then create a db called molehilldb

* [How to create a PostgreSQL db](https://stackoverflow.com/questions/30641512/create-database-from-command-line)

And set your postgres password as an environment variable if necessary

```
export PGPASSWORD=YOUR_PASSWORD_HERE
```

### Installing

You can start the server by running this command from the `server` directory:

```
yarn run dev
```

And start the app from the `app` directory with:

```
yarn run start
```

Now the app should open on http://localhost:3000/.
