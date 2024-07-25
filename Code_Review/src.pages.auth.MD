# User Authentication and Profile Management

This project implements a user authentication and profile management system using React, Redux, and Firebase. Below is a detailed explanation of the functionalities and code snippets used in this system.

## Table of Contents

1. [Sign-Up](#sign-up)
2. [Sign-In](#sign-in)
3. [Profile Management](#profile-management)
4. [Account Operations](#account-operations)

---

## Sign-Up

### Handling Form Changes

To manage the form data, we use a function that updates the state whenever the user changes an input field.

```javascript
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
};
```

- **Purpose**: Updates the `formData` state with the new value from the input field.
- **How it Works**: This function takes an event object `e`, and updates the `formData` state based on the `id` of the input field.

### Submitting the Sign-Up Form

To submit the sign-up form data to the server, we use a fetch request:

```javascript
const res = await fetch("/api/auth/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
});
```

- **Purpose**: Sends the form data to the server to create a new user.
- **How it Works**: The fetch request sends a POST request with the form data in JSON format to the `/api/auth/signup` endpoint.

---

## Sign-In

### Accessing Redux State

To access the loading and error state from Redux, use the `useSelector` hook:

```javascript
const { loading, error } = useSelector((state) => state.user);
```

- **Purpose**: Allows the component to reactively access the loading and error states.
- **How it Works**: The component will re-render whenever the `loading` or `error` state in Redux changes.

### Submitting the Sign-In Form

Here's how to handle user sign-in and dispatch Redux actions:

```javascript
try {
  dispatch(signInStart());
  const res = await fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (data.success === false) {
    dispatch(signInFailure(data));
    return;
  }
  dispatch(signInSuccess(data));
  navigate("/");
} catch (error) {
  dispatch(signInFailure(error));
}
```

- **Purpose**: Authenticates the user and handles Redux state changes based on the result.
- **How it Works**: Sends a POST request to the `/api/auth/signin` endpoint, then dispatches appropriate Redux actions based on the response.

---

## Profile Management

### Handling Image Uploads

To manage image uploads, use a `useEffect` hook and Firebase storage:

```javascript
useEffect(() => {
  if (image) {
    handleFileUpload(image);
  }
}, [image]);
```

- **Purpose**: Triggers image upload when an image is selected.
- **How it Works**: Calls `handleFileUpload` whenever the `image` state changes.

### Uploading the Image

Here's how to upload an image to Firebase Storage:

```javascript
const handleFileUpload = async (image) => {
  const storage = getStorage(app);
  const fileName = new Date().getTime() + image.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, image);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImagePercent(Math.round(progress));
    },
    (error) => {
      setImageError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
        setFormData({ ...formData, profilePicture: downloadURL })
      );
    }
  );
};
```

- **Purpose**: Handles image file upload and updates the form data with the image URL.
- **How it Works**: Uses Firebase Storage to upload the image and gets the download URL to update the profile picture.

---

## Account Operations

### Updating User Data

To update user information:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(updateUserStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success === false) {
      dispatch(updateUserFailure(data));
      return;
    }
    dispatch(updateUserSuccess(data));
    setUpdateSuccess(true);
  } catch (error) {
    dispatch(updateUserFailure(error));
  }
};
```

- **Purpose**: Sends updated user information to the server.
- **How it Works**: Sends a POST request to the `/api/user/update/:id` endpoint with the updated data.

### Deleting User Account

To delete a user account:

```javascript
const handleDeleteAccount = async () => {
  try {
    dispatch(deleteUserStart());
    const res = await fetch(`/api/user/delete/${currentUser._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success === false) {
      dispatch(deleteUserFailure(data));
      return;
    }
    dispatch(deleteUserSuccess(data));
  } catch (error) {
    dispatch(deleteUserFailure(error));
  }
};
```

- **Purpose**: Sends a request to delete the user's account.
- **How it Works**: Sends a DELETE request to the `/api/user/delete/:id` endpoint.

### Signing Out

To sign out the user:

```javascript
const handleSignOut = async () => {
  try {
    await fetch("/api/auth/signout");
    dispatch(signOut());
  } catch (error) {
    console.log(error);
  }
};
```

- **Purpose**: Signs out the user and updates the Redux state.
- **How it Works**: Sends a request to the `/api/auth/signout` endpoint.
