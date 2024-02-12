# Node.js CRUD Application

This is a simple Node.js CRUD application with webpack and the 'http' library. It uses ESM modules and includes routes for managing user data in a global array.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/node-crud-app.git
   cd node-crud-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the root directory and set the PORT variable:

   ```bash
   PORT=4000
   ```
   
## Usage

### Development Mode
#### Run the application in development mode using nodemon or ts-node-dev:

   ```bash
   npm run start:dev
   ```
### Production Mode
#### Build and run the application in production mode:

   ```bash
   npm run start:prod
   ```

## API Routes
### GET 'api/users' is used to get all persons
#### Server should answer with status code 200 and all users records

### GET 'api/users/{userId}'
#### Server should answer with status code 200 and record with id === userId if it exists
#### Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
#### Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

### POST 'api/users' is used to create record about new user and store it in database
#### Server should answer with status code 201 and newly created record
#### Server should answer with status code 400 and corresponding message if request body does not contain required fields

### PUT 'api/users/{userId}' is used to update existing user
#### Server should answer with status code 200 and updated record
#### Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
#### Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

### DELETE 'api/users/{userId}' is used to delete existing user from database


## Users are stored as objects that have the following properties:
#### id — unique identifier (string, uuid) generated on server side
#### username — user's name (string, required)
#### age — user's age (number, required)
#### hobbies — user's hobbies (array of strings or empty array, required)

### Example:
```
{
    "username": "User",
    "age": 21,
    "hobbies": ["hobby1", "hobby2", "hobby3"]
}
```