
const { program } = require('commander');
// const yargs = require('yargs');

// const {hideBin}=require('yargs/helpers')
const contacts = require('./db/contacts');


const invokeAction = async ({ action, id, name, email, phone })=>{
    switch (action) {
        case 'list':
            const allContacts = await contacts.listContacts();
            console.table(allContacts);
            break;
        case 'get':
            const oneContact = await contacts.getContactById(id);
            console.log(oneContact);
            break;
        case 'add':
            const newContact = await contacts.addContact({ name, email, phone });
            console.log(newContact);
            break;
        case 'remove':
            const removeContact = await contacts.removeContact(id);
            console.log(removeContact);
            break;
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}


// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
// invokeAction(argv);

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id:'2' });
// invokeAction({ action: 'add', name: 'Ivan', email: 'ivan@ivan.com' });
// invokeAction({ action: "remove", id: "1" });
// console.table(process.argv);
program
.option('-a --action <type>',"choose action")
.option('-i --id <type>',"user id")
.option('-n --name <type>',"user name")
.option('-e --email <type>',"user email")
.option('-p --phone <type>', "user phone")


program.parse();
const option = program.opts();
invokeAction(option);



