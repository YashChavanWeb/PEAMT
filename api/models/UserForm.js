import mongoose from 'mongoose';

const userFormSchema = new mongoose.Schema({
  personalDetails: {
    type: Object,
    required: true,
  },
  addressInformation: {
    type: Object,
    required: true,
  },
  currentCourse: {
    type: Object,
    required: true,
  },
  otherInformation: {
    type: Object,
    required: true,
  },
  pastQualification: {
    type: Object,
    required: true,
  },
}, { timestamps: true });
const UserForm = mongoose.model('UserForm', userFormSchema);

export default UserForm;
