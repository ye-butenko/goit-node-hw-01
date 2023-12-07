const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    console.log("Contacts:", contacts);
  } catch (error) {
    console.error("Error reading contacts:", error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);
    if (contact) {
      console.log("Contact:", contact);
    } else {
      console.log("Contact not found");
    }
  } catch (error) {
    console.error("Error reading contacts:", error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    let contacts = JSON.parse(data);
    const removedContact = contacts.find((contact) => contact.id === contactId);
    contacts = contacts.filter((contact) => contact.id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contact removed:", removedContact);
  } catch (error) {
    console.error("Error removing contact:", error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = { id: Date.now(), name, email, phone };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contact added:", newContact);
  } catch (error) {
    console.error("Error adding contact:", error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
