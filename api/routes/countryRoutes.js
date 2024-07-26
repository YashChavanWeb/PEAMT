import express from 'express';
const router = express.Router();
import Country from '../models/Country.js';


router.get('/countries', async (req, res) => {
  const countries = await Country.find();
  res.json(countries);
});

router.get('/states/:countryId', async (req, res) => {
  const country = await Country.findById(req.params.countryId).select('states');
  res.json(country.states);
});

router.get('/cities/:stateId', async (req, res) => {
  const country = await Country.findOne({'states._id': req.params.stateId}, {'states.$': 1});
  res.json(country.states[0].cities);
});

router.get('/districts/:cityId', async (req, res) => {
  const country = await Country.findOne({'states.cities._id': req.params.cityId}, {'states.cities.$': 1});
  const city = country.states[0].cities.find(city => city._id.toString() === req.params.cityId);
  res.json(city.districts);
});

export default router;