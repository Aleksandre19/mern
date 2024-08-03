<h1 align="center">MERN Stack Project | E-Commerce </h1>

The project is built from scratch using the MERN stack, which includes MongoDB, Express.js, React.js, and Node.js. It simulates an e-commerce website where users can browse products, add them to their cart, and complete the checkout process. Payment is handled using PayPal.

> **Please Note:** The project is deployed on [Render](https://render.com/) free tier, so it may take a few seconds to load.

- [Deployed version ](https://mern-o4kg.onrender.com/)

![Alt text](screenshot.png 'Home Page')

#### Run project locally

To run the project locally, follow these steps:

- download the project
- navigate to the project root directory
- run `npm install` to install the dependencies
- then navigate to the frontend folder
- run `npm install` to install the frontend
- find the .env file in the root folder
- fill up the missing credentials:

```
MONGODB_URI=<YOUR_MONGODB_URI>
MERN_JWT_SECRET=<SOME_JWT_SECRET>
PAYPAL_APP_SECRET=<YOUR_PAYPAL_APP_SECRET>
PAYPAL_CLIENT_ID=<YOUR_PAYPAL_CLIENT_ID>
```

#### Importing Data

After setting up the environment variables, you have to import the data.

- open the terminal
- nvigate to the project root folder
- run `npm run data:import`

If you want to delete the data, you can do it by running the following command:

- run `npm run data:delete`

Now you can run the project by running the `npm run dev` command.

#### Technologies Used

This project is built using the following technologies:

###### Main Dependencies

- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) (v2.4.3): Password hashing
- [colors](https://github.com/Marak/colors.js) (v1.4.0): Add colors to console output
- [cookie-parser](https://github.com/expressjs/cookie-parser) (v1.4.6): Parse Cookie header
- [express](https://expressjs.com/) (v4.19.2): Web application framework
- [joi](https://joi.dev/) (v17.13.3): Object schema validation
- [joi-objectid](https://github.com/mkg20001/joi-objectid) (v4.0.2): Joi extension for validating MongoDB ObjectIds
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) (v9.0.2): JSON Web Token implementation
- [lodash](https://lodash.com/) (v4.17.21): Utility library
- [mongodb](https://github.com/mongodb/node-mongodb-native) (v6.8): MongoDB driver
- [mongoose](https://mongoosejs.com/) (v8.5.1): MongoDB object modeling
- [multer](https://github.com/expressjs/multer) (v1.4.5-lts.1): Middleware for handling multipart/form-data
- [winston](https://github.com/winstonjs/winston) (v3.13.0): Logging library

###### Development Dependencies

- [concurrently](https://github.com/open-cli-tools/concurrently) (v8.2.2): Run multiple commands concurrently
- [dotenv](https://github.com/motdotla/dotenv) (v16.4.5): Loads environment variables from .env file
- [nodemon](https://nodemon.io/) (v3.1.4): Monitor for changes and automatically restart server

##### Products Dataset

> The products dataset was downloaded from [codeinstitute](https://codeinstitute.net/global/) which was used for milestone project.
