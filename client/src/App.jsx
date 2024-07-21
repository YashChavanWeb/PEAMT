import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Profile from "./pages/Auth/Profile"
import SignUp from "./pages/Auth/SignUp"
import SignIn from "./pages/Auth/SignIn"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import RegistrationForm from "./pages/registration/RegistrationForm"

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
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/registration-form' element={<RegistrationForm />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
