
# Login & Signup API

A simple **Node.js** and **Express** backend project with **MongoDB** for handling user signup with password hashing using **bcryptjs** and rendering signup forms using **EJS**.

---

## Features Implemented So Far ✅

1. **User Signup**

   * Users can register with **name**, **email**, and **password**.
   * Passwords are **hashed using bcryptjs** before saving to the database.
   * Duplicate email check to prevent multiple registrations with the same email.

2. **MongoDB Integration**

   * MongoDB database (`youtube-app-1`) used to store user information.
   * Mongoose schema and model used for user management.

3. **EJS Templating**

   * Signup form created using **EJS**.
   * Rendered through Express routes.

4. **Express Router**

   * Routes separated into a **router** file (`routes/user.js`).
   * `/signup` GET route to render the signup form.
   * `/signup` POST route to handle form submission.

5. **Body Parsing Middleware**

   * Express middleware (`express.urlencoded` & `express.json`) used to parse incoming form and JSON data.

---

## Project Structure

```
project/
├── controllers/
│   └── user.js        # Handles signup logic
├── models/
│   └── User.js        # Mongoose schema for user
├── routes/
│   └── user.js        # User-related routes
├── views/
│   └── signup.ejs     # Signup form template
├── app.js             # Main server file
└── package.json       # Project dependencies
```

---

## Getting Started

1. Clone the repository:

```bash
git clone <repo-url>
cd login_signup_api
```

2. Install dependencies:

```bash
npm install
```

3. Make sure **MongoDB** is running locally.

4. Start the server:

```bash
node app.js
```

5. Open in browser:

```
http://localhost:5000/signup
```

---

## Dependencies

* **express** – Web framework
* **mongoose** – MongoDB ODM
* **bcryptjs** – Password hashing
* **ejs** – Templating engine

---

## Next Steps (Planned)

* Add **OTP email verification**.
* Add **user login** with JWT authentication.
* Add **password reset** functionality.



