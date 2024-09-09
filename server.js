const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve a form for the user to input their data
app.get('/', (req, res) => {
    res.send(`
        <form action="/submit" method="POST">
            <label for="firstName">First Name:</label><br>
            <input type="text" id="firstName" name="firstName" required><br>
            <label for="lastName">Last Name:</label><br>
            <input type="text" id="lastName" name="lastName" required><br>
            <label for="age">Age:</label><br>
            <input type="number" id="age" name="age" required><br>
            <label for="schoolEmail">School Email:</label><br>
            <input type="email" id="schoolEmail" name="schoolEmail" required><br><br>
            <input type="submit" value="Submit">
        </form>
    `);
});

// Handle form submission and show submitted data
app.post('/submit', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const schoolEmail = req.body.schoolEmail;
    
    res.send(`
        <h1>Data Received</h1>
        <p><strong>First Name:</strong> ${firstName.toUpperCase()}</p>
        <p><strong>Last Name:</strong> ${lastName.toUpperCase()}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>School Email:</strong> ${schoolEmail}</p>
        <br>
        <p>You can also view this information in JSON format at:</p>
        <ul>
            <li><a href="/firstname">/firstname</a></li>
            <li><a href="/lastname">/lastname</a></li>
            <li><a href="/age">/age</a></li>
            <li><a href="/schoolemail">/schoolemail</a></li>
            <li><a href="/mydata">/mydata</a></li>
        </ul>
    `);
    
    // Save data to global variables (not recommended for production)
    app.locals.firstName = firstName;
    app.locals.lastName = lastName;
    app.locals.age = age;
    app.locals.schoolEmail = schoolEmail;
});

// Route for /firstname
app.get('/firstname', (req, res) => {
    res.send(app.locals.firstName.toUpperCase());
});

// Route for /lastname
app.get('/lastname', (req, res) => {
    res.send(app.locals.lastName.toUpperCase());
});

// Route for /age
app.get('/age', (req, res) => {
    res.send(app.locals.age.toString());
});

// Route for /schoolemail
app.get('/schoolemail', (req, res) => {
    res.send(app.locals.schoolEmail);
});

// Route for /mydata
app.get('/mydata', (req, res) => {
    res.json({
        first_name: app.locals.firstName.toUpperCase(),
        last_name: app.locals.lastName.toUpperCase(),
        age: app.locals.age,
        school_email: app.locals.schoolEmail
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
