import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

const contactsData = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts) ?? contactsData;
    return parsedContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

  const handleAddContact = data => {
    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );

    if (isExist) {
      alert(`${data.name} is already in contacts.`);
      return;
    }

    const finalContact = {
      ...data,
      id: nanoid(),
    };

    setContacts(prevState => [...prevState, finalContact]);
  };

  const getContacts = () => {
    const lowerWords = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(lowerWords)
    );
  };

  const filterContacts = evt => {
    setFilter(evt.currentTarget.value);
  };

  const handleDelete = contacId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== contacId));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm handleAddContact={handleAddContact} />

      <h2>Contacts</h2>

      {contacts.length !== 0 ? (
        <>
          <Filter value={filter} filterContacts={filterContacts} />
          <ContactList contacts={getContacts()} handleDelete={handleDelete} />
        </>
      ) : (
        <p className={css.desc}>Phonebook is empty</p>
      )}
    </div>
  );
};
