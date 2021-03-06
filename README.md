# Backend challenge for HackerBay

My mission, should I choose to accept it, is to build simple stateless microservice in Nodejs, with three major functionalities - Authentication, JSON patching and Image Thumbnail Generation.

## Installation

To have this project running locally on your computer, first navigate to a directory and run the commands below:

`git clone https://github.com/charlesonunze/hb-backend.git`

`npm install`

## Set up your environment

Create a .env file and copy the contents in the .env.example file to it. Replace it with your own values.

## Running the application

In development mode, run `npm run watch` on the terminal and `npm run dev` on another terminal window to start the app and watch for changes.

In production run `npm start` on the terminal.

OR run the dockerized version of this app by running:

`docker run -p 7777:5001 --env PORT=5001 --env JWT_PRIVATE_KEY=0P3N_5353M3 charlesonunze/hb`

## Running Tests

To run the tests, run `npm test` on the terminal.

To get the test coverage, run `npm run coverage` on the terminal.
