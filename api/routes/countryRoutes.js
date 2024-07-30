import express from 'express';
import Country from '../models/Country.js';

const router = express.Router();

// Endpoint to get all countries
router.get('/countries', async (req, res) => {
    try {
        const countries = await Country.find();
        res.json(countries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching countries', error });
    }
});

// Endpoint to get states by country ID
router.get('/states/:countryId', async (req, res) => {
    try {
        const country = await Country.findById(req.params.countryId).select('states');
        if (!country) {
            return res.status(404).json({ message: 'Country not found' });
        }
        res.json(country.states);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching states', error });
    }
});

// Endpoint to get cities by state ID
router.get('/cities/:stateId', async (req, res) => {
    try {
        const country = await Country.findOne({ 'states._id': req.params.stateId }, { 'states.$': 1 });
        if (!country) {
            return res.status(404).json({ message: 'State not found' });
        }
        res.json(country.states[0].cities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cities', error });
    }
});

// Endpoint to get districts by city ID
router.get('/districts/:cityId', async (req, res) => {
    try {
        const country = await Country.findOne({ 'states.cities._id': req.params.cityId }, { 'states.cities.$': 1 });
        if (!country) {
            return res.status(404).json({ message: 'City not found' });
        }
        const city = country.states[0].cities.find(city => city._id.toString() === req.params.cityId);
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.json(city.districts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching districts', error });
    }
});

export default router;
