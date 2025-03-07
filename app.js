import express from 'express';
import dotenv from 'dotenv';
import { createPerson, getPerson, updatePerson, deletePerson, getAllPeople, getPersonByEmail, getPersonByRfid, getPersonByName } from './db_functions';
import Person from "./app/model/person"; // Assuming db_functions.js is in the same directory


dotenv.config();

const app = express();
const port = 3000;
const peopleApi = `/api${peopleApi}`;


app.use(express.json());


// CREATE
app.post(`${peopleApi}`, async (req, res) => {
    try {
        const personData = req.body;

        const newPerson = new Person(
            personData.full_name,
            personData.email,
            personData.password,
            personData.rfid,
            personData.role
        );
        if(!newPerson.checkEmailFormat()){
            res.status(400).send("Invalid email format");
            return;
        }
        if(!newPerson.checkPasswordFormat()){
            res.status(400).send("Invalid password format");
            return;
        }

        if(!newPerson.checkRFIDFormat()){
            res.status(400).send("Invalid RFID format");
            return;
        }

        if(!newPerson.checkRole()){
            res.status(400).send("Invalid role");
            return;
        }


        // Hash the password before saving to the database
        newPerson.hashPassword();


        const createdPerson = await createPerson(newPerson);
        res.status(201).json(createdPerson);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating person");
    }

});

// READ
app.get(`${peopleApi}`, async (req, res) => {
    try {
        const allPeople = await getAllPeople();
        res.json(allPeople);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving people");
    }
});

app.get(`${peopleApi}/:uid`, async (req, res) => {
    try {
        const uid = parseInt(req.params.uid);
        const person = await getPerson(uid);
        if (person) {
            res.json(person);
        } else {
            res.status(404).send("Person not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving person");
    }
});



// UPDATE
app.put(`${peopleApi}/:uid`, async (req, res) => {
    try {
        const uid = parseInt(req.params.uid);
        const updatedPersonData = req.body;
        const updatedPerson = new Person(
            updatedPersonData.full_name,
            updatedPersonData.email,
            updatedPersonData.password,
            updatedPersonData.rfid,
            updatedPersonData.role
        );

        if (updatedPersonData.email && !updatedPerson.checkEmailFormat()) {
            res.status(400).send("Invalid email format");
            return;
        }
        if (updatedPersonData.password && !updatedPerson.checkPasswordFormat()) {
            res.status(400).send("Invalid password format");
            return;
        }
        if (updatedPersonData.rfid && !updatedPerson.checkRFIDFormat()) {
            res.status(400).send("Invalid RFID format");
            return;
        }
        if (updatedPersonData.role && !updatedPerson.checkRole()) {
            res.status(400).send("Invalid role");
            return;
        }

        // Hash the password before saving to the database
        if (updatedPersonData.password) {
            updatedPerson.hashPassword();
        }


        const dbUpdatedPerson = await updatePerson({ uid, ...updatedPerson });
        res.json(dbUpdatedPerson);

    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating person");
    }

});


// DELETE
app.delete(`${peopleApi}/:uid`, async (req, res) => {

    try {
        const uid = parseInt(req.params.uid);
        const deleted = await deletePerson(uid);
        if (deleted) {
            res.status(204).send(); // No content
        } else {
            res.status(404).send("Person not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting person");
    }
});



// Additional routes:



app.get(`${peopleApi}/email/:email`, async (req, res) => {
    try {
        const email = req.params.email;
        const person = await getPersonByEmail(email);
        if (person) {
            res.json(person);
        } else {
            res.status(404).send("Person not found");
        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving person");
    }
});




app.get(`${peopleApi}/rfid/:rfid`, async (req, res) => {
    try {
        const rfid = req.params.rfid;
        const person = await getPersonByRfid(rfid);
        if (person) {
            res.json(person);
        } else {
            res.status(404).send("Person not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving person");
    }
});


app.get(`${peopleApi}/name/:name`, async (req, res) => {
    try {
        const name = req.params.name;
        const people = await getPersonByName(name);
        if (people) {
            res.json(people);
        } else {
            res.status(404).send("Person not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving person");
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});