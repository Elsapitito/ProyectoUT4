# React Proyect Unit 4

This project is a React application with various components and features, including API integration, user authentication, state management using `useReducer`, responsive design, speech recognition, data reporting and a chat overlay.


## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Context Providers](#context-providers)
- [API Integration](#api-integration)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features
- **API Integration:** Fetches jokes from a public API and displays them.
- **User Authentication:** Includes a login form to simulate user authentication.
- **State Management:** Uses `useReducer` for managing a shopping list.
- **Responsive Design:** Components adapt to different screen sizes using React Bootstrap.
- **Speech Recognition:** Implements speech-to-text functionality using the `react-speech-recognition` library.
- **Data Reporting:** Generates PDF reports with data filtering and charting using `jsPDF`, `autoTable`, `PapaParse`, and `react-chartjs-2`.
- **Chat Overlay:** Integrates a chat component with a virtual comedian using the Gemini API.
- **Theme Toggling:**  Allows users to switch between light and dark themes using a custom theme context.

## Technologies Used
- React
- React Router
- React Bootstrap
- react-speech-recognition
- jsPDF
- autoTable
- PapaParse
- react-chartjs-2
- node-fetch
- express
- cors
- dotenv

## Installation
1.  Clone the repository:

    ```
    git clone <repository-url>
    ```

2.  Navigate to the project directory:

    ```
    cd <project-directory>
    ```

3.  Install the dependencies:

    ```
    npm install
    ```

## Usage
1.  Start the development server:

    ```
    npm start
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

## Components
### Broma (API Joke Component)
Fetches a random joke from the [Official Joke API](https://official-joke-api.appspot.com/) and displays it.  A modal appears after 5 seconds to reveal the punchline, with options to fetch a new joke or close the modal.

### Login
A simple login form that captures user name, email, and password. It uses a context to manage and display the login data.

### NavBar
The navigation bar component with links to different sections of the application, a theme toggle button, and a user icon.

### ListaCompra (useReducer)
A shopping list component that uses `useReducer` to manage the list state.  Allows users to add, remove, and clear items from the list.

### ComponentesResposive
Demonstrates responsive design using React Bootstrap components, adapting to different screen sizes.  Includes buttons to toggle the visibility of components.

### ChatComponent
A chat interface that interacts with a virtual comedian via an API.  Allows users to send messages and receive humorous responses.

### Dictaphone (ReconocimientoVoz)
Implements speech recognition functionality, allowing users to input text using their voice. Uses react-speech-recognition library

### ChatOverlay
Provides a fixed chat button to toggle the visibility of the ChatComponent.

### Informes
Generates PDF reports with data filtering and charting.  Allows users to filter data by difficulty and hero type, and view the results in a table or chart.

### BotonTema
Allows the user to toggle between light and dark themes.

## Context Providers
### LoginContext
Provides a context for managing login data.

### ClaroOscuroProvider
Provides a context for managing the theme (light or dark) and related colors.

## API Integration
### Gemini API
The chat component integrates with the Gemini API to provide responses from a virtual comedian.

#### Server Setup (server.js)
1.  **Dependencies**: Uses `express`, `cors`, `node-fetch`, and `dotenv`.
2.  **Environment Variables**: Requires a `GEMINI_API_KEY` to be set in the `.env` file.
3.  **API Endpoint**: `/chat` receives user messages, sends them to the Gemini API, and returns the response.
4.  **Conversation History**: Maintains a conversation history to provide context for the AI.

#### API Key
You'll need to obtain a Gemini API key and set it as an environment variable.  Make sure to create a `.env` file in the root of your project and add:
GEMINI_API_KEY=YOUR_GEMINI_API_KEY

## Environment Variables
The project uses environment variables for configuration. Create a `.env` file in the root directory of the project and add the following:
GEMINI_API_KEY=your_gemini_api_key

Replace `your_gemini_api_key` with your actual Gemini API key.

## Contributing
Contributions are welcome! Please follow these steps:
1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Test your changes.
5.  Submit a pull request.

## License
[MIT](LICENSE)
