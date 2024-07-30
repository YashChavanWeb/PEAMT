const mongoose = require('mongoose');
const axios = require('axios');
const Country = require('./models/Country');

mongoose.connect('mongodb://localhost:27017/mern_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

const fetchDataAndSeed = async () => {
  try {
    const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
    const countriesData = response.data.data;

    const countries = countriesData.map(country => ({
      name: country.country,
      states: country.states.map(state => ({
        name: state.name,
        cities: state.cities.map(city => ({
          name: city,
          districts: [] // District data can be added similarly if available
        }))
      }))
    }));

    await Country.deleteMany({});
    await Country.insertMany(countries);
    console.log('Data successfully seeded');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error fetching or seeding data:', error);
  }
};

fetchDataAndSeed();