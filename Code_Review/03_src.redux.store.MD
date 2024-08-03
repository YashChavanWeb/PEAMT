# Redux Store and User Slice Setup

## Overview

This document provides details on how to set up Redux for state management in your application, use Redux-Persist to maintain state across page reloads, and configure a user slice to manage user-related state and actions.

## Redux Store Configuration

### Key Points

1. **Redux and Redux-Persist**:

   - Redux is used to manage the state of the application efficiently.
   - Redux-Persist ensures that the state is preserved across page reloads by saving it in storage (typically `localStorage`).

2. **Persist Configuration**:
   - `storage` is the method used to save state data, with `localStorage` being the default.
   - `persistReducer` is used to create a persisted reducer based on a persist configuration.
   - `persistStore` creates a persistor object that handles the rehydration of the state.

### Configuration Steps

1. **Import Necessary Modules**:

   ```javascript
   import { configureStore } from "@reduxjs/toolkit";
   import { persistStore, persistReducer } from "redux-persist";
   import storage from "redux-persist/lib/storage"; // Default storage is localStorage
   import { combineReducers } from "redux";
   import userReducer from "./userSlice"; // Import your user reducer
   ```

2. **Define Persist Configuration**:

   ```javascript
   const persistConfig = {
     key: "root",
     storage,
   };
   ```

3. **Create Persisted Reducer**:

   ```javascript
   const persistedReducer = persistReducer(persistConfig, rootReducer);
   ```

4. **Configure Store**:

   ```javascript
   export const store = configureStore({
     reducer: persistedReducer,
     middleware: (getDefaultMiddleware) =>
       getDefaultMiddleware({
         serializableCheck: {
           ignoredActions: [
             "FLUSH",
             "REHYDRATE",
             "PAUSE",
             "PERSIST",
             "PURGE",
             "REGISTER",
           ],
         },
       }),
   });
   ```

5. **Create Persistor**:

   ```javascript
   export const persistor = persistStore(store);
   ```

6. **Combine Reducers**:
   ```javascript
   const rootReducer = combineReducers({
     user: userReducer,
   });
   ```

## User Slice

### Key Points

1. **Slice in Redux**:

   - A slice is a collection of reducer functions and actions that handle a specific part of the state.

2. **Initial State**:

   - Defines the default state for the user slice:
     ```javascript
     const initialState = {
       currentUser: null,
       loading: false,
       error: false,
     };
     ```

3. **Reducers and Actions**:
   - The slice manages actions related to user authentication and information, such as signing in, updating, and deleting users.

### Creating the User Slice

1. **Import Modules**:

   ```javascript
   import { createSlice } from "@reduxjs/toolkit";
   ```

2. **Define the Slice**:

   ```javascript
   const userSlice = createSlice({
     name: "user",
     initialState,
     reducers: {
       signInStart: (state) => {
         state.loading = true;
         state.error = false;
       },
       signInSuccess: (state, action) => {
         state.currentUser = action.payload; // Here, action.payload is userData
         state.loading = false;
         state.error = false;
       },
       signOut: (state) => {
         state.currentUser = null;
         state.loading = false;
         state.error = false;
       },
     },
   });
   ```

3. **Export Actions and Reducer**:

   - **Actions**:

     ```javascript
     export const {
       signInStart,
       signInSuccess,
       signInFailure,
       updateUserStart,
       updateUserSuccess,
       updateUserFailure,
       deleteUserStart,
       deleteUserSuccess,
       deleteUserFailure,
       signOut,
     } = userSlice.actions;
     ```

   - **Reducer**:
     ```javascript
     export default userSlice.reducer;
     ```

## Example Usage

### Dispatching Actions

To dispatch actions, such as signing in a user:

```javascript
try {
  const response = await api.signIn(credentials);
  const userData = response.data;
  dispatch(signInSuccess(userData));
} catch (error) {
  dispatch(signInFailure(error.message));
}
```

### Accessing State

To access the user-related state in a component:

```javascript
const user = useSelector((state) => state.user.currentUser);
const loading = useSelector((state) => state.user.loading);
const error = useSelector((state) => state.user.error);
```

## Conclusion

This setup utilizes Redux and Redux-Persist to effectively manage and persist the application state. The user slice provides a structured approach to handle user authentication and related actions throughout the application.
