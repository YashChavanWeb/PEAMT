import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const districtSchema = new Schema({
  name: String
});

const citySchema = new Schema({
  name: String,
  districts: [districtSchema]
});

const stateSchema = new Schema({
  name: String,
  cities: [citySchema]
});

const countrySchema = new Schema({
  name: String,
  states: [stateSchema]
});

const Country = mongoose.model('Country', countrySchema);

export default Country;