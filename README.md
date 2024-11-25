# Nota - Note Taking App API

Nota is a simple and efficient API for a note-taking application. It allows users to create, read, update, and delete notes.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/moris071651/nota.git
    cd nota
    ```

2. Start the application using Docker Compose:
    ```sh
    docker-compose up
    ```

3. The API will be available at `http://localhost:5000`.

### API Endpoints

**Note:** For all endpoints except `/register` and `/login`, you must include the `flask_session` cookie in the request headers.

- `GET /register` - See if user is logged in
- `POST /register` - Register a new user
- `GET /login` - See if user is logged in
- `POST /login` - Log in a user
- `GET /logout` - Log out a user
- `GET /notes` - Retrieve all notes
- `POST /note` - Create a new note
- `GET /note` - Retrieve a specific note
- `DELETE /note` - Delete a specific note
- `POST /update_note` - Update a specific note

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.