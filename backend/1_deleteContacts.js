import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config(); 

export const deleteContact = async(req, res) => { // http://localhost:3001/contacts/X32l3htDjxda6D2O509r
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
        Authorization: `Bearer ${token}`
      }
    };
    
    const response = await axios.request(config);
    res.json({ message: "Contact deleted", data: response.data });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Error deleting contact');
  }
} 