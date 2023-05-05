const { Command } = require("commander");
const { listContacts, getContactById, addContact, removeContact } = require('./contacts.js');

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const contacts = await listContacts();
            console.log('\x1b[36m List of contacts:\x1b[0m');
            return console.table(contacts);
        
        case "get":
            const contactToFind = await getContactById(id);
            if (!contactToFind) {
                return console.error(`\x1b[31m Contact with ID ${id} not found \x1b[0m`);
            };

            console.log(`\x1b[36m Contact with ID \x1b[0m` + `\x1b[33m${id}\x1b[0m` +':');
            return console.table(contactToFind);

        case "add":
            const newContact = await addContact(name, email, phone);
            console.log(`\x1b[32m New contact added successfully \x1b[0m`);
            console.log(`\x1b[36m New list of contacts : \x1b[0m`);
            return console.table(newContact);

        case "remove":
            const removedContact = await removeContact(id);
            return removedContact;

        default:
            console.warn("\x1B[31m Unknown action type!");
    };
};

const program = new Command();

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

invokeAction(options);