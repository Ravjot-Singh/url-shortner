# URL Shortener

A simple Node.js application to shorten URLs and redirect users to the original URLs. Built with Express and MongoDB.

## Features

- Shorten any valid URL
- Redirect to original URL using the short code
- RESTful API endpoints
- Error handling and validation

## Technologies Used

- Node.js
- Express
- MongoDB (Mongoose)
- dotenv
- CORS

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
    ```
    git clone https://github.com/Ravjot-Singh/url-shortner.git
    cd url-shortner
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Create a `.env` file in the root directory and add:
    ```
    MONGODB_URL=<your-mongodb-connection-string>
    PORT=8000
    ```

### Running the Application

```
npm start
```

The server will start on `http://localhost:8000` (or your specified port).

## API Endpoints

### Shorten a URL

- **POST** `/url`
- **Body:** `{ "originalURL": "https://example.com" }`
- **Response:** Shortened URL object

### Redirect to Original URL

- **GET** `/url/:shortURL`
- Redirects to the original URL.

## Hosting link

https://url-shortener-deployment.onrender.com

## Author

Ravjot Singh
