
import { Route, Routes } from 'react-router-dom'
import './App.css'
  import { ToastContainer, toast } from 'react-toastify';
import Home  from './pages/Home'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import About from './pages/About'
import Footer from './components/Footer'

function App() {
  

  return (
    <div className="mx-4 sm:max-[10%] ">
    <ToastContainer/>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/doctors' element={<Doctors/>}></Route>
        <Route path='/doctors/:speciality' element={<Doctors/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/my-profile' element={<MyProfile/>}></Route>
        <Route path='/my-appointments' element={<MyAppointments/>}></Route>
        <Route path='/appointment/:docId' element={<Appointment/>}></Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
