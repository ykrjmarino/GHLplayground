import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config(); 

export const updateContact = async(req, res) => { // http://localhost:3001/contacts/iYJe1RoeQHzlNINySCQi
  const { contactId } = req.params;
  const token = process.env.ACCESS_TOKEN; 

  try {
    const config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `https://services.leadconnectorhq.com/contacts/${contactId}`,
      headers: {
        Accept: "application/json",
        Version: "2021-07-28",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json" //telling the body that we're sending in JSON format
      },
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        tags: req.body.tags
      }
    };
    
    const response = await axios.request(config);
    const contact = response.data.contact;

    const cleaned = {
      id: contact.id,
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
    res.status(500).send('Error updating contact');
  }
} 
