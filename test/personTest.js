import { createPerson, getPerson, updatePerson, deletePerson } from '../app/service/personService';
import Person from '../app/model/person';

// Example usage (replace with your actual values)
// CREATE
const newPerson = new Person("John Doe", "john.doe@example.com", "SecurePassword123", "1234567890123", "admin");
createPerson(newPerson)
    .then(createdPerson => {
        console.log("New person created:", createdPerson);
        // further code using createdPerson
    })
    .catch(error => {
        // do something with error
    });



// READ
getPerson(1) // Replace with the actual UID you want to retrieve
    .then(retrievedPerson => {
        if (retrievedPerson) {
            console.log("Retrieved Person:", retrievedPerson);
            // further code using retrievedPerson
        } else {
            console.log("Person not found.");
        }
    })
    .catch(error => {
        // do something with error
    });


// UPDATE
// Get person to update
getPerson(1)
    .then(personToUpdate => {
        if (personToUpdate) {
            personToUpdate.fullName = "Updated Name";
            // Other data

            updatePerson(personToUpdate)
                .then(updatedPerson => {
                    console.log("Updated Person:", updatedPerson);
                    // further code using updatedPerson
                })
                .catch(error => {
                    // do something with error
                });
        } else {
            console.log("Person not found.");
        }
    })
    .catch(error => {
        // do something with error
    });



// DELETE
deletePerson(1) // Replace with the actual UID you want to delete
    .then(deleted => {
        if (deleted) {
            console.log("Person deleted successfully.");
        } else {
            console.log("Person not found or not deleted.");
        }
    })
    .catch(error => {
        // do something with error
    });
