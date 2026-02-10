import { useState } from 'react'
import './contacts-page.css'
import { CreateContactForm } from './CreateContact';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  return (
    <>
    <ContactsPage />
    </>
  )
}

export const ContactsPage = () => {

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/contacts");
        setContacts(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };

    fetchContacts();
  }, []);

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="contacts-container">
      <div className="contacts-header">
        <h2>Contacts</h2>

        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Contact
        </button>
      </div>

      <table className="contacts-table">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-text">
                No contacts found.
              </td>
            </tr>
          ) : (
            contacts.map((c, index) => (
              <tr key={c.id}>
                <td>{index + 1}</td>
                <td>{c.firstName}</td>
                <td>{c.lastName}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>
                  <button className="edit-button">Edit</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

{/* MODAL */}
      {showModal && (
        <CreateContactForm 
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default App
