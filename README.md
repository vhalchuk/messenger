# Messenger Realtime Chat App

This repository contains a real-time chat full-stack application built using NextJS, GraphQL, NodeJS, MongoDB, Prisma, and TypeScript.

## Technologies Used
- [NextJS](https://nextjs.org/): A React framework for server-side rendering and static site generation.
- [NextAuth.js](https://next-auth.js.org/) - The authentication framework used
- [Apollo GraphQL](https://www.apollographql.com/): A query language for APIs used to fetch data from a server.
- [NodeJS](https://nodejs.org/): A JavaScript runtime for building server-side applications.
- [MongoDB](https://www.mongodb.com/): A NoSQL database used to store and manage data.
- [Prisma](https://www.prisma.io/): A database toolkit used to simplify database management and provide a type-safe and scalable data access layer.
- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that adds features to the language to improve code maintainability and scalability.
- [Chakra UI](https://chakra-ui.com/): A component library


## Client architecture
The client part of this app is built using the [Feature Sliced Design](https://feature-sliced.design/) architecture. This architecture is a modular way of organizing your application code. It helps to achieve a high degree of separation of concerns, enabling the development of reusable and maintainable code.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

 - [Node.js](https://nodejs.org/en/) 
 - [MongoDB](https://www.mongodb.com/docs/manual/tutorial/getting-started/)
 - [Google OAuth2 credentials](https://developers.google.com/identity/protocols/oauth2)

### Installing client

1. Navigate to the client directory

2. Install the dependencies

```
npm install
```

3. Create .env file in the root directory and add the following environment variables as shown in [.env.example](client/.env.example)

4. Generate the database schema

```
npx prisma generate --schema=src/app/prisma/schema.prisma
```

5. Run the app

```
npm start dev
```

The app will now be running on [http://localhost:3000](http://localhost:3000)

### Installing server

1. Navigate to the server directory

2. Install the dependencies

```
npm install
```

3. Create .env file in the root directory and add the following environment variables as shown in [.env.example](server/.env.example)

4. Generate the database schema

```
npx prisma generate --schema=src/prisma/schema.prisma
```

5. Run the app

```
npm start dev
```

The app will now be running on [http://localhost:4000](http://localhost:4000)

*Inspired by the [Shadee Merhi's](https://www.youtube.com/@shadmerhi) [YouTube tutorial](https://youtu.be/mj_Qe2jBYS4)*
