<<<<<<< Updated upstream
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Profile from "./pages/Auth/Profile"
import SignUp from "./pages/Auth/SignUp"
import SignIn from "./pages/Auth/SignIn"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Auth/Profile";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import RegistrationForm from "./pages/registration/RegistrationForm";
import PrivateDashboard from "./pages/Developers/PrivateDashboard";
import AdminEntryForm from "./pages/Developers/AdminEntryForm";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import StartPage from './pages/Exam_Section/StartPage';
import ExamWindow from "./pages/Exam_Section/ExamWindow";
import SubmitConfirmation from "./pages/Exam_Section/SubmitConfirmation";

import './index.css';
>>>>>>> Stashed changes

function App() {
  return (
    <BrowserRouter>
      {/* Header component */}
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
<<<<<<< Updated upstream
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
=======
        <Route path='/admin-dashboard' element={<AdminDashboard />} />


        <Route path={`/private-dashboard/${privatePassId}`} element={<PrivateDashboard />} />
        <Route path={`/private-dashboard/${privatePassId}/admin-entry`} element={<AdminEntryForm />} />


        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/registration-form' element={<RegistrationForm />} />
          <Route path="/start" element={<StartPage />} />
          <Route path='/exam-section' element={<ExamWindow />} />
          <Route path='/submit-confirmation' element={<SubmitConfirmation/>}/>
>>>>>>> Stashed changes
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
