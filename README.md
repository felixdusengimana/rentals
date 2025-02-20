# Rental Booking Platform

This is a full-stack rental booking platform, built with **Node.js** for the backend and **Next.js** for the frontend. The platform supports property listings, bookings, and Google OAuth authentication.

## Technologies Used

- **Backend**: Node.js, PostgreSQL, JWT, Nodemailer
- **Frontend**: Next.js
- **Authentication**: Google OAuth
- **Database**: PostgreSQL

## Backend Setup (Node.js)

### Prerequisites

- Node.js
- PostgreSQL
- Google OAuth credentials

### Environment Variables

Create a `.env` file in the `backend` folder and add the following variables:

```
# Google Auth
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
GOOGLE_CALLBACK_URL=<your_callback_url>

FRONTEND_URL=<your_frontend_url>

# JWT
JWT_SECRET=<your_jwt_secret>

# Session
SESSION_SECRET=<your_session_secret>

# Database
DATABASE_URL=<your_postgre_db>

# Server
PORT=5000

# Nodemailer
EMAIL_USER=<your_email>
EMAIL_PASS=<your_email_password>
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
```
## Installation
1. Clone the repository: ```git clone [<repository_url>](https://github.com/felixdusengimana/rentals)``
2. Navigate to the backend folder: ```cd backend```
3. Install the dependencies: ```npm install```
4. Start the backend server: bash Copy Edit: ```npm run start```
The backend will be running on http://localhost:5000.


## Frontend Setup (Next.js)

## Prerequisites
 - Node.js

### Environment Variables

Create a `.env` file in the `backend` folder and add the following variables:

```
NEXT_PUBLIC_BASE_URL=<your_backend_url>
```

## Installation
2. Navigate to the backend folder: ```cd frontend```
3. Install the dependencies: ```npm install```
4. Start the backend server: bash Copy Edit: ```npm run dev```
The backend will be running on http://localhost:5000.


## Google OAuth Authentication
Ensure you have Google OAuth credentials set up. Follow these steps to obtain them:

1. Go to Google Cloud [Console](https://console.cloud.google.com/).
2. Create a new project.
3. Navigate to APIs & Services > Credentials.
4. Create an OAuth 2.0 Client ID.
5. Add the Google Client ID and Google Client Secret to your .env file in the backend.

## Database Setup (PostgreSQL)
Make sure you have PostgreSQL installed and running. Create a new database and add its connection URL in the DATABASE_URL variable in the backend's .env file.

Example database URL:
```
DATABASE_URL=postgres://username:password@localhost:5432/database_name
```

If you already have docker installed in your device, run this command: ```docker compose up``` it will setup database and expose it to this url
```postgresql://lala_user:lala_password@localhost:5432/lala_rentals``` which you can use directly.

Running the App
Once both the backend and frontend servers are running, visit the following URLs in your browser:

Backend: ``http://localhost:5000``
Frontend: ``http://localhost:3000``

## Contributing
Feel free to fork this repository and submit issues or pull requests. Contributions are welcome!

## License
This project is licensed under the MIT License.
