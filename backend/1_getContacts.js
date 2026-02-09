import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config(); 

//GET ALL CONTACTS
export const getAllContacts = async(req, res) => { //ALL
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
      params: { // required
        locationId: process.env.locationId,
        limit: 20
      }
    };

    const response = await axios.request(config);
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Error fetching contact');
  }
}
