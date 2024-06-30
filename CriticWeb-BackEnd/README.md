# CriticWeb BackEnd

This application was developed using Node.js, an open-source JavaScript runtime environment widely used to build scalable network applications.

## Installation

1. Clone the repository:

   - `git clone https://github.com/Dener-Fernandes/CriticWeb-BackEnd.git`.

2. Install dependencies:

   - `npm install`.

3. Add environment variables:

   - Create a `.env` file following the format of the `.env.example` file. Add the information according to the variable names.

4. Create a database:

   - You need to have Postgres installed on your machine. The graphical interface can be of your preference DBeaver, PgAdmin. Create a database and a schema, the names must be the same as defined in the `.env` file.

5. Run migrations:

   - Run migrations to create the database entities. Use the command: `npm run typeorm`.

6. Run the application:

   - `npm run start:dev`.

7. Access swagger documentation:

   - Use the url: `localhost:8080/criticweb/api-docs`.
