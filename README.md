# Note-Taking Application API

This is a RESTful API for a note-taking application that allows users to create, read, update, and delete notes. User authentication is implemented to ensure that users can only access their own notes.

## Getting Started

To get started with this project, follow the steps below:

### Prerequisites

Before running the application, make sure you have the following installed:

- Node.js
- MySQL

### Installation 

1. Clone the repository:

 ```bash
   git clone https://github.com/Taherpatrawala/sequelize-notes.git
   ```
2. Install all the dependencies(Ensure you're in `sequelize-notes` directory):

  ```bash
   npm install
   ```
3. You need to create a MySql database and provide the necessary DB password and name in the config.json file:

  ```bash
   development": {
    "username": "root",
    "password": "Your password",
    "database": "Any database name you have given",
    "host": "localhost",
    "dialect": "mysql"
  }
   ```

## Testing Endpoints

You can test the API endpoints using tools like Postman or thunderclient on vscode. Here are the available endpoints:

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Authenticate a user and receive a JWT token.
- `POST /notes`: Create a new note.
- `GET /notes`: Retrieve all notes for the authenticated user.
- `GET /notes/:id`: Retrieve a specific note by ID.
- `PUT /notes/:id`: Update a specific note by ID.
- `DELETE /notes/:id`: Delete a specific note by ID.

Make sure to include the appropriate header:- `Authorization: Bearer <token>`, when testing notes endpoints.

To check pagination on `/notes` route, add a page number query in the URL eg: `http://localhost:3000/notes?page=2` .

## Note: Just for convenience, I have purposely kept the `.env` file in this repository.

## Technologies Used

- Express.js
- Sequelize (with MySQL)
- JSON Web Tokens (JWT) for authentication
- bcrypt.js for password hashing
- Express Validator for input validation
- CORS for enabling cross-origin requests

## Author

- Taher

