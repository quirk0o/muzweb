# MUZWEB

## Prerequisites
- JDK 1.8
- yarn
- maven
- postgres 9.4, db "muzweb" running on port 5432 with owner "postgres", password to db: "1234"

## Setup
```bash
yarn install
mvn clean install
```

## Scripts
- `cd web` => `mvn spring-boot:run`
- `npm start`
- `npm run-script start_windows`
- `npm package`
- `npm test`