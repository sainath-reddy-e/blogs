# Blogs

> Node.js Api for creating blogs.

## Features

- login
- register
- get all users
- get single user
- update user details
- delete user
- create blog
- get blogs
- get single blog
- update blog
- delete blog



### Env Variables

Create a .env file in then root and add the following

```

NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri(you have to create a mongoDB atlas account)
JWT_SECRET = 'abc123'

```

### Install Dependencies (make sure you are in root folder)

```
npm install

```

### Run

```

# Run backend (:5000)
npm start

```

## Build & Deploy



### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@example.com (Admin)
123456

john@example.com (Customer)
123456

jane@example.com (Customer)
123456
```
