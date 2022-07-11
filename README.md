# Description

**Shopping cArt** is a webstore for art and art supplies. After successful signup/login the user can shop. The user can add products to the cart, increase, decrease their quantity and buy them.  The order is added to the user instance as a property. Whenever an order is placed, the stock quantity for the product is decreased. If no more items are available, the product is listed as "Sold Out". In the user dashboard the user can see past orders, profile details and change profile details if needed. 

In addition the store owner can sign in as admin and add, modify or delete products without having to access the database. The owner can specify name, price, amount of units in stock, and add an image for the product. 

You can see and use the app running here on Heroku: https://shopping-art-555.herokuapp.com/

# Technologies
The technologies used are:
- React
- Node.js 
- MongoDB
- Further dependencies: react-dom, react-icons, react-router-dom, express, mongoose, multer, jsonwebtoken, cors, dotenv

The project is split up into two repositories:

https://github.com/Benjamin-Re/webstore-frontend

https://github.com/Benjamin-Re/webstore-backend

# Endpoints
Backend API's endpoints:
|Method|url|Use|
|-----|---|----|
|GET  |/products| Get all products |
|PATCH| /products/id| Decrease stock quantity when order|
|DELETE| /products/id| Delete a product|
|POST| /products/new| Add product|
|PATCH |/products/update/id |Update product details|
|||
|GET |/users| Get all users|
|GET |/users/id| Get one user|
|POST| /users/signup| Add user |
|POST| /users/login| User login|
|PATCH| /users/id| Add order to user|
|PATCH| /profile/id|Update user profile details|

# Run locally
To run this project locally, clone both of the repositories above. Since the backend is running on heroku, if you want to run it locally you will need to change the url in all requests the frontend makes to the API from https://enigmatic-temple-40493.herokuapp.com to http:localhost:YourPORT
Run npm install to download the dependencies. Start the backend and the frontend with npm install. The node version used is "16.14.2".

# Credits
Images from Unsplash and Pexels
  
Favicon from Dan's Tools: Follow @danstools00 favicon-generator.org

Initials profile image from: Initials	- Florian Körner - https://github.com/dicebear/dicebear
