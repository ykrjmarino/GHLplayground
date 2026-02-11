import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config(); 

//GET ALL CONTACTS
export const getAllContacts = async(req, res) => { // http://localhost:3001/contacts
  const token = process.env.ACCESS_TOKEN; 

  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://services.leadconnectorhq.com/contacts`,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json', 
        'Version': '2021-07-28',  
      },
      params: { //required
        locationId: process.env.LOCATION_ID,
        limit: 10
      }
    };

    const response = await axios.request(config);
    const contacts = response.data.contacts;

    const cleaned = contacts.map(c => ({
      id: c.id,
      name: c.contactName,
      firstName: c.firstName,
      lastName: c.lastName,
      email: c.email,
      phone: c.phone,
      tags: c.tags
    }));

    // console.log(cleaned);
    console.log(response.data);

    //res.json(response.data);
    res.json(cleaned);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Error fetching contact');
  }
} //response.data.contacts

//GET ONE CONTACT
export const getContact = async(req, res) => { // http://localhost:3001/contacts/iYJe1RoeQHzlNINySCQi
  const { contactId } = req.params;
  const token = process.env.ACCESS_TOKEN; 

  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://services.leadconnectorhq.com/contacts/${contactId}`,
      headers: { 
        'Accept': 'application/json', 
        'Version': '2021-07-28',  
        'Authorization': `Bearer ${token}`
      },
      params: { //required
        locationId: process.env.LOCATION_ID,
        contactId: contactId
      }
    };
    
    const response = await axios.request(config);
    const contact = response.data.contact;

    const cleaned = {
      id: contact.id,
      name: contact.contactName,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      tags: contact.tags
    };

    console.log(cleaned);

    // res.json(response.data);
    res.json(cleaned);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Error fetching contact');
  }
} //response.data.contacts