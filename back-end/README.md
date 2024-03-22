# Project Build with TypeORM, Express and Docker, using TypeScript, MySQL and JWT with Bcrypt

Steps to run this project:
1. Run `npm install` command
2. Edit the name of .env.exemple folder to only .env
3. Run `docker-compose up -d` command to start the database
4. Run `npm start` command
5. Run `npm run migration migration:generate src/migrations/[$name-of-migration]` to create a new migration
6. Run `npm run migration:up` to run all migrations
7. Open the Postman or Insomnia to test the routes
8. Enjoy!
