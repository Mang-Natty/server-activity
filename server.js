const express = require('express');
const app = express();

// Define personal data (replace with your own details)
const personalData = {
    firstName: "Nathaniel",
    lastName: "Nacario",
    age: 20,
    schoolEmail: "nat@school.swu"
};

// Route for /firstname
app.get('/firstname', (req, res) => {
    res.send(personalData.firstName.toUpperCase());
});

// Route for /lastname
app.get('/lastname', (req, res) => {
    res.send(personalData.lastName.toUpperCase());
});

// Route for /age
app.get('/age', (req, res) => {
    res.send(personalData.age.toString());
});

// Route for /schoolemail
app.get('/schoolemail', (req, res) => {
    res.send(personalData.schoolEmail);
});

// Route for /mydata
app.get('/mydata', (req, res) => {
    res.json({
        first_name: personalData.firstName.toUpperCase(),
        last_name: personalData.lastName.toUpperCase(),
        age: personalData.age,
        school_email: personalData.schoolEmail
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
