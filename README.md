# CSE 341 - Contacts API Project

This project is a RESTful API for managing a list of contacts, built with Node.js, Express, and MongoDB. It provides endpoints for all standard CRUD (Create, Read, Update, Delete) operations.

## Features

- **GET /contacts**: Retrieve a list of all contacts.
- **GET /contacts/{id}**: Retrieve a single contact by their ID.
- **POST /contacts**: Create a new contact.
- **PUT /contacts/{id}**: Update an existing contact.
- **DELETE /contacts/{id}**: Delete a contact.
- **API Documentation**: Interactive API documentation is available via Swagger at the `/api-docs` endpoint.

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository: `git clone https://github.com/S-A-oghene/cse341.git`
2. Navigate to the project directory: `cd cse341-project2`
3. Install the dependencies: `npm install`
4. Create a `.env` file in the root directory and add your `MONGODB_URI`.

## Running the Application

- **Development Mode:** `npm run dev` (uses nodemon for auto-reloading)
- **Production Mode:** `npm start`
