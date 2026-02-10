import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config(); 

export const createContact = async(req, res) => { 
  const token = process.env.ACCESS_TOKEN; 
  
  const { //GET data from frontend
    firstName,
    lastName,
    email,
    phone,
    gender,
    dateOfBirth,
    companyName,
    country,
    address1,
    city,
    state,
    postalCode
  } = req.body; // <-- this is req.body

  const data = {
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    email,
    phone,
    gender,
    dateOfBirth,
    companyName,
    country,
    address1,
    city,
    state,
    postalCode,
    locationId: process.env.LOCATION_ID // required by API
  };

  try {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://services.leadconnectorhq.com/contacts',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json', 
        'Version': '2021-07-28',  
      },
      data : data
    };

    const response = await axios.request(config);
    const created = response.data;
    console.log(created);
    res.json(created);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Error creating contact');
  }
}