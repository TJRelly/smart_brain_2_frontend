# [Smart Brain - Face-Detection App](smart-brain-2-frontend.vercel.app)

## Goal
The goal is to create a user-friendly, engaging web app that goes beyond simple facial recognition by integrating image tracking, user management, and secure data handling to provide a comprehensive user experience.
Check it out here: [Smart Brain Live Site](smart-brain-2-frontend.vercel.app)

## Project Description
The Smart Brain face-detection app is a full-stack web application that leverages AI and facial recognition technology to detect multiple faces in uploaded images. This project demonstrates practical use of image recognition systems, focusing on user account management, secure authentication, and database interaction. The skills used in this project can help companies implement image processing solutions, user-centric applications, and secure data handling, all essential components in modern web applications.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript, React
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **API**: Clarifai API for facial recognition
- **Authentication**: JWT, bcrypt for password encryption

## Database Schema
- **Users**: Stores user account details and preferences.

## Functionality
- Users can register, sign in, and upload images for facial recognition.
- Detects and highlights multiple faces in uploaded images using the Clarifai API.
- Profile management allows users to view and edit their profile and track image history.
- Demo account available for exploration and testing without registration.
- Loading screen enhances user experience during API requests.

## Stretch Goals
- Real-time face detection using webcam or live video feeds.
- Integration with social media platforms for easy sharing of face recognition results.
- Custom image filters based on user preferences.

## User Flow
1. **Registration/Login**: Users sign up or log in using secure credentials.
2. **Upload Image**: Users upload an image, and the app processes it using the Clarifai API to detect faces.
3. **Profile Management**: Users can update their profile and review previous uploads.
4. **Demo Mode**: A demo account is available for new users to explore the full functionality without creating an account.

## API Challenges
- Addressing data inconsistencies and deprecated components in the Clarifai API.
- Implementing robust error handling for user authentication and image processing.

## Future Features
- **Webcam Integration**: Real-time face detection for enhanced user interaction.
- **User-Generated Content**: Allow users to share and comment on face detection results, enhancing engagement.
- **Images Database**: Tracks images uploaded by users and stores recognition results.
