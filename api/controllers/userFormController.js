// import UserForm from '../models/UserForm.js'; // Ensure the file extension .js is included

// export const saveFormData = async (req, res) => {
//   try {
//     const formData = req.body;
//     const userForm = new UserForm(formData);
//     await userForm.save();
//     res.status(201).json(userForm);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const getFormData = async (req, res) => {
//   try {
//     const formId = req.params.id;
//     const userForm = await UserForm.findById(formId);
//     if (!userForm) {
//       return res.status(404).json({ error: 'Form not found' });
//     }
//     res.status(200).json(userForm);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };
