import express from 'express';
import axios from 'axios';
import cors from "cors";
import dotenv from 'dotenv';
import qs from 'qs';

import { getAllContacts, getContact } from './1_getContacts.js';
import { createContact } from './1_postContacts.js';
import { updateContact } from './1_putContacts.js';
import { deleteContact } from './1_deleteContacts.js';

dotenv.config(); 

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173"
}));

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

//OATH: My first step in exploring GHL
app.get('/oauth/callback', async (req, res) => {
  const code = req.query.code; //from HighLevel
  if (!code) return res.status(400).send('No code provided');

  try {
    const response = await axios.post(
      'https://services.leadconnectorhq.com/oauth/token',
      qs.stringify({
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        code: code
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token } = response.data;
    console.log('Access token:', access_token);
    console.log(response.data);

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('Error exchanging code for token');
  }
});

app.get('/contacts', getAllContacts); // http://localhost:3001/contacts
app.get('/contacts/:contactId', getContact); // http://localhost:3001/contacts/iYJe1RoeQHzlNINySCQi

app.post('/contacts', createContact); // http://localhost:3001/contacts

app.put('/contacts/:contactId', updateContact); // http://localhost:3001/contacts/0XvLulGpG7e0cERVYxkc

app.delete('/contacts/:contactId', deleteContact); // http://localhost:3001/contacts/X32l3htDjxda6D2O509r

app.get("/", (req, res) => res.send("Backend is running wewewe"));

app.listen(port, () => {
  // db.connect();
  console.log(`✅ Backend running at http://localhost:${port} (ykrjm2025)`);
});