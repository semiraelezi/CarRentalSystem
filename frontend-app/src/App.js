import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminDashboard from './components/admin/Dashboard';
import CarSearch from './components/user/CarSearch';
import RentACar from './components/user/RentACar';
import MyBookings from './components/user/MyBookings';
import Dashboard from './components/admin/Dashboard';
import AboutUs from './components/static/AboutUs';
import ContactUs from './components/static/ContactUs';
import Footer from './components/shared/Footer';


function FooterWrapper() {
  const location = useLocation();
  // Hide footer on login and register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }
  return <Footer />;
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/" element={<CarSearch />} />
          <Route path="/rent" element={<RentACar />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/admin/*" element={<Dashboard />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        <FooterWrapper />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
