import './App.css';
import Home from './Pages/Home';
import StartScreen from './Components/StartScreen/StartScreen' 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import AboutUs from './Components/AboutUs/AboutUs';
import Mission from './Components/Mission/Mission';
import BrandsUs from './Components/Brands/Brands';
import ContactUs from './Components/ContactUs/ContactUs';

function App() {
  const [showStart, setShowStart] = useState(false);

  useEffect(() => {
    const hasStarted = localStorage.getItem('hasStarted');
    if (!hasStarted) {
      setShowStart(true);
    }
  }, []);

  const handleStart = () => {
    localStorage.setItem('hasStarted', 'true');
    setShowStart(false);
  };

  if (showStart) {
    return <StartScreen onStart={handleStart} />;
  }

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/brands" element={<BrandsUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        {/* Add more routes here later if needed */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
