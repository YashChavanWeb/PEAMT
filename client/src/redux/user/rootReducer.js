import { combineReducers } from 'redux';
import userReducer from './userSlice'; // Your user slice
import formReducer from './formSlice'; // The form slice we just created

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
});

export default rootReducer;
