# Word Scramble React Setup Guide

This document provides step-by-step instructions to set up and run the Word Scramble React application.

## Prerequisites

Make sure you have the following installed on your system:
- Node.js (version 14 or higher)
- npm (usually comes with Node.js)

## Setup Instructions

1. Navigate to the project directory in your terminal:
   ```
   cd word-scramble-react
   ```

2. Install all required dependencies:
   ```
   npm install
   ```
   This might take a few minutes to complete.

3. Start the development server:
   ```
   npm start
   ```

4. Your default web browser should automatically open with the application. If it doesn't, open your browser and navigate to:
   ```
   http://localhost:3000
   ```

5. You should now see the Word Scramble game running in your browser. Enjoy!

## Troubleshooting

- If you encounter an error about missing dependencies, try running `npm install` again.
- If the application fails to start, make sure port 3000 is not being used by another application.
- For any other issues, please refer to the React documentation or the README.md file.

## Building for Production

If you want to create a production build of the application:

1. Run the build command:
   ```
   npm run build
   ```

2. The optimized production files will be created in the `build` folder.

3. You can serve these files using any static file server. 