import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

// Configure the store with reducers and middleware
export const store = configureStore({
    reducer: {
        user: userReducer // Specify userReducer under the 'user' key in the root reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable the serializable check for now
        }),
});
