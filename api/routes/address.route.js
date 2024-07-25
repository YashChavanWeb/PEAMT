import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error('API_KEY is not defined in environment variables');
  process.exit(1);
}

// Fetch countries
router.get('/countries', async (req, res) => {
  try {
    const response = await axios.get('https://api.countrystatecity.in/v1/countries', {
      headers: { 'X-CSCAPI-KEY': API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Error fetching countries' });
  }
});

// Fetch states
router.get('/states/:countryId', async (req, res) => {
  try {
    const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${req.params.countryId}/states`, {
      headers: { 'X-CSCAPI-KEY': API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(500).json({ error: 'Error fetching states' });
  }
});

// Fetch districts
router.get('/districts/:stateId', async (req, res) => {
  try {
    const response = await axios.get(`https://api.countrystatecity.in/v1/states/${req.params.stateId}/districts`, {
      headers: { 'X-CSCAPI-KEY': API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching districts:', error);
    res.status(500).json({ error: 'Error fetching districts' });
  }
});

// Fetch cities
router.get('/cities/:districtId', async (req, res) => {
  try {
    const response = await axios.get(`https://api.countrystatecity.in/v1/districts/${req.params.districtId}/cities`, {
      headers: { 'X-CSCAPI-KEY': API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Error fetching cities' });
  }
});

export default router;
