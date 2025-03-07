import Person from '../model/person';
import { pool } from '../db/conn';

// CREATE
async function createPerson(person) {
    const { full_name, email, password, rfid, role } = person;

    try {
        const result = await pool.query(
            'INSERT INTO gamma.people (full_name, email, password, rfid, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [full_name, email, password, rfid, role]
        );
        return new Person(result.rows[0].full_name, result.rows[0].email, result.rows[0].password, result.rows[0].rfid, result.rows[0].role);
    } catch (error) {
        console.error('Error creating person:', error);
        throw error;
    }
}


// READ
async function getPerson(uid) {
    try {
        const result = await pool.query('SELECT * FROM gamma."People" WHERE uid = $1', [uid]);

        if (result.rows.length === 0) {
            return null;
        }
        const personData = result.rows[0];
        return new Person(personData.full_name, personData.email, personData.password, personData.rfid, personData.role);


    } catch (error) {
        console.error('Error getting person:', error);
        throw error;
    }
}

// READ all people
async function getAllPeople() {
    try {
        const result = await pool.query('SELECT * FROM gamma."People"');
        return result.rows.map(personData => new Person(personData.full_name, personData.email, personData.password, personData.rfid, personData.role));
    } catch (error) {
        console.error('Error getting all people:', error);
        throw error;
    }
}


// READ person by email
async function getPersonByEmail(email) {
    try {
        const result = await pool.query('SELECT * FROM gamma."People" WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return null;
        }

        const personData = result.rows[0];
        return new Person(personData.full_name, personData.email, personData.password, personData.rfid, personData.role);


    } catch (error) {
        console.error('Error getting person by email:', error);
        throw error;
    }
}

// READ person by rfid
async function getPersonByRfid(rfid) {
    try {
        const result = await pool.query('SELECT * FROM gamma."People" WHERE rfid = $1', [rfid]);

        if (result.rows.length === 0) {
            return null;
        }

        const personData = result.rows[0];
        return new Person(personData.full_name, personData.email, personData.password, personData.rfid, personData.role);


    } catch (error) {
        console.error('Error getting person by RFID:', error);
        throw error;
    }
}

// READ person by name
async function getPersonByName(full_name) {
    try {
        const result = await pool.query(
            'SELECT * FROM gamma."People" WHERE lower(full_name) LIKE $1',
            [`%${full_name.toLowerCase()}%`]
        );

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows.map(personData => new Person(personData.full_name, personData.email, personData.password, personData.rfid, personData.role));

    } catch (error) {
        console.error('Error getting person by name:', error);
        throw error;
    }
}


// UPDATE
async function updatePerson(person) {
    const { uid, full_name, email, password, rfid, role } = person;
    try {
        const result = await pool.query(
            'UPDATE gamma."People" SET full_name = $1, email = $2, password = $3, rfid = $4, role = $5 WHERE uid = $6 RETURNING *',
            [full_name, email, password, rfid, role, uid]
        );
        return new Person(result.rows[0].full_name, result.rows[0].email, result.rows[0].password, result.rows[0].rfid, result.rows[0].role);

    } catch (error) {
        console.error('Error updating person:', error);
        throw error;
    }
}

// DELETE
async function deletePerson(uid) {
    try {
        const result = await pool.query('DELETE FROM gamma."People" WHERE uid = $1', [uid]);
        return result.rowCount > 0; // Returns true if a row was deleted, false otherwise
    } catch (error) {
        console.error('Error deleting person:', error);
        throw error;
    }
}

export { createPerson, getPerson, getAllPeople, getPersonByEmail, getPersonByRfid, getPersonByName, updatePerson, deletePerson };
