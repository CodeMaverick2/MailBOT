# MailBOT

MailBOT is an automated email processing service built using Node.js, Express, Google APIs, OpenAI, and BullMQ for task queuing. This project integrates AI to categorize incoming emails and generates appropriate responses, while also supporting email fetching, OAuth2 authentication for Gmail, and handling tasks asynchronously using Redis.  

## Project Repository

The source code for this project is available on GitHub: [MailBOT Repository](https://github.com/CodeMaverick2/MailBOT)

## Live Demo

To see a live working demo of MailBOT, check out this [Google Drive link](https://drive.google.com/drive/folders/1s84OSqKel1UyQkW2WZcGEl5ibkKY0XTM?usp=drive_link).

## Features

- **Automatic Email Categorization:** Uses OpenAI's GPT-3.5 Turbo to analyze and categorize incoming emails as "Interested," "Not Interested," or "More Information."
- **Dynamic Email Response Generation:** Generates professional responses based on the categorized email content.
- **OAuth2 Authentication:** Securely authenticate and access Gmail accounts using Google's OAuth2.0.
- **Email Fetching and Management:** Fetch unread emails from Gmail and mark them as read after processing.
- **Task Queuing:** Utilizes BullMQ and Redis for efficient task queuing, ensuring all emails are processed asynchronously.
- **Error Handling:** Robust error handling across all services to ensure smooth operation and minimize failure impact.
- **Scheduling for New Emails:** Regularly checks for new emails every 60 seconds and schedules them for processing.
- **Modular Codebase:** Clean separation of concerns using services and controllers.

### Dependencies

The project relies on several Node.js packages to function correctly. Here is a list of the main dependencies and their purposes:

- **`express`**: A web framework for Node.js, used for creating the server and handling HTTP requests.
- **`googleapis`**: Google API client for Node.js, used to interact with Gmail for fetching and managing emails.
- **`nodemailer`**: A module to send emails from Node.js, used for sending automated responses.
- **`dotenv`**: Loads environment variables from a `.env` file into `process.env`.
- **`bullmq`**: A library for creating robust job queues in Node.js using Redis, used to manage email processing tasks.
- **`ioredis`**: A robust Redis client for Node.js, used for connecting to and managing Redis tasks.
- **`openai`**: The official OpenAI API client, used for generating email content using AI.
- **`google-auth-library`**: Provides authentication for the Google API client, including OAuth2.

## Local Setup

To run this project locally, follow the steps below:

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- [Redis](https://redis.io/download) (for task queue management)
- A [Google Cloud Platform](https://cloud.google.com/) project with Gmail API enabled
- An OpenAI API Key ([OpenAI API Key Signup](https://beta.openai.com/signup/))

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
GMAIL_USER=<your-gmail-username>
GMAIL_PASS=<your-gmail-app-password>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_REDIRECT_URI=<your-google-redirect-uri>
REFRESH_TOKEN=<your-refresh-token>
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=<your-redis-password-if-required>
OPENAI_API_KEY=<your-openai-api-key>
```

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/CodeMaverick2/MailBOT.git
    cd MailBOT
    ```

2. Install all required dependencies:

    ```bash
    npm install express googleapis nodemailer dotenv bullmq ioredis openai google-auth-library
    ```

3. Start the Redis server:
    ```bash
    redis-server
    ```

4. Run the server:
    ```bash
    npm run devenv
    ```

5. Open your browser and navigate to `http://localhost:3000`. The server should be running.

### Authentication Setup

- Visit the `/api/auth/google` route in your browser to initiate OAuth2 authentication with Google.
- Grant the necessary permissions to access your Gmail account.

## Error Handling

MailBOT uses comprehensive error handling to ensure smooth operation:

1. **Email Processing Errors:** If an error occurs while processing an email (fetching, categorizing, or responding), the error is logged, and the email is retried.
2. **Authentication Errors:** Authentication errors are captured, and the user is prompted to re-authenticate.
3. **Queue Errors:** If an error occurs during job scheduling or processing, the job is logged and retried.
4. **Network Errors:** Network-related errors are caught, and retries are attempted automatically for specific cases (e.g., fetching emails).

---
