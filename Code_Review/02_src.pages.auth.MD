# Auth

## Signup

### Description

The Signup form includes three input fields: username, email, and password. Each input field has an `onChange={handleChange}` event listener to keep track of the data entered. There is also a button that displays either 'Loading...' or 'Sign Up' based on the `loading` state.

### States

- `formData`: An array of objects used to manage the data for each input field.
- `error`: Holds any error messages if they occur.
- `loading`: Indicates whether the form is currently processing.

### FormData Structure

```javascript
[
  {
    username: "yash",
    email: "yash@gmail.com",
    password: "yashchavan",
  },
  // More objects can be added if necessary
];
```

### Handle Submit Function

1. **Data Fetching**: Fetch data into `res` variable.
2. **Method**: Define HTTP method.
3. **Headers**: Set content type in headers.
4. **Body**: Pass `formData` into the body.
5. **Response Handling**: Store response in `data`.
6. **Success Condition**: Check `data.success`.
7. **Error Handling**: Update `loading` and `error` states.
8. **Try/Catch Block**: Handle errors during submission.

### Code Example

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

  if (!res.ok) {
    throw new Error("Failed to sign in");
  }

  const data = await res.json();
  if (data.success === false) {
    dispatch(signInFailure(data.errorMessage));
    return;
  }

  dispatch(signInSuccess(data));

  if (data.isAdmin) {
    navigate("/admin-dashboard");
  } else {
    navigate("/");
  }
} catch (error) {
  dispatch(signInFailure(error.message));
}
```

### Common Imports

```javascript
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
```

## Signin

### Description

The Signin form includes two input fields for email and password, each with an `onChange={handleChange}` function. Data is stored in the `formData` array.

### Handle Submit Function

1. **Async/Await**: Use async/await as MongoDB promises take time.
2. **Try/Catch**: Handle posting data to the signin route.
3. **Dispatch**: Track various steps using Redux.
4. **Navigation**: Navigate based on user roles.

### Code Example

```javascript
const res = await fetch("/api/auth/signin", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
});

dispatch(signInStart());

if (!res.ok) {
  throw new Error("Failed to sign in");
}

const data = await res.json();
if (data.success === false) {
  dispatch(signInFailure(data.errorMessage));
  return;
}

dispatch(signInSuccess(data));

if (data.isAdmin) {
  navigate("/admin-dashboard");
} else {
  navigate("/");
}
```

## Profile

### Description

The Profile page includes various input fields where data can be retrieved and modified.

### Image Input

1. **Input**: Image input is hidden and accepts only one file.
2. **OnChange**: Handle image selection with `e.target.files[0]`.

```javascript
<input
  type="file"
  ref={fileRef}
  hidden
  accept="image/*"
  onChange={(e) => setImage(e.target.files[0])}
/>
```

### Profile Image Display

1. **Source**: Show user's profile image or a default image if the user does not have one.
2. **Status Messages**: Display upload progress or error messages based on the upload status.

```javascript
<p className="text-sm self-center">
  {imageError ? (
    <span className="text-red-700">
      Error uploading image (file size must be less than 2 MB)
    </span>
  ) : imagePercent > 0 && imagePercent < 100 ? (
    <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
  ) : imagePercent === 100 ? (
    <span className="text-green-700">Image uploaded successfully</span>
  ) : (
    ""
  )}
</p>
```

### Handle File Upload

1. **Firebase Storage**: Upload image to Firebase storage.
2. **Upload Task**: Track upload progress and handle errors.
3. **Completion**: Set profile picture URL in form data.

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

### Basic Functions

1. **Handle Submit**: Submit updated user data via fetch.
2. **Handle Delete**: Delete user data via fetch.
3. **Handle Sign Out**: Sign out user via fetch.

```javascript
const handleSubmit = async () => {
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
  } catch (error) {
    dispatch(updateUserFailure(error));
  }
};

const handleDelete = async () => {
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

const handleSignOut = async () => {
  try {
    await fetch("/api/auth/signout");
    dispatch(signOut());
  } catch (error) {
    console.log(error);
  }
};
```

### Messages

1. **Update Success**: Display a success message if the user data is updated successfully.

```javascript
<p className="text-green-700 mt-5">
  {updateSuccess && "User is updated successfully!"}
</p>
```
