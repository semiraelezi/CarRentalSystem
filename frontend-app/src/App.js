import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/admin/Dashboard';  // Admin panel
import CarSearch from './components/user/CarSearch';
import RentACar from './components/user/RentACar';
import MyBookings from './components/user/MyBookings';
import AboutUs from './components/static/AboutUs';
import Footer from './components/shared/Footer';

function FooterWrapper() {
  const location = useLocation();
  // Hide footer on login and register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }
  return <Footer />;
}

// New component to redirect user based on role
function RootRedirect() {
  const user = useSelector(state => state.auth.user); // Adjust according to your store structure

  // If no user logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect admin to admin dashboard
  if (user.role === 'Admin' || user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  // Otherwise redirect regular user to car search
  return <Navigate to="/" replace />;
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Navbar />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/*" element={<Dashboard />} />
              <Route path="/" element={<CarSearch />} />
              <Route path="/rent" element={<RentACar />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/redirect" element={<RootRedirect />} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </div>
          <FooterWrapper />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
