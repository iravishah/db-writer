# db-writer

## Quick start

### Step 1: Prerequisite
+ Install Node.js - v8.0 or >=
+ Install MongoDB - v3.6 or >=
+ Install Redis

### Step 2: Create DB user for MongoDB
```sh
> use expressapi
switched to db expressapi
> db.createUser({user: "admin", pwd: "root", roles: ["readWrite", "dbAdmin"]})
Successfully added user: { "user" : "admin", "roles" : [ "readWrite", "dbAdmin" ] }
```
### Step 3: Install the dependencies
```sh
npm install
```
### Step 4: Run
```sh
npm run start
```
