# E-Commerce Website README

## Overview
This repository contains an E-commerce website project showcasing various functionalities such as product listing, user authentication, cart management, and more. The project consists of both client-side and server-side components.

## Client-Side Features
- **Product Listing**: Display 20 different products categorized by gender (male, female).
- **Authentication**: Provides login and signup pages for users to access their accounts.
- **Cart Management**: Allows users to add products to their cart, view cart items, and remove items from the cart.
- **Redux Integration**: Utilizes Redux for state management, with actions for adding and removing items from the cart.
- **Custom Hooks**: Handles GET requests using custom hooks to fetch data from the server.
- **Toast Notifications**: Utilizes toast notifications to provide feedback on user actions.
- **Routing**: Implements routing to navigate between different pages of the application.

## Server-Side Features
- **JWT Authentication**: Incorporates JWT authentication middleware for secure user authentication.
- **User Management**: Includes modules for user login, signup, and fetching user details after successful authentication.
- **Product Management**: Provides functionality to add products, fetch product details, and delete products from the cart.
- **Protected Routes**: Utilizes JWT tokens to protect routes and ensure authorized access to certain endpoints.

## Technologies Used
- **Frontend**: React.js, Redux, React Router, Axios, React-Toastify
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT
## Known Issues

### Issue 1: Inconsistent Behavior with "Add to Cart" Button

- **Description**: After adding an item to the cart, the "Add to Cart" button changes to "Go to Cart." However, after refreshing the page, the button reverts to its original state.
- **Status**: Investigating.
- **Workaround**: Manually navigate to the cart page after adding items.

### Issue 2: Quantity Increase Error

- **Description**: Increasing the quantity of an item in the cart sometimes results in errors or inconsistent behavior.
- **Status**: Investigating.
- **Workaround**: Avoid modifying item quantities until the issue is resolved.

### Issue 3: Lack of Database for Total Amount

- **Description**: Currently, there is no database integration to store the total amount of the cart.
- **Status**: Planning for implementation.
- **Solution**: Integrate a database to store and manage the total amount of the cart.

### Future Feature Suggestions

- **Product Description Page**: Consider adding a detailed product description page for each item.
- **Additional Signup Methods**: Explore adding alternative signup methods such as signup with Google or social media accounts.

### Other Known Issues

- *Insert description of other known issues here.*

## Getting Started
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install dependencies:
   - For frontend: `cd frontend && npm install`
   - For backend: `cd backend && npm install`
4. Set up environment variables:
   - Create a `.env` file in the `frontend` directory for frontend environment variables.
   - Create a `.env` file in the `backend` directory for backend environment variables.
5. Start the development server:
   - For frontend: `cd frontend && npm start`
   - For backend: `cd backend && npm start`

## Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:
1. Fork the repository
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request
