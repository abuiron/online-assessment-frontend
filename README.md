# Online Assessment Platform - Frontend

This repository contains the frontend code for the **Online Assessment Platform**, a comprehensive web application for managing and taking online exams. The platform provides functionalities for creating, managing, and participating in exams, with features like multiple question types, manual or automatic question selection, and more.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Live Demo](#live-demo)
- [Backend Repository](#backend-repository)
- [Technologies Used](#technologies-used)
- [Dependencies](#dependencies)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

The **Online Assessment Platform** is built to simplify the process of conducting online assessments, whether it be for academic purposes, professional testing, or quizzes. The frontend of the application provides a responsive and user-friendly interface for both examiners and examinees.

This frontend communicates with the backend API to handle user authentication, exam creation, and participation, providing a smooth experience across all devices.

## Features

- **User Authentication**: Login and registration functionalities.
- **Exam Management**: Create, edit, and delete exams with both manual and automatic question selection.
- **Question Management**: Add, view, and edit questions (multiple-choice, true/false, etc.).
- **Responsive Design**: Fully functional across all devices (desktop, tablet, and mobile).
- **Real-time Communication**: Interacts seamlessly with the backend API to provide real-time data updates.
- **CRUD Operations**: Complete Create, Read, Update, Delete functionalities for exams and questions.
- **Advanced Exam Settings**: Configure pass marks, negative marking, and time limits for each exam.

## Live Demo

The live version of the frontend is hosted at:
**[Live Frontend Link](https://online-assessment-portal.netlify.app)**

## Backend Repository

The backend for this project is built using Node.js, Express, and MongoDB. You can find the backend repository here:
**[Backend Repository Link](https://github.com/abuiron/online-assessment-backend)**

## Technologies Used

- **React**: For building the user interface.
- **React Router**: For handling navigation between different views.
- **Redux**: For state management.
- **Axios**: For making API requests to the backend.
- **Material-UI/Ant Design**: For UI components and styling.
- **Styled Components**: For custom CSS styling.
- **Lottie**: For animations.
- **Moment.js**: For date and time manipulation.

## Dependencies

Here’s a list of dependencies used in the frontend project:

## json
{
  "@emotion/react",
  "@emotion/styled",
  "@fontsource/roboto",
  "@mui/icons-material",
  "@mui/material",
  "@mui/styled-engine-sc",
  "@reduxjs/toolkit",
  "@testing-library/jest-dom",
  "@testing-library/react",
  "@testing-library/user-event",
  "antd",
  "axios",
  "bootstrap",
  "moment",
  "react",
  "react-bootstrap",
  "react-dom",
  "react-icons",
  "react-lottie",
  "react-redux",
  "react-router-dom",
  "react-scripts",
  "react-spinners",
  "redux",
  "styled-components",
  "web-vitals"
}


## Getting Started
To get a local copy up and running, follow these simple steps.

## Prerequisites
Make sure you have the following installed on your local machine:

  - Node.js (v14.x or later)
  - npm (v6.x or later)

## Installation
Clone the repository:

   ``bash
   git clone https://github.com/abuiron/online-assessment-frontend.git
   cd online-assessment-frontend

## Install dependencies:

   ``bash
   npm install

## Scripts
In the project directory, you can run the following commands:

  - npm start: Runs the app in the development mode. Open http://localhost:3000 to view it in the browser.
  - npm run build: Builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance.
  - npm test: Launches the test runner in the interactive watch mode.

## Folder Structure
  - src/: Contains all the source code for the application.
  - components/: Reusable UI components (buttons, forms, tables, etc.).
  - pages/: React components for the different pages of the app (e.g., Dashboard, Exam Creation, etc.).
  - services/: Axios configurations for making API requests.
  - assets/: Static files like images and icons.
  - styles/: Global stylesheets (CSS/SCSS).
  - utils/: Utility functions (e.g., form validation, formatting, etc.).

## Contributing
Contributions are welcome! If you'd like to contribute to this project, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch (git checkout -b feature/new-feature).
3. Commit your changes (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature/new-feature).
5. Open a pull request.