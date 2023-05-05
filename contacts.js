const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data);
        return contacts;
        
    } catch (error) {
        return console.log(error);
    };
};

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data);
        const contactToFind = contacts.find(item => item.id === contactId);
        return contactToFind;

    } catch (error) {
        return console.log(error);
    };
};

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data);
        const newContacts = contacts.filter(item => item.id !== contactId);

        if (newContacts.length === contacts.length) {
            console.log(`\x1b[31m Contact with ID ${contactId} not found! \x1b[0m`);
            return;
        };

        await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
        console.log('\x1b[32m Contact removed successfully \x1b[0m');
        console.log('\x1b[36m New list of contacts : \x1b[0m');
        return console.table(newContacts);

    } catch (error) {
        return console.log(error);
    };
};

async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data);
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
        };
        contacts.push(newContact);

        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return contacts;

    } catch (error) {
        return console.log(error);
    };
};

module.exports = {listContacts, getContactById, addContact, removeContact};