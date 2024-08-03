# Private Dashboard & Admin Entry Form

## Overview

This project consists of two main components:

1. **Private Dashboard**: Displays a list of admins and allows navigation to the Admin Entry Form and deletion of admins.
2. **Admin Entry Form**: Allows the addition of new admin entries with validation and submission confirmation.

## Private Dashboard

### Features

1. **Navigation Button**

   - **Purpose**: Navigates to the `AdminEntryForm`.
   - **Code Snippet**:
     ```javascript
     const handleNavigate = () => {
       navigate("/private");
     };
     ```

2. **Admins Table**

   - **Purpose**: Displays a list of admins with options to delete.
   - **HTML Structure**:
     ```html
     <table>
         <thead>
             <tr>
                 <th>College/Institution</th>
                 <th>Name</th>
                 <th>Actions</th>
             </tr>
         </thead>
         <tbody>
             {admins.map((admin) => (
                 <tr key={admin._id}>
                     <td>{admin.college}</td>
                     <td>{admin.name}</td>
                     <td>
                         <button onClick={() => confirmDelete(admin._id)} disabled={isDeleting}>
                             {isDeleting ? 'Deleting...' : 'Delete'}
                         </button>
                     </td>
                 </tr>
             ))}
         </tbody>
     </table>
     ```

3. **Delete Admin Functionality**

   - **Purpose**: Handles the deletion of an admin after confirmation and password validation.
   - **Functions**:

     - **`fetchAdmins`**: Fetches the list of admins from the server.

       ```javascript
       useEffect(() => {
         const fetchAdmins = async () => {
           try {
             const response = await axios.get("/api/form/admins");
             setAdmins(response.data.data);
           } catch (error) {
             console.error("Error fetching admins:", error);
           }
         };

         fetchAdmins();
       }, []);
       ```

     - **`confirmDelete`**: Shows the confirmation dialog.
       ```javascript
       const confirmDelete = (id) => {
         setAdminToDelete(id);
         setShowConfirmation(true);
       };
       ```
     - **`handleDeleteAdmin`**: Deletes the selected admin after password validation.

       ```javascript
       const handleDeleteAdmin = async (id) => {
         if (password !== dashboardPassword) {
           setPasswordError(true);
           return;
         }

         setIsDeleting(true);
         try {
           await axios.delete(`/api/form/admins/${id}`);
           setAdmins(admins.filter((admin) => admin._id !== id));
           setPassword("");
           setPasswordError(false);
         } catch (error) {
           console.error("Error deleting admin:", error);
         } finally {
           setIsDeleting(false);
           setAdminToDelete(null);
           setShowConfirmation(false);
         }
       };
       ```

     - **`cancelDelete`**: Cancels the deletion process and hides the confirmation dialog.
       ```javascript
       const cancelDelete = () => {
         setAdminToDelete(null);
         setShowConfirmation(false);
         setPassword("");
         setPasswordError(false);
       };
       ```

4. **Dialog Box**
   - **Purpose**: Prompts the user to enter a password to confirm deletion.
   - **Components**:
     - **Password Input**: Allows the user to enter the password.
     - **Buttons**: Cancel or proceed with deletion.
     - **Code Snippet**:
       ```html
       {showConfirmation && (
           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
               <div className="bg-white p-8 rounded-lg shadow-md">
                   <p className="text-lg font-semibold mb-4">Please enter the password to submit the form</p>
                   <input
                       type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Enter password"
                       className="border border-gray-300 p-2 rounded-md w-full mb-4"
                   />
                   {passwordError && <p className="text-red-600 mb-4">Incorrect password. Please try again.</p>}
                   <div className="flex justify-end">
                       <button onClick={cancelDelete} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md mr-4">
                           Cancel
                       </button>
                       <button onClick={() => handleDeleteAdmin(adminToDelete)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
                           Delete
                       </button>
                   </div>
               </div>
           </div>
       )}
       ```

# Admin Entry Form

## Overview

The **Admin Entry Form** component allows users to input and submit details for new admin entries. It includes form validation, submission confirmation, and password protection.

## Features

1. **Form Inputs**: Collects details including college, exam name, email, password, phone number, and description.
2. **Submit Confirmation Dialog**: Requests password confirmation before submitting the form.

## Code Snippets

### 1. Form Structure

**Purpose**: Provides fields for entering admin details.

```jsx
<form className="space-y-6" onSubmit={confirmSubmit}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
            <label htmlFor="college" className="block text-sm font-medium text-gray-700">College/Institution/Organization Name</label>
            <input
                type="text"
                id="college"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
        </div>

    <div className="text-right">
        <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
            Confirm Submission
        </button>
    </div>
</form>
```

### 2. Submit Confirmation Dialog

**Purpose**: Requests the password confirmation to proceed with form submission.

```jsx
{
  showSubmitConfirmation && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="text-lg font-semibold mb-4">
          Please enter the password to submit the form
        </p>
        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Enter password"
          className="border border-gray-300 p-2 rounded-md w-full mb-4"
        />
        {passwordError && (
          <p className="text-red-600 mb-4">
            Incorrect password. Please try again.
          </p>
        )}
        <div className="flex justify-end">
          <button
            onClick={cancelSubmit}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md mr-4"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 3. Functions

**Purpose**: Handle form submission and validation.

- **`handleChange`**: Updates the form data state.

  ```javascript
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  ```

- **`confirmSubmit`**: Shows the confirmation dialog on form submit.

  ```javascript
  const confirmSubmit = (e) => {
    e.preventDefault();
    setShowSubmitConfirmation(true);
  };
  ```

- **`handleSubmit`**: Validates password and submits the form.

  ```javascript
  const handleSubmit = async () => {
    if (passwordInput !== dashboardPassword) {
      setPasswordError(true);
      return;
    }

    try {
      const response = await fetch("/api/form/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      console.log(data);
      setShowSubmitConfirmation(false);
      setPasswordInput("");
      setPasswordError(false);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };
  ```

- **`cancelSubmit`**: Cancels the submission process and hides the confirmation dialog.
  ```javascript
  const cancelSubmit = () => {
    setShowSubmitConfirmation(false);
    setPasswordInput("");
    setPasswordError(false);
  };
  ```

## Notes

- **Environment Variable**: The password for form submission is retrieved from an environment variable.

  ```javascript
  const dashboardPassword = import.meta.env.VITE_DASHBOARD_PASSWORD;
  ```

- **State Management**:

  - `formData`: Stores form input values.
  - `showSubmitConfirmation`: Controls the visibility of the confirmation dialog.
  - `passwordInput`: Stores the entered password during confirmation.
  - `passwordError`: Indicates if the entered password is incorrect.

- **Form Handling**:
  - Form validation occurs before making an API request.
  - A confirmation dialog ensures that form submissions are protected by password verification.
